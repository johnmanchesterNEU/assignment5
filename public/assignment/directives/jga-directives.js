(function(){
    angular
        .module("jgaSortable", [])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable() {
        function link(scope, element, attrs) {
            var start = null;
            var current = null;
            var end   = null;
            var first = null;
            var startIndex = -1;
            var toUpdate = null;

           // $('#Div').draggable({ iframeFix: true });
            $(element)
                .sortable({
                    opacity: 0.75,
                    axis: "y",
                    start: function(event, ui) {

                        //var start = ui.item.index();
                        start = $(ui.item).index();
                        console.log(start);
                        //scope.startIndex = ui.item.index();
                    },
                    stop: function(event, ui) {
                       // console.log(start);
                        var end = $(ui.item).index();//ui.item.index();
                        //var temp = scope.users[start];
                        //scope.users[start] = scope.users[end];
                       // scope.users[end] = temp;
                        //scope.jgaSortableCallback = end;

                        //var temp = scope.users[start];
                        //alert(start);
                        //alert(end);
                        console.log(start);
                        console.log(end);
                        //console.log(temp);
                        scope.someCtrlFn({start: start, end: end});
                        //scope.someCtrlFn({arg1: 22});
                        //scope.fun.start();
                        //scope.callthis({start: start, end: end});
                        //alert(scope.model.widgets);
                       // $scope.startFunction(start,end);
                        //scope.stopIndex = ui.item.index();
                       // scope.$apply(function() {
                        //    scope.$eval(attrs.confirmAction);
                        //})
                        //scope.fun.start(start,end);
                      //  $scope.theMethodToBeCalled = function(id) {
                      //      alert(id);
                      //  };
                    }
                });

           // $scope.startFunction = function(start, end){
            //    $scope.$broadcast('startfunction');
            //};
        }
        return {
            scope: {
                someCtrlFn: '&callbackFn'
            },
            link: link
        };
    }
})();