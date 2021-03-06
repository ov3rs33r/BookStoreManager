﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ServiceStack.DataAnnotations;

namespace BookService
{
    public class Book
    {
        [AutoIncrement]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public decimal Price { get; set; }
    }
}