import { Middleware, MiddlewareMethods, Req } from '@tsed/common';
import { Context } from '@tsed/platform-params';

@Middleware()
export class CreateUserSessionMiddleware implements MiddlewareMethods {
  public use(@Req() request: Req, @Context() ctx: Context) {
    console.log('context obect', ctx);
    const options = ctx.endpoint.get(CreateUserSessionMiddleware) || {};
    console.log('okay');
  }
}
