(function(){
    angular.module('msender').controller('msenderSelect', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {

        var deptJsonURI = $('#msender').data('ms-json');
            $http.get(deptJsonURI).success(function(data) {
            $scope.depts = data;
        });

        this.update = function() {
            this.recipients = false;
            if(this.dept !== '00') {
                var depRow = $scope.depts[this.dept];
                this.recipients = [] ;
                this.recipients.items = depRow.depus;
                this.recipients.items.forEach(function(contact) {
                    contact.imgUrl = $('#msender').data('ms-imgdir') + contact.slug + '.jpg';
                });
                this.recipients.groupName = depRow.nom_circo;
                this.recipients.du_des_de_la = depRow.du_des_de_la;
                this.recipients.destLabel = $('#msender').data('ms-label');
            }
            $rootScope.$broadcast('recipients', this.recipients);
        };
    }]);
})();

