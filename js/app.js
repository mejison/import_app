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
		$scope.step = 1;
		$scope.progress = 0;
		$scope.next_step = 1;
		$scope.compare = {};
		$scope.compare.field = [];
		$scope.compare.data = {};
		$scope.compare.mask = {};
		$scope.compare.file = null;
		$scope.compare.method = null;
		
		$scope.init = function()
		{
			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'server.php?action=get_nav');
			xhr.onreadystatechange = function()
			{
				if (xhr.readyState == 4)
				{
					$scope.compare.field = JSON.parse(xhr.responseText);
				}
			}
			xhr.send();
			
		}

		$scope.init();

		$scope.save_items = function()
		{
			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'server.php?action=save_items');
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.onreadystatechange = function()
			{
				if (xhr.readyState == 4)
				{
					console.log(xhr.responseText);
				}
			}
			
			var data = '';
			for(var i in $scope.compare.mask)
			{
				data += '&' + i + '=' + $scope.compare.mask[i];
			}
			
			xhr.send(data + '&file_name=' + $scope.compare.file + '&method=' + $scope.compare.method);
		}
		
		$scope.change_step = function(new_step)
		{
			$scope.step = new_step;
			console.log($scope.compare.mask);
		}

		$scope.upload_files = function(files)
		{
			$scope.progress = 0;
			$scope.next_step = $scope.step;
			$scope.$apply();
			var xhr = new XMLHttpRequest(),
				fd = new FormData();
				fd.append('files', files[0]);							
					
			xhr.open("POST", "server.php?action=upload_file");
			xhr.onreadystatechange = function()
			{
				if (xhr.readyState == 4)
				{
					var response = JSON.parse(xhr.responseText);
					$scope.compare.data = response['data'] ? response['data'] : [];
					$scope.compare.file = response['file'] ? response['file'] : $scope.compare.file;
					$scope.compare.method = response['method'] ? response['method'] : $scope.compare.method;
					
					for(var i in $scope.compare.data)
					{
						if (typeof $scope.compare.field[i] != 'undefined')
						{
							$scope.compare.mask[i] = $scope.compare.field[i];								
						}
					}
					
					$scope.next_step = 2;
					$scope.$apply();
				}
			}
			
			xhr.upload.onprogress = function(progress)
			{
				$scope.progress = Math.floor(100 * progress.loaded / progress.total);
				$scope.$apply();						
			}
			xhr.send(fd);
		};
	}

})();

;

(function () {
    'use strict';
    angular.module('app')
		.directive('changefile', [function() {
			return {
				restrict: 'A',
				'link' : function($scope, element)
				{
					element.on('change', function(event)
					{
						$scope.upload_files(event.target.files);
					});
				}
			};
		}]);
})();

;

jQuery.event.props.push("dataTransfer");

;

(function() {
	'use strict';
	angular.module('app')
		.directive('dragwrap', [function () {
		return {
			restrict: 'A',
			link: function ($scope, element) {
				element.bind('drop', function (event) {
					$scope.upload_files(event.dataTransfer.files);
				});

			}
		};
	}]);
})();

