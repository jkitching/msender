(function(){
    angular.module('msender').controller('msenderSelect', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {

        this.contacts = msContacts;
        msContacts.forEach(function(contact) {
            contact.imgUrl = $('#msender').data('ms-imgdir') + contact.slug + '.jpg';
            contact.isSelected = true;
        });

        this.cssBgImg = function(imgUrl) {
            return {"background-image" : "url('"+ imgUrl +"')"};
        };

        this.update = function() {
            this.msg = ["recipients"];
            this.msg["recipients"] = [];
            msContacts.forEach(function(contact) {
                if(contact.isSelected) {
                    this.msg.recipients.push(contact);
                }
            }, this);
            $rootScope.$broadcast('msg', this.msg);
        };
    }]);
})();
