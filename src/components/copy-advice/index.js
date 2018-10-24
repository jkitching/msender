import React from 'react'
import style from './style.scss'

const Arrow = (props) => {
  return (
    <svg width="132px" height="40px" viewBox="0 0 132 40">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2.5,19.5 L127.5,19.5" stroke="#FFFFFF" stroke-width="5"></path>
        <polyline stroke="#FFFFFF" stroke-width="5" points="112 2.72000122 129.5 19.3263358 112 36.8137512"></polyline>
      </g>
    </svg>
  )
}

const CopyAdvice = (props) => {
  return (
    <div className={style.copy_advice}>
      <span className={style.copy_advice_text}>Copiez les destinataires, l’objet et le message dans votre messagerie</span>
      <Arrow />
    </div>
  )
}

export default CopyAdvice
