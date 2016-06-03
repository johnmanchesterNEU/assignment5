(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {

        var vm = this;

        vm.register = register;
        vm.submitForm = submitForm;


        function submitForm(isValid) {
            if (isValid) {
                register();
            }

        };


        function register () {
            UserService
                .createUser(vm.user)
                .then(
                    function(response){
                        var user = response.data;
                        $location.url("/profile/"+user._id);
                    },
                    function(error){
                        vm.error = error.data;
                    }
                );
        }
    }
})();
/*(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;
        vm.submitForm = submitForm;
        vm.close = close;
        //vm.user.dateOfBirth = new Date();

        function close() {
            vm.success = false;
        }


        function submitForm(isValid) {
            if (isValid) {
                createUser();
            }

        };


        function createUser() {
            if(UserService.findUserByUsername(vm.user.username)) {
                vm.success = true;
                vm.error = "Could Not Create User";
            }else{
                var user =  UserService.createUser(vm.user);
                $location.url("/user/" + user._id + "/website/");
            }
        }
    }


})();*/