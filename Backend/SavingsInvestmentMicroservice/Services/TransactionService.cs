

using Microsoft.EntityFrameworkCore;
//using OpenQA.Selenium;
using SavingsInvestmentMicroservice.Data;
using SavingsInvestmentMicroservice.Model;
using SavingsInvestmentMicroservice.Model.DTO;
using Savingsmicro.Common.exception;
//using Savingsmicro.Common.exception;

namespace SavingsInvestmentMicroservice.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly AppDbContext _context;
        private readonly IAccountService _accountService;

        public TransactionService(AppDbContext context, IAccountService accountService)
        {
            _context = context;
            _accountService = accountService;
        }



        public async Task<Transaction> CreateTransactionAsync(string userId, string accountType, string type, decimal amount)
        {
            // Get the user's account of specified type
            var accounts = await _context.Accounts
                .Where(a => a.UserId == userId && a.AccountType == accountType)
                .ToListAsync();

            if (!accounts.Any())
                throw new NotFoundException($"No account found of type {accountType}");

            var account = accounts.First(); // Get the first account of specified type

            // Calculate the amount to update (negative for withdrawals)
            var updateAmount = type == "Withdrawal" ? -amount : amount;

            // Check for sufficient funds
            if (type == "Withdrawal" && account.Balance < amount)
                throw new InvalidOperationException("Insufficient funds");

            // Update account balance
            account.Balance += updateAmount;

            var transaction = new Transaction
            {
                UserId = userId,
                AccountId = account.Id,
                AccountType = accountType, // Set the account type
                Type = type,
                Amount = amount,
                TransactionDate = DateTime.UtcNow
            };

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();
            return transaction;
        }

        public async Task<List<Transaction>> GetUserTransactionsAsync(string userId)
        {
            return await _context.Transactions
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.TransactionDate)
                .ToListAsync();
        }

        public async Task<List<Transaction>> GetTransactionsByFiltersAsync(
            string userId,
            string accountType = null,
            string transactionType = null)
        {
            var query = _context.Transactions.AsNoTracking()
                .Where(t => t.UserId == userId);

            if (!string.IsNullOrEmpty(accountType))
            {
                query = query.Where(t => t.AccountType == accountType);
            }

            if (!string.IsNullOrEmpty(transactionType))
            {
                query = query.Where(t => t.Type == transactionType);
            }

            return await query
                .OrderByDescending(t => t.TransactionDate)
                .ToListAsync();
        }

        public async Task<TransactionSummary> GetTransactionSummaryByAccountTypeAsync(string userId, string accountType)
        {
            var accountExists = await _context.Accounts
            .AnyAsync(a => a.UserId == userId && a.AccountType == accountType);

            if (!accountExists)
            {
                throw new NotFoundException($"No account found with type '{accountType}' for this user");
            }

            var transactions = await _context.Transactions
                .Where(t => t.UserId == userId && t.AccountType == accountType)
                .ToListAsync();

            return new TransactionSummary
            {
                TotalDeposits = transactions.Where(t => t.Type == "Deposit").Sum(t => t.Amount),
                TotalWithdrawals = transactions.Where(t => t.Type == "Withdrawal").Sum(t => t.Amount),
                TotalInvestments = transactions.Sum(t => t.Amount),
                TotalStocks = transactions.Where(t => t.Type == "Stocks").Sum(t => t.Amount),
                TotalMFs = transactions.Where(t => t.Type == "Mutual funds").Sum(t => t.Amount),
                TotalCash = transactions.Where(t => t.Type == "Cash").Sum(t => t.Amount),
                TotalGold = transactions.Where(t => t.Type == "Gold").Sum(t => t.Amount),
                TotalProperty = transactions.Where(t => t.Type == "Property").Sum(t => t.Amount),
                TotalEF = transactions.Where(t => t.Type == "Emergency Fund").Sum(t => t.Amount),
                TotalCrypto = transactions.Where(t => t.Type == "Crypto").Sum(t => t.Amount),
                TransactionCount = transactions.Count,
                AccountType = accountType
            };
        }
    }

}
