import React from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'
import { inject, observer } from 'mobx-react/index'

@inject('pokemonStore')
@observer
class Search extends React.Component {
  state = {
    pokemonName: ''
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    return (
      <Form inline className='m-3'>
        <FormControl
          name='pokemonName'
          type='text'
          placeholder='Search pokemon...'
          value={this.state.pokemonName}
          onChange={this.onChange}
        />
        <Button
          className='m-2'
          variant='outline-warning'
          onClick={() => {
            this.props.pokemonStore.setPokemonName(this.state.pokemonName)
            this.setState({ pokemonName: '' })
          }}
        >
          Search
        </Button>
        <Button
          className='m-2'
          variant='outline-warning'
          onClick={() => {
            this.props.pokemonStore.setPokemonName(this.state.pokemonName)
            this.props.pokemonStore.getPokemon()
          }}
        >
          Full Pokedex
        </Button>
      </Form>
    )
  }
}

export default Search
