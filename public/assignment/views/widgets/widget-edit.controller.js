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
        //vm.init = init;
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;
        vm.close = close;

        function init() {
            WidgetService
                .findWidgetById(vm.wgid)
                .then(function(response){
                    vm.widget  = response.data;
                });
        }

        init();

        function close() {
            vm.success = false;
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.wgid)
                .then(
                    function(response) {
                        $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget");
                    },
                    function(error) {
                        vm.error = error.data;
                        vm.success = true;
                    }
                )
        }

        function updateWidget() {
            WidgetService
                .updateWidget(vm.wgid, vm.widget)
                .then(
                    function(response) {
                        $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget");
                    },
                    function(error) {
                        vm.error = error.data;
                        vm.success = true;
                    }
                )
            
        }
        
    }
})();
