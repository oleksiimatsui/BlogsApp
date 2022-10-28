using BlogsApp.Models;
using Microsoft.AspNetCore.Mvc;
using Elastic.Clients.Elasticsearch;
using Microsoft.EntityFrameworkCore;

namespace BlogsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : Controller
    {
        private readonly BlogsAppContext _context;
        private readonly ElasticsearchClient _client;


        public SearchController(BlogsAppContext context, ElasticsearchClient client)
        {
            _context = context;
            _client = client;
        }

        [HttpGet("{query}")]
        public async Task<ActionResult<IEnumerable<Publication>>> Index(string query)
        {
            var client = _client;
            foreach (var p in _context.Publications)
            {
                await client.IndexAsync(p, request => request.Index("my-tweet-index"));
            }
            if(query == " " || query == null)
            {
                return await _context.Publications.ToListAsync();
            }

            var searchresponse = await client.SearchAsync<Publication>(s => s
                 .Index("my-tweet-index")
                 .Query(q => q.Match(m => m
                        .Field(f => f.Text)
                        .Query(query)
                    ))
            );

            var result = new List<Publication>();
            foreach (var res in searchresponse.Documents)
            {
                result.Add(res);
            }            
            return result;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Publication>>> Index()
        {
            return await _context.Publications.ToListAsync();
        }
    }

}
