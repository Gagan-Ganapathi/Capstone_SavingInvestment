using Savingsmicro.Model;
using Savingsmicro.Model.DTO;


namespace SavingsInvestmentService.Services
{
    public interface ITransactionService
    {
        //Task<Transaction> CreateTransactionAsync(string userId, int accountId, string type, decimal amount);
        //Task<List<Transaction>> GetAccountTransactionsAsync(string userId, int accountId);

        //Task<Transaction> CreateTransactionAsync(string userId, string type, decimal amount);
        //Task<List<Transaction>> GetUserTransactionsAsync(string userId);
        //Task<List<Transaction>> GetUserTransactionsByTypeAsync(string userId, string type);
        //Task<TransactionSummary> GetUserTransactionSummaryAsync(string userId);

        Task<Transaction> CreateTransactionAsync(string userId, string accountType, string type, decimal amount);
        Task<List<Transaction>> GetUserTransactionsAsync(string userId);
        Task<List<Transaction>> GetTransactionsByFiltersAsync(string userId, string accountType = null, string transactionType = null);
        Task<TransactionSummary> GetTransactionSummaryByAccountTypeAsync(string userId, string accountType);
    }
}