import React from 'react'
import axios from 'axios'
import { Card, Container } from 'react-bootstrap'
import Header from '../../header/Header'
import './pokemonStyle.css'
import PokemonHeader from './pokemonHeader/PokemonHeader'
import PokemonMainStats from './pokemonMainStats/PokemonMainStats'
import PokemonProfile from './pokemonProfile/PokemonProfile'
import PokemonDescription from './pokemonDescription/PokemonDescription'
import PokemonTitle from './pokemonTitle/PokemonTitle'

class Pokemon extends React.Component {
  state = {
    name: '',
    pokemonIndex: '',
    imageUrl: '',
    types: [],
    description: '',
    stats: {
      hp: '',
      attack: '',
      defense: '',
      speed: '',
      specialAttack: '',
      specialDefense: ''
    },
    height: '',
    weight: '',
    eggGroup: '',
    abilities: '',
    genderRatioMale: '',
    genderRatioFemale: '',
    evs: '',
    hatchSteps: ''
  }

  async componentDidMount () {
    const { pokemonIndex } = this.props.match.params
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`

    const pokemonRes = await axios.get(pokemonUrl)
    const name = pokemonRes.data.name

    const imageUrl = pokemonRes.data.sprites.front_default

    let { hp, attack, defense, speed, specialAttack, specialDefense } = ''

    // pokemonRes.data.stats.forEach(stat => {
    //   this.setState({
    //     stats: {
    //       hp: stat.base_stat,
    //       attack: stat.base_stat,
    //       defense: stat.base_stat,
    //       speed: stat.base_stat,
    //       specialAttack: stat.base_stat,
    //       specialDefense: stat.base_stat
    //     }
    //   })
    // })

    pokemonRes.data.stats.forEach(stat => {
      switch (stat.stat.name) {
        case 'hp':
          hp = stat['base_stat']
          break
        case 'attack':
          attack = stat['base_stat']
          break
        case 'defense':
          defense = stat['base_stat']
          break
        case 'speed':
          speed = stat['base_stat']
          break
        case 'special-attack':
          specialAttack = stat['base_stat']
          break
        case 'special-defense':
          specialDefense = stat['base_stat']
          break
      }
    })

    const height =
            Math.round((pokemonRes.data.height * 0.328084 + 0.0001) * 100) / 100
    const weight =
            Math.round((pokemonRes.data.weight * 0.220462 + 0.0001) * 100) / 100

    const types = pokemonRes.data.types.map(type => type.type.name)

    const abilities = pokemonRes.data.abilities.map(ability => {
      return ability.ability.name.toLowerCase()
    }).join(', ')

    const evs = pokemonRes.data.stats.filter(stat => stat.effort > 0)
      .map(stat => `${stat.effort} ${stat.stat.name}`.toLowerCase()).join(', ')

    await axios.get(pokemonSpeciesUrl).then(res => {
      const description = res.data.flavor_text_entries.find(flavor => flavor.language.name === 'en').flavor_text
      const femaleRate = res.data[`gender_rate`]
      const genderRatioFemale = 12.5 * femaleRate
      const genderRatioMale = 12.5 * (8 - femaleRate)
      const catchRate = Math.round((100 / 255) * res.data[`capture_rate`])
      const eggGroups = res.data[`egg_groups`].map(group => group.name.toLowerCase()).join(', ')
      const hatchSteps = 255 * (res.data[`hatch_counter`] * 1)

      this.setState({
        description,
        genderRatioFemale,
        genderRatioMale,
        catchRate,
        eggGroups,
        hatchSteps
      })
    })

    this.setState({
      name,
      imageUrl,
      pokemonIndex,
      types,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense
      },
      height,
      weight,
      abilities,
      evs
    })
  }

  render () {
    return (
      <div>
        <Header />
        <Container className='col-9 mt-5'>
          <Card>
            <PokemonHeader
              pokemonIndex={this.state.pokemonIndex}
              types={this.state.types}
            />
            <Card.Body>
              <PokemonTitle name={this.state.name} />
              <Card.Text>
                <PokemonMainStats
                  imageUrl={this.state.imageUrl}
                  hp={this.state.stats.hp}
                  attack={this.state.stats.attack}
                  defense={this.state.stats.defense}
                  speed={this.state.stats.speed}
                  specialAttack={this.state.stats.specialAttack}
                  specialDefense={this.state.stats.specialDefense}
                />
                <PokemonDescription description={this.state.description} />
                <PokemonProfile
                  height={this.state.height}
                  weight={this.state.weight}
                  catchRate={this.state.catchRate}
                  genderRatioMale={this.state.genderRatioMale}
                  genderRatioFemale={this.state.genderRatioFemale}
                  eggGroups={this.state.eggGroups}
                  hatchSteps={this.state.hatchSteps}
                  abilities={this.state.abilities}
                  evs={this.state.evs}
                />
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </div>
    )
  }
}

export default Pokemon
