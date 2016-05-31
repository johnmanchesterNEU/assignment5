(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.profile = profile;
        vm.newWebsite = newWebsite;

        vm.web = WebsiteService.websites;

        function init() {
            vm.websites = WebsiteService.findWebsitesForUserId(vm.userId);
        }
        init();

        function profile(){
            $location.url("/profile/"+vm.userId);
        }

        function newWebsite() {
            $location.url("/profile/"+vm.userId);
        }

        function  page(pageId) {
            $location.url("/page/"+pageId);
        }
    }
})();