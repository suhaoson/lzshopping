/**
 * angular controllers
 */
angular.module('ui.bootstrap')
.controller('CollapseCtrl', ['$scope','$rootScope',function ($scope,$rootScope) {

  $scope.isNavCollapsed = false;
  // $rootScope.$on('cartCount',function(ev,data){
  // 	$scope.cartTotal = data
  // })
  // $rootScope.$broadcast('cartTotal',$scope.cartTotal)
//$scope.isCollapsed = false;
}])
.controller('AlertWarningCtrl', function ($scope,$rootScope) {
  $rootScope.alerts = [];
   $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

})
.controller('CarouselCtrl', function ($scope) {
  $scope.myInterval = 2000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;
  $scope.actual = 'slideUp'
  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: 'images/website/carousel/' + newWidth + '/300.jpg',
      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
      id: currIndex++
    });
  };
  
 	for (var i = 0; i < 4; i++) {
    	$scope.addSlide();
  	}
  // $scope.randomize = function() {
  //   var indexes = generateIndexesArray();
  //   assignNewIndexesToSlides(indexes);
  // };

 

  // // Randomize logic below

  // function assignNewIndexesToSlides(indexes) {
  //   for (var i = 0, l = slides.length; i < l; i++) {
  //     slides[i].id = indexes.pop();
  //   }
  // }

  // function generateIndexesArray() {
  //   var indexes = [];
  //   for (var i = 0; i < currIndex; ++i) {
  //     indexes[i] = i;
  //   }
  //   return shuffle(indexes);
  // }

  // // http://stackoverflow.com/questions/962802#962890
  // function shuffle(array) {
  //   var tmp, current, top = array.length;

  //   if (top) {
  //     while (--top) {
  //       current = Math.floor(Math.random() * (top + 1));
  //       tmp = array[current];
  //       array[current] = array[top];
  //       array[top] = tmp;
  //     }
  //   }

  //   return array;
  // }
})
.directive('navAsideCon',['$http',function($http){
	return {
		restirt:'A',
		replace:'false',
		link:function(scope,ele,attrs){
			

			$(function(){
				$('ul.nav-aside-category li').hover(function(){
					$(this).children('ul.nav-aside-classify').css('display','inline-block')
				},function(){
					$(this).children('ul.nav-aside-classify').css('display','none')
				})
			})
			
		}
	}
}]);
angular.module('Banner',['ui.bootstrap'])
.controller('bannerCtrl',function(){})
angular.module('Login',[])
.controller('SignInCtrl',['$scope','$http','$location','$rootScope','$timeout','ipCookie',
	function($scope,$http,$location,$rootScope,$timeout,ipCookie){
	$rootScope.isCollapsed = true;
	$scope.signIn = function(){
		var datas = {};
		datas.username = form.username.value;
		datas.password = form.password.value;
		datas.validNum = form.validNum.value;
		$http(
			{
				method:"GET",
				url:'/log/'+datas.username+'/'+datas.password+'/'+datas.validNum
			})
			.then(function(data){
				var response = data.data.result
				if(response == 1 ){
					//登陆成功
   					$rootScope.alerts.push({msg: '恭喜您,登陆成功!正在跳转首页...'});
  					ipCookie('usernameLogined',datas.username)
  					console.log(ipCookie('usernameLogined'))
  					$timeout(function(){
  						$location.path('/index')
  					},1000)
  					return
				}else if(response == -1 || response == 0){
					//密码或用户名错误
   					$rootScope.alerts.push({msg: '用户名或密码错误'});
				}else{
					//服务器错误
   					$rootScope.alerts.push({msg: '系统错误,请稍后再试'});
				}
			}).catch(function(err){
				//网络错误
   				$rootScope.alerts.push({msg: '网络错误,请刷新后重试'});
				console.log(err)
			})
	}
}])
angular.module('Register',['ui.bootstrap'])
.controller('SignUpCtrl',['$scope','$http','$location','$timeout','$rootScope',
	function($scope,$http,$location,$timeout,$rootScope
	){
		
	$rootScope.isCollapsed = true;
//	$scope.$broadcast('isCollapsed',{isCollapsed:true});
	$scope.signUp = function(){
		console.log(form.agreement.checked)
		var datas = {};
		datas.username = form.username.value;
		datas.password = form.password.value;
		datas.name = form.name.value;
		datas.address = form.address.value;
		datas.telephone = form.telephone.value;
		datas.zCode = form.zCode.value;
		datas.birthday = form.birthday.value;
		datas.validNum = form.validNum.value;
		$http({
			method:"POST",
			url:'/reg',
			data:$.param($scope.regFormData),
			headers:{'Content-Type':'application/x-www-form-urlencoded'}
		})
			.then(function(data){
				var response = data.data
				if(response.result == 1){
					//注册成功
					$rootScope.alerts.push({msg: '恭喜您,注册成功,请登录...'});
					$timeout(function(){
						$location.path('/login')
					},1500)
					
				}else if(response.result == -1){
					//用户名已存在
					$rootScope.alerts.push({msg: '用户名已存在'});
				}else{
					//服务器错误
					$rootScope.alerts.push({msg: '系统错误,请稍后再试'});
				}
			}).catch(function(err){
				//网络错误
				$rootScope.alerts.push({msg: '网络错误,请刷新后重试'});
			})
	}
	
}])
.directive('isDisabled',function(){
	return {
		restirt:"A",
		link:function(scope,ele,attrs){
				ele.on('click',function(){
					if(scope.form.$valid){
						if(form.agreement.checked)
							ele.parent().next().children().attr('disabled',false)
						else{
							ele.parent().next().children().attr('disabled',true)
						}
					}
				})
				
			}
			
		
	}
})
.directive('validExists',['$q','$http',function($q,$http){
	return {
		restrict:'A',
		require:['ngModel'],
		link:function(scope,ele,attrs,ctrls){
			var ctrl = ctrls[0]
			                                                                                          
			ctrl.$asyncValidators.validExists = function(modleValue,viewValue){
				return $q(function(reslove,reject){
					$http.get('/notExists/'+viewValue).then(function(data){
						console.log(data.data)
						if(data.data.result == 1){
							reslove()
						}else{
							reject()
						}
					}).catch(function(error){
						reject()
					}).finally(function(){
						console.log('验证完成')
					})
				})
			}
		}
	}
}])
angular.module('Header',['serviceModule'])
.controller('headerCtrl',['$scope','ipCookie','LoadCategory','LocalStorageServices','$location','$rootScope',
	function($scope,ipCookie,LoadCategory,LocalStorageServices,$location,$rootScope){
		
		if(ipCookie('usernameLogined')){
			$scope.Issession = true;
			$scope.usernameLogined = ipCookie('usernameLogined')
		}else{
			$scope.Issession = false;
		}
		$scope.signout = function(){
			console.log('signout')
			ipCookie.remove('usernameLogined');
			$location.path('/login')
		}
		LoadCategory.getCategoryAll()
//		更新header购物车视图
		var cartCountLS = LocalStorageServices.getLocalStorage('cartInfo') || ""
		$rootScope.cartTotal = cartCountLS.length 
		if($rootScope.cartTotal )
			{
				
				$scope.cartTotal = $rootScope.cartTotal
			}
//		
//		console.log($rootScope.search)
}])
angular.module('User',['ui.bootstrap'])
.controller('UserCtrl',['$scope','$http','ipCookie','$location','$rootScope',function($scope,$http,ipCookie,$location,$rootScope){
	$rootScope.isCollapsed = true;
	var usernameLogined = ipCookie('usernameLogined')
	if(!usernameLogined)
		$location.path('/login')
	else{
		$scope.usernameLogined = usernameLogined 
	}
}])
.controller('UserInfoCtrl',['$scope','$http','ipCookie','$rootScope',function($scope,$http,ipCookie,$rootScope){
	$rootScope.isCollapsed = true;
	var usernameLogined = ipCookie('usernameLogined')
	console.log(usernameLogined)
	if(!usernameLogined)
		$location.path('/login')
	else{
		$http({
			method:'GET',
			url:'/getUserInfo/'+usernameLogined
		})
			.then(function(data){
				data.data.birthday = new Date(data.data.birthday)
				$scope.userInfoData = data.data
			}).catch(function(err){
				console.log(err)
			})
	$scope.alterUserInfo = function(){
		$http({
			method:"POST",
			url:'/alterUserInfo',
			data:$.param($scope.userInfoData),
			headers:{'Content-Type':'application/x-www-form-urlencoded'}
		})
			.then(function(data){
				var result = data.data.result
				if(result == -1){
					$rootScope.alerts.push({msg: '对不起,权限受限!'});
				}
				else if(result == 1){
					$rootScope.alerts.push({msg: '恭喜您,信息修改成功'});
				}
			}).catch(function(err){
				console.log(err)
			})
	}
	} 
}])
angular.module('Repertory',[])
.controller('commodity',['$scope','$http','$location','$stateParams','LoadCategory','$rootScope','getCommodityService','$rootScope',
	function($scope,$http,$location,$stateParams,LoadCategory,$rootScope,getCommodityService,$rootScope){
	$rootScope.isCollapsed = true;
	$scope.categoryid = $stateParams.cid
	$scope.classid = $stateParams.classid
	LoadCategory.getCategory($scope.categoryid)
	$scope.cartCount = 1
//	搜索无参数直接显示所有
	if(!$scope.classid&&!$scope.categoryid){
		getCommodityService.getCommodityAll()
	}
//	显示分类下所有
	else if(!$scope.classid){
		$scope.isClassify = true;
		$http({
			method:"GET",
			url:"/getCommodityBycid/"+$scope.categoryid
		})
			.then(function(data){
				$scope.commoditys = data.data
				$scope.resultCount = $scope.commoditys.length
				$scope.commoditys.imgThumUrl = "images/products/210/210" + $scope.commoditys.commodityid+".jpg"
			}).catch(function(err){
				console.log(err)
			})
//		显示同类别所有
		}else{
			$scope.isClassify = false;
			$http({
				method:"GET",
				url:"/getCommodityByclassid/"+$scope.classid
			})
				.then(function(data){
					$scope.commoditys = data.data.commodity
					$scope.classify = data.data.classify
					$scope.resultCount = $scope.commoditys.length
					$scope.commoditys.imgThumUrl = "images/products/210/210" + $scope.commoditys.commodityid+".jpg"
				}).catch(function(err){
					console.log(err)
				})
		}
		
//		点击加减数量 /废除
//		$scope.cartPlus = function(){
//		if($scope.cartCount <$scope.commoditys[0].inventory)
//			$scope.cartCount ++
//
//		}
//		$scope.cartMinu = function(){
//			if($scope.cartCount > 1)
//				$scope.cartCount --
//
//		}
		//筛选选项实现
		$rootScope.selected = []; 
		$scope.selectedTags = []; 

		var updateSelected = function(action,id,name){ 
		if(action == 'add' && $scope.selected.indexOf(id) == -1){ 
		  $scope.selected.push(id); 
		  $scope.selectedTags.push(name); 
		  console.log($scope.selected)
		  console.log($scope.selectedTags)
		} 
		if(action == 'remove' && $scope.selected.indexOf(id)!=-1){ 
		  var idx = $scope.selected.indexOf(id); 
		  $scope.selected.splice(idx,1); 
		  $scope.selectedTags.splice(idx,1); 
		} 
		} 

		$scope.updateSelection = function($event, id){ 
		var checkbox = $event.target; 
		var action = (checkbox.checked?'add':'remove'); 
		updateSelected(action,id,checkbox.name); 
		} 

		$scope.isSelected = function(id){ 
		return $scope.selected.indexOf(id)>=0; 
		} 
		
		//筛选结束
		
		
		
	
}])
.directive('addCart',['LocalStorageServices','$rootScope',function(LocalStorageServices,$rootScope){
	return {
		restirt:'A',
		replace:false,
		link:function(scope,ele,attrs){
			// LocalStorageServices.clearItem('cartInfo')
			// console.log(LocalStorageServices.getLocalStorage('cartInfo'))
			ele.on('click',function(){
				var isCartExists = false;
				var carts =	{"carts":scope.commodityitem.commodityid,"cartCount":scope.cartCount}
				var oldCarts = LocalStorageServices.getLocalStorage('cartInfo')
				console.log(oldCarts)
				if(oldCarts){
					for(var i = 0;i < oldCarts.length;i++){
						if(oldCarts[i].carts == carts.carts){
							isCartExists = true;
							oldCarts[i].cartCount ++;
						}
					}
					if(!isCartExists){
						oldCarts.push(carts)
					}
				}
				else{
					var oldCarts = []
					oldCarts.push(carts)
				}	
				LocalStorageServices.setLocalStorage('cartInfo',oldCarts)
				console.log(LocalStorageServices.getLocalStorage('cartInfo'))
				
				scope.$apply(function(){
					$rootScope.cartTotal = oldCarts.length
				})
				
			})
		}	
	}
}])
.directive('commodityitem',['LocalStorageServices',"$rootScope",function(LocalStorageServices,$rootScope){
	return {
		restirt:"EA",
		scope:true,
		link:function(scope,ele,attrs){
			scope.cartCount = scope.commodityitem.count?scope.commodityitem.count:scope.cartCount
			scope.cartPlus = function(){
				// console.log(scope)
				if(scope.cartCount <scope.commoditys[0].inventory){
					scope.cartCount ++;
					$rootScope.totalMoney += scope.commodityitem.price

				}
				else{
					//模态框提示最大值
				}

			}
			scope.cartMinu = function(){
				if(scope.cartCount >1) {
					scope.cartCount --
					$rootScope.totalMoney -= scope.commodityitem.price

				}
				else{
					//模态框提示最小值
				}

			}
		}
	}
}])
//商品过滤服务
.filter('commodityfilter',function($rootScope){
	return function(value){
//		console.log(value)
//		console.log($rootScope.selected)
		value ?value :''
		// commodityCount = value.length
		// for(var i =0;i<commodityCount;i++){
		// 	for(var j = 0;j<$rootScope.selected;j++){
		// 		if(value[i].commodityid != $rootScope.selected[j])
		// 		value.slice(i,1);
		// 	}
		// }
		return value

	}
})
angular.module('ProductDetails',[])
.controller('ProductDetailsCtrl',['$scope','$http','$location','$stateParams','LoadCategory','$rootScope',
	function($scope,$http,$location,$stateParams,LoadCategory,$rootScope){
	$scope.commodityid = $stateParams.commodityid
	// LoadCategory.getCategory($scope.categoryid)
	$scope.cartCount = 1
	$scope.cartPlus = function(){
		if($scope.cartCount <$scope.commodity.inventory){
			$scope.cartCount ++
			$scope.commodity.inventory-=1
		}
		

	}
	$scope.cartMinu = function(){
		if($scope.cartCount >1){
			$scope.cartCount --
			$scope.commodity.inventory+=1
		}
		

	}
	$http({
		method:"GET",
		url:"/getCommodityBycommodity/"+$scope.commodityid
	})
		.then(function(data){
			$scope.commodity = data.data[0]
			$scope.commodity.imgThumUrl = "images/products/350/" + $scope.commodity.commodityid+"/350/350"+$scope.commodity.commodityid+"0.jpg"
			$scope.commodity.imgUrl = "images/products/350/" + $scope.commodity.commodityid+"/210/210"+$scope.commodity.commodityid+"0.jpg"
		}).catch(function(err){
			console.log(err)
		})
		
	
}])
//.directive('addCarts',['LocalStorageServices',function(LocalStorageServices){
//	return {
//		restirt:'A',
//		replace:false,
//		link:function(scope,ele,attrs){
//			console.log(scope)
//			ele.on('click',function(){
//				var carts =	{"carts":scope.commodityid,"cartCount":scope.cartCount}
//				var oldCarts = LocalStorageServices.getLocalStorage('carts')
//				if(oldCarts){
//					for(var i = 0;i < oldCarts.length;i++){
//						if(oldCarts[i].carts != carts.carts)
//							oldCarts.push(carts)
//					}
//				}
//				else{
//					var oldCarts = []
//					oldCarts.push(carts)
//				}
//				scope.$emit('cartsCount',oldCarts.length)
//				LocalStorageServices.setLocalStorage('carts',oldCarts)
//			})
//		}	
//	}
//}])

angular.module('ShoppingCart',[])
.controller('ShoppingCartCtrl',['$scope','$http','LocalStorageServices','$rootScope',
	function($scope,$http,LocalStorageServices,$rootScope){
	$rootScope.isCollapsed = true;
	$scope.isCartEmpty =true;
	$scope.carts = LocalStorageServices.getLocalStorage('cartInfo')
	if($scope.carts){
		$scope.isCartEmpty =false;
		let commodityids=[],
			counts = []
		for(var i = 0;i<$scope.carts.length;i++){
			commodityids.push($scope.carts[i].carts)
			counts.push($scope.carts[i].cartCount)
		}
		commodityids = JSON.stringify(commodityids)
		// $scope.cartCount = 1
		$http({
			method:"GET",
			url:"/getCommodityBycommoditys/"+commodityids
		})
			.then(function(data){
				$scope.commoditys = data.data
				$rootScope.totalMoney = 0
				if($scope.commoditys.length == 0)
					$rootScope.alerts.push({msg: '您所选的商品坐飞碟飞走了!'});
				else{
					$scope.commoditys.imgThumUrl = "images/products/210/210" + $scope.commoditys.commodityid+".jpg"
					for(var i = 0;i<$scope.carts.length;i++){
						$rootScope.totalMoney += $scope.commoditys[i].price
						for(var j = 0;j<$scope.commoditys.length;j++)
						{

							if($scope.commoditys[i].inventory == 0){
								count = 0
								$rootScope.alerts.push({msg: '您选购的商品已售罄!'});
							}
							// if($scope.carts[i].carts == $scope.commoditys[j].commodityid)
							// 	$scope.commoditys[j].cartCount = $scope.carts[i].cartCount
							$scope.commoditys[i].count = counts[i]
						}
					}
				}
			
			}).catch(function(err){
				console.log(err)
			})
	}
	
}])
.directive('cartitem',['LocalStorageServices',"$rootScope",function(LocalStorageServices,$rootScope){
	return {
		restirt:"EA",
		scope:true,
		link:function(scope,ele,attrs){
			scope.cartCount = scope.commodityitem.count?scope.commodityitem.count:scope.cartCount
			scope.cartPlus = function(){
				// console.log(scope)
				if(scope.cartCount <scope.commoditys[0].inventory){
					scope.cartCount ++;
					$rootScope.totalMoney += scope.commodityitem.price

				}
				else{
					//模态框提示最大值
				}

			}
			scope.cartMinu = function(){
				if(scope.cartCount >1) {
					scope.cartCount --
					$rootScope.totalMoney -= scope.commodityitem.price

				}
				else{
					//模态框提示最小值
				}

			}
			// LocalStorageServices.clearItem('cartInfo')
//			同步购物车订单前状态
			scope.$watch('cartCount',function(nowValue,preValue,scope){
				// LocalStorageServices.clearItem('cartInfo')
				// LocalStorageServices.clearAll()
				// LocalStorageServices.getLocalStorage()
				// console.log(scope.cartCount)
				let value = {"cartCount":scope.cartCount,"carts":scope.$parent.commodityitem.commodityid}
				let cartInfo = LocalStorageServices.getLocalStorage('cartInfo')
				console.log(value)
				console.log(cartInfo)
				if(cartInfo){
					for(var i = 0;i<cartInfo.length;i++){
						if(cartInfo[i].carts == scope.$parent.commodityitem.commodityid)
							cartInfo.splice(i,1)						
					}
				}
				else{
					cartInfo = []
				}
				cartInfo.push(value)
				console.log(cartInfo)
				LocalStorageServices.setLocalStorage('cartInfo',cartInfo)

			})
		}
	}
}])
.directive('clearAllCart',["LocalStorageServices",'$location','$timeout',function(LocalStorageServices,$location,$timeout){
	return {
		restirt:"EA",
		scope:true,
		link:function(scope,ele,attrs){
			ele.on('click',function(){
				if(confirm('你确认清空购物车吗?')){
					LocalStorageServices.clearAll()
					$timeout(function(){
						$location.path('/index')
					},300)
					
				}else{
					//
				}
				
			})
			
		}
	}
}])
.directive('removerItemCart',["LocalStorageServices",function(LocalStorageServices){
	return {
		restirt:"EA",
		scope:true,
		link:function(scope,ele,attrs){
			console.log(scope)
		}
	}
}])
.directive('createOrderForm',['LocalStorageServices','$http','ipCookie','$location',
	function(LocalStorageServices,$http,ipCookie,$location){
	return {
		restirt:'EA',
		replace:false,
		link:function(scope,ele,attrs){
			ele.on('click',function(){
				let data ={}
				data.cartInfo = JSON.stringify(LocalStorageServices.getLocalStorage('cartInfo'))
				data.username = ipCookie('usernameLogined')
				console.log(data)
				$http({
					method:"POST",
					url:"/saveCartShopping",
					data:$.param(data),
					headers:{'Content-Type':'application/x-www-form-urlencoded'}
				})
					.then(function(data){
						console.log(data)
						result = data.data.result
						if(result == -1){
							//模态框提示长时间未登录,请重新登录

						}else if(result == 'success' || result ==1){
							$location.path('/shoppingCart/orderFormInfo')
						}
					}).catch(function(err){
						console.log(err)
					})
			})
		}
	}
}])
angular.module('OrderForm',[])
.controller('OrderFormCtrl',['$scope','$http','LocalStorageServices','ipCookie','$location','$rootScope',
	function($scope,$http,LocalStorageServices,ipCookie,$location,$rootScope){
	var orderForm = LocalStorageServices.getLocalStorage('orderForm')
	$scope.isEnsureAll = false;
	console.log(orderForm)
	var targetLS = ''
	if(!orderForm){
		targetLS = 'cartInfo'
	}else{
		targetLS = 'orderForm'
	}
	$scope.targetLS = LocalStorageServices.getLocalStorage(targetLS)
	console.log($scope.targetLS)
	var commodityids=[]
	for(var i = 0;i<$scope.targetLS.length;i++){
		commodityids.push($scope.targetLS[i].carts)
	}
	commodityids = JSON.stringify(commodityids)
//	根据由LSget到的订单商品id获取商品
	$http({
			method:"GET",
			url:"/getCommodityBycommoditys/"+commodityids
		})
			.then(function(data){
//				console.log(data.data)
				$scope.commoditys = data.data
				$rootScope.totalMoney = 0
				if($scope.commoditys.length == 0)
					$rootScope.alerts.push({msg: '您选购的商品已售罄!'});
				else{
					$scope.commoditys.imgThumUrl = "images/products/210/210" + $scope.commoditys.commodityid+".jpg"
					for(var i = 0;i<$scope.targetLS.length;i++){
						
						for(var j = 0;j<$scope.commoditys.length;j++)
						{
							if($scope.targetLS[i].carts == $scope.commoditys[j].commodityid)
								$scope.commoditys[j].cartCount = $scope.targetLS[i].cartCount
							console.log($scope.targetLS)
						}
						$rootScope.totalMoney += $scope.commoditys[i].price*$scope.commoditys[i].cartCount
					}
				}
				
			}).catch(function(err){
				console.log(err)
			})
			console.log($scope)
	$scope.submitOrder = function(){
		console.log($scope.targetLS)

		$scope.orderFormData.cartLS = JSON.stringify($scope.targetLS)
		$scope.orderFormData.username = ipCookie('usernameLogined')
		console.log($.param($scope.orderFormData))
		$http({
		method:"POST",
		url:'/submitOrderForm',
		data:$.param($scope.orderFormData),
		headers:{'Content-Type':'application/x-www-form-urlencoded'}
	})
		.then(function(data){
			console.log(data)
			var result=data.data
			if (result == 'success') {
				console.log('success')
				// $location.path('/index')
				// LocalStorageServices.clearAll()
			}
		})
		.catch(function(err){
			console.log(err)
		})

	}
}])
// .directive('orderInfoCon',['$timeout',function($timeout){
// 	return {
// 		restirt:"A",
// 		replace:false,
// 		scope:true,
// 		link:function(scope,ele,attrs){
// 			console.log(ele.scope())
// 			scope.isEnsure = false;
// 			ele.parent().scope().isEnsure = false
// 			// console.log($('.selectLocation input[name=province]').val())
// 			console.log(ele.parent().find('input').val())
// 			console.log(scope)
// 			ele.children("button").on('click',function(){
// 				if( ele.parent().find('input').eq(0).val() && ele.parent().find('input').eq(1).val() && ele.parent().find('input').eq(2).val() ){
// 					console.log('確認信息了')
// 					ele.parent().find("input").css({
// 														"border":"none",
// 														"backgroundColor":"#fff"})
// 														.attr('disabled','true')
// 					// console.log(ele.parent())
// 					$timeout(function(){
// 						scope.isEnsure = true;
// 						ele.parent().children().scope().isEnsure = true
// 					},10)
// 				}
// 				if( ele.parent().find('input').val() && !(ele.parent('div').hasClass('receipterInfo'))){
// 					console.log('input[name=ownfreight]被选中了')
// 					console.log(ele.parent('div').hasClass('payWay'))
// 					ele.parent().find('input').css({'display':'none'})
// 					$timeout(function(){
// 						scope.isEnsure = true;
// 						if(ele.parent('div').hasClass('payWay'))
// 							ele.parent().scope().isEnsurePayWay = true
// 					},1)
// 				}
// 				else{
// 					console.log('信息未填写完整')
// 					// console.log($('.selectLocation input[name=province]').val())
// 					console.log(ele.parent().find('input').val())
// 					console.log(scope.form.province.$isEmpty(''))
// 					//模态框提示信息未填写完整
// 				}
				
				
// 			})
// 		}
// 	}
// }])
.directive('orderInfoCon',['$timeout','$rootScope',function($timeout,$rootScope){
	return {
		restirt:"A",
		replace:false,
		scope:true,
		link:function(scope,ele,attrs){
			// console.log(ele.scope())
			scope.isEnsure = false;
			ele.scope().isEnsure = false;
			$rootScope.isEnsureReceipterinfo=false;$rootScope.isEnsureFreight=false;$rootScope.isEnsurePayWay=false;
			// ele.parent().scope().orderFormData ={}
			// console.log($('.selectLocation input[name=province]').val())
			// console.log(ele.find('input').val())
			// console.log(scope)
			ele.find("button").on('click',function(){
				if( (ele.find('input').eq(0).val() && ele.find('input').eq(1).val() && ele.find('input').eq(2).val())
					|| (ele.find('input').val())){
					if(ele.hasClass('receipterInfo')){
						// console.log('確認信息了')
						$rootScope.isEnsureReceipterinfo=true;
						ele.find("input").toggleClass('ensure-ok')
												.attr('disabled','true')
						// console.log(ele.parent())
						$timeout(function(){
							scope.isEnsure = true;
							ele.children().scope().isEnsure = true
						},10)
					}
					if(ele.hasClass('freightInfo') || ele.hasClass('payWay')){
						// console.log('input[name=ownfreight]被选中了')
						// console.log(ele.hasClass('payWay'))
						ele.hasClass('freightInfo')?$rootScope.isEnsureFreight=true:$rootScope.isEnsurePayWay=true;						ele.find('input').css({'display':'none'})
						$timeout(function(){
							scope.isEnsure = true;
							if(ele.hasClass('payWay')){
								ele.scope().isEnsure = true
							}
						},1)
					}
					ele.parent().scope().orderFormData = scope.orderFormData
					// console.log(ele.parent().scope().orderFormData)
				}
				else{
					console.log('信息未填写完整')
					// console.log($('.selectLocation input[name=province]').val())
					console.log(ele.find('input').val())
					console.log(scope.form.province.$isEmpty(''))
					//模态框提示信息未填写完整
				}
				
				
			})

			ele.find("a").on('click',function(){
				if( (ele.find('input').eq(0).val() && ele.find('input').eq(1).val() && ele.find('input').eq(2).val())
					|| (ele.find('input').val())){
					if(ele.hasClass('receipterInfo')){						
						$rootScope.isEnsureReceipterinfo=false;
						ele.find("input").toggleClass('ensure-ok')
												.removeAttr('disabled','true')
						$timeout(function(){
							scope.isEnsure = false;
							ele.children().scope().isEnsure = false
						},10)
					}
					if(ele.hasClass('freightInfo') || ele.hasClass('payWay')){
						ele.hasClass('freightInfo')?$rootScope.isEnsureFreight=false:$rootScope.isEnsurePayWay=false;
						ele.find('input').css({'display':'inline-block'})
						$timeout(function(){
							scope.isEnsure = false;
							if(ele.hasClass('payWay')){
								ele.scope().isEnsure = false
							}
						},1)
					}
				}
				else{
					//模态框提示信息格式有误,刷新重试
				}
				
				
			})

		}
	}
}])
angular.module('Main',['ui.bootstrap'])
.controller('mainCtrl',['$scope','$http','LoadCategory','$rootScope',function($scope,$http,LoadCategory,$rootScope){
	$rootScope.isCollapsed = false;
}])
angular.module('Footer',[])
.controller('FooterCtrl',['$scope',function($scope){
	$scope.iconServiceImg = "images/website/icon_service.png"
	$scope.iconServicePosition =[]
	for(var i =0;i<10;i++){
		$scope.iconServicePosition.push('-'+i*4.2+"em")
	}
	
}])