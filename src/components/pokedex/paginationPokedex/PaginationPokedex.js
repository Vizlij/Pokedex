import React from 'react'
import { inject, observer } from 'mobx-react'
import Pagination from 'react-paginating'
import './paginationPokedexStyle.css'

@inject('pokemonStore')
@observer
class PaginationPokedex extends React.Component {
  state = {
    currentPage: 1
  }

  handlePageChange = (page) => {
    this.setState({
      currentPage: page
    })
    this.props.pokemonStore.setOffset(((page - 1) * this.props.pokemonStore.limit))
  }

  render () {
    const { limit, pageCount } = this.props.pokemonStore
    const total = this.props.pokemonStore.pokeStore.length
    const { currentPage } = this.state
    return (
      <Pagination
        className='myPag'
        total={total}
        limit={limit}
        pageCount={pageCount}
        currentPage={currentPage}
      >
        {({
          pages,
          currentPage,
          hasNextPage,
          hasPreviousPage,
          previousPage,
          nextPage,
          totalPages,
          getPageItemProps
        }) => (
          <div>
            <button
              className='pagBtn'
              {...getPageItemProps({
                pageValue: 1,
                onPageChange: this.handlePageChange
              })}
            >
                            First
            </button>
            {hasPreviousPage && (
              <button
                className='pagBtn'
                {...getPageItemProps({
                  pageValue: previousPage,
                  onPageChange: this.handlePageChange
                })}
              >
                {'<'}
              </button>
            )}
            {pages.map(page => {
              return (
                <button
                  className='pagBtn'
                  {...getPageItemProps({
                    pageValue: page,
                    key: page,
                    style: currentPage === page ? { backgroundColor: '#FFC107', color: '#000' } : null,
                    onPageChange: this.handlePageChange
                  })}
                >
                  {page}
                </button>
              )
            })}
            {hasNextPage && (
              <button
                className='pagBtn'
                {...getPageItemProps({
                  pageValue: nextPage,
                  onPageChange: this.handlePageChange
                })}
              >
                {'>'}
              </button>
            )}
            <button
              className='pagBtn'
              {...getPageItemProps({
                pageValue: totalPages,
                onPageChange: this.handlePageChange
              })}
            >
                            Last
            </button>
          </div>
        )}
      </Pagination>
    )
  }
}

export default PaginationPokedex
