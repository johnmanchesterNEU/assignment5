(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "title": "hello"},
        { "_id": "234", "name": "Post 2", "websiteId": "456", "title": "hey"},
        { "_id": "432", "name": "Post 2", "websiteId": "456", "title": "yo" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "title": "wassup"},
        { "_id": "678", "name": "Post 1", "websiteId": "789", "title": "ribbit" },
        { "_id": "91011", "name": "Post 2", "websiteId": "789", "title": "last" }
    ];

    function PageService($http) {
        var api = {
            createPage: createPage,
            findPages: findPages,
            findPage: findPage,
            deletePage: deletePage,
            updatePage: updatePage,
            findAllPagesForWebsite:findAllPagesForWebsite
        };
        return api;

        function findAllPagesForWebsite(websiteId){
            //var url = "/api/user/" + userId + "/website/";
            //return $http.get(url);
            ///api/website/:websiteId/page
            //console.log(websiteId);
            var url = "/api/website/"+websiteId+"/page";
            return $http.get(url);
        }

        function updatePage(pageId, page){
            for(var i in pages) {
                if(pages[i]._id === pageId) {
                    pages[i].name = page.name;
                    pages[i].title = page.title;
                    return true;
                }
            }
            return false;
        }

        function deletePage(pageId) {
            for(var i in pages) {
                if(pages[i]._id === pageId) {
                    pages.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        function createPage(websiteId, page) {
           // var newPage = {
           //     _id: (new Date()).getTime()+"",
           //     name: page.name,
            //    websiteId: websiteId,
             //   title: page.title,
            //};
            page.websiteId = websiteId;
            console.log("sss " + websiteId);
            console.log(page);
            var url = "/api/website/"+websiteId+"/page";
            return $http.post(url, page);
           // pages.push(newPage);
           // return newPage;
        }

        function findPage(pageId) {
            var resultSet = [];
            for(var i in pages) {
                if(pages[i]._id === pageId) {
                    return pages[i];
                }
            }
            return null;
        }
        function findPages(websiteId) {
            var resultSet = [];
            for(var i in pages) {
                if(pages[i].websiteId === websiteId) {
                    resultSet.push(pages[i]);
                }
            }
            return resultSet;
        }
    }
})();