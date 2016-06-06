(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            createWidget: createWidget,
            findAllWidgetsForPage: findAllWidgetsForPage,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            reorderWidget: reorderWidget
        };
        return api;

        //reorders widget on server
        function reorderWidget(pageId, widget, initial, final) {
            var url = "/page/" + pageId + "/widget?initial=" + initial + "&final=" + final;
            return $http.put(url, widget);
        }

        function createWidget(pageId, widget) {
            alert(widget.url);
            //console.log(widget);
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, widget);
        }

        function findAllWidgetsForPage(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId) {
            // console.log(widgetId);
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
        }


        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget);
        }


        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);
        }

    }
})();