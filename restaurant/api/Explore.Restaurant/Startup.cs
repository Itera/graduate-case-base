using System;
using Explore.Restaurant.Services;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;


[assembly: FunctionsStartup(typeof(Explore.Restaurant.Startup))]

namespace Explore.Restaurant;
public class Startup : FunctionsStartup
{
    public override void Configure(IFunctionsHostBuilder builder)
    {
        var config = builder.GetContext().Configuration;

        builder.Services.AddHttpClient<ICmsService, CmsService>(client => client.BaseAddress = new Uri(config["CmsOptions:BaseUrl"]));
    }
}