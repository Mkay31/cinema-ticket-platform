/* eslint-disable @typescript-eslint/ban-types */
import "reflect-metadata";
import Express from 'express';
import dotenv from 'dotenv';
import { useContainer as routingUseContainer, useExpressServer } from "routing-controllers";
import { Container } from "typedi";
import cors from "cors";
import { useContainer as typeormUseContainer } from "typeorm";
import { ObjectUtils } from "./utils/index";
import * as controllers from "./controllers";
import * as middlewares from "./middlewares";
import { initDatabase } from "./utils/db.utils";
dotenv.config();

process.on('unhandledRejection', (reason, p) => {
	console.error('Unhandled rejection occurred', p, 'reason:', reason);
});

// Create express app
const app: Express.Application = Express();
const PORT = process.env.PORT || 3000;

routingUseContainer(Container);  // for routing-controllers
typeormUseContainer(Container);

const start = async () => {
	try {
		// Core middleware
		app.use(cors());
		// Initialize database
		await initDatabase();
		// Setup routing-controllers with express
		useExpressServer(app, {
			controllers: <Function[]>ObjectUtils.getObjectValues(controllers),
			middlewares: <Function[]>ObjectUtils.getObjectValues(middlewares),
			defaultErrorHandler: true,
		});
		// Start server
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.error("Failed to start server:", error);
		process.exit(1);
	}
};
// Run the server
start();