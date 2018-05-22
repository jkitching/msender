import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import CopyButton from '../components/button-copy'

storiesOf('Controls/Button Copy', module)
  .add('default', () => (
    <CopyButton value="Some text to copy" />
  ))
