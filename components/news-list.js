import moment from 'moment'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { importSelector, setSelected } from '../redux/importSlice'

export default function NewsList({ news = [], selectable }) {

  const { selected } = useSelector(importSelector)
  const dispatch = useDispatch()

  const [ allSelected, setAllSelected ] = useState(false)
  const [ parentId ] = useState(`id-${ Math.floor(Math.random() * 1000) }`)

  const handleSelect = article => {
    dispatch(
      setSelected({
        id: article.id,
        value: article.id in selected ? null : article
      })
    )
  }

  const handleSelectAll = ({ target: { checked } }) => {
    news.forEach(article => {
      dispatch(
        setSelected({
          id: article.id,
          value: checked ? article : null
        })
      )
    })
    setAllSelected(checked)
  }

  return (
    news.length ?
      <>
        {
          selectable && (
            <div className="m-3">
              <label>
                <input className="me-3" type="checkbox" onChange={ handleSelectAll } />
                { allSelected ? 'Deselect all' : 'Select all' }
              </label>
            </div>
          )
        }
        <div className="accordion mb-3" id={ parentId }>
          {
            news.map(article => (
              <div className="accordion-item" key={ article.id }>
                <h2 className="accordion-header d-flex">
                  {
                    selectable &&
                      <input
                        className="mx-3"
                        type="checkbox"
                        onChange={ () => handleSelect(article) }
                        checked={ article.id in selected } />
                  }
                  <button
                    className="accordion-button collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target={`#col-${ article.id }`}>
                    {article.title}
                  </button>
                </h2>
                <div
                  className="accordion-collapse collapse"
                  id={`col-${ article.id }`}
                  data-bs-parent={ `#${parentId}` }>
                  <div className="accordion-body">
                    <div className="row">
                      <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
                        <img className="mw-100" src={article.urlToImage} alt={article.title} />
                      </div>
                      <div className="col-12 col-md-8 d-flex flex-column">
                        <h4>{ article.title }</h4>
                        <div className="mb-3 flex-grow-1">{article.description}</div>
                        <div className="text-muted small d-flex justify-content-between align-items-center">
                          <a className="btn btn-primary" href={article.url} target="_blank" rel="noreferrer">
                            Learn more
                          </a>
                          Date: {moment(article.publishedAt).format('YYYY-MM-DD HH:mm:ss')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </> :
      <h5>No news have been found</h5>
  )
}

NewsList.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      publishedAt: PropTypes.string,
      url: PropTypes.string,
      urlToImage: PropTypes.string,
    })
  ),
  selectable: PropTypes.bool,
}
