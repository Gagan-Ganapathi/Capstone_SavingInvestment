namespace Savingsmicro.Model
{
    public class Transaction
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int AccountId { get; set; }
        public string Type { get; set; } // Deposit, Withdrawal, Investment
        public string AccountType { get; set; } // Added to match account's type

        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public Account? Account { get; set; }
    }
}
