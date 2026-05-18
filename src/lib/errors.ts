export class AppError extends Error {
	constructor(
		message: string,
		public readonly code: string,
		public readonly status: number = 500
	) {
		super(message);
		this.name = "AppError";
	}
}

export class NotFoundError extends AppError {
	constructor(resource: string, id?: string) {
		super(id ? `${resource} "${id}" not found` : `${resource} not found`, "NOT_FOUND", 404);
		this.name = "NotFoundError";
	}
}

export class ExpiredError extends AppError {
	constructor(id?: string) {
		super(id ? `Paste "${id}" has expired` : "Paste has expired", "PASTE_EXPIRED", 410);
		this.name = "ExpiredError";
	}
}

export class ForbiddenError extends AppError {
	constructor(message = "Access denied") {
		super(message, "FORBIDDEN", 403);
		this.name = "ForbiddenError";
	}
}

export class ValidationError extends AppError {
	constructor(message: string) {
		super(message, "VALIDATION_ERROR", 422);
		this.name = "ValidationError";
	}
}

export function isAppError(err: unknown): err is AppError {
	return err instanceof AppError;
}
