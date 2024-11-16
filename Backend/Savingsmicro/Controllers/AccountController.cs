using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OpenQA.Selenium;
using SavingsInvestmentService.Services;
using Savingsmicro.Model;
using Savingsmicro.Model.DTO;
using Savingsmicro.Services;

namespace Savingsmicro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly ITransactionService _transactionService;
        private readonly ILogger<AccountController> _logger;


        public AccountController(IAccountService accountService, ITransactionService transactionService, ILogger<AccountController> logger)
        {
            _accountService = accountService;
            _transactionService = transactionService;
            _logger = logger;

        }

      
        [HttpPost]
        public async Task<ActionResult<Account>> CreateAccount(string userId, string accountType)
        {
            var existingAccount = _accountService.GetAccountByUserIdAndTypeAsync(userId, accountType);
            if (existingAccount != null)
            {
                return Conflict(new { message = "The account already exists." });
            }
            var account = await _accountService.CreateAccountAsync(userId, accountType);
            return Ok(account);
        }

      

        [HttpGet("user/{userId}")]
        [ProducesResponseType(typeof(List<Account>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<Account>>> GetUserAccounts(string userId)
        {
            try
            {
                var accounts = await _accountService.GetUserAccountsAsync(userId);
                return Ok(accounts);
            }
            catch (NotFoundException ex)
            {
                _logger.LogWarning(ex, "User accounts not found for userId: {UserId}", userId);
                return NotFound(new ErrorResponse
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    Message = ex.Message
                });
            }
        }


        public class ErrorResponse
        {
            public int StatusCode { get; set; }
            public string Message { get; set; }
        }

        [HttpPost("transaction")]
        public async Task<ActionResult<Transaction>> CreateTransaction(
            string userId,
            string accountType,
            string type,
            decimal amount)
        {
            try
            {
                var transaction = await _transactionService.CreateTransactionAsync(
                    userId, accountType, type, amount);
                return Ok(transaction);
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("transactions")]
        public async Task<ActionResult<List<Transaction>>> GetTransactions(
            string userId,
            [FromQuery] string accountType = null,
            [FromQuery] string transactionType = null)
        {
            var transactions = await _transactionService.GetTransactionsByFiltersAsync(
                userId, accountType, transactionType);
            return Ok(transactions);
        }

        [HttpGet("transactions/summary/{userId}/{accountType}")]
        public async Task<ActionResult<TransactionSummary>> GetTransactionSummary(
            string userId,
            string accountType)
        {
            try
            {
                var summary = await _transactionService.GetTransactionSummaryByAccountTypeAsync(
                    userId, accountType);
                return Ok(summary);
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

      


        [HttpGet("accounts/{userId}/summary")]
        public async Task<ActionResult<AccountsSummary>> GetUserAccountSummary(string userId)
        {
            var summary = await _accountService.GetUserTransactionSummaryAsync(userId);
            return Ok(summary);
        }

        [HttpGet("accounts/{userId}/{Accounttype}")]
        public async Task<ActionResult<List<Account>>> GetUseraccountsByAccountType(string userId, string Accounttype)
        {
            var transactions = await _accountService.GetUseraccountsByAccountTypeAsync(userId, Accounttype);
            return Ok(transactions);
        }
    }
}

