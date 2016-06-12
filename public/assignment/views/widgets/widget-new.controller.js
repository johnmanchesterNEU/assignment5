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
        vm.init = init;
        vm.index = null;

        function init(){
            WidgetService
                .countMe(vm.pid)
                .then(function(response){
                    vm.index = response.data;
                       // console.log(vm.index);
                    //console.log("HWWW " + vm.widget.index);
                        //$location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget");
                    },
                    function(error){
                        vm.error = error.data;
                    }
                )
        }
        init();

        function createWidget(){
            vm.widget.type = vm.type;
            vm.widget.index = vm.index;
            console.log(vm.widget.type);
            console.log(vm.widget);

            WidgetService
                .createWidget(vm.pid, vm.widget)
                .then(function(response){
                        //vm.widget = response.data;
                    console.log("response: " + response.data);
                        $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget");
                    },
                    function(error){
                        vm.error = error.data;
                    }
                )
        }

        function close() {
            vm.success = false;
        }

    }
})();
