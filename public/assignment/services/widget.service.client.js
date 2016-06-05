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

        function reorderWidget(pageId, widget, initial, final) {
           // /page/:pageId/widget?initial=:index1&final=:index2
            //var url = "/page/:" + pageId + "/widget?initial=:" + index1 + "&final=:" + index2;
            //
            var url = "/page/" + pageId + "/widget?initial=" + initial + "&final=" + final;
            //app.put("/page/:pageId/widget?initial=:initial&final=:final",reorderWidgets);
            //var url = "/page/"+pageId;   //+"/widget?initial="+initial+"&final="+final;
            //var url = "/p/widget/" + 123;
            //var url = "/page/"+pageId+"/widget";
            return $http.put(url, widget);

            //return $http.put("/page/:pageId/widget?initial=:index1&final=:index2",                                       // 1. url
            //    widget,                                                // 2. request body
             //   { params: { pageId: pageId, initial : initial,final: final} });
        }

        function createWidget(pageId, widget) {
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