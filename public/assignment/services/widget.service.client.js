(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p class="first-text">Investing in undersea internet cables has been a <a href="http://gizmodo.com/why-more-technology-giants-are-paying-to-lay-their-own-1703904291">big part of data strategy </a>plans for tech giants in recent years. Now Microsoft and Facebook are teaming up for the mother of all cables: A 4,100-mile monster that can move 160 Tbps, which will make it the highest-capacity cable on Earth. The cable even has a name, MAREA, and it will break ground (break waves?) later this year. Hopefully it can handle all your selfies.</p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://www.youtube.com/embed/jZhQOvvV45w" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    /*

     POST /api/page/:pageId/widget createWidget
     GET /api/page/:pageId/widget findAllWidgetsForPage
     GET /api/widget/:widgetId findWidgetById
     PUT /api/widget/:widgetId updateWidget
     DELETE /api/widget/:widgetId deleteWidget

     */


    function WidgetService() {
        var api = {
            findWidgetsByPageId:findWidgetsByPageId,
            findWidgetById:findWidgetById,
            createWidget:createWidget,
            updateWidget:updateWidget,
            deleteWidget:deleteWidget,
            findWidgetIndex:findWidgetIndex
        };
        return api;

        //update the widget by finding its index
        //update all attributes
        //returns true if widget is found and updated
        function updateWidget(widgetId, widget) {
            var index = findWidgetIndex(widgetId);
            widgets[index] = widget;
            return (index != -1)? true : false;
        }

        // returns true if index is found for widget id
        function findWidgetIndex(widgetId) {
            for (var i in widgets) {
                if (widgets[i]._id === widgetId){
                    return i;
                }
            }
            return -1;
        }

        //creates a new widget and returns the new length
        //item is added
        function createWidget(pageId, widget){
            widget.pageId = pageId;
            widget._id = (new Date()).getTime() + "";
            widgets.push(widget);
            return widget;

        }

        //deletes widget if widget is found
        // returns false if unsuccessful
        function deleteWidget(widgetId) {
            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        //given: widget id
        //returns widget if found
        function findWidgetById(widgetId){
            for (var i in widgets) {
                if (widgets[i]._id === widgetId){
                    return widgets[i];
                }
            }
            return null;
        }

        //given: pageId
        //returns all widgets with a given pageId
        function findWidgetsByPageId(pageId){
            var resultSet = [];
            for (var i in widgets) {
                if (widgets[i].pageId === pageId) {
                    resultSet.push(widgets[i]);
                }
            }
            return resultSet;
        }
    }
})();