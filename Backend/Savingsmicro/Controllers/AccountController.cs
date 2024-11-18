using AutoMapper;
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
        private readonly IMapper _mapper;



        public AccountController(IAccountService accountService, ITransactionService transactionService, ILogger<AccountController> logger, IMapper mapper)
        {
            _accountService = accountService;
            _transactionService = transactionService;
            _logger = logger;
            _mapper = mapper;


        }


        [HttpPost]
        public async Task<ActionResult<accountdto>> CreateAccount(string userId, string accountType)
        {
            //var existingAccount = _accountService.GetAccountByUserIdAndTypeAsync(userId, accountType);
            //if (existingAccount != null)
            //{
            //    return Conflict(new { message = "The account already exists." });
            //}
            //var account = await _accountService.CreateAccountAsync(userId, accountType);
            //var accountDto = _mapper.Map<accountdto>(account);
            //return Ok(accountDto);


            var existingAccount = await _accountService.GetAccountByUserIdAndTypeAsync(userId, accountType);
            if (existingAccount != null)
            {
                return Conflict(new { message = "The account already exists." });
            }
            var account = await _accountService.CreateAccountAsync(userId, accountType);
            var accountDto = _mapper.Map<accountdto>(account);
            return Ok(accountDto); // return clean DTO response
        }

      

        [HttpGet("user/{userId}")]
        [ProducesResponseType(typeof(List<accountdto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<accountdto>>> GetUserAccounts(string userId) { 
        //{
        //    try
        //    {
        //        var accounts = await _accountService.GetUserAccountsAsync(userId);
        //        var accountDtos = _mapper.Map<List<accountdto>>(accounts);
        //        return Ok(accountDtos);
        //    }
        //    catch (NotFoundException ex)
        //    {
        //        _logger.LogWarning(ex, "User accounts not found for userId: {UserId}", userId);
        //        return NotFound(new ErrorResponse
        //        {
        //            StatusCode = StatusCodes.Status404NotFound,
        //            Message = ex.Message
        //        });
        //    }

             try
    {
        var accounts = await _accountService.GetUserAccountsAsync(userId);
        if (accounts == null || !accounts.Any())
        {
            return NotFound(new ErrorResponse
            {
                StatusCode = StatusCodes.Status404NotFound,
                Message = "No accounts found for this user."
            });
        }
var accountDtos = _mapper.Map<List<accountdto>>(accounts);
return Ok(accountDtos); // return clean DTO list
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
        public async Task<ActionResult<transactiondto>> CreateTransaction(
            string userId,
            string accountType,
            string type,
            decimal amount)
        {
            try
            {
                var transaction = await _transactionService.CreateTransactionAsync(
                    userId, accountType, type, amount);
                var transactionDto = _mapper.Map<transactiondto>(transaction);
                return Ok(transactionDto);
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
        public async Task<ActionResult<List<transactiondto>>> GetTransactions(
            string userId,
            [FromQuery] string accountType = null,
            [FromQuery] string transactionType = null)
        {
            var transactions = await _transactionService.GetTransactionsByFiltersAsync(
                userId, accountType, transactionType);
            var transactionDtos = _mapper.Map<List<transactiondto>>(transactions);
            return Ok(transactionDtos);
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
        public async Task<ActionResult<List<accountdto>>> GetUseraccountsByAccountType(string userId, string Accounttype)
        {
            var transactions = await _accountService.GetUseraccountsByAccountTypeAsync(userId, Accounttype);
            var accountDtos = _mapper.Map<List<accountdto>>(transactions);
            return Ok(accountDtos);
        }
    }
}

