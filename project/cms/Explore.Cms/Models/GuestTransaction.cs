using Explore.Cms.DAL;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Explore.Cms.Models;

[BsonCollection("transactions")]
public class GuestTransaction : Document
{
    [BsonElement("amount")] public decimal Amount { get; set; }
    [BsonElement("description")] public string Description { get; set; } = string.Empty;
    [BsonElement("paid")] public bool Paid { get; set; }
    [BsonElement("roomId")] public ObjectId RoomId { get; init; } = ObjectId.Empty;
    [BsonElement("transactionDate")] public DateTime TransactionDate { get; set; } = DateTime.Now;
}