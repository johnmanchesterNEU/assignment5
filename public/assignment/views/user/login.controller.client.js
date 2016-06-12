(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {

        var vm = this;

        vm.login = login;
        vm.close = close;
        vm.submitted = false;

        function close(){
            vm.error=false;
        }

       function login(isValid) {
           vm.submitted = true;
           console.log("dd " + vm.user.username);
           console.log("ee " +vm.user.password);
           if(isValid){
            UserService
                .findUserByCredentials(vm.user.username, vm.user.password)
                .then(function(response){
                    var user = response.data;
                    if(user) {
                        $location.url("/profile/" + user._id);
                    } else {
                        vm.error = "User not found";
                    }
                });
        }}
        
    }
})();