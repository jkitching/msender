(function(){
    var getPetitionFromName = function() {
        if (typeof(Storage) === "undefined") {
            return null;
        }
        var userData = localStorage.getItem('l214.lib-change-org.userdata');
        if (!userData) {
            return null;
        }
        userData = JSON.parse(userData) || null;
        if (!userData) {
            return null;
        }
        return '' + userData['first_name'] + ' ' + userData['last_name'];
    };

    var app = angular.module('msender', []);

    app.controller('msenderController', ['$scope', '$parse', function($scope, $parse) {
        $scope.$on('msg', function(event, arg) {
            $scope.msCtrl.msg = arg;
            $scope.msCtrl.update();
        });

        // get first name + last name from petition
        var _this = this;
        $(document).on('petition:didSucceed', function(e, d) {
            if (_this.fromName.length > 0) {
                return;
            }
            var name = '' + d.postData.firstName + ' ' + d.postData.lastName;
            $scope.$apply(function() {
                _this.fromName = name;
                _this.update();
            });
        });

        this.valid = false;
        this.nameValid = false;
        this.msgValid = false;

        this.mobile = jQuery.browser.mobile;

        this.to = '';
        this.toMailsOnly = '';
        this.cc = '';
        this.bcc = $('#msender').data('ms-bcc');
        this.subject = $('#msender').data('ms-subject');
        this.fromName = getPetitionFromName() || '';
        this.msg;
        this.names = '';
        this.body = this.fromName + "\n --";

        this.userMailClient = '';
        this.mailtoURL = new Array();
        this.mailtoURL['std']     = 'mailto:';
        this.mailtoURL['gmail']   = 'mailto:';
        this.mailtoURL['orange']  = 'https://webmail1f.orange.fr/webmail/fr_FR/write.html';
        this.mailtoURL['sfr']     = 'https://messagerie.sfr.fr/';
        this.mailtoURL['laposte'] = 'https://www.laposte.net/accueil';
        this.mailtoURL['live']    = 'https://login.live.com/fr';
        this.mailtoURL['yahoo']   = 'mailto:';
        this.mailtoURL['other']   = '';


        this.cssBgPicture = function(imgUrl) {
            if(this.msgValid) {
                return {"background-image" : "url('"+ imgUrl +"')"};
            }
            return {"background-image" : "none"};
        };

        this.update = function() {

            this.msgValid = (this.msg !== false);
            this.nameValid = (this.fromName !== '');
            this.valid = (this.msgValid && this.nameValid);

            if(this.msgValid) {
                var names = '';
                var emails = '';
                var emailsOnly = '';
                this.msg['recipients'].forEach(function(contact) {
                    name = ((contact['gender'] == 'F') ? 'Mme' : 'M.') +' '+ contact['lastname'];
                    names += name +', ';
                    /* If email contains more than one email adress (separated with comma) */
                    if(contact['email'].indexOf(',') !== -1) {
                        emails += contact['email'] +', ';
                    }
                    else {
                        emails += '"'+ name +'" <'+ contact['email'] +'>, ';
                    }
                    emailsOnly += contact['email'] +',';
                });
                this.names = names;
                this.to = emails.slice(0, -2);
                this.toMailsOnly = emailsOnly.slice(0, -1);
            }

            var bodyExpr = $('#msender').data('ms-body');
            var templateParsed = $parse(bodyExpr);
            this.body = templateParsed(this);

            if(this.valid) {
                this.mailtoURL['std'] = 'mailto:'
                        + encodeURIComponent(this.toMailsOnly)
                        +"?cc="     + encodeURIComponent(this.cc)
                        +"&bcc="    + encodeURIComponent(this.bcc)
                        +"&subject="+ encodeURIComponent(this.subject)
                        +"&body="   + encodeURIComponent(this.body);
                this.mailtoURL['gmail'] = 'https://mail.google.com/mail/u/0/?view=cm&fs=1'
                        +'&to='     + encodeURIComponent(this.to)
                        +'&bcc='    + encodeURIComponent(this.bcc)
                        +'&cc='     + encodeURIComponent(this.cc)
                        +'&su='     + encodeURIComponent(this.subject)
                        +'&body='   + encodeURIComponent(this.body);
                this.mailtoURL['yahoo'] = 'http://compose.mail.yahoo.com/'
                        +'?to='     + encodeURIComponent(this.toMailsOnly)
                        +'&bcc='    + encodeURIComponent(this.bcc)
                        +'&cc='     + encodeURIComponent(this.cc)
                        +'&subject='+ encodeURIComponent(this.subject)
                        +'&body='   + encodeURIComponent(this.body.replace(/\'/g, "′"));

            }
        };
        this.sendEmail = function() {
            window.location.href = this.mailtoURL;
        };
        this.isValid = function() { return this.valid;};
        this.doNothing = function() {};
        this.sendByHand = function() {
            return this.userMailClient === 'orange' || this.userMailClient === 'sfr' || this.userMailClient === 'laposte' || this.userMailClient === 'live' || this.userMailClient === 'other';
        };
    }]);
})();
