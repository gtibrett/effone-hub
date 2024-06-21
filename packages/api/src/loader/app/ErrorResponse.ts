const ErrorResponse = (message: string, error: Error) => {
	return {message, error};
};

export default ErrorResponse;