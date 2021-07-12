export interface MailgunWebhook {
	"event-data": any;
	signature: MailgunWebhookSignature;
}

export interface MailgunWebhookSignature {
	timestamp: string;
	token: string;
	signature: string;
}
