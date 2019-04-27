import React from 'react'
import { inject, observer } from 'mobx-react/index'
import { Col, DropdownButton } from 'react-bootstrap'
import './filterPokedexType.css'
import TYPE_COLORS from '../../../utility/TypeColors'

@inject('pokemonStore')
@observer
class FilterPokedex extends React.Component {
  constructor (props) {
    super(props)
    this.props.pokemonStore.pokemonTypes()
  }

  render () {
    return (
      <Col className='col-12 d-flex justify-content-between mb-5'>
        <DropdownButton
          drop='down'
          variant='outline-warning'
          title='Filter pokemon type'
          className='m-0 p-0'
        >
          <li
            className='myBadge m-0 p-0 text-center font-weight-bold'
            onClick={() => this.props.pokemonStore.getPokemon()}
          >
                        -All-
          </li>
          {this.props.pokemonStore.pokeType.map(el => (
            <li
              key={el.name}
              className='myBadge m-0 p-0 text-center font-weight-bold'
              style={{ backgroundColor: `#${TYPE_COLORS[el.name]}` }}
              onClick={() => { this.props.pokemonStore.getPokemoType(el.url) }}
            >
              {el.name}
            </li>
          ))}
        </DropdownButton>
      </Col>
    )
  }
}

export default FilterPokedex
