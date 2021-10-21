import { Controller, Session, UseAuth } from '@tsed/common';
import { Get } from '@tsed/schema';
import { CreateUserSessionMiddleware } from '../middlewares/create-user-session';

@Controller('')
@UseAuth(CreateUserSessionMiddleware)
export class LiftController {
  @Get('/hello')
  async getLifts(@Session('user') user: any): Promise<string> {
    return "Hello, i'm good";
  }
}
