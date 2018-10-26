import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { decoratorFn } from './decorators'
import MsenderContainer from '../components/msender'
import { FILTER_RECIPIENT_ALL,
         FILTER_RECIPIENT_MANUAL,
         FILTER_RECIPIENT_DEPARTMENT } from '../models/msender'
import { DEPARTMENT_MODE_DEFAULT,
         DEPARTMENT_MODE_METROPOLITAN,
         DEPARTMENT_MODE_LEGISLATIVE } from '../models/department'

import deputiesFrance from './stubs/deputies-france.json'

const defaultBcc = [
  {
    email: 'cyberaction-copie@l214.com'
  }
]

const defaultMessageEn = `Hi,

Please set all animals free!

Kind regards,

{{name}}`

const defaultMessageFr = `Bonjour,

Merci de rendre les animaux libres !

Bien cordialement

{{name}}`

const defaultMessageJeLeVeux = `Bonjour,

J’ai découvert que la marque “La Boulangère” proposait désormais des croissants et des pains au chocolat B’vegan. Malheureusement, lorsque je me suis rendu dans l’un de vos magasins (département {{department_code}}), je n’ai pas pu les trouver en rayon. Pourriez-vous me dire à quelle date ils seront disponibles ?

Vous en remerciant par avance

Bien cordialement

{{name}}



L214 Ethique & Animaux encourage le développement des alternatives végétales !`

const defaultCaliProp12 = `Dear Sir or Madam,

Please vote "yes" on California Prop 12.

Regards,

{{name}}`

const toJeLeVeux = [
  {
    "organization": "E.Leclerc",
    "email": "service.conso@e-leclerc.com",
    "format": "org"
  },
  {
    "organization": "Intermarché",
    "email": "intermarche@mousquetaires.com",
    "format": "org"
  },
  {
    "organization": "Auchan",
    "email": "auchansuper_contact@auchan.fr",
    "format": "org"
  },
  {
    "organization": "Carrefour",
    "email": "carrefour-service-clients@carrefour.fr",
    "format": "org"
  },
  {
    "organization": "Monoprix",
    "email": "service.client@monoprix.fr",
    "format": "org"
  },
  {
    "organization": "Lidl",
    "email": "contact@lidl.fr",
    "format": "org"
  },
  {
    "organization": "Simply Market",
    "email": "contact_simplymarket@auchan.fr",
    "format": "org"
  },
  {
    "organization": "Casino",
    "email": "sceconsommateurs@groupe-casino.fr",
    "format": "org"
  },
  {
    "organization": "Aldi",
    "email": "contact@aldi.fr",
    "format": "org"
  },
  {
    "organization": "Super U",
    "email": "contact_magasinsu@systeme-u.fr",
    "format": "org"
  }
]

const toCaliProp12 = [
  {
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
  },
  {
    "first_name": "Darrell",
    "last_name": "Steinberg",
    "email": "major@cityofsacramento.org",
    "format": "full"
  }
]

const defaultMessageDeputies = `Monsieur le Président de la République,
Monsieur le Premier Ministre,
Monsieur le Président de l’Assemblée nationale,
Monsieur le Ministre,
Mesdames et Messieurs les Députés,
Mesdames, Messieurs,

L’enquête révélée lundi 14 mai par l’association L214 montre des poules pondeuses subissant un véritable calvaire, enfermées à vie dans des cages. Ces images ont suscité mon indignation.

Le projet de loi issu des États généraux de l’alimentation sera discuté en séance publique à l’Assemblée nationale la semaine prochaine. Lors de la consultation publique, l’arrêt des cages est arrivé parmi les contributions les plus soutenues. C’est pourquoi je m’adresse à vous afin que vous exprimiez publiquement votre soutien à une inscription dans la loi de l’interdiction des élevages de poules en cage et des mesures pour réduire la souffrance des animaux dans les élevages et les abattoirs. Il est également important de soutenir les mesures favorisant la végétalisation de l’aliLe projet dans les cantines.

À l’Élysée, à Matignon, au ministère de l’Agriculture et à l’Assemblée nationale : le message que vous porterez sera décisif ; il en va de votre responsabilité. En tant que citoyen, je serai attentif aux positions qui seront prises pendant ces discussions.

Comptant sur votre pleine mobilisation, je vous prie de croire, Mesdames, Messieurs, en l’expression de ma très respectueuse considération.

{{name}}
{{department_name}} ({{department_code}})`


storiesOf('Msender/Simple', module)
  .addDecorator(decoratorFn())
  .add('default (en)', () => (
    <MsenderContainer locale="en-US"
                      to={toJeLeVeux}
                      bcc={defaultBcc}
                      subject="Animal Liberation"
                      message={defaultMessageEn} />
  ))
  .add('prefilled (en)', () => (
    <MsenderContainer locale="en-US"
                      to={toJeLeVeux}
                      bcc={defaultBcc}
                      subject="Animal Liberation"
                      message={defaultMessageEn}
                      first_name="John"
                      last_name="Appleseed"
                      email="john@apple.com" />
  ))
  .add('default (fr)', () => (
    <MsenderContainer locale="fr-FR"
                      to={toJeLeVeux}
                      bcc={defaultBcc}
                      subject="Libération Animale"
                      message={defaultMessageFr} />
  ))
  .add('prefilled (fr)', () => (
    <MsenderContainer locale="fr-FR"
                      to={toJeLeVeux}
                      bcc={defaultBcc}
                      subject="Libération Animale"
                      message={defaultMessageFr}
                      first_name="Jean"
                      last_name="Pépindepomme"
                      email="jean@pepindepomme.fr" />
  ))
  .add('override (fr)', () => (
    <MsenderContainer locale="fr-FR"
                      to={toJeLeVeux}
                      bcc={defaultBcc}
                      subject="Libération Animale"
                      message={defaultMessageFr}
                      translations={{
                        fr: {
                          step_my_infos: 'Mes super infos'
                        }
                      }} />
  ))
  .add('default (es)', () => (
    <MsenderContainer locale="es-ES"
                      to={toJeLeVeux}
                      bcc={defaultBcc}
                      subject="Libération Animale"
                      message={defaultMessageFr}
                      translations={{
                        es: {
                          /* warning! these are Google Translations :) */
                          step_my_infos: 'Mi informacion',
                          step_send: 'Enviar mi mensaje',
                          label_first_name: 'Primer nombre',
                          label_last_name: 'Apellido',
                          label_email: 'Email',
                          label_department: 'Departamento',
                          label_recipient: 'Beneficiario',
                          label_email_client: 'Mensajería',
                          label_email_subscription: 'Mantenerme informado sobre las próximas campañas y acciones de L214.',
                          label_value_send_to: 'Enviar a :',
                          label_value_subject: 'Asunto:',
                          label_value_message: 'Mensaje :',
                          label_value_message_hint: '(puedes modificarlo en tu buzón)',
                          label_copy_action: 'Copiador',
                          label_copy_done: '¡Está copiado!',
                          label_send_button_link: 'Enviar el mensaje',
                          label_send_button_open: 'Abre mi correo',
                          copy_advice: 'Copie los destinatarios, el asunto y el mensaje en su correo electrónico',
                        }
                      }} />
  ))


storiesOf('Msender/Deputies', module)
  .addDecorator(decoratorFn())
  .add('default', () => (
    <MsenderContainer locale="fr-FR"
                      to={deputiesFrance}
                      bcc={defaultBcc}
                      subject="EGalim : inscription de l’interdiction des élevages de poules en cage"
                      message={defaultMessageDeputies}
                      select_department={DEPARTMENT_MODE_LEGISLATIVE}
                      filter_recipient={FILTER_RECIPIENT_DEPARTMENT}
                      filter_recipient_randomize={false}
                      step_two_title="Mes député·e·s"
                      enable_mailchimp={true}
                      mailchimp_source="msender-2018-debug" />
  ))
  .add('prefilled', () => (
    <MsenderContainer locale="fr-FR"
                      to={deputiesFrance}
                      bcc={defaultBcc}
                      subject="EGalim : inscription de l’interdiction des élevages de poules en cage"
                      message={defaultMessageDeputies}
                      select_department={DEPARTMENT_MODE_LEGISLATIVE}
                      filter_recipient={FILTER_RECIPIENT_DEPARTMENT}
                      filter_recipient_randomize={false}
                      step_two_title="Mes député·e·s"
                      enable_mailchimp={true}
                      mailchimp_source="msender-2018-debug"
                      first_name="John"
                      last_name="Appleseed"
                      email="john@apple.com" />
  ))


storiesOf('Msender/JeLeVeux.l214.com', module)
  .addDecorator(decoratorFn())
  .add('default', () => (
    <MsenderContainer locale="fr-FR"
                      to={toJeLeVeux}
                      bcc={defaultBcc}
                      subject="Produits la Boulangère B’vegan"
                      message={defaultMessageJeLeVeux}
                      select_department={DEPARTMENT_MODE_METROPOLITAN}
                      filter_recipient={FILTER_RECIPIENT_MANUAL}
                      filter_recipient_randomize={true}
                      step_two_title="Mes magasins" />
  ))
  .add('prefilled', () => (
    <MsenderContainer locale="fr-FR"
                      to={toJeLeVeux}
                      bcc={defaultBcc}
                      subject="Produits la Boulangère B’vegan"
                      message={defaultMessageJeLeVeux}
                      select_department={DEPARTMENT_MODE_METROPOLITAN}
                      filter_recipient={FILTER_RECIPIENT_MANUAL}
                      filter_recipient_randomize={true}
                      step_two_title="Mes magasins"
                      first_name="John"
                      last_name="Appleseed"
                      email="john@apple.com" />
  ))

storiesOf('Msender/California Prop 12', module)
  .addDecorator(decoratorFn())
  .add('default', () => (
    <MsenderContainer locale="en-EN"
                      to={toCaliProp12}
                      subject="Vote YES! on Proposition 12"
                      message={defaultCaliProp12}
                      filter_recipient={FILTER_RECIPIENT_MANUAL}
                      filter_recipient_randomize={true}
                      step_two_title="My representatives"
                      messengers={[
                        'gmail',
                        'applemail',
                        'outlook',
                        'thunderbird',
                        'windowslivemail',
                        'yahoo',
                        'live',
                      ]} />
  ))
  .add('prefilled', () => (
    <MsenderContainer locale="en-EN"
                      to={toCaliProp12}
                      subject="Vote YES! on Proposition 12"
                      message={defaultCaliProp12}
                      filter_recipient={FILTER_RECIPIENT_MANUAL}
                      filter_recipient_randomize={true}
                      step_two_title="My representatives"
                      first_name="John"
                      last_name="Appleseed"
                      email="john@apple.com"
                      messengers={[
                        'gmail',
                        'applemail',
                        'outlook',
                        'thunderbird',
                        'windowslivemail',
                        'yahoo',
                        'live',
                      ]} />
  ))
