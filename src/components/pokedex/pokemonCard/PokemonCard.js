import React from 'react'
import { Alert, Card, Spinner } from 'react-bootstrap'
import './PokemonCardStyle.css'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react/index'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: black;
  }
`

@inject('pokemonStore')
@observer
class PokemonCard extends React.Component {
  state = {
    name: '',
    imageUrl: '',
    pokemonIndex: '',
    imageLoading: true,
    toManyRequests: false
  }

  componentDidMount () {
    const { name, url } = this.props
    const pokemonIndex = url.split('/')[url.split('/').length - 2]
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`
    this.setState({
      name,
      imageUrl,
      pokemonIndex
    })
  }

  render () {
    return (
      <StyledLink to={`/pokemon/${this.state.pokemonIndex}`}>
        <Card style={{ width: '16rem', height: '17rem' }} className='m-2 cardHover justify-content-center'>
          <Card.Header className='text-center'>{this.state.pokemonIndex}</Card.Header>
          <Card.Body className='text-center'>
            <Card.Title className='mx-auto'>{this.state.name.toUpperCase()}</Card.Title>
            {this.state.imageLoading ? (
              <Spinner animation='border' role='status'>
                <span className='sr-only'>Loading...</span>
              </Spinner>
            ) : null}
            <Card.Img
              className='card-img-top col-lg-10'
              src={this.state.imageUrl}
              onLoad={() => this.setState({ imageLoading: false })}
              onError={() => this.setState({ toManyRequests: true })}
            />
            {this.state.toManyRequests ? (
              <h6 className='mx-auto'>
                <Alert variant='danger' className='mt-2'>There is a request ..</Alert>
              </h6>
            ) : null}
          </Card.Body>
        </Card>
      </StyledLink>
    )
  }
}

export default PokemonCard
