(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    //FlickrService
    function FlickrImageSearchController(FlickrService) {
        var vm = this;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchText) {
            console.log(searchText);
            FlickrService
                .searchPhotos(searchText)
                .then(
                    function(response) {
                        data = response.data.replace("jsonFlickrApi(","");
                        data = data.substring(0,data.length - 1);
                        data = JSON.parse(data);
                        vm.photos = data.photos;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }

        function selectPhoto(photo) {
           // var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
           // url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
           // WidgetService
            //    .updateWidget(websiteId, pageId, widgetId, {url: url})
             //   .then();
        }



    }
})();