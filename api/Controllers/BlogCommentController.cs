using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.DAL;
using api.Entity;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogCommentController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public BlogCommentController(ApiDbContext context)
        {
            _context = context;
        }

        // GET: api/BlogComment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogComment>>> GetBlogComments()
        {
            return await _context.BlogComments.ToListAsync();
        }

        // GET: api/BlogComment/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BlogComment>> GetBlogComment(int id)
        {
            var blogComment = await _context.BlogComments.FindAsync(id);

            if (blogComment == null)
            {
                return NotFound();
            }

            return blogComment;
        }

        // PUT: api/BlogComment/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBlogComment(int id, BlogComment blogComment)
        {
            if (id != blogComment.BlogCommentId)
            {
                return BadRequest();
            }

            _context.Entry(blogComment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlogCommentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BlogComment
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BlogComment>> PostBlogComment(BlogComment blogComment)
        {
            _context.BlogComments.Add(blogComment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBlogComment", new { id = blogComment.BlogCommentId }, blogComment);
        }

        // DELETE: api/BlogComment/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogComment(int id)
        {
            var blogComment = await _context.BlogComments.FindAsync(id);
            if (blogComment == null)
            {
                return NotFound();
            }

            _context.BlogComments.Remove(blogComment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BlogCommentExists(int id)
        {
            return _context.BlogComments.Any(e => e.BlogCommentId == id);
        }
    }
}
