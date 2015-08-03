using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Web;

namespace BookService 
{
    public class BookService : IService
    {
        public DataRepository Repo { get; set; }

        public object Post(BookInformation request)
        {
            var book = new Book()
            {
                Id = request.Id,
                Author =  request.Author,
                Title = request.Title,
                Price = request.Price
            };

            int id = Repo.AddBook(book);
            return new {Id = id};
        }
    }
}