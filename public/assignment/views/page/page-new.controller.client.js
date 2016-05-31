(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($location, $routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.createPage = createPage;
        vm.close = close;

        function createPage() {
            var newPage = PageService.createPage(vm.wid, vm.page);
            if(newPage) {
                $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
            } else {
                vm.error = "Unable to create page";
                vm.success = true;
            }
        }

        function close(){
            vm.success = false;
        }
    }
})();