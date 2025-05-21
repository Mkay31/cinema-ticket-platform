export class ApiError extends Error {
	statusCode: number;

	constructor(statusCode: number, message: string) {
		super(message);
		this.statusCode = statusCode;
		this.name = this.constructor.name;
	}

	static badRequest(msg: string): ApiError {
		return new ApiError(400, msg);
	}

	static notFound(msg: string): ApiError {
		return new ApiError(404, msg);
	}

	static conflict(msg: string): ApiError {
		return new ApiError(409, msg);
	}

	static internal(msg: string): ApiError {
		return new ApiError(500, msg);
	}
}