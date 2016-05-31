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

    function WebsiteService() {
        var api = {
            createWebsite: createWebsite,
            findWebsitesForUserId: findWebsitesForUserId,
            findWebsiteIndex: findWebsiteIndex,
            deleteWebsite: deleteWebsite,
            updateWebsite: updateWebsite,
            findWebsiteUserWebsiteId: findWebsiteUserWebsiteId
        };
        return api;

        function findWebsiteUserWebsiteId(userId, websiteId) {
            for (var i in websites) {
                if (websites[i]._id === websiteId && websites[i].developerId === userId) {
                    return websites[i];
                }
            }
            return null;
        }

        function findWebsiteIndex(websiteId) {
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    return i;
                }
            }
            return -1;
        }

        function updateWebsite(websiteId, website) {
            var index = findWebsiteIndex(websiteId);
            websites[index].name = website.name;
            websites[index].description = website.description;
            return (index != -1)? true : false;
        }

        function deleteWebsite(websiteId) {
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    websites.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        function createWebsite(developerId, website) {
            var newWebsite = {
                _id: (new Date()).getTime() + "",
                name: website.name,
                description: website.description,
                developerId: developerId
            };
            websites.push(newWebsite);
            return newWebsite;
        }

        function findWebsitesForUserId(userId) {
            var resultSet = [];
            for (var i in websites) {
                if (websites[i].developerId === userId) {
                    resultSet.push(websites[i]);
                }
            }
            return resultSet;
        }
    }
})();