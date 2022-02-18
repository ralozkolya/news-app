import Bluebird from 'bluebird'
import { News } from '../../mongo'

export default async (req, res) => {

  const response = {
    added: [],
    errors: [],
  }

  await Bluebird.each(req.body, async article => {

    try {
      const news = new News(article)
      await news.save()
      response.added.push(article.id)
    } catch (error) {
      const message = error.code === 11000 ?
        `Duplicate article '${article.title}'` :
        `Error saving the article '${article.title}'`
      response.errors.push(message)
    }

  })

  res.status(200).json(response)

}
