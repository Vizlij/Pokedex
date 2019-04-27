import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { inject, observer } from 'mobx-react/index'

@inject('pokemonStore')
@observer
class DropdownPokedex extends React.Component {
  state = {
    dropItem: [10, 20, 50]
  }

  render () {
    return (
      <Dropdown className='m-4 p-0'>
        <Dropdown.Toggle variant='outline-warning'>
                    Amount Pokemon
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {this.state.dropItem.map(item => {
            return (
              <Dropdown.Item
                onClick={() => { this.props.pokemonStore.amountPokemon(this.props.pokemonStore.limit = item) }}
              >
                               Amount: {item}
              </Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default DropdownPokedex
