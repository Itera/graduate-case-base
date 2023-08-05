using System.Threading.Tasks;
using Explore.Cms.Configuration;
using Explore.Cms.DAL;
using Explore.Cms.Models;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Bson;

namespace Explore.Cms.Services;

public class GuestService : MongoRepository<Guest>, IGuestService
{
    private ILogger<GuestService> _logger;

    public GuestService(IOptions<MongoDbOptions> options, ILogger<GuestService> logger) : base(options)
    {
        _logger = logger;
    }

    public async Task<Guest> UpdateGuest(Guest guest)
    {
        if (guest.Id == ObjectId.Empty) return guest;

        return await UpdateOneAsync(guest);
    }
}