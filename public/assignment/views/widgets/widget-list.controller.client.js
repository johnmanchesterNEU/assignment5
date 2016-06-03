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
           // alert(vm.uid);
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
            $(".container")
                .sortable;
          //  alert(vm.widgets);
        }
        init();

        //Get embedded html to work
        function renderHtml(html_code) {
            return $sce.trustAsHtml(html_code);
        }
    }
})();