import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button from '../src/components/button'

storiesOf('Button', module)
  .add('enabled', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('disabled', () => (
    <Button onClick={action('clicked')} enabled={false}>Hello Button</Button>
  ))
