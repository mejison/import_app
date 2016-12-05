(function () {
    'use strict';
    angular.module('app', [
		 'ngRoute'
	]);
})();

;

(function () {
    'use strict';

    angular.module('app')
        .controller('NavCtrl', [ '$scope', '$rootScope', '$window', '$location', '$http', '$timeout', NavCtrl]);

    function NavCtrl($scope, $rootScope, $window, $location, $http, $timeout) {
		$scope.main = "main";
	}

})();