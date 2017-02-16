(function(){
    angular.module('msender').controller('msenderSelect', ['$rootScope', '$scope', '$timeout', function($rootScope, $scope, $timeout) {

        $scope.contacts = msContacts;
        $scope.msg = ["recipients"];
        $scope.msg.recipients = [];
        msContacts.forEach(function(contact) {
            contact.imgUrl = $('#msender').data('ms-imgdir') + contact.slug + '.jpg';
            contact.isSelected = true;
            $scope.msg.recipients.push(contact);
        }, $scope);

        this.cssBgImg = function(imgUrl) {
            return {"background-image" : "url('"+ imgUrl +"')"};
        };

        this.update = function() {
            $scope.msg.recipients = [];
            msContacts.forEach(function(contact) {
                if(contact.isSelected) {
                    $scope.msg.recipients.push(contact);
                }
            }, $scope);
            $rootScope.$broadcast('msg', $scope.msg);
        };
        $timeout(function(){
            $rootScope.$broadcast('msg', $scope.msg);
        }, 300);
    }]);
})();
