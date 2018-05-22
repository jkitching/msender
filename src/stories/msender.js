import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { decoratorFn } from './decorators'
import MsenderContainer from '../components/msender'

import deputiesFrance from './stubs/deputies-france.json'

const defaultBcc = [
  {
    email: 'cyberaction-copie@l214.com'
  }
]

const defaultMessage = `Monsieur le Président de la République,
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

storiesOf('Msender/Deputies', module)
  .addDecorator(decoratorFn())
  .add('default', () => (
    <MsenderContainer to={deputiesFrance}
                      bcc={defaultBcc}
                      subject="EGalim : inscription de l’interdiction des élevages de poules en cage"
                      message={defaultMessage}
                      select_department={true}
                      select_to={false}
                      select_to_random={false}
                      step_two_title="Mes député·e·s"
                      filter_to_department={true}
                      enable_mailchimp={true}
                      mailchimp_source="msender-2018-debug" />
  ))
