(function () {
    angular
        .module("Project")
        .config(Config);

    function Config($sceDelegateProvider, $routeProvider, $locationProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://www.youtube.com/**'
        ]);

        $routeProvider
            .when("/", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                title: "Register",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                title: "Register",
                controllerAs: "model"
            })
            .when("/country", {
                templateUrl: "views/user/country.html",
                controller: "AutoComplete",
                title: "Country",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                title: "Login",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "views/user/register.view.client.html"
            });
       // $locationProvider.html5Mode(true);
       // $locationProvider.hashPrefix('!');
    }
})();