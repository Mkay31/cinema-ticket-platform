/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
    namespace Express {
        export interface Response {
            startTime: Date;
            [key: string]: any;
        }

        export interface Request {
            [key: string]: any;
        }
    }
}
