angular.module('ionicApp', ['ionic'])
.service('dataService', function($http){
  
  return {
    all: function() {
      return $http.get("http://agtech.mybluemix.net/api/sensors")
      
    }
  }
  
})
.controller('DashCtrl', function($scope, dataService) {  
  $scope.sensors = {};
  dataService.all().then(function(res){
    var tmp = res.data;
    tmp.soilmoisture = (tmp.soilmoisture*1).toFixed(1);
    tmp.temp = (tmp.temp*1).toFixed(1);
    tmp.humidity = (tmp.humidity*1).toFixed(1);
    tmp.light = (tmp.light*1).toFixed(1);
    $scope.sensors = tmp;
  });
  
})
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html",
          controller: 'DashCtrl'
        }
      }
    })
    .state('tabs.location', {
      url: "/dash-location",
      views: {
        'home-tab': {
          templateUrl: "templates/dash-location.html"          
        }
      }
    })
    .state('tabs.dash-soil', {
      url: "/dash-soil",
      views: {
        'home-tab': {
          templateUrl: "templates/dash-soil.html"
        }
      }
    })
    .state('tabs.dash-light', {
      url: "/dash-light",
      views: {
        'home-tab': {
          templateUrl: "templates/dash-light.html"
        }
      }
    })
    .state('tabs.dash-prj-addnew', {
      url: "/dash-prj-addnew",
      views: {
        'home-tab': {
          templateUrl: "templates/dash-prj-addnew.html"
        }
      }
    })
    .state('tabs.dash-temp', {
      url: "/dash-temp",
      views: {
        'home-tab': {
          templateUrl: "templates/dash-temp.html"
        }
      }
    })
    .state('tabs.dash-prj-list', {
      url: "/dash-prj-list",
      views: {
        'home-tab': {
          templateUrl: "templates/dash-prj-list.html"
        }
      }
    })
     .state('tabs.dash-prj1-detail', {
      url: "/dash-prj1-detail",
      views: {
        'home-tab': {
          templateUrl: "templates/dash-prj1-detail.html"
        }
      }
    })
    .state('tabs.facts', {
      url: "/facts",
      views: {
        'home-tab': {
          templateUrl: "templates/facts.html"
        }
      }
    })
    .state('tabs.facts2', {
      url: "/facts2",
      views: {
        'home-tab': {
          templateUrl: "templates/facts2.html"
        }
      }
    })
    .state('tabs.chart', {
      url: "/chart",
      views: {
        'chart-tab': {
          templateUrl: "templates/dash-soil.html"
        }
      }
    })
    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "templates/about.html"
        }
      }
    })
    .state('tabs.navstack', {
      url: "/navstack",
      views: {
        'about-tab': {
          templateUrl: "templates/nav-stack.html"
        }
      }
    })
    .state('tabs.contact', {
      url: "/contact",
      views: {
        'contact-tab': {
          templateUrl: "templates/contact.html"
        }
      }
    });


   $urlRouterProvider.otherwise("/tab/home");

})

.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
});