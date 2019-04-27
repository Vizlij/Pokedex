import React from 'react'
import PokemonCard from '../pokemonCard/PokemonCard'
import { CardGroup, Col, Container, Row } from 'react-bootstrap'
import Search from '../search/Search'
import PaginationPokedex from '../paginationPokedex/PaginationPokedex'
import DropdownPokedex from '../dropdownPokedex/DropdownPokedex'
import { inject, observer } from 'mobx-react'
import Header from '../../header/Header'
import FilterPokedex from '../filterPokedex/FilterPokedex'

@inject('pokemonStore')
@observer
class PokemonList extends React.Component {
  constructor (props) {
    super(props)
    this.props.pokemonStore.getPokemon()
  }

  render () {
    return (
      <div>
        <Header />
        <Container className='mt-5 col-10'>
          <Col className='d-flex justify-content-between p-3'>
            <Search />
            <DropdownPokedex />
          </Col>
          <Col className=''>
            <FilterPokedex />
          </Col>
          <CardGroup className='m-1'>
            <React.Fragment>
              <Row className='justify-content-center'>
                {this.props.pokemonStore.getPage.map(pokemon => (
                  <PokemonCard
                    key={pokemon.name}
                    name={pokemon.name}
                    url={pokemon.url}
                  />
                ))}
              </Row>
            </React.Fragment>
          </CardGroup>
          <Col className='col-md-12 mt-5 mb-5 d-flex justify-content-center'>
            <PaginationPokedex />
          </Col>
        </Container>
      </div>
    )
  }
}

export default PokemonList
