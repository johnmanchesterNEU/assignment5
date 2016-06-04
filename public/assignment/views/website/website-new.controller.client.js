(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;
        vm.close = close;

        function createWebsite() {
            WebsiteService
                .createWebsite(vm.userId, vm.website)
                .then(function(response){
                    var website = response.data;
                    $location.url("/user/"+vm.userId+"/website")
                },
                    function(error){
                        vm.error = error.data;
                    }
                )
        }

        function close(){
            vm.success = false;
        }
    }
})();