import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';


@Middleware({ type: 'after' })
export class ResponseLoggerMiddleware implements ExpressMiddlewareInterface {
    // eslint-disable-next-line class-methods-use-this
    public use(_request: Express.Request, response: Express.Response): void {
        if (!response.headersSent) {
            response.status(404);
            response.send({ message: 'The requested endpoint does not exist.', statusCode: 404 });
            response.end();
        }

        const responseTime = new Date().getTime() - response.startTime.getTime();
        console.info(`Response took ${responseTime}ms with status code ${response.statusCode}`);
    }
}
