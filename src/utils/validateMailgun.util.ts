import crypto from "crypto";
import config from "../config/config.env";
import { MailgunWebhookSignature } from "../interfaces/mailgun.interface";

class ValidateMailgunWebhook {
	private mailgunSigningKey: string;

	constructor(mailgunSigningKey: string) {}

	public isValid({
		timestamp,
		token,
		signature,
	}: MailgunWebhookSignature): boolean {
		const encodedToken = crypto
			.createHmac("sha256", this.mailgunSigningKey)
			.update(timestamp.concat(token))
			.digest("hex");

		return encodedToken === signature;
	}
}

export default new ValidateMailgunWebhook(config.MAILGUN_SIGNING_KEY);
