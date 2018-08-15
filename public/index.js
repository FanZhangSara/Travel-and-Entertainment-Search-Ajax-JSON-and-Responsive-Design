var app = angular.module('myApp', []);
app.controller('formCtrl', function($scope,$http) {
    $scope.lat='43';

    $scope.lon='-108';
    $scope.keyword='usc';
    $scope.Category='default';
    $scope.distance='10';


    $http({
        method:"GET",
        url:"http://ip-api.com/json",
        params:{}
    }).then(function successCallback(response){

        $scope.lat=response.data.lat;
        $scope.lon=response.data.lon;
        console.log( $scope.lat);
    })


    // $scope.search=function(){
    //
    //     $http({
    //         method:"GET",
    //         url:"http://cs-server.usc.edu:22466/index.php",
    //         params:{keyword:$scope.keyword,type:$scope.Category,lat:$scope.lat,lng:$scope.lng,distance:$scope.distance},
    //     }).then(function successCallback(response){
    //
    //
    //         console.log( response);
    //     })
    //
    // }

    $scope.search=function(){

        // $http({
        //     method:"GET",
        //     url:"localhost:8081/search",
        //     params:{keyword:$scope.keyword,type:$scope.Category,lat:$scope.lat,lon:$scope.lon,distance:$scope.distance},
        // }).then(function successCallback(response){
        //
        //
        //     console.log( response);
        // })

        search = jQuery.ajax({
            type: 'GET',
            url: "searchinfo?lat=" +$scope.lat + "&lon=" + $scope.lon,
            async: false
        });
        if (search.responseText == "none") {
            search = "none";
        } else {
            search = search.responseText;
        }

    }


})