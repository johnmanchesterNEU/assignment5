(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {

        var vm = this;

        vm.login = login;
        vm.close = close;


        function close(){
            vm.error=false;
        }

        function login(username, password){
            UserService
                .findUserByCredentials(username,password)
                .then(function(response){
                    var user = response.data;
                    console.log(user);
                    if(user._id){
                        $location.url("/profile/" + user._id);
                    }else {
                        vm.error = "User not found";
                    }
            });
        }
        
    }
})();