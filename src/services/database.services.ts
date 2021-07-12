import AWS from "aws-sdk";
import config from "../config/config.env";

class DynamoDB {
	private tableName: string;
	private apiVersion: string;

	constructor(tableName: string, region: string, apiVersion: string) {
		AWS.config.update({ region });
		this.tableName = tableName;
		this.apiVersion = apiVersion;
	}

	public async save(
		data: object
	): Promise<AWS.DynamoDB.DocumentClient.PutItemOutput> {
		const primaryId = data["event-data"].id;
		const docClient = new AWS.DynamoDB.DocumentClient({
			apiVersion: this.apiVersion,
		});

		const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
			TableName: this.tableName,
			Item: {
				id: primaryId,
				data: JSON.stringify(data),
			},
		};

		const putResult = await docClient.put(params).promise();

		return putResult;
	}
}

export default new DynamoDB(
	config.DB_TABLE_NAME,
	config.AWS_REGION,
	config.API_VERSION
);
