(function () {
    'use strict';
    angular.module('app', [	]);
})();

;


(function () {
    'use strict';

    angular.module('app')
        .controller('NavCtrl', [ '$scope',  '$window', '$location', '$http', '$timeout', NavCtrl]);

    function NavCtrl($scope, $rootScope, $window, $location, $http, $timeout) {
		$scope.main = "main";
	}

})();

;

(function () {
    'use strict';

    angular.module('app')
        .controller('UploadCtrl', [ '$scope',  '$window', '$location', '$http', '$timeout', UploadCtrl]);

    function UploadCtrl($scope, $rootScope, $window, $location, $http, $timeout) {
   
    }

})();