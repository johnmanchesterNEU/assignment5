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
            console.log(vm.website.name);
            console.log(vm.website.description);
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

           /* var newWebsite = WebsiteService.createWebsite(vm.userId, vm.website);
            if(newWebsite) {
                $location.url("/user/"+vm.userId+"/website");
            } else {
                vm.error = "Unable to create website";
                vm.success = true;
            }*/
        }

        function close(){
            vm.success = false;
        }
    }
})();