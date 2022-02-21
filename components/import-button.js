import { useDispatch, useSelector } from 'react-redux'
import { fetchImport, importSelector } from '../redux/importSlice'
import { newsSelector } from '../redux/newsSlice'

export default function ImportButton() {

  const { newsResponse } = useSelector(newsSelector)
  const { success, errors, loading: importLoading, selected } = useSelector(importSelector)
  const dispatch = useDispatch()

  const importNews = async () => {
    dispatch(fetchImport())
  }

  return newsResponse.articles?.length > 0 &&
    <>
      <div className="my-4 text-end">
        <button
          onClick={ importNews }
          className="btn btn-primary"
          disabled={ importLoading || !Object.keys(selected).length }>
          { importLoading ? 'Loading...' : `Import ${ Object.keys(selected).length } selected articles` }
        </button>
      </div>
      {
        success && (
          <div className="my-4 alert alert-success">
            Imported Successfully!
            {
              !!success.length && (
                <ul>
                  {
                    success.map(message => (
                      <li key={ message }>{ message }</li>
                    ))
                  }
                </ul>
              )
            }
          </div>
        )
      }
      {
        !!errors?.length && (
          <div className="my-4 alert alert-warning">
            Errors encountered while importing:
            <ul>
              {
                errors.map(message => (
                  <li key={ message }>{ message }</li>
                ))
              }
            </ul>
          </div>
        )
      }
    </>
}
