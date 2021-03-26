using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entity
{
    public class BlogComment
    {
        public int BlogCommentId { get; set; }
        public string Message { get; set; }
        public int? UserId { get; set; }
    }
}
