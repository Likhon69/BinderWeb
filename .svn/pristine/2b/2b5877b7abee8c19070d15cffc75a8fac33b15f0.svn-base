using BinderUtility;
using BinderWeb.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Services.BinderContractsWeb
{
    public interface ITallySearchServices
    {
        ICollection<TallySearchDto> GetTallySearch(SocDto soc);

        string PostQuantity(TallyPointDto tally);
        GridEntity<TallyPointDto> GetTallySummary(GridOptions options);
    }
}
