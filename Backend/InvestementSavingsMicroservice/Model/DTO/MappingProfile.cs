using AutoMapper;

namespace InvestementSavingsMicroservice.Model.DTO
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            // Mapping with ReverseMap
            CreateMap<Account, accountdto>().ReverseMap();
            CreateMap<Transaction, transactiondto>().ReverseMap();
        }
    }
}
