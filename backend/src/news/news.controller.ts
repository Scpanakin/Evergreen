import { Controller, Get, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Fetch latest news from Alpaca API' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'OK',
    schema: {
      example: {
        news: [
          {
            id: 24843171,
            headline:
              'Apple Leader in Phone Sales in China for Second Straight Month in November With 23.6% Share, According to Market Research Data',
            author: 'Charles Gross',
            created_at: '2021-12-31T11:08:42Z',
            updated_at: '2021-12-31T11:08:43Z',
            summary:
              'This headline-only article is meant to show you why a stock is moving, the most difficult aspect of stock trading',
            content:
              '<p>This headline-only article is meant to show you why a stock is moving, the most difficult aspect of stock trading....</p>',
            url: 'https://www.benzinga.com/news/21/12/24843171/apple-leader-in-phone-sales-in-china-for-second-straight-month-in-november-with-23-6-share-according',
            images: [],
            symbols: ['AAPL'],
            source: 'benzinga',
          },
        ],
        next_page_token: 'MTY0MDk0ODkyMzAwMDAwMDAwMHwyNDg0MzE3MQ==',
      },
    },
  })
  @ApiResponse({
    status: 403,
    description:
      'Authentication headers are missing or invalid. Make sure you authenticate your request with a valid API key.',
  })
  @ApiResponse({
    status: 429,
    description:
      "Too many requests. You hit the rate limit. Use the X-RateLimit-... response headers to make sure you're under the rate limit.",
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getNews() {
    return this.newsService.fetchNews();
  }
}
