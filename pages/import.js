import { useSelector, useDispatch } from 'react-redux'

import NewsList from '../components/news-list'
import Pagination from '../components/pagination'
import { newsSelector } from '../redux/newsSlice'
import { fetchImport, importSelector } from '../redux/importSlice'
import SearchForm from '../components/search-form'

export default function Import() {

  const { newsResponse } = useSelector(newsSelector)
  const { success, loading: importLoading } = useSelector(importSelector)
  const dispatch = useDispatch()

  const importNews = async () => {
    dispatch(fetchImport())
  }

  return (
    <>
      <h1 className="mb-4">Import news</h1>
      <p className="mb-5">These news are retrieved using NewsApi.org API</p>

      <SearchForm />

      <NewsList news={ newsResponse.articles } selectable />
      {
        newsResponse.articles?.length > 0 &&
          <>
            {
              success && (
                <div className="my-4 alert alert-success">
                  Imported Successfully!
                  <ul>
                    {
                      success.map(message => (
                        <li key={ message }>{ message }</li>
                      ))
                    }
                  </ul>
                </div>
              )
            }
            <div className="my-4 text-end">
              <button
                onClick={ importNews }
                className="btn btn-primary"
                disabled={ importLoading }>
                { importLoading ? 'Loading...' : 'Import selected' }
              </button>
            </div>
          </>
      }
      <Pagination count={ newsResponse.totalResults / 20 || 0 } />
    </>
  )
}
