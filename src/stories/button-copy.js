import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { decoratorIntlFn } from './decorators'
import CopyButton from '../components/button-copy'

storiesOf('Controls/Button Copy', module)
  .addDecorator(decoratorIntlFn({ style: { maxWidth: '500px' }}))
  .add('default', () => (
    <CopyButton value="Some text to copy" />
  ))
