using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ServiceStack.Data;
using ServiceStack.OrmLite;

namespace BookService
{
    public class DataRepository
    {
        public IDbConnectionFactory DbConnectionFactory { get; set; }

        public int AddBook(Book request)
        {
            using (var db = DbConnectionFactory.OpenDbConnection())
            {
                db.CreateTable<Book>();
                if (request.Id == 0)
                {
                    return (int)db.Insert(request, selectIdentity: true);
                }
                else
                {
                    db.Update(request);
                    return request.Id;
                }
            }
        }

        internal List<Book> GetAllBooks()
        {
            using (var db = DbConnectionFactory.OpenDbConnection())
            {
                return db.Select<Book>();
            }
        }

        internal Book GetBookByTitle(string title)
        {
            using (var db = DbConnectionFactory.OpenDbConnection())
            {
                return db.Select<Book>(e => e.Title == title).FirstOrDefault();
            }
        }

        internal Book GetBookById(int id)
        {
            using (var db = DbConnectionFactory.OpenDbConnection())
            {
                return db.Select<Book>(e => e.Id == id).FirstOrDefault();
            }
        }

        public void DeleteBook(Book request)
        {
            using (var db = DbConnectionFactory.OpenDbConnection())
            {
                db.Delete(request);
            }
        }

        public void DeleteBook(int id)
        {
            DeleteBook(new Book { Id = id });
        }

    }
}