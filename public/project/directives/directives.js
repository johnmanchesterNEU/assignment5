/*(function(){
    angular
        .module("dropdown", [])
        .directive("dropdown", function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            $(elem).click(function() {
                var target = $(elem).next(".panel-collapse");
                target.hasClass("collapse") ? target.collapse("show") : target.collapse("hide");
            });
        }
    }
});*/