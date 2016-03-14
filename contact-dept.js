(function(){
    var app = angular.module('msender', []);
    app.controller('msenderController', ['$scope', '$http', '$parse', function($scope, $http, $parse) {
        
        var deptJsonURI = $('#contact-dept').data('ms-json');
        $http.get(deptJsonURI).success(function(data) {
            $scope.depts = data;
        });
        this.destLabel = $('#contact-dept').data('ms-label');
        this.dirImgURI = $('#contact-dept').data('ms-imgdir');

        this.valid = false;
        this.deptValid = false;
        this.nameValid = false;
        
        this.mobile = jQuery.browser.mobile;
        
        this.to = '';
        this.toMailsOnly = '';
        this.cc = '';
        this.bcc = $('#contact-dept').data('ms-bcc');
        this.subject = $('#contact-dept').data('ms-subject'); 
        this.fromName = '';
        this.dept = '00';
        this.deptName = '';
        this.recipients;
        this.depNames = '';
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
        

        this.cssBgDepu = function(depuSlug) {
            if(this.dept !== '00') {
                return {"background-image" : "url('"+ this.dirImgURI + depuSlug +".jpg')"};
            }
            return {"background-image" : "none"};
        };
        
        this.update = function() {
            this.valid = false;
            this.deptValid = false;
            this.nameValid = false;
        
            if(this.dept !== '00') {
                this.deptValid = true;
                var depRow = $scope.depts[this.dept];
                this.recipients = depRow.depus;
                this.deptName = depRow.nom_circo;
                var depNames = '';
                var depMails = '';
                var depMailsOnly = '';
                depRow.depus.forEach(function(dep) {
                    depNames += dep['prenom'] +' '+ dep['nom_de_famille'] +', ';
                    depMails += '"'+ dep['prenom'] +' '+ dep['nom_de_famille'] +'" <'+ dep['email'] +'>, ';
                    depMailsOnly += dep['email'] +',';
                });
                if(depNames.length > 60) {
                    var spaceAfterDuDes = (depRow.du_des_de_la.slice(-1) === "'") ? '' : ' ';
                    depNames = 'Chers '+ this.destLabel +'s '+ depRow.du_des_de_la + spaceAfterDuDes + this.deptName +',';
                }
                this.depNames = depNames;
                this.to = depMails;
                this.toMailsOnly = depMailsOnly.slice(0, -1);
            }
            this.nameValid = (this.fromName !== '');            
            this.valid = (this.deptValid && this.nameValid);

            var bodyExpr = $('#contact-dept').data('ms-body');
            //var bodyExpr = '"didi " + dept';
            var templateParsed = $parse(bodyExpr);
            //this.body = $scope.$eval(bodyExpr);
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

