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
