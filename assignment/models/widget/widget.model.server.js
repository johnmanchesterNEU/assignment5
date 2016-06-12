module.exports = function () {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        countMe: countMe,
        callback: callback

    }
    return api;


    function findWidgetById(widgetId) {
        return Widget.findById({_id: widgetId});
    }


    /* function bulkReorder(pageId, start, end, step) {
     return Widget.collection.bulkWrite(
     [{
     updateMany: {
     "filter": {"_page": pageId, $gt: start, $lte: end},
     "update": {$inc: {"index": step}}
     }
     },
     {
     updateOne: {
     "filter": {"_page": pageId, "index": start},
     "update": {$set: {"index": end}}
     }
     },
     {ordered : true}]
     );
     }*/


    function reorderWidget(pageId, start, end) {
        if (start < end) {
             bulkReorder(pageId, start, end, 1)
                .then(function(resolve, reject){
                    if(reolver){swapStart(pageId, start, end)}
                })
                .then(function(resolve, reject){
                    if(reolver){return findAllWidgetsForPage(pageId)}
                });
        }
        if (start > end) {
            bulkReorder(pageId, end, start, -1)
                .then(function(resolve, reject){
                    if(reolver){swapStart(pageId, start, end)}
                })
                .then(function(resolve, reject){
                    if(reolver){return findAllWidgetsForPage(pageId)}
                });}else{
            return findAllWidgetsForPage(pageId)
        }
    }

    function bulkReorder(pageId, start, end) {
        Widget.update({"_page": pageId, "index": {$gt: start, $lte: end}}, {$inc: {"index": 1}}, {multi: true});
    }

    function swapStart(pageId, start, end) {
        Widget.update({"_page": pageId, "index": start}, {$set: {index: end}});
    }

    /*    function reorderWidget(pageId, start, end) {
     if (start < end) {
     return bulkReorder(pageId, start, end, 1);
     }
     if (start > end) {
     return bulkReorder(pageId, end, start, -1);
     }else{
     return findAllWidgetsForPage(pageId);
     }*/
    /*  if (start != end) {
     var temp = widget[initialIndex];
     widget.splice(initialIndex, 1);
     widget.splice(finalIndex, 0, temp);
     }*/


    //var bulk = Widget.initializeUnorderedBulkOp();
    // return findAllWidgetsForPage(pageId);}

    /* if(start < end){
     try {
     Widget.collection.bulkWrite(
     [{
     updateMany: {
     "filter": {"_page": pageId, $gt: start, $lte: end},
     "update": {"_page": pageId, $inc: {"index": 1}}
     }
     },
     {
     updateOne: {
     "filter": {"index": start},
     "update": {$set: {"index": end}}
     }
     }]
     )}
     catch (e) {
     console.log(e);
     }finally{
     return findAllWidgetsForPage(pageId);
     }}
     else if(start > end){
     try {
     Widget.collection.bulkWrite(
     [{
     updateMany: {
     "filter": {"_page": pageId, $gt: end, $lte: start},
     "update": {$inc: {"index": -1}}
     }
     },
     {
     updateOne: {
     "filter": {"_page": pageId, "index": start},
     "update": {$set: {"index": end}}
     }
     }]
     )}catch (e) {
     console.log(e);
     }finally {
     return findAllWidgetsForPage(pageId);
     }}
     else{
     return findAllWidgetsForPage(pageId);}
     */
    /*
     /*   if (start != end) {
     var temp = newWidget[initialIndex];
     newWidget.splice(initialIndex, 1);
     newWidget.splice(finalIndex, 0, temp);
     }

     console.log(start);
     //function reorderWidget(pageId, start, end) {
     if (start < end) {
     Widget.update({"_page": pageId, "index": {$gt: start, $lte: end}}, {$inc: {"index":  1}},{multi:true},
     function(err, sucess){
     if(success){
     Widget.update({"_page": pageId, "index":start}, {$set: {index: end}},function(err, success){if(success){return findAllWidgetsForPage(pageId)}});
     }});

     }
     else if (start > end) {
     Widget.update({"_page": pageId, "index": {$gt: start, $lte: end}}, {$inc: {"index":  -1}},{multi:true},
     function(err, sucess){
     if(success){
     Widget.update({"_page": pageId, "index":start}, {$set: {index: end}},
     function(err, success){if(success){return findAllWidgetsForPage(pageId)}});
     }});

     }*/
    // }

    function callback(pageId, start, end) {
        Widget.update({"_page": pageId, "index": start}, {$set: {index: end}}, function (err, success) {
            if (success) {
                return findAllWidgetsForPage(pageId)
            }
        });
    }


    function findAllWidgetsForPage(pageId) {
        return Widget.find({"_page": pageId}).sort({"index": 1});
        //return Widget.find();
    }


    function createWidget(pageId, widget) {
        widget._page = pageId;
        return Widget.create(widget);
    }


    function countMe(pageId) {
        return Widget.find({"_page": pageId}).count();
    }


    function updateWidget(widgetId, widget) {
        return Widget
            .update({_id: widgetId}, {
                $set: widget
            });
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }


}
