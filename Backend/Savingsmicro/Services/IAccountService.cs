using Savingsmicro.Model;
using Savingsmicro.Model.DTO;

namespace Savingsmicro.Services
{
    public interface IAccountService
    {
        Task<Account> CreateAccountAsync(string userId, string accountType);
        Task<Account> GetAccountAsync(string userId);
        Task<Account> GetAccountByUserIdAndTypeAsync(string userId, string accountType);
        Task<List<Account>> GetUserAccountsAsync(string userId);
        Task<List<Account>> GetUseraccountsByAccountTypeAsync(string userId, string Accounttype);
        Task<AccountsSummary> GetUserTransactionSummaryAsync(string userId);
        Task<Account> UpdateAccountBalanceAsync(string userId, decimal amount);

        // Task<decimal> GetBalanceAsync(int accountId);
    }
}
