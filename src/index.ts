import {
	APIGatewayProxyEvent,
	APIGatewayProxyHandler,
	APIGatewayProxyResult,
} from "aws-lambda";
import { responseHandler } from "./utils/lambda-response.util";
import ValidateMailgunWebhook from "./utils/validateMailgun.util";
import database from "./services/database.services";
import sns from "./services/sns.services";
import { SnsMessageType } from "./types/sns.types";
import config from "./config/config.env";

export const handler: APIGatewayProxyHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	try {
		if (!event.body) {
			return responseHandler(500, "Error: Provide a valid event body");
		}

		const eventBody = event.body;
		const jsonBody: any = JSON.parse(eventBody);
		const { timestamp, token, signature } = jsonBody.signature;

		const isValid: boolean = ValidateMailgunWebhook.isValid({
			timestamp,
			token,
			signature,
		});

		if (!isValid) {
			return responseHandler(
				500,
				"Error: Webhook with wrong credential not allowed"
			);
		}

		await database.save(jsonBody);

		const snsPayload: SnsMessageType = {
			Provider: config.MESSAGE_PROVIDER,
			timestamp: jsonBody["event-data"].timestamp,
			type: jsonBody["event-data"].event,
		};

		await sns.publishToSns(snsPayload);

		return responseHandler(200, "Event received and published to sns");
	} catch (ex) {
		return responseHandler(500, ex);
	}
};
