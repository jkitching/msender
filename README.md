# Msender – The L214 email interpellator

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

## Example of use
```
<div data-widget-host="habitat" class="preview">
  <script type="text/props">
  {
      "to": [
        {
          "first_name": "John",
          "last_name": "Appleseed"
          "organization": "Apple Inc.",
          "email": "john@apple.com",
          "gender": "m",
          "format": "titlefull",
          "department_code": null
        }
      ],
      "bcc": [
        {
          "email": "cyberaction-copie@l214.com"
        }
      ],
      "subject": "Hi Apple",
      "message": "Bonjour,\n\nApple\n\n{{name}}",
      "select_department": "metropolitan",
      "filter_recipient": "manual",
      "filter_recipient_randomize": true,
      "step_two_title": "Mes magasins"
  }
  </script>
</div>
<script async src="msender/bundle.js"></script>
```

## Parameters

### `to`

A list of `Recepient` objects to list the available email recepients. See below for a full spec of the `Recepient` object. For example:

```json
[
  {
    "first_name": "John",
    "last_name": "Appleseed"
    "organization": "Apple Inc.",
    "email": "john@apple.com",
    "gender": "m",
    "format": "titlefull",
    "department_code": null
  }
]
```

### `cc`

A list of `Recepient` objects to list the available email `cc` targets.

### `bcc`

A list of `Recepient` objects to list the available email `bcc` targets. For example:

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

The email message. Can be templated with the following tags:

| Tag | Description |
| --- | ----------- |
| `{{name}}` | The sender's full name (e.g. "John Appleseed") |
| `{{first_name}}` | The sender's first name (e.g. "John") |
| `{{last_name}}` | The sender's last name (e.g. "Appleseed") |
| `{{department_name}}` | The sender's department name (e.g. "Nord") |
| `{{department_code}}` | The sender's department code as a string (e.g. "59") |

### `filter_recipient`

How the recipient list (the `to` parameter described above) should be filtered. The possible values are:

| Value | Description |
| ----- | ----------- |
| `all` (default) | Always send to all recipient list |
| `manual` | Will add a select field to let the user choose one recipient in the list |
| `department` | Will add a select to choose a French department and will filter recipient by department |

### `select_department`

What departments to show in the list. Possible values are:

| Value | Description |
| ----- | ----------- |
| `null` | No department picker will be shown (no department in the list) |
| `default` | Only "real" departments (Metropolitan and DROM) |
| `metropolitan` | Only metropolitan departments |
| `legislative` | All legislative departments (also includes French overseas collectivities, New Caledonia and Constituencies for French residents overseas) |

### `step_two_title`

The title to be displayed on step two (by default will display *Destinataires*).

### `enable_mailchimp`

Enable newsletter subscription via MailChimp (boolean, default is `false`). If enabled, a checkbox will ask user consent to subscribe to the newsletter (initial state of the checkbox is controlled by `send_mailchimp`).

### `send_mailchimp`

Initial state of the MailChimp subscription checkbox.

### `mailchimp_source`

MailChimp source (by default `msender`).

## `Recepient` object

| Field | Description |
| ----- | ----------- |
| `first_name` | Recepient's first name (e.g. "John") |
| `last_name` | Recepient's first name (e.g. "Appleseed") |
| `organization` | Recepient's organization name (e.g. "Apple Inc.") |
| `email` | Recepient's email address (e.g. "john@apple.com") |
| `gender` | Recepient's gender for title display (see possible values below) |
| `format` | Formatting of the recipient's full name (see possible values below) |
| `department_code` | Recepient's department code (for department filtering) |


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

## Email client specificities (2015 research)

### Webmails specificities

* Hotmail : BCC can't be autocompleted with URL parameter
* Yahoo : subject can't be autocompleted with URL parameter; only one email adress per field can be passed with the     URL parameters (emails seperation is done with JS so semicolons won't work)
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

Source : http://www.journaldunet.com/ebusiness/le-net/classement-services-mail/

* For mobile supports, only the client link will be displayed.
