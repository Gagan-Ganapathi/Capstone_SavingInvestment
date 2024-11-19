using Microsoft.EntityFrameworkCore;
using SavingsInvestmentMicroservice.Data;
using SavingsInvestmentMicroservice.Model;
using SavingsInvestmentMicroservice.Model.DTO;
using Savingsmicro.Common.exception;

namespace SavingsInvestmentMicroservice.Services
{
    public class AccountService : IAccountService
    {
        private readonly AppDbContext _context;

        public AccountService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Account> CreateAccountAsync(string userId, string accountType)
        {
            var account = new Account
            {
                UserId = userId,
                AccountType = accountType,
                Balance = 0,
                CreatedAt = DateTime.UtcNow,
                Transactions = new List<Transaction>()
            };

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();
            return account;
        }

        public async Task<Account> GetAccountAsync(string userId)
        {
            var account = await _context.Accounts
                .FirstOrDefaultAsync(a => a.UserId == userId);

            if (account == null)
                throw new NotFoundException("Account not found");

            return account;
        }

        public async Task<List<Account>> GetUserAccountsAsync(string userId)
        {
            var accounts = await _context.Accounts.AsNoTracking()
            .Where(a => a.UserId == userId)
            .ToListAsync();

            if (!accounts.Any())
                throw new NotFoundException($"No accounts found for user ID: {userId}");

            return accounts;
        }

        public async Task<Account> UpdateAccountBalanceAsync(string userId, decimal amount)
        {
            var account = await GetAccountAsync(userId);
            account.Balance += amount;

            if (account.Balance < 0)
                throw new InvalidOperationException("Insufficient funds");

            await _context.SaveChangesAsync();
            return account;
        }



        public async Task<List<Account>> GetUseraccountsByAccountTypeAsync(string userId, string Accounttype)
        {
            return await _context.Accounts.AsNoTracking()
                .Where(t => t.UserId == userId && t.AccountType == Accounttype)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
        }

        public async Task<AccountsSummary> GetUserTransactionSummaryAsync(string userId)
        {
            var acc = await _context.Accounts
                .Where(t => t.UserId == userId)
                .ToListAsync();

            return new AccountsSummary
            {
                TotalBalance = acc.Sum(t => t.Balance),
                TotalSavings = acc.Where(t => t.AccountType == "savings").Sum(t => t.Balance),
                TotalInvestments = acc.Where(t => t.AccountType == "investment").Sum(t => t.Balance),
                AccountCount = acc.Count
            };

        }


        public async Task<Account?> GetAccountByUserIdAndTypeAsync(string userId, string accountType)
        {
            return await _context.Accounts
                .FirstOrDefaultAsync(a => a.UserId == userId && a.AccountType == accountType);
        }



    }
}
