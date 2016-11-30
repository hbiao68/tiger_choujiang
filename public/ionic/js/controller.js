/**
 * 控制器
 */
app.controller('MyController', function($scope, $stateParams, $http,$state,$ionicPopup) {
    $scope.hasmore=true;
    $scope.run = false;//模拟线程锁机制  防止多次请求 含义：是否正在请求。请注意，此处并非加入到了就绪队列，而是直接跳过不执行
    var paramConfig = {
	        page:0
	    };
    var url = "News/listInterface.html";
    var result = initList($scope,$http,paramConfig,1,url);
    $scope.loadMore = function(){
    	paramConfig.page = paramConfig.page + 1;
        var old = $scope.project;
        if(old!=undefined){
          var result = initList($scope,$http,paramConfig,3,url);
        }   
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };
    $scope.goGoodDetail = function(tar){
    	$state.go("tabs.detail",{id:tar});
    }
});
app.controller('detailController',function($scope,$http,$stateParams){
	var url = INTERFACE_BASE_URL + "Index/getFilter.html";
	//var url = INTERFACE_BASE_URL + "News/newsDetailInterface.html";
	/*var paramConfig = {
	        id:$stateParams.id
	    };*/
	var paramConfig = {
			etype:2
	    };
	$http({
		method:"POST",
		url:url,
		data:paramConfig,
	}).success(function(response){
		//$scope.data = response.data;
		$scope.query={};
		$scope.query.area = response.data.area;
		$scope.query.acreage = response.data.acreage;
		$scope.query.apartment = response.data.apartment;
		$scope.query.chushou_total_price = response.data.chushou_total_price;
		$scope.query.decoration = response.data.decoration;
		$scope.query.subway = response.data.subway;
		$scope.query.homes_type = response.data.homes_type;
		$scope.query.homes_age = response.data.homes_age;
		console.log($scope.query.apartment);
	});
	
});
/*
 * list基础方法
 * 
 * state:1初始化，2刷新，3加载更多
 * 
 */
function initList($scope,$http,obj_data,state,url){
	if(!$scope.run){
		$scope.run = true;
		var url = INTERFACE_BASE_URL + url;
		$http({
			method:"POST",
			url:url,
			data:obj_data,
		}).success(function(response){
			$scope.run = false;
			if(state == 3){
				if(response.status == 1){
					$scope.project = $scope.project.concat(response.data);
				}else if(response.status == 0){
					$scope.hasmore=false;
				}
			}else{
				$scope.project = response.data;
			}
		});
	}
}