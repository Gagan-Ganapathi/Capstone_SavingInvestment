using InvestementSavingsMicroservice.Model;
using InvestementSavingsMicroservice.Model.DTO;

namespace InvestementSavingsMicroservice.Service
{
    public interface ITransactionService
    {
        Task<Transaction> CreateTransactionAsync(string userId, string accountType, string type, decimal amount);
        Task<List<Transaction>> GetUserTransactionsAsync(string userId);
        Task<List<Transaction>> GetTransactionsByFiltersAsync(string userId, string accountType = null, string transactionType = null);
        Task<TransactionSummary> GetTransactionSummaryByAccountTypeAsync(string userId, string accountType);
    }
}
