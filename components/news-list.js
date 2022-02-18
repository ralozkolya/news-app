import moment from 'moment'
import PropTypes from 'prop-types'

export default function NewsList({ news = [], onSelect, selected }) {

  return (
    news.length ?
      <div className="accordion mb-3" id="news-accordion">
        {
          news.map(news => (
            <div className="accordion-item" key={ news.id }>
              <h2 className="accordion-header d-flex">
                {
                  onSelect?.call &&
                    <input
                      className="mx-3"
                      type="checkbox"
                      onChange={ () => onSelect(news) }
                      checked={ selected?.has(news.id) } />
                }
                <button
                  className="accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target={`#col-${ news.id }`}>
                  {news.title}
                </button>
              </h2>
              <div
                className="accordion-collapse collapse"
                id={`col-${ news.id }`}
                data-bs-parent="#news-accordion">
                <div className="accordion-body">
                  <div className="row">
                    <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
                      <img className="mw-100" src={news.urlToImage} alt={news.title} />
                    </div>
                    <div className="col-12 col-md-8 d-flex flex-column">
                      <div className="mb-3 flex-grow-1">{news.description}</div>
                      <div className="text-muted small d-flex justify-content-between align-items-center">
                        <a className="btn btn-primary" href={news.url} target="_blank" rel="noreferrer">
                          Learn more
                        </a>
                        Date: {moment(news.publishedAt).format('YYYY-MM-DD HH:mm:ss')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div> :
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
  onSelect: PropTypes.func,
  selected: PropTypes.instanceOf(Map)
}
