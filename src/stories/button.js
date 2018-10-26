import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { decoratorFn } from './decorators'
import Button from '../components/button'

storiesOf('Controls/Button', module)
  .addDecorator(decoratorFn({ style: { maxWidth: '500px' }}))
  .add('enabled', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('disabled', () => (
    <Button onClick={action('clicked')} enabled={false}>Hello Button</Button>
  ))
  .add('link enabled', () => (
    <Button onClick={action('clicked')} isLink={true} href="https://www.l214.com">Hello Button</Button>
  ))
  .add('link disabled', () => (
    <Button onClick={action('clicked')} isLink={true} href="https://www.l214.com" enabled={false}>Hello Button</Button>
  ))
