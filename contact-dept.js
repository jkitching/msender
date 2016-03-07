(function(){
    var app = angular.module('msender', []);
    app.controller('msenderController', ['$scope', '$http', function($scope, $http) {
        
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

            this.body = this.depNames +"\n\n";
            this.body +="Après les révélations sur les conditions d'abattage des animaux à l'abattoir d'Alès, L214 a dévoilé de nouvelles violences exercées sur des moutons, cochons et bovins dans l'abattoir intercommunal certifié bio du Vigan (Gard).\n\n";
            this.body +="Ces deux enquêtes de grande ampleur sont la preuve que d'importants dysfonctionnements existent dans les abattoirs en France.\n\n";
            this.body +="Face à cette situation et au vu de l’indignation suscitée par ces images, je me joins à l'association L214 pour demander l'ouverture d'une commission d'enquête parlementaire sur l'ensemble des abattoirs français afin de faire toute la lumière sur des pratiques des abattoirs français trop longtemps dissimulées au public. L'enquête judiciaire en cours à l'abattoir du Vigan n'entrave pas la création d'une commission couvrant l'ensemble du territoire.\n\n";
            this.body +="En tant que parlementaire, vous pouvez déposer ou co-signer une proposition de résolution allant dans ce sens.\n\n";
            this.body +="Merci à vous de bien vouloir agir.\n\n";
            this.body +="Bien à vous,\n\n";

            this.body += this.fromName +" - "+ this.deptName +"\n";
            this.body += "Plus d'infos sur : http://abattoir-made-in-france.com";

            
            
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

