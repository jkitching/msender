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

const defaultMessage = `Bonjour,

Merci de rendre les animaux libres !

Bien cordialement

{{name}}`

const defaultMessageJeLeVeux = `Bonjour,

J’ai découvert que la marque “La Boulangère” proposait désormais des croissants et des pains au chocolat B’vegan. Malheureusement, lorsque je me suis rendu dans l’un de vos magasins (département {{department_code}}), je n’ai pas pu les trouver en rayon. Pourriez-vous me dire à quelle date ils seront disponibles ?

Vous en remerciant par avance

Bien cordialement

{{name}}



L214 Ethique & Animaux encourage le développement des alternatives végétales !`

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
  .add('default', () => (
    <MsenderContainer to={toJeLeVeux}
                      bcc={defaultBcc}
                      subject="Libération Animale"
                      message={defaultMessage} />
  ))
  .add('prefilled', () => (
    <MsenderContainer to={toJeLeVeux}
                      bcc={defaultBcc}
                      subject="Libération Animale"
                      message={defaultMessage}
                      first_name="John"
                      last_name="Appleseed"
                      email="john@apple.com" />
  ))


storiesOf('Msender/Deputies', module)
  .addDecorator(decoratorFn())
  .add('default', () => (
    <MsenderContainer to={deputiesFrance}
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
    <MsenderContainer to={deputiesFrance}
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
    <MsenderContainer to={toJeLeVeux}
                      bcc={defaultBcc}
                      subject="Produits la Boulangère B’vegan"
                      message={defaultMessageJeLeVeux}
                      select_department={DEPARTMENT_MODE_METROPOLITAN}
                      filter_recipient={FILTER_RECIPIENT_MANUAL}
                      filter_recipient_randomize={true}
                      step_two_title="Mes magasins" />
  ))
  .add('prefilled', () => (
    <MsenderContainer to={toJeLeVeux}
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
