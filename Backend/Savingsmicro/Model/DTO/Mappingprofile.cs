
using AutoMapper;

namespace Savingsmicro.Model.DTO
{
    public class Mappingprofile: Profile
    {
        public Mappingprofile()
        {
            // Mapping with ReverseMap
            CreateMap<Account, accountdto>().ReverseMap();
            CreateMap<Transaction, transactiondto>().ReverseMap();
        }
    }
}
