import { h, Component } from 'preact'
import style from './style.scss'

import Step from '../step'
import InputLabel from '../input-label'
import Button from '../button'

export default class App extends Component {
  render(props) {
    return (
      <div>
        <Step title="Mes informations" number="1">
          <InputLabel labelText="Prénom" value="Micha" />
          <InputLabel labelText="Nom" value="Mazaheri" />
          <InputLabel labelText="Email" value="micha@mazaheri.me" />
        </Step>
        <Step title="Les magasins autour de moi" number="2">
          <InputLabel labelText="Prénom" value="Micha" />
          <InputLabel labelText="Nom" value="Mazaheri" />
          <InputLabel labelText="Email" value="micha@mazaheri.me" />
        </Step>
        <Step title="Envoyer mon message" number="3">
          <Button>Ouvrir ma messagerie</Button>
        </Step>
      </div>
    )
  }
}
