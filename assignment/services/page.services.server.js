module.exports = function (app) {

    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456", "title": "hello"},
        {"_id": "234", "name": "Post 2", "websiteId": "456", "title": "hey"},
        {"_id": "432", "name": "Post 2", "websiteId": "456", "title": "yo"},
        {"_id": "543", "name": "Post 3", "websiteId": "456", "title": "wassup"},
        {"_id": "678", "name": "Post 1", "websiteId": "789", "title": "ribbit"},
        {"_id": "91011", "name": "Post 2", "websiteId": "789", "title": "last"}
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    //app.get("/api/page/:pageId", findPageById);
    //app.put("/api/page/:pageId", updatePage);
    //app.delete("/api/page/:pageId", deletePage);


    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var resultSet = [];
        for (var i in pages) {
            if (pages[i].websiteId === websiteId) {
                resultSet.push(pages[i]);
            }
        }
        res.send(resultSet);
    }


    function updatePage(pageId, page) {
        for (var i in pages) {
            if (pages[i]._id === pageId) {
                pages[i].name = page.name;
                pages[i].title = page.title;
                return true;
            }
        }
        return false;
    }

    function deletePage(pageId) {
        for (var i in pages) {
            if (pages[i]._id === pageId) {
                pages.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    function createPage(req, res) {
        console.log("server " + req.body);
        var page = req.body;
        var newPage = {
            _id: (new Date()).getTime()+"",
            name: page.name,
            websiteId: page.websiteId,
            title: page.title,
        };

        pages.push(newPage);
        res.json(newPage);
    }

    function findPageById(pageId) {
        var resultSet = [];
        for (var i in pages) {
            if (pages[i]._id === pageId) {
                return pages[i];
            }
        }
        return null;
    }

    function findPages(websiteId) {
        var resultSet = [];
        for (var i in pages) {
            if (pages[i].websiteId === websiteId) {
                resultSet.push(pages[i]);
            }
        }
        return resultSet;
    }
};