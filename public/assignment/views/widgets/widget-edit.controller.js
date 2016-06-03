(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.init = init;
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;
        vm.close = close;

        function init() {
            WidgetService
                .findWidgetById(wid)
                .then(function(response) {
                    vm.widget = response.data;
                    if(widget._id){

                    }else {
                        vm.error = "Wiget not found";
                    }
                });
        /*    WidgetService
                .findWidgetById()
                .then(function(response){
                    vm.widget = response.data;
                    if(widget._id){

                    }else {

                    }
            }*/

        }

        init();

        function close() {
            vm.success = false;
        }

        function deleteWidget() {
            var result = WidgetService.deleteWidget(vm.wgid);
            if (result) {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
            }
            else {
                vm.error = "Unable to delete " + vm.widget.widgetType + " Widget";
                vm.success = true;
            }
        }

        function updateWidget(widget) {
            var result = WidgetService.updateWidget(vm.wgid, widget);
            if (result) {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
            } else {
                vm.error = "Unable to update " + vm.widget.widgetType + " Widget";
                vm.success = true;
            }
        }

        function createWidget(widget) {
            widget._id = (new Date()).getTime() + "";
            var success = WidgetService.createWidget(vm.pid, vm.wgid);
            if(success){
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
            }else{
                vm.error = "Unable to update " + vm.widget.widgetType + " Widget";
                vm.success = true;
            }
        }
    }
})();
