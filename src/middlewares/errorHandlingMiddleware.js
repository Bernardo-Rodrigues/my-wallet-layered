import Conflict from "../errors/ConflictError.js";
import Unauthorized from "../errors/UnauthorizedError.js";
import UnprocessableEntity from "../errors/UnprocessableEntityError.js";

export default async function errorHandlingMiddleware(error, req, res, next) {
	if (error instanceof Conflict || 
		error instanceof Unauthorized || 
		error instanceof UnprocessableEntity
	) return res.status(error.status).send(error.message);

	return res.status(500).send(error.message);
}