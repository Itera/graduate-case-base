using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;
using Explore.Cms.Configuration;
using Explore.Cms.Models;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Explore.Cms.DAL;

public class MongoRepository<TDocument> : IMongoRepository<TDocument> where TDocument : IDocument, new()
{
    private readonly IMongoCollection<TDocument> _collection;

    protected MongoRepository(IOptions<MongoDbOptions> options)
    {
        var database = new MongoClient(options.Value.ConnectionString).GetDatabase(options.Value.DatabaseName);
        _collection = database.GetCollection<TDocument>(GetCollectionName(typeof(TDocument)));
    }

    private static string GetCollectionName(ICustomAttributeProvider documentType)
    {
        return ((BsonCollectionAttribute)documentType.GetCustomAttributes(
                typeof(BsonCollectionAttribute),
                true)
            .First()).CollectionName;
    }

    public void AddOne(TDocument doc)
    {
        _collection.InsertOne(doc);
    }

    public async Task AddOneAsync(TDocument doc)
    {
        await _collection.InsertOneAsync(doc, new InsertOneOptions());
    }

    public void DeleteOne(Expression<Func<TDocument, bool>> filterExpression)
    {
        _collection.FindOneAndDelete(filterExpression);
    }

    public async Task DeleteOneAsync(Expression<Func<TDocument, bool>> filterExpression)
    {
        await _collection.FindOneAndDeleteAsync(filterExpression);
    }

    public TDocument FindOneById(ObjectId id)
    {
        var res = _collection.Find(e => e.Id.Equals(id));

        return res.Any() ? res.First() : new TDocument();
    }

    public async Task<TDocument> FindOneByIdAsync(ObjectId id)
    {
        var res = (await _collection.FindAsync(e => e.Id.Equals(id))).ToList();

        return res.Any() ? res.First() : new TDocument();
    }

    public IEnumerable<TDocument> Find(Expression<Func<TDocument, bool>> filterExpression)
    {
        return _collection.Find(filterExpression).ToEnumerable();
    }

    public async Task<IEnumerable<TDocument>> FindAsync(Expression<Func<TDocument, bool>> filterExpression)
    {
        return (await _collection.FindAsync(filterExpression)).ToEnumerable();
    }

    public TDocument UpdateOne(TDocument document)
    {
        return _collection.FindOneAndUpdate(r => r.Id.Equals(document.Id),
            new ObjectUpdateDefinition<TDocument>(document));
    }

    public async Task<TDocument> UpdateOneAsync(TDocument document)
    {
        return await _collection.FindOneAndUpdateAsync<TDocument>(r => r.Id == document.Id,
            new ObjectUpdateDefinition<TDocument>(document),
            new FindOneAndUpdateOptions<TDocument, TDocument>
                { IsUpsert = false, ReturnDocument = ReturnDocument.After });
    }

    public void DeleteById(ObjectId id)
    {
        _collection.FindOneAndDelete(d => d.Id.Equals(id));
    }

    public Task DeleteByIdAsync(ObjectId id)
    {
        return _collection.FindOneAndDeleteAsync(d => d.Id.Equals(id));
    }
}