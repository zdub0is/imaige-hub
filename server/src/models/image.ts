export type image = {
	uuid?: string;
	prompt: string;
	link: string;
	isApproved: boolean;
	timeGenerated: Date;
	userRequested: string;
	isDeleted: boolean;
}
