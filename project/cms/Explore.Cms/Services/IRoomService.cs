using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Explore.Cms.DAL;
using Explore.Cms.Models;
using MongoDB.Bson;

namespace Explore.Cms.Services;

public interface IRoomService : IMongoRepository<Room>
{
    Task AddRoom(Room room);
    Task<Room> GetRoom(ObjectId id);
    Task<IEnumerable<Room>> GetRooms(Expression<Func<Room, bool>> filterExpression);
    Task<Room> UpdateRoom(Room room);
    Task<Room> GetNextAvailableRoom();
    Task<Guest> AssignGuestToNewRoom(Guest guest);
    Task<Guest> AssignGuestToExistingRoom(Guest guest);
    Task<Guest> UpdateGuestRoom(Guest guest);
    Task RemoveGuestFromRoom(ObjectId roomId, ObjectId guestId);
    Task<Room> AddTransactionToRoom(Room room, GuestTransaction transaction);
    Task<Room> RemoveTransactionFromRoom(ObjectId roomId, ObjectId transactionId);
}