import axios from 'axios'
import { createHash } from 'crypto'
import uniqBy from 'lodash/uniqBy'

const NEWS_URL = process.env.NEWS_URL
const NEWS_TOKEN = process.env.NEWS_TOKEN

export default async (req, res) => {

  const { q, to, from, domains, excludeDomains } = req.query
  const page = Math.max(req.query.page, 1) || 1

  const client = axios.create({
    baseURL: NEWS_URL,
    headers: {
      Authorization: NEWS_TOKEN
    }
  })

  try {
    const response = await client({
      url: '/everything',
      params: { q, to, from, domains, excludeDomains, page }
    })

    response.data.articles = response.data.articles.map(article => {
      const hash = createHash('md5')
      hash.update(JSON.stringify(article))
      return { ...article, id: hash.digest('hex') }
    })

    response.data.articles = uniqBy(response.data.articles, news => news.id)

    res.status(200).json(response.data)
  } catch (error) {
    console.error(error)
    res
      .status(error.response?.status || 500)
      .json({ error: error.response?.data?.message || 'Error retrieving news' })
  }
}
