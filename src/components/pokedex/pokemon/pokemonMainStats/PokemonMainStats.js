import React from 'react'
import { Col, ProgressBar, Row } from 'react-bootstrap'

const PokemonMainStats = (props) => {
  return (
    <Row className='align-items-center'>
      <img
        className='rounded mx-auto mt-2 col-md-3'
        src={props.imageUrl}
      />
      <Col>
        <Row>
          <div className='col-12 col-md-3'>
            <span className='mySpan'>HP:</span>
          </div>
          <div className='col-12 col-md-9'>
            <ProgressBar
              variant='success'
              now={props.hp}
              label='HP' />
          </div>
        </Row>
        <Row>
          <div className='col-12 col-md-3'>
            <span className='mySpan'>Attack:</span>
          </div>
          <div className='col-12 col-md-9'>
            <ProgressBar
              variant='danger'
              now={props.attack}
              label='ATT' />
          </div>
        </Row>
        <Row>
          <div className='col-12 col-md-3'>
            <span className='mySpan'>Defense:</span>
          </div>
          <div className='col-12 col-md-9'>
            <ProgressBar
              variant='info'
              now={props.defense}
              label='DEF' />
          </div>
        </Row>
        <Row>
          <div className='col-12 col-md-3'>
            <span className='mySpan'>Speed:</span>
          </div>
          <div className='col-12 col-md-9'>
            <ProgressBar
              variant='warning'
              now={props.speed}
              label='SPEED' />
          </div>
        </Row>
        <Row>
          <div className='col-12 col-md-3'>
            <span className='mySpan'>Special Attack:</span>
          </div>
          <div className='col-12 col-md-9'>
            <ProgressBar
              variant='danger'
              now={props.specialAttack}
              label='S-ATT' />
          </div>
        </Row>
        <Row>
          <div className='col-12 col-md-3'>
            <span className='mySpan'>Special Defense:</span>
          </div>
          <div className='col-12 col-md-9'>
            <ProgressBar
              variant='info'
              now={props.specialDefense}
              label='S-DEF' />
          </div>
        </Row>
      </Col>
    </Row>
  )
}

export default PokemonMainStats
