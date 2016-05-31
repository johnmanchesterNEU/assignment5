(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.type = $routeParams.type;
        vm.createWidget = createWidget;
        vm.close = close;

        function createWidget(){
            vm.widget.widgetType = vm.type;
            var result = WidgetService.createWidget(vm.pid, vm.widget);
            if (result) {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
            } else {
                vm.error = "Unable to update " + vm.widget.widgetType + " Widget";
                vm.success = true;
            }
        }

        function close() {
            vm.success = false;
        }

    }
})();
