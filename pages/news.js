import NewsList from '../components/news-list';
import Pagination from '../components/pagination';

const PER_PAGE = 20

export default function News ({ news, count, page }) {
  return (
    <>
      <h1 className="mb-4">Imported news</h1>
      <p className="mb-5">These news have been imported and don't depend on NewsApi.org external API to function</p>
      <>
        <NewsList news={ news } />
        <Pagination count={ count } page={ page } />
      </>
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
