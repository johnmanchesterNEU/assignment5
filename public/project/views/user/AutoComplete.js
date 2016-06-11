(function(){
    angular
        .module("Project")
        .controller("AutoComplete", AutoComplete);
    function AutoComplete($scope, $location, $anchorScroll, $http) {
        var self = this;
        // list of `state` value/display objects
        self.states        = loadAll();
        self.selectedItem  = null;
        self.searchText    = null;
        self.querySearch   = querySearch;
        self.countries = [];
        self.test = load;
        var file = 'data/countries.json';
        self.contains = contains;
        self.preload = preload;
        self.search = search;
        // ******************************
        // Internal methods
        // ******************************
        /**
         * Search for states... use $timeout to simulate
         * remote dataservice call.
         */

        function preload(file){
            $http.get(file)
                .then(function(res){
                    self.countries = res.data;
                });
        }
        preload(file);

        function search(query){
            var result = [];
            self.countries.forEach(function(item){
            if(contains(item.name, query)){
                //console.log(item.name);
                result.push({
                    value: item.code,
                    display: item.name
                });
            }
        });
            return result;
        }



        function load(query) {
            $http.get(file)
                .then(function(res){
                    //$scope.todos = res.data;
                    //alert($scope.todos[0].name);
                    var countries = [];
                    res.data.map(function(item) {
                        if(contains(item.name, query)){
                            countries.push(item.name);
                           // countries.push({
                               // value: item.code,
                               // display: item.name
                            //});
                            console.log(item.name);
                        }
                        //console.log(self.countries);
                       //if(item.name.toLowerCase().toString().prototype.contains(a)){
                       //  alert(i++);
                       //}
                        console.log(countries[0].display);
                        return(countries);
                    });

                });
        }
        //load();




        function contains(str1, str2){
            str1 = str1.toLowerCase();
            str2 = str2.toLowerCase();
            return (str1.indexOf(str2) != -1);
        }



        function querySearch (query) {
            //var results = query ? self.states.filter( createFilterFor(query) ) : self.states;
           // var deferred = $q.defer();
           // $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
            //return deferred.promise;
            //return load(query);
            return search(query);
        }
        /**
         * Build `states` list of key/value pairs
         */

        function loadAll() {
            var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
            return allStates.split(/, +/g).map( function (state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        }
        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            load(query);
           // var lowercaseQuery = angular.lowercase(query);
            //return function filterFn(state) {
             //   return (state.value.indexOf(lowercaseQuery) === 0);
            //};

        }
    }
})();