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
        vm.toggableEdit = toggableEdit;
        var edit = false;
        //vm.update = update;
        vm.renderHtml = renderHtml;
        vm.enableSortable = enableSortable;
        vm.disableSortable = disableSortable;

        function init() {
            //disableSortable();
            WidgetService
                .findAllWidgetsForPage(vm.pid)
                .then(function (response) {
                    vm.widgets = response.data;
                    disableSortable();
                    },
                    function (error) {
                        vm.error = error.data;
                        vm.success = true;
                    }
                )

        }

        init();

        function toggableEdit() {
            edit = !edit;
            //alert($('.sortable'));
            // $('.sortable').sortable('disable');
            if (edit) {
                // alert(edit);
                //alert($('.iframefix').attr('name'));
                $('.iframefix').css('display', 'block');
                $('.iframefix').css('z-index', '50');
                $( "#eye" ).removeClass("glyphicon-eye-close");
                $( "#eye" ).addClass("glyphicon-eye-open");
                enableSortable();
            } else {
                $('.iframefix').css('display', 'none');
                $('.iframefix').css('z-index', '0');
                $( "#eye" ).removeClass( "glyphicon-eye-open");
                $( "#eye" ).addClass( "glyphicon-eye-close");
                disableSortable();
            }
        }

        function disableSortable() {
            $('.container').sortable('disable');
        }

        function enableSortable() {
            $('.container').sortable('enable');
        }

        //scope.fun.start(start,end);
        $scope.ctrlFn = function (start, end) {
            WidgetService
                .reorderWidget(vm.pid, vm.widgets, start, end)
                .then(function (response) {
                    //  vm.widgets = response.data;
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