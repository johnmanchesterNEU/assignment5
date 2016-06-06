module.exports = function (app) {
    var multer = require('multer'),
        bodyParser = require('body-parser'),
        path = require('path');


    var upload = multer({dest: __dirname + '/../../public/uploads'});
    // app.set('views', path.join(__dirname, '/../../public/uploads'));
    // app.set('view engine', 'jade');

    var widgets = [
        {
            "_id": "012",
            "widgetType": "HEADER",
            "pageId": "432",
            "size": 2,
            "text": "GIZMODO"
        },
        {
            "_id": "123",
            "widgetType": "HEADER",
            "pageId": "321",
            "size": 2,
            "text": "GIZMODO"
        },
        {
            "_id": "234",
            "widgetType": "HEADER",
            "pageId": "321",
            "size": 4,
            "text": "Lorem ipsum"
        },
        {
            "_id": "345",
            "widgetType": "IMAGE",
            "pageId": "321",
            "width": "100%",
            "url": "https://sailoutwithme.files.wordpress.com/2014/09/cropped-sea-of-stars-vaadhoo-island3-copy.jpg"
        },
        {
            "_id": "456",
            "widgetType": "HTML",
            "pageId": "321",
            "text": '<p class="first-text">Investing in undersea internet cables has been a <a href="http://gizmodo.com/why-more-technology-giants-are-paying-to-lay-their-own-1703904291">big part of data strategy </a>plans for tech giants in recent years. Now Microsoft and Facebook are teaming up for the mother of all cables: A 4,100-mile monster that can move 160 Tbps, which will make it the highest-capacity cable on Earth. The cable even has a name, MAREA, and it will break ground (break waves?) later this year. Hopefully it can handle all your selfies.</p>'
        },

        {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://www.youtube.com/embed/V0lw3qylVfY?wmode=transparent&rel=0"
        },
        {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        {"_id": "8910", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://www.youtube.com/embed/1dmh1cZQuXk?wmode=transparent&rel=0"
        }
    ];

    app.post("/api/upload", upload.single('myFile'), uploadImage);


    // app.get("/api/user?username=username&password=password", findUserByCredentials);
    //app.put("/page/:pageId/damn",reorderWidgets);
    ///page/:pageId/widget?initial=:index1&final=:index2
    ///page/:pageId/widget?initial=index1&final=index2
    app.put("/page/:pageId/widget", reorderWidgets);
    //app.post("/page/:pageId/widget?initial=:index1&final=:index2",reorderWidgets);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.get("/api/widgets/", allWidgets);

    function allWidgets(req, res) {
        res.send(widgets);
    }

    function reorderWidgets(req, res) {
        var initialIndex = req.query.initial;
        var finalIndex = req.query.final;
        var pageId = req.params.pageId;
        // console.log(pageId);
        // var pageId = req.query.pageId;
        var newWidget = req.body;

        var start = null;
        var end = null;
        //var i = (initialIndex < finalIndex)? initialIndex : finalIndex;

        if (initialIndex != finalIndex) {
            var temp = newWidget[initialIndex];
            newWidget.splice(initialIndex, 1);
            newWidget.splice(finalIndex, 0, temp);
        }else{
            res.send(200)
            return;
        }
        //newWidget.splice(finalIndex, 0, newWidget[initialIndex]);
        //newWidget.insert(finalIndex, newWidget[initialIndex]);

//        if (initialIndex < finalIndex) {
        //          newWidget.splice(finalIndex, 0, temp);
        //  newWidget.splice(finalIndex, 0, );
        //newWidget.splice(initialIndex, 1);
        //     } else if(initialIndex > finalIndex){
        //newWidget.splice(initialIndex++, 1);
        //        newWidget.splice(finalIndex, 0, temp);
        //   }else{
        //      res.send(200)
        //     return;
        //}


        for (var i = widgets.length; i--;) {
            if (widgets[i].pageId === pageId) widgets.splice(i, 1);
        }

        //   widgets = new Array();
        //  for(var i in widgets){
        //     if(widgets[i].pageId === pageId){
        //       widgets.splice(i--, 1);
        // i--;
        //   }
        //}
        //remove(widgets,pageId);
        widgets.push.apply(widgets, newWidget);


        res.send(200)

    }


    function createWidget(req, res) {
        var widget = req.body;
        var pageId = req.params.pageId;
        widget._id = (new Date()).getTime() + "";
        widget.pageId = pageId;
        //var newWidget = {
        //   _id: (new Date()).getTime() + "",
        //  widgetType: "HTML",
        // pageId: "321",
        //text: "PPPPPPPPPPP"
        //};
        widgets.push(widget);
        res.json(widget);
        //return newWebsite;
    }

    //given: pageId
    //returns all widgets with a given pageId
    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var resultSet = [];
        for (var i in widgets) {
            if (widgets[i].pageId === pageId) {
                resultSet.push(widgets[i]);
            }
        }
        res.send(resultSet);
    }

    function findWidgetById(req, res) {
        var id = req.params.widgetId;
        for (var i in widgets) {
            if (widgets[i]._id === id) {
                res.send(widgets[i]);
                return;
            }
        }
        //return resultSet;
        res.send(404);
    }


    function updateWidget(req, res) {
        var id = req.params.widgetId;
        var widget = req.body;
        for (var i in widgets) {
            if (widgets[i]._id === id) {
                widgets[i] = widget;
                res.send(200);
                return;
            }
        }
        res.status(400).send("Unable to update widget ID: " + id);
    }

    function deleteWidget(req, res) {
        var id = req.params.widgetId;
        for (var i in widgets) {
            if (widgets[i]._id === id) {
                widgets.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(404).send("Unable to remove widget with ID: " + id);
    }


    function uploadImage(req, res) {
        console.log(req.body);
        console.log(req.file); //form files

        var update = false;

        var uid = req.body.uid;
        var wid = req.body.wid;
        var pid = req.body.pid;
        var widgetType = req.body.type;

        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                update = true;
                widgets[i].url = "/uploads/" + filename;
                //widgets[i].pageId = pid;
            }
        }

        if (!update) {
            var newWidget = {
                _id: filename,
                url: "/uploads/" + filename,
                pageId: pid,
                width: width,
                widgetType: widgetType
            }
            widgets.push(newWidget);
        }

        // res.send(202);
        //views/widgets/widget-edit.view.client.html
        // "#/user/{{model.uid}}/website/{{model.wid}}/page/{{model.pid}}/widget"
        //res.redirect("/assignment/#/user/:uid/website/:wid/page/:pid/widget/");
        res.redirect("/assignment/#/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/");
    }


};