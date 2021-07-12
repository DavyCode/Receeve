import { ResponseOptions, Response } from "../interfaces/response.interface";

const lambdaResponse = ({ statusCode, data }: ResponseOptions): Response => {
	const response: Response = {
		statusCode,
		isBase64Encoded: false,
		body: typeof data === "string" ? data : JSON.stringify(data),
		headers: {
			"Access-Control-Allow-Credentials": true,
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json",
		},
	};

	return response;
};

export const responseHandler = (statusCode: number, data: any) => {
	return lambdaResponse({
		statusCode,
		data,
	});
};
