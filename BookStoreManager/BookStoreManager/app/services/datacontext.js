(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId, ['common', '$http', datacontext]);

    function datacontext(common, $http) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(serviceId);
        var logError = getLogFn(serviceId, 'error');

        var $q = common.$q;
        var baseUrl = "http://localhost:5962/";

        var service = {
            getFeaturedBooks: getFeaturedBooks,
            getMessageCount: getMessageCount,
            saveNewBook: saveNewBook,
            getAllBooks: getAllBooks,
            getBook: getBook,
            deleteBook: deleteBook
        };

        return service;

        function saveNewBook(book) {
            return $http.post(baseUrl + "Book", book)
                .then(
                function (result) {
                    book.id = result.data.id;
                    log("success, saved!" + JSON.stringify(book));
                },
                function(data, status) {
                    logError("New book not saved!");
                }
                )
        }

        function getBook(book) {
            log(baseUrl + "book/title/" + book.title + "?format=json");
            return $http.get(baseUrl + "book/title/" + book.title + "?format=json")
                .then(
                    function(result) {
                        book.id = result.data.Id;
                        book.title = result.data.Title;
                        book.author = result.data.Author;
                        book.price = result.data.Price;
                        log("Success. Retrieved " + JSON.stringify(book));
                    },
                    function(data, status) {
                        logError("Retrieve book failed.");
                    }
                )
        }

        function getAllBooks() {
            return $http.get(baseUrl + "Book")
                .then(
                    function(result) {
                        log("Successfully retrieved all books");
                        //log(result.data);
                        return result.data;
                    },
                    function(data, status) {
                        logError("Unable to retrieve all books");
                    }
                )
        }

        function deleteBook(book) {
            log(baseUrl + "book/" + book.id);
            return $http.delete(baseUrl + "book/" + book.id)
                .then(
                    function(result) {
                        log("Delete, success! " + JSON.stringify(book));
                    },
                    function(data, status) {
                        logError("Unable to delete book.");
                    }
                )
        }

        function getMessageCount() { return $q.when(72); }

        function getFeaturedBooks() {
            var featuredBooks = [
                { title: 'War and Peace', author: 'Tolstoy  ', price: 25, description: 'Florida' },
                { title: 'The Hours', author: 'Cunningham', price: 31, description: 'California' },
                { title: 'The Trial', author: 'Kafka', price: 21, description: 'New York' },
                { title: 'Necromancer', author: 'Gibson', price: 18, description: 'North Dakota' },
                { title: 'Snow Crash', author: 'Stephenson', price: 18, description: 'South Dakota' },
                { title: 'Goedel, Escher, Bach', author: 'Hofstadter', price: 11, description: 'South Carolina' },
                { title: "Darwin's Dangerous Idea", author: 'Dennett', price: 35, description: 'Wyoming' }
            ];
            return $q.when(featuredBooks);
        }
    }
})();