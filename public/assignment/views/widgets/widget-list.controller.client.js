(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);


    function WidgetListController($sce, $location, $routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.init = init;
        vm.renderHtml = renderHtml;

        function init() {
            WidgetService
                .findAllWidgetsForPage(vm.pid)
                .then(function (response) {
                    vm.widgets = response.data;
                });

            //vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
          //  $(".container")
               // .sortable;
        }

        init();

        //Get embedded html to work
        function renderHtml(html_code) {
            return $sce.trustAsHtml(html_code);
        }
    }
})();