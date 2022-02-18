import moment from 'moment'
import Pagination from '../components/pagination';

const PER_PAGE = 20

export default function News ({ news, count, page }) {
  return (
    <>
      <h1 className="mb-4">Imported news</h1>
      <p>These news have been imported and don't depend on NewsApi.org external API to function</p>
      {
        news.length ?
          <>
            <div className="accordion" id="news-accordion">
              {
                news.map(news => (
                  <div className="accordion-item" key={ news._id }>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target={ `#col-${news._id}` }>
                        { news.title }
                      </button>
                    </h2>
                    <div
                      className="accordion-collapse collapse"
                      id={ `col-${news._id}` }
                      data-bs-parent="#news-accordion">
                      <div className="accordion-body">
                        <div className="row">
                          <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
                            <img className="mw-100" src={ news.urlToImage } alt={ news.title } />
                          </div>
                          <div className="col-12 col-md-8 d-flex flex-column">
                            <div className="mb-3 flex-grow-1">{ news.description }</div>
                            <div className="text-muted small d-flex justify-content-between align-items-center">
                              <a className="btn btn-primary" href={ news.url } target="_blank" rel="noreferrer">
                                Learn more
                              </a>
                              Date: { moment(news.publishedAt).format('YYYY-MM-DD HH:mm:ss') }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <Pagination count={ count } page={ page } path={ '/news' } />
          </> :
          <h5>No news have been imported yet</h5>
      }
    </>
  );
}

export async function getServerSideProps({ query }) {

  const { News } = await import('../mongo')

  const page = Math.max(1, query.page) || 1

  let news = await News
    .find({})
    .limit(PER_PAGE)
    .skip(PER_PAGE * (page - 1))
  const count = await News.count()
  // NextJS really doesn't like MongoDB ObjectID type
  news = JSON.parse(JSON.stringify(news))

  return { props: { news, count, page } }
}
