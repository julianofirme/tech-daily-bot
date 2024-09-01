import * as dotenv from 'dotenv';
import { getCreatedPosts } from './post/create-post.js';
import { postAction } from './post/post-action.js';
import { logger } from './logger/logger.js';

dotenv.config();

async function main() {
    logger.info('Starting bot...')
    
    const posts = await getCreatedPosts();
    logger.info('Getting posts')
    posts.map(post => postAction(post))
    logger.info('News posted!')
}

main();