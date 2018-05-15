Component HTML5 / JQUERY / ANGULARJS to email throw email clients people from geographic departements.

### Require
 * angularjs 1.5

### Works with bootstrap
 * use of classes : row, ="col-md-4, col-md-8, btn, btn-lg, btn-success, btn-warning, btn-danger, btn-primary, btn-default, btn-info

### Example of use
```
<div id="contact-dept"
     data-ms-json="contact-dept/donnees-dept/deps-3.json"
     data-ms-label="député"
     data-ms-bcc="abattoirbio+dep@l214.com"
     data-ms-subject="Une commission d’enquête parlementaire sur les abattoirs"
     data-ms-imgdir="//visuels.l214.com/sites/www.politique-animaux.fr/2016/deputes-fevrier/">
    <h2>Interpellez vos députés : demandez une commission d’enquête sur les abattoirs</h2>
    <?php require 'contact-dept/contact-dept.html'; ?>
</div>
```
## Searches 2015

### Webmails specificities
	* Hotmail : BCC can't be autocompleted with URL parameter
	* Yahoo : subject can't be autocompleted with URL parameter; only one email adress per field can be passed with the 		URL parameters (emails seperation is done with JS so semicolons won't work)
	* Free : body can't be autocompleted with URL parameter
	* Orange, SFR, Laposte won't take any URL parameter
	

#### Misc info
        * Get requests characters limitations by webmail :
        * Windows Live Hotmail : ~1750 chars
        * Gmail : ~1900 chars
        * Yahoo Mail : ~7000 chars
        * Client : ~1500 chars
        * (limitations are after url encoding)
        
        * Mail clients statistics for France pop :
        * 1 - Orange => ~27%
        * 2 - Hotmail/Outlook => ~19%
        * 3 - Gmail => ~19%
        * 4 - SFR => ~11%
        * 5 - Yahoo => ~11%
        *
        * Source : http://www.journaldunet.com/ebusiness/le-net/classement-services-mail/
        
        * For mobile supports, only the client link will be displayed.