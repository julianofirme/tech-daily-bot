import NewsAPI from 'newsapi';
import { logger } from '../logger/logger.js';

const newsapi = new NewsAPI("515a08536ca94f2d883a02dfca9c3e5a");

interface TechNew {
  source: any,
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
}

interface TechNewsResponse {
  status: string;
  totalResults: number;
  articles: TechNew[];
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export async function getTechNews() {
  const today = new Date();
  const formattedDate = formatDate(today);

  try {
    const response: TechNewsResponse = await newsapi.v2.topHeadlines({
      category: 'technology',
      language: 'en',
      sortBy: 'relevancy',
      from: formattedDate
    });

    logger.info(`Get news with success`)
    return response;
  } catch (error) {
    logger.error('Error fetching tech news:', error);
    throw error;
  }
}