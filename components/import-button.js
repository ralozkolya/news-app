import { useDispatch, useSelector } from 'react-redux'
import { fetchImport, importSelector } from '../redux/importSlice'
import { newsSelector } from '../redux/newsSlice'

export default function ImportButton() {

  const { newsResponse } = useSelector(newsSelector)
  const { success, loading: importLoading, selected } = useSelector(importSelector)
  const dispatch = useDispatch()

  const importNews = async () => {
    dispatch(fetchImport())
  }

  return newsResponse.articles?.length > 0 &&
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
          disabled={ importLoading || !Object.keys(selected).length }>
          { importLoading ? 'Loading...' : 'Import selected' }
        </button>
      </div>
    </>
}
