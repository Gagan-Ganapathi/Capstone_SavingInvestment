namespace SavingsInvestmentMicroservice.Model.DTO
{
    public class AccountsSummary
    {
        public decimal TotalBalance { get; internal set; }
        public decimal TotalSavings { get; internal set; }
        public int AccountCount { get; internal set; }
        public decimal TotalInvestments { get; internal set; }
    }
}
