import { h } from 'preact'
import style from './style.scss'

import ValueField from '../value-field'

const s = `Bonjour,

J’ai découvert que la marque “la Boulangère” proposait désormais des croissants et des pains au chocolat B’vegan. Malheureusement, lorsque je me suis rendu dans votre magasin, je n’ai pas pu les trouver en rayon. Pourriez vous me dire à quel date ils seront disponibles ?

Vous en remerciant par avance

Bien Cordialement

Peter Singer`

const MessagePreview = props => {
  return (
    <div className={style.message_preview}>
      <ValueField labelText="Envoyer à :" value="service.clients@carrefour.fr" />
      <hr className={style.message_hr} />
      <ValueField labelText="Objet :" value="Produits la Boulangère B’vegan" />
      <hr className={style.message_hr} />
      <ValueField labelText="Message :" labelHint="(vous pourrez le modifier dans votre boite email)" value={s} multiline={true} />
    </div>
  )
}

export default MessagePreview
