import mongoose from 'mongoose'

const url = process.env.MONGODB_URL

if (!url) {
    throw Error('MONGODB_URL not defined')
}

let clientPromise = global.clientPromise

// Due to how NextJS handles hot reloads, you need to cache MongoDB connection
if (!clientPromise) {
  clientPromise = global.clientPromise = mongoose.connect(url)
}

export default clientPromise

let news

if (mongoose.models.News) {

  news = mongoose.models.News

} else {

  const NewsSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: Date,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    urlToImage: String,
  })

  news = mongoose.model('News', NewsSchema)

}

export const News = news
