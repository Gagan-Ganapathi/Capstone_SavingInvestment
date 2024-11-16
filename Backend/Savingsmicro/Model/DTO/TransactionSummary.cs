namespace Savingsmicro.Model.DTO
{
    public class TransactionSummary
    {
        public decimal TotalDeposits { get; set; }
        public decimal TotalWithdrawals { get; set; }
        public decimal TotalInvestments { get; set; }
        public int TransactionCount { get; set; }
        public decimal TotalStocks { get; internal set; }
        public decimal TotalMFs { get; internal set; }
        public decimal TotalCash { get; internal set; }
        public decimal TotalProperty { get; internal set; }
        public string AccountType { get; internal set; }
        public decimal TotalGold { get; internal set; }
        public decimal TotalEF { get; internal set; }
        public decimal TotalCrypto { get; internal set; }
    }
}
