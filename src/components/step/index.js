import { h } from 'preact'
import style from './style.scss'

import StepTitle from '../step-title'

const Step = props => {
  return (
    <div>
      <StepTitle number={props.number}>{props.title}</StepTitle>
      {props.children}
    </div>
  )
}

export default Step
