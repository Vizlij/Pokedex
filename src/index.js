import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'mobx-react'
import { HashRouter } from 'react-router-dom'
import pokemonStore from './store/PokemonStoreList'

const store = {
  pokemonStore
}

ReactDOM.render(<Provider {...store}>
  <HashRouter>
    <App />
  </HashRouter>
</Provider>, document.getElementById('root'))
registerServiceWorker()
