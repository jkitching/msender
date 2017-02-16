(function(){
    var app = angular.module('msender', []);

    app.controller('msenderController', ['$scope', '$parse', function($scope, $parse) {
        $scope.$on('recipients', function(event, arg) {
            $scope.msCtrl.recipients = arg;
            $scope.msCtrl.update();
        });

        this.valid = false;
        this.nameValid = false;
        this.recipientsValid = false;

        this.mobile = jQuery.browser.mobile;

        this.to = '';
        this.toMailsOnly = '';
        this.cc = '';
        this.bcc = $('#msender').data('ms-bcc');
        this.subject = $('#msender').data('ms-subject');
        this.fromName = '';
        this.recipients;
        this.names = '';
        this.body = this.fromName +"\n --";

        this.userMailClient = '';
        this.mailtoURL = new Array();
        this.mailtoURL['std']     = 'mailto:';
        this.mailtoURL['gmail']   = 'mailto:';
        this.mailtoURL['orange']  = 'https://webmail1f.orange.fr/webmail/fr_FR/write.html';
        this.mailtoURL['sfr']     = 'https://messagerie.sfr.fr/';
        this.mailtoURL['laposte'] = 'https://webmailz.laposte.net/mail#1';
        this.mailtoURL['live']    = 'https://login.live.com/fr';
        this.mailtoURL['other']   = '';


        this.cssBgPicture = function(imgUrl) {
            if(this.recipientsValid) {
                return {"background-image" : "url('"+ imgUrl +"')"};
            }
            return {"background-image" : "none"};
        };

        this.update = function() {
            //console.debug(this.recipients);

            this.recipientsValid = (this.recipients !== false);
            this.nameValid = (this.fromName !== '');
            this.valid = (this.recipientsValid && this.nameValid);

            if(this.recipientsValid) {
                var names = '';
                var emails = '';
                var emailsOnly = '';
                this.recipients['items'].forEach(function(contact) {
                    names += contact['prenom'] +' '+ contact['nom_de_famille'] +', ';
                    emails += '"'+ contact['prenom'] +' '+ contact['nom_de_famille'] +'" <'+ contact['email'] +'>, ';
                    emailsOnly += contact['email'] +',';
                });
                if(names.length > 60) {
                    var spaceAfterDuDes = (this.recipients.du_des_de_la.slice(-1) === "'") ? '' : ' ';
                    names = 'Chers '+ this.recipients.destLabel +'s '+ this.recipients.du_des_de_la + spaceAfterDuDes + this.recipients.groupName +',';
                }
                this.names = names;
                this.to = emails;
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

