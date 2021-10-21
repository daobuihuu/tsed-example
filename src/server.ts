import { Configuration, Inject, PlatformApplication } from '@tsed/common';
import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import { CreateUserSessionMiddleware } from './middlewares/create-user-session';

export const rootDir = __dirname;
dotenv.config();

@Configuration({
  rootDir,
  acceptMimes: ['application/json'],
  port: 8085,
  mount: {
    '/api': [`${rootDir}/controllers/**/*.ts`],
  },
  componentsScan: [`${rootDir}/middlewares/**/**.ts`],
})
export class Server {
  @Inject()
  app?: PlatformApplication;

  /**
   * This method let you configure the express middleware required by your application to works.
   * @returns {Server}
   */
  public async $beforeRoutesInit(): Promise<void | Promise<any>> {
    if (this.app) {
      //this.app.getApp().set("trust proxy", 1); // trust first proxy
      this.app
        .use(express.json())
        .use(express.urlencoded())
        .use(cors())
        .use(
          cookieSession({
            signed: false,
            secure: true,
          })
        );

      this.app.use(CreateUserSessionMiddleware);
    }
  }
}
