module.exports = function () {

    var mongoose = require("mongoose");

    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget : createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
    }


    function  createWidget(pageId, widget) {
        widget._page = pageId;
        return Widget.create(widget);
    }


    function findAllWidgetsForPage(pageId){
        return Widget.find({"_page":pageId});
    }


    function  updateWidget(widgetId, widget) {
        return Widget
            .update({_id:widgetId},{
                $set: widget
            });

        function  deleteWidget(widgetId) {
            return Widget.remove({_id:widgetId});
        }


    }



}/**
 * Created by John on 6/7/2016.
 */
