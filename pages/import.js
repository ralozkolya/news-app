import { useEffect, useState } from 'react'
import axios from 'axios'
import NewsList from '../components/news-list'
import Pagination from '../components/pagination'
import { useRouter } from 'next/router'

export default function Import() {

  const [loading, setLoading] = useState(false)

  const [q, setQ] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [domains, setDomains] = useState('')
  const [excludeDomains, setExcludeDomains] = useState('')

  const [expanded, setExpanded] = useState(false)
  const [error, setError] = useState(null)

  const [newsResponse, setNewsResponse] = useState([])
  const [selected, setSelected] = useState(new Map())

  const query = useRouter().query
  const page = Math.max(1, query.page) || 1

  const retrieveNews = async () => {
    setLoading(true)

    const params = { q }

    if (expanded) {
      Object.assign(params, { from, to, domains, excludeDomains })
    }

    try {
      const result = await axios.get(`/api/news?page=${page}`, { params })
      setNewsResponse(result.data)
    } catch (error) {
      setTimeout(setError, 5000, null)
      setError(error.response?.data?.error || 'Error retrieving news')
    }

    setLoading(false)
  }

  const importNews = async () => {
    const news = [ ...selected.values() ]
    await axios.post('/api/import', news)
  }

  useEffect(() => {
    q && retrieveNews()
  }, [ page ])

  const handleSubmit = async event => {
    event.preventDefault()
    retrieveNews()
  }

  const handleOnSelect = news => {

    if (selected.has(news.id)) {
      selected.delete(news.id)
    } else {
      selected.set(news.id, news)
    }

    setSelected(new Map(selected))
  }

  return (
    <>
      <h1 className="mb-4">Import news</h1>
      <p className="mb-5">These news are retrieved using NewsApi.org API</p>
      <form className="row mt-4" onSubmit={ handleSubmit }>
        <div className={`col-12 col-md-6 mb-3 ${expanded ? 'col-lg-4' : 'col-lg-8'}`}>
          <label className="w-100">
            Search term
            <input
              type="text"
              className="form-control"
              value={q}
              onChange={e => setQ(e.target.value)}
              required={ !expanded || !domains } />
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
            value={ loading ? 'Loading...' : 'Search' }
            disabled={ loading } />
        </div>
      </form>
      <div className="mb-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="btn btn-outline-secondary btn-sm text-black">
          {expanded ? 'Hide advanced search' : 'Show advanced search'}
        </button>
      </div>
      { error && <div className="my-4 alert alert-danger">{ error }</div> }
      <NewsList news={ newsResponse.articles } onSelect={ handleOnSelect } selected={ selected } />
      {
        newsResponse.articles?.length > 0 &&
          <div className="my-4 text-end">
            <button
              onClick={ importNews }
              className="btn btn-primary">
              Import selected
            </button>
          </div>
      }
      <Pagination count={ newsResponse.totalResults / 20 || 0 } page={ page } />
    </>
  )
}
