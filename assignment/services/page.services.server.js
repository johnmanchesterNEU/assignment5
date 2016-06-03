module.exports = function (app) {

    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456", "title": "hello"},
        {"_id": "234", "name": "Post 2", "websiteId": "456", "title": "hey"},
        {"_id": "432", "name": "Post 2.1", "websiteId": "456", "title": "yo"},
        {"_id": "543", "name": "Post 3", "websiteId": "456", "title": "wassup"},
        {"_id": "678", "name": "Post 1", "websiteId": "789", "title": "ribbit"},
        {"_id": "91011", "name": "Post 2", "websiteId": "789", "title": "last"}
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);


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


    function updatePage(req, res) {
        var id = req.params.pageId;
        var updatePage = req.body;
        for(var i in pages) {
            if(pages[i]._id === id) {
                pages[i].name = updatePage.name;
                pages[i].title = updatePage.title;
                res.send(200);
                return;
            }
        }
        res.status(400).send("Page with ID: "+ id +" not found");
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for (var i in pages) {
            if (pages[i]._id === pageId) {
                pages.splice(i, 1);
                res.send(200);
            }
        }
        res.status(400).send("Unable to delete Page: "+ id);
    }

    function createPage(req, res) {
        var id = req.params.websiteId;
        var page = req.body;
        var newPage = {
            _id: (new Date()).getTime()+"",
            name: page.name,
            websiteId: id,
            title: page.title,
        };

        pages.push(newPage);
        res.json(newPage);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for(var i in pages) {
            if(pages[i]._id === pageId) {
                res.send(pages[i]);
                return;
            }
        }
        res.send({});
    }

};