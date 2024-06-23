export type prompt = {
	id: string;
	prompt: string;
	isApproved: boolean;
	userRequested: string;
}

export interface promptRequest {
	prompt: string;
	userRequested: string;
}

