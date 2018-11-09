# Msender – Create beautiful forms to interpellate decision-makers

![](https://cl.ly/05a5f5e39dc9/Image%2525202018-10-26%252520at%2525204.13.00%252520PM.png)

## Example & Demo

```html
<div data-widget-host="habitat" class="preview">
  <script type="text/props">
  {
    "to": [{
        "first_name": "London",
        "last_name": "Breed",
        "email": "major@sfgov.org",
        "format": "full"
      },
      {
        "first_name": "Eric",
        "last_name": "Garcetti",
        "email": "major@lamayor.org",
        "format": "full"
      }
    ],
    "bcc": [{
      "email": "cyberaction-copie@l214.com"
    }],
    "subject": "Vote YES! on Proposition 12",
    "message": "Dear Sir or Madam,\n\nPlease vote on California Prop 12.\n\nRegards,\n\n{{name}}",
    "filter_recipient": "manual",
    "filter_recipient_randomize": true,
    "step_two_title": "My representatives",
    "messengers": [
      "gmail",
      "applemail",
      "outlook",
      "thunderbird",
      "windowslivemail",
      "yahoo",
      "live"
    ],
    "locale": "en-EN"
  }
  </script>
</div>
<script async src="https://unpkg.com/@l214/msender@2.0.5/build/bundle.js"></script>
```

➡️ [See a demo](https://009118p7kl.codesandbox.io/)

## Parameters

### `to`

A list of `Recipient`s to send the email to. Can be filtered based on user inputs (see `filter_recipient`). See below for a full spec of the `Recipient` object.

Example:

```json
[
  {
    "first_name": "John",
    "last_name": "Appleseed",
    "organization": "Apple Inc.",
    "email": "john@apple.com",
    "gender": "m",
    "format": "titlefull",
    "department_code": null
  }
]
```

### `cc`

A list of `Recipient`s to send the email to as `cc`.

### `bcc`

A list of `Recipient`s to send the email to as `bcc`.


Example:

```json
[
  {
    "email": "cyberaction-copie@l214.com"
  }
]
```

### `subject`

The email subject.

### `message`

The email message. Can be templated with the following variables:

| Tag | Description |
| --- | ----------- |
| `{{name}}` | The sender's full name (e.g. "John Appleseed") |
| `{{first_name}}` | The sender's first name (e.g. "John") |
| `{{last_name}}` | The sender's last name (e.g. "Appleseed") |
| `{{department_name}}` | The sender's French department name (e.g. "Nord") |
| `{{department_code}}` | The sender's French department code as a string (e.g. "59") |


Example: 

```json
  {
    "message": "Hello, my name is {{name}}"
  }
]
```

### `filter_recipient`

How the recipient list (the `to` parameter described above) should be filtered. Possible values are:

| Value | Description |
| ----- | ----------- |
| `all` (default) | Always send to all recipient list |
| `manual` | Will add a select field to let the user choose one recipient in the list |
| `department` | Will add a select to choose a French department and will filter recipient by department |

### `select_department`

What French departments to show in the list. Possible values are:

| Value | Description |
| ----- | ----------- |
| `null` | No department picker will be shown (no department in the list) |
| `default` | Only "real" departments (Metropolitan and DROM) |
| `metropolitan` | Only metropolitan departments |
| `legislative` | All legislative departments (also includes French overseas collectivities, New Caledonia and Constituencies for French residents overseas) |

### `step_two_title`

The title to be displayed on step two (by default will display *Destinataires*).

### `enable_mailchimp`

If enabled, a checkbox will ask user consent to subscribe to the newsletter (see `send_mailchimp`).

### `send_mailchimp`

Initial state of the MailChimp subscription checkbox.

### `mailchimp_source`

MailChimp source (by default `msender`).

### `locale`

The locale (language and country) to use for internationalization. By default, it falls back to the browser's locale, or English (`en`) if not available.

The following language codes are currently supported: `en`, `fr`, `de`, `es`, `pt`, `it`, `nl`.

The UI elements are currently only translated in English and French. You can use the `translations` key to add custom translations.


Example:

```js
locale: 'es-ES'
```


### `translations`

Override the current translation strings or add additional languages.

Example:

```js
translations: {
  es: {
    step_my_infos: 'Mi informacion'
  }
}
```

To get a list of all required strings for a new languages, see `src/translations/en.js`.

### `messengers`

Email clients to enable. If not provided or `null`, all available ones will be included in the list.

Example:

```js
messengers: [
  'applemail',
  'gmail'
]
```

Possible values are:

| ID   | Name | Countries |
| ---- | ---- | --------- |
| `thunderbird` | Thunderbird | *Worldwide* 🌎 |
| `applemail` | Apple Mail | *Worldwide* 🌎 |
| `outlook` | Outlook | *Worldwide* 🌎 |
| `windowslivemail` | Windows Live Mail | *Worldwide* 🌎 |
| `gmail` | Gmail | *Worldwide* 🌎 |
| `yahoo` | Yahoo! | *Worldwide* 🌎 |
| `live` | Live | *Worldwide* 🌎 |
| `othernone` | Other (uses `mailto:`) | *Worldwide* 🌎 |
| `orange` | Orange | *France* 🇫🇷 |
| `sfr` | SFR | *France* 🇫🇷 |
| `laposte` | Laposte.net | *France* 🇫🇷 |

## `Recipient` object

| Field | Description |
| ----- | ----------- |
| `first_name` | Recipient's first name (e.g. "John") |
| `last_name` | Recipient's first name (e.g. "Appleseed") |
| `organization` | Recipient's organization name (e.g. "Apple Inc.") |
| `email` | Recipient's email address (e.g. "john@apple.com") |
| `gender` | Recipient's gender for title display (see possible values below) |
| `format` | Formatting of the Recipient's full name (see possible values below) |
| `department_code` | Recipient's department code (for department filtering) |


Possible `gender` values:

| Value | Description |
| ----- | ----------- |
| `m` | Male (e.g. "M. Édouard Philippe") |
| `f` | Female (e.g. "Mme. Frédérique Vidal") |
| `n` | Neutral (applies for organization or when the gender is non-binary or unknown) |

Possible `format` values:

| Value | Description |
| ----- | ----------- |
| `title` | e.g. "M. Macron" |
| `full` | e.g. "Emmanuel Macron" |
| `titlefull` | e.g. "M. Emmanuel Macron" |
| `org` | e.g. "Présidence de la République" |

## Development

### Prerequisites

* [nvm](https://github.com/creationix/nvm) (or npm > 8.10.0)
* [Yarn](https://yarnpkg.com/en/)

### Install

```shell
nvm use
yarn install
```

### Run

To start the development server:

```shell
yarn run start
```

### Storybook

A React [Storybook](https://storybook.js.org/) is available:

```shell
yarn run storybook
```

### Test

Unit tests can be run with:

```shell
yarn run test
```

### Build

To build a production ready bundle (in `./build/`):

```shell
yarn run build
```

## Publish on NPM

```shell
yarn run build && npm publish --access public
```

## Roadmap

Generally speaking, we aim to make this codebase less specific to L214's use and less specific to the French environment (yay to a more international Msender!).

* Move away from [CSS Modules](https://github.com/css-modules/css-modules) and make it possible to have different themes (and override themes), so users can customize it to adapt to their style guidelines
* Filter by Department is very specific to France and should be made more flexible: either making it outside the project, or making a more generic "filter by region" with a country locale (French departments, US states, German Länder, etc.) (the field `Recipient.department_code` in not generic)
* Translate the Recipient titles (currently `M.` and `Mme` in French)
* Add the ability to add more custom email clients (to fit speicific users and country use-cases)

## Email client specificities (2015 research)

### Webmails specificities

* Hotmail : BCC can't be autocompleted with URL parameter
* Yahoo : subject can't be autocompleted with URL parameter; only one email adress per field can be passed with the     URL parameters (emails seperation is done with JS so semicolons won't work)
* Free : body can't be autocompleted with URL parameter
* Orange, SFR, Laposte won't take any URL parameter

#### Misc info

* GET requests characters limitations by webmail:
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

Source : http://www.journaldunet.com/ebusiness/le-net/classement-services-mail/

* For mobile supports, only the client link will be displayed.

## License

[MIT License](LICENSE)
