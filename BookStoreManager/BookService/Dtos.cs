using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ServiceStack;

namespace BookService
{
    [Route("/book")]
    public class BookInformation
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public decimal Price { get; set; }
    }

    [Route("/book/title/{Title}")]
    public class BookByTitle
    {
        public string Title { get; set; }
    }

    [Route("/book/{Id}")]
    public class BookById
    {
        public int Id { get; set; }
    }

    [Route("/book", "GET")]
    public class AllBooks
    {
    }
}