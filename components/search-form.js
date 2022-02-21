import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNews, newsSelector } from '../redux/newsSlice'

export default function SearchForm() {

  const { loading: searchLoading, error: searchError } = useSelector(newsSelector)
  const dispatch = useDispatch()

  const [q, setQ] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [domains, setDomains] = useState('')
  const [excludeDomains, setExcludeDomains] = useState('')

  const [expanded, setExpanded] = useState(false)

  const { query } = useRouter()
  const page = Math.max(1, query.page) || 1

  const handleSubmit = async event => {
    event.preventDefault()
    retrieveNews()
  }

  const retrieveNews = async () => {
    const params = { q, page }
    if (expanded) {
      Object.assign(params, { from, to, domains, excludeDomains })
    }
    dispatch(fetchNews(params))
  }

  useEffect(() => {
    q && retrieveNews()
  }, [ page ])

  return (
    <>
      <form className="row mt-4" onSubmit={handleSubmit}>
        <div className={`col-12 col-md-6 mb-3 ${expanded ? 'col-lg-4' : 'col-lg-8'}`}>
          <label className="w-100">
            Search term
            <input
              type="text"
              className="form-control"
              value={q}
              onChange={e => setQ(e.target.value)}
              required={!expanded || !domains} />
          </label>
        </div>
        {
          expanded &&
          <>
            <div className="col-12 col-md-6 col-lg-4 mb-3">
              <label className="w-100">
                From
                <input
                  type="date"
                  className="form-control"
                  value={from}
                  onChange={e => setFrom(e.target.value)} />
              </label>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-3">
              <label className="w-100">
                To
                <input
                  type="date"
                  className="form-control"
                  value={to}
                  onChange={e => setTo(e.target.value)} />
              </label>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-3">
              <label className="w-100">
                Domains
                <input
                  type="text"
                  className="form-control"
                  value={domains}
                  onChange={e => setDomains(e.target.value)} />
                <span className="text-muted small ms-2">Enter comma-separated list</span>
              </label>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-3">
              <label className="w-100">
                Exclude domains
                <input
                  type="text"
                  className="form-control"
                  value={excludeDomains}
                  onChange={e => setExcludeDomains(e.target.value)} />
                <span className="text-muted small ms-2">Enter comma-separated list</span>
              </label>
            </div>
          </>
        }
        <div className="col-12 col-md-6 col-lg-4 mb-3">
          <label>&nbsp;</label>
          <input
            type="submit"
            className="btn btn-primary w-100"
            value={searchLoading ? 'Loading...' : 'Search'}
            disabled={searchLoading} />
        </div>
      </form>
      <div className="mb-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="btn btn-outline-secondary btn-sm text-black">
          {expanded ? 'Hide advanced search' : 'Show advanced search'}
        </button>
      </div>
      { searchError && <div className="my-4 alert alert-danger">{ searchError }</div> }
    </>
  )
}
