import style from '../styles/Import.module.scss';

export default function Import({ news }) {

  return (
    news?.length ?
      <div className="row">
        {
          news.map(news => (
            <div className="col-12 col-md-6 col-lg-4 mb-4 d-flex" key={ news.title }>
              <div className="card">
                <img
                  className={ `card-img-top ${style.cardImage}` }
                  src={ news.urlToImage } alt={ news.title } />
                <div className="card-body">
                  <h3 className="card-title">{news.title}</h3>
                  <div className="card-text">{news.description}</div>
                </div>
              </div>
            </div>
          ))
        }
      </div> :
      'No news available'
  )
}

export async function getServerSideProps() {
  const { retrieveNews } = await import('../axios')
  const news = await retrieveNews()
  return { props: { news: news.data.articles } }
}
