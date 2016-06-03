(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", description: "blah"},
        {"_id": "234", "name": "Tweeter", "developerId": "456", description: "yeah"},
        {"_id": "456", "name": "Gizmodo", "developerId": "456", description: "dah"},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", description: "do"},
        {"_id": "678", "name": "Checkers", "developerId": "123", description: "re"},
        {"_id": "789", "name": "Chess", "developerId": "234", description: "me"}
    ];

    function WebsiteService($http) {
        var api = {
            createWebsite: createWebsite,
            findAllWebsitesForUser: findAllWebsitesForUser,
            findWebsiteById: findWebsiteById,
            deleteWebsite: deleteWebsite,
            updateWebsite: updateWebsite
        };
        return api;

        function createWebsite(developerId, website) {
            var newWebsite = {
                _id: (new Date()).getTime() + "",
                name: website.name,
                description: website.description,
                developerId: developerId
            };

            //POST ///api/user/:userId/website  //createWebsite

            console.log(newWebsite);
            var url = "/api/user/" + developerId + "/website";
            //return $http.post("/api/user", user);
            //app.post("/api/user/:userId/website", createWebsite);
            return $http.post(url, newWebsite);
            //websites.push(newWebsite);
            //return newWebsite;
        }


        function findAllWebsitesForUser(userId) {
            ///api/user/:userId/website
            var url = "/api/user/" + userId + "/website/";
            return $http.get(url);
        }


        function findWebsiteById(websiteId) {
            // /api/website/:websiteId
            var url = "/api/website/" + websiteId;
            return $http.get(url);
        }

        function updateWebsite(websiteId, website) {
            console.log(websiteId);
            console.log(website.name);
            console.log(website.description);
            var url = "/api/website/" + websiteId;
            return $http.put(url, website);
        }


        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url);
        }
    }
})();