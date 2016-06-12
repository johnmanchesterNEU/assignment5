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
        countMe: countMe

    }
    return api;


    function findWidgetById(widgetId) {
        return Widget.findById({_id: widgetId});
    }

    function reorderWidget(pageId, start, end) {
        if (start < end) {
         Widget.update({"_page": pageId, "index": {$gt: start, $lte: end}}, {$inc: {"index":  1}},{multi:true});
         }
         else if (start > end) {
         Widget.update({"_page": pageId, "index": {$gte: start, $lt: end}},{$inc: {"index":  -1}},{multi:true});
         }


        Widget
            .update({"_page": pageId, "index":start},
                {
                    $set: {
                        index: end
                    }
                });

        return findAllWidgetsForPage(pageId);

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
