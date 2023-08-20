using System;
using Explore.Spa.Services;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;


[assembly: FunctionsStartup(typeof(Explore.Spa.Startup))]

namespace Explore.Spa;
public class Startup : FunctionsStartup
{
    public override void Configure(IFunctionsHostBuilder builder)
    {
        var config = builder.GetContext().Configuration;

        builder.Services.AddHttpClient<ICmsService, CmsService>(client => client.BaseAddress = new Uri(config["CmsOptions:BaseUrl"]));
    }
}