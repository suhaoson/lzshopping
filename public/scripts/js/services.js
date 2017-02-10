angular.module('serviceModule',[])
.service('LoadCategory',['$rootScope','$http',
	function($rootScope,$http){
		this.getCategory = function(id){
			$http({
				method:"GET",
				url:"/getCategoryOne/"+id
			})
				.then(function(data){
					$rootScope.categoryOneData = data.data
				}).catch(function(err){
					console.log(err)
				})
		};
		this.getCategoryAll = function(){
			// $categoryData ={}
			$http({
				method:"GET",
				url:'/getCategoryAll'
			})
				.then(function(data){
					$rootScope.categoryData = data.data
					var sectionName = "main"
					$http({
						method:"GET",
						url:"/getWebsiteConfig/"+sectionName
					})
						.then(function(data){
							// console.log(data.data)
							var result = data.data
							// console.log($rootScope.categoryData)
							for(var i =0; i< 2;i++)
								$rootScope.categoryData[i].hotImg = result[0].hot[i].imgurl
							 // console.log($rootScope.categoryData)
						})
				}).catch(function(err){
					console.log(err)
				})
		}
		this.getWebsiteCon = function(){
			var sectionName = "main"
			$http({
				method:"GET",
				url:"/getWebsiteConfig/"+sectionName
			})
				.then(function(data){
					console.log(data.data)
					var result = data.data
					console.log($rootScope.categoryData)
					// $rootScope.categoryData.hots = result[0].hot
					console.log($scope.hots)
				}).catch(function(err){

				})
		}
}])
.service('LocalStorageServices',['$rootScope','localStorageService',function($rootScope,localStorageService) {
    this.setLocalStorage = function(key,value){
	    return localStorageService.set(key,value);
    }
    this.getLocalStorage = function(key){
   		return localStorageService.get(key);
    }
    this.clearItem = function(key){
    	return localStorageService.remove(key);
    }
    this.clearAll = function(){
    	return localStorageService.clearAll();
    } 
    this.keysLocalStorage = function(){
    	return localStorageService.keys();
    }  
 }])
.service('getCommodityService',['$rootScope','$http',
	function($rootScope,$http){
		this.getCommodity = function(){}
		this.getCommodityAll = function(){
			$http({
				method:"GET",
				url:"/getCommodityAll"
			})
				.then(function(data){
					console.log(data.data)
					$rootScope.commoditys = data.data
				}).catch(function(err){
					console.log(err)
				})
		}
		this.getCommodityByComment = function(){}
}])