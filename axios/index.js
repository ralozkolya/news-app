import axios from 'axios';

const NEWS_URL = process.env.NEWS_URL
const NEWS_TOKEN = process.env.NEWS_TOKEN

if (!NEWS_URL || !NEWS_TOKEN) {
  throw Error('NEWS_URL or NEWS_TOKEN are not defined')
}

const client = axios.create({
  baseURL: NEWS_URL,
  headers: {
    Authorization: NEWS_TOKEN
  }
})

export function retrieveNews() {
  return client({
    url: '/everything',
    params: {
      q: 'Computer Science'
    }
  })
}
