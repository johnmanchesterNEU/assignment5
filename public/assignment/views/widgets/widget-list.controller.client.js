(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);


    function WidgetListController($sce, $location, $routeParams, WidgetService, $scope) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.init = init;
        //vm.update = update;
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



        //scope.fun.start(start,end);
        $scope.ctrlFn = function(start, end) {
            WidgetService
                .reorderWidget(vm.pid,vm.widgets,start,end)
                .then(function (response) {
                  //  vm.widgets = response.data;
                    console.log("DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMMMMMMMNNNNNNNNNNNNNNNNNNNNNNNNN");
                    console.log(response.data);
                });

           // alert(start);
            //alert(end);
        }
      //  scope.$on('startfunction', function (start, end) {
       //     console.log('function run');
        //});
        //$scope.$watch('jgaSortableCallback', function(end) {
         //   alert(end);
        //});

        //Get embedded html to work
        function renderHtml(html_code) {
            return $sce.trustAsHtml(html_code);
        }
    }
})();