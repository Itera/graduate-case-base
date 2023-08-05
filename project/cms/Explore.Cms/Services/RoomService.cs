using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Explore.Cms.Configuration;
using Explore.Cms.DAL;
using Explore.Cms.Models;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Bson;

namespace Explore.Cms.Services;

public class RoomService : MongoRepository<Room>, IRoomService
{
    private readonly ILogger<RoomService> _logger;

    public RoomService(IOptions<MongoDbOptions> options, ILogger<RoomService> logger) : base(options)
    {
        _logger = logger;
    }

    public async Task AddRoom(Room room)
    {
        await AddOneAsync(room);
    }

    public async Task<Room> GetRoom(ObjectId id)
    {
        return await FindOneByIdAsync(id);
    }

    public async Task<IEnumerable<Room>> GetRooms(Expression<Func<Room, bool>> filterExpression)
    {
        return await FindAsync(filterExpression);
    }

    public async Task<Room> UpdateRoom(Room room)
    {
        if (room.Id == ObjectId.Empty) return room;

        var existingRoom = await FindOneByIdAsync(room.Id);
        if (existingRoom.Id == ObjectId.Empty) return room;

        return await UpdateOneAsync(room);
    }

    public async Task<Room> GetNextAvailableRoom()
    {
        var rooms = (await FindAsync(r => true)).ToList();

        if (rooms.Any(r => r.GuestIds.Count == 0)) return rooms.First(r => r.GuestIds.Count == 0);

        var room = new Room
        {
            RoomNumber = !rooms.Any() ? 1 : rooms.Select(r => r.RoomNumber).Max() + 1,
            Id = ObjectId.GenerateNewId()
        };

        await AddRoom(room);
        return room;
    }

    public async Task<Guest> AssignGuestToNewRoom(Guest guest)
    {
        var room = await GetNextAvailableRoom();

        guest.RoomId = room.Id;
        room.GuestIds.Add(guest.Id);

        await UpdateOneAsync(room);
        return guest;
    }

    public async Task<Guest> AssignGuestToExistingRoom(Guest guest)
    {
        var room = await FindOneByIdAsync(guest.RoomId);

        if (room.Id == ObjectId.Empty) return guest;

        room.GuestIds.Add(guest.Id);
        await UpdateOneAsync(room);

        return guest;
    }

    public async Task<Guest> UpdateGuestRoom(Guest guest)
    {
        var currentRoom =
            (await FindAsync(r => r.GuestIds.Contains(guest.Id))).FirstOrDefault(new Room());

        if ((currentRoom.Id == ObjectId.Empty && guest.RoomId == ObjectId.Empty) || currentRoom.Id == guest.RoomId)
            return guest;

        var newRoom = await FindOneByIdAsync(guest.RoomId);

        if (newRoom.Id == ObjectId.Empty && currentRoom.Id != ObjectId.Empty && guest.RoomId != ObjectId.Empty)
        {
            guest.RoomId = currentRoom.Id;
            return guest;
        }

        if (currentRoom.Id != ObjectId.Empty)
        {
            currentRoom.GuestIds.Remove(guest.Id);
            await UpdateOneAsync(currentRoom);
        }

        if (guest.RoomId == ObjectId.Empty) return guest;

        newRoom.GuestIds.Add(guest.Id);
        await UpdateOneAsync(newRoom);

        return guest;
    }

    public async Task RemoveGuestFromRoom(ObjectId roomId, ObjectId guestId)
    {
        var room = await FindOneByIdAsync(roomId);
        await RemoveGuestFromRoom(room, guestId);
    }

    public async Task<Room> AddTransactionToRoom(Room room, GuestTransaction transaction)
    {
        room.TransactionIds.Add(transaction.Id);
        return await UpdateOneAsync(room);
    }

    public async Task<Room> RemoveTransactionFromRoom(ObjectId roomId, ObjectId transactionId)
    {
        var room = await FindOneByIdAsync(roomId);
        room.TransactionIds.Remove(transactionId);
        return await UpdateOneAsync(room);
    }

    private async Task RemoveGuestFromRoom(Room room, ObjectId guestId)
    {
        if (room.Id == ObjectId.Empty) return;

        room.GuestIds.Remove(guestId);
        await UpdateOneAsync(room);
    }
}