import AWS from "aws-sdk";
import config from "../config/config.env";
import { SnsMessageType } from "../types/sns.types";

class Sns {
	private topicARN: string;
	private apiVersion: string;
	private subject: string;

	constructor(topic: string, region: string, apiVersion: string) {
		this.subject = "Mailgun Notification";
		this.topicARN = topic;
		this.apiVersion = apiVersion;
		AWS.config.update({ region });
	}

	public async publishToSns(
		snsPayload: SnsMessageType
	): Promise<AWS.SNS.PublishResponse> {
		const sns = new AWS.SNS({ apiVersion: this.apiVersion });

		const params: AWS.SNS.Types.PublishInput = {
			Message: JSON.stringify(snsPayload),
			TopicArn: this.topicARN,
			Subject: this.subject,
		};

		const snsResult = await sns.publish(params).promise();

		return snsResult;
	}
}

export default new Sns(
	config.SNS_TOPIC_ARN,
	config.AWS_REGION,
	config.API_VERSION
);
