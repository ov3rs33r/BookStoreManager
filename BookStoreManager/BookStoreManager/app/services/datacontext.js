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
            saveNewBook : saveNewBook
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