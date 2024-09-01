import { getTechNews } from "../integrations/get-news.js"
import { logger } from "../logger/logger.js"

export async function getCreatedPosts() {
  const techNews = await getTechNews()

  const posts = techNews.articles.map(tn => {
    logger.info(`Generate the post to news ${tn.title}`)

    return {
      text: `${tn.title}`,
      embed: {
        $type: "app.bsky.embed.external",
        external: {
          title: tn.title,
          description: tn.description ?? '',
          uri: tn.url
        }
      }
    }
  })

  logger.info(`Posts generated!`)
  return posts
}