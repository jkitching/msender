import React from 'react'
import style from './style.scss'

const StepTitle = props => {
  return (
    <h3 className={style.step_title}>
      <span className={style.step_number}>{props.number}</span>
      <span className={style.step_text}>{props.children}</span>
      <hr className={style.step_hr} />
    </h3>
  )
}

export default StepTitle
