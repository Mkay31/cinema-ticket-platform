import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';

@Middleware({ type: 'before' })
export class RequestLoggerMiddleWare implements ExpressMiddlewareInterface {
    // eslint-disable-next-line class-methods-use-this
    public async use(
        request: Express.Request,
        response: Express.Response,
        next: () => Promise<unknown>,
    ): Promise<unknown> {
        response.startTime = new Date();
        console.info(`Request ${request.url}`);
        return next();
    }
}
