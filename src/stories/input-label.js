import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { decoratorFn } from './decorators'
import InputLabel from '../components/input-label'

storiesOf('Controls/Input Label', module)
  .addDecorator(decoratorFn({ style: { maxWidth: '500px' }}))
  .add('enabled', () => (
    <InputLabel renderLabelText={() => "Some label"}
                value="Some static value"
                onInput={action('input')}
                onChange={action('change')} />
  ))
  .add('enabled email', () => (
    <InputLabel renderLabelText={() => "Some label"}
                inputType="email"
                value="Some static value"
                onInput={action('input')}
                onChange={action('change')} />
  ))
