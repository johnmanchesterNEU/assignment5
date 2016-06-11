(function () {
    angular
        .module("Project")
        .controller("RegisterController", RegisterController);
    function RegisterController($scope, $location, $anchorScroll, $window) {
        var vm = this;

        vm.register = register;
        vm.jumpTo = jumpTo;
        vm.next = next;
        vm.previous = previous;
        vm.changeState = vm.changeState;
        vm.smoothScroll = smoothScroll;
        vm.setScroll=setScroll;

        vm.index = 0;
        vm.forms = ['#myname', '#userName', '#gender', '#country'];



        function changeState(id, state){
            $(id).prop("disabled",state);
        }

        function setScroll(id, index) {
            vm.index = index;
            if(index === 0){
                changeState("#up", true);
                changeState("#down", false);
            }else if(index === 3){
                changeState("#down", true);
                changeState("#up", false);
            }else{
                changeState("#down", false);
                changeState("#up", false);
            }
            smoothScroll(id);
        }

        function  previous() {
            if(vm.index > 0){
                vm.index--;
                //console.log(vm.index);
                //console.log(vm.index);
               $("#down").prop("disabled",false);
                smoothScroll(vm.forms[vm.index]);
            }
            if(vm.index == 0){
                $("#up").prop("disabled", true);
            }
            return;
        }


        function next() {
            if(vm.index < vm.forms.length - 1){
                 vm.index++;
                //alert(vm.index);
                //console.log(vm.index);
                //smoothScroll(vm.forms[vm.index]);
                $("#up").prop("disabled", false);
               smoothScroll(vm.forms[vm.index]);
            }
            if(vm.index == vm.forms.length -1) {
                $("#down").prop("disabled",true);
            }
            return;
        }




        function jumpTo(id) {
            //alert(name);
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
            //reset to old to keep any additional routing logic from kicking in
            $location.hash(old);
        };


        function smoothScroll(id) {
            //console.log(id);
           //console.log(vm.index);
           //vm.index = 10;

            var offset =  $(id).offset().top;
           // p.offset();
          //  console.log(vm.index);
           // alert(vm.index);
          //  var old = $location.hash();
           // var target = $location.hash(id);
           // var url = target.$$url;
            //url = url.replace("/", "");
            //offset = $(url).offset().top;
          //  $('div').animate({
           //     scrollTop: offset
           // }, 1000);

            //$window.scrollTo(500, 500);
            $('html, body').animate({
                scrollTop: offset
            }, 1000);

          //  return $location.hash = old;
        };


        function register() {
        }
    }
})();

/*
 $(function() {
 $('a[href*="#"]:not([href="#"])').click(function() {
 if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
 var target = $(this.hash);
 target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
 if (target.length) {
 $('html, body').animate({
 scrollTop: target.offset().top
 }, 1000);
 return false;
 }
 }
 });
 });
 */



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