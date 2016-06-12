(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {

        var vm = this;

        vm.register = register;
        vm.submitForm = submitForm;
        vm.submitted = false;
        vm.close =  close;


        function close(){
            vm.success = false;
        }



        function submitForm(isValid) {
            vm.submitted = true;
            if (isValid && (vm.user.password === vm.user.verify)) {
                register();
            }

        };


        function register () {
            console.log(vm.user);
            UserService
                .createUser(vm.user)
                .then(
                    function(response){
                       var result = response.data;
                      //  console.log("RES " + result);
                        if(result._id){
                        $location.url("/profile/"+result._id);
                    }},
                    function (error) {
                        console.log(error.data)
                        vm.error = error.data;
                        vm.success = true;
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