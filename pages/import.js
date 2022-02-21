import { useSelector } from 'react-redux'

import NewsList from '../components/news-list'
import Pagination from '../components/pagination'
import { newsSelector } from '../redux/newsSlice'
import SearchForm from '../components/search-form'
import ImportButton from '../components/import-button'

export default function Import() {

  const { newsResponse: { articles, totalResults } } = useSelector(newsSelector)

  return (
    <>
      <h1 className="mb-4">Import news</h1>
      <p className="mb-5">These news are retrieved using NewsApi.org API</p>

      <SearchForm />

      <NewsList news={ articles } selectable />

      <ImportButton />

      <Pagination count={ totalResults / 20 || 0 } />
    </>
  )
}
