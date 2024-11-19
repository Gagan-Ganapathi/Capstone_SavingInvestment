
using AutoMapper;
using SavingsInvestmentMicroservice.Model;

namespace SavingsInvestmentMicroservice.Model.DTO
{
    public class Mappingprofile : Profile
    {
        public Mappingprofile()
        {
            // Mapping with ReverseMap
            CreateMap<Account, accountdto>().ReverseMap();
            CreateMap<Transaction, transactiondto>().ReverseMap();
        }
    }
}
