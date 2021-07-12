export interface ResponseOptions {
	data: any;
	statusCode: number;
}

export interface Response {
	statusCode: number;
	isBase64Encoded: boolean;
	body: string;
	headers: {
		"Access-Control-Allow-Credentials": boolean;
		"Access-Control-Allow-Origin": string;
		"Content-Type": string;
	};
}
