import * as dotenv from "dotenv";
dotenv.config();

export default {
	MAILGUN_SIGNING_KEY: process.env.MAILGUN_SIGNING_KEY,
	DB_TABLE_NAME: process.env.DB_TABLE_NAME,
	AWS_REGION: process.env.AWS_REGION,
	API_VERSION: process.env.API_VERSION,
	SNS_TOPIC_ARN: process.env.SNS_TOPIC_ARN,
	MESSAGE_PROVIDER: process.env.MESSAGE_PROVIDER,
};
