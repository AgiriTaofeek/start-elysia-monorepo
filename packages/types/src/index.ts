// Shared domain types can live here.
// For example, specific enumerations, pure type interfaces, or shared response signatures
// that don't belong bound natively to the Prisma or the UI.

export type ApiResponse<T> = {
	success: boolean;
	data?: T;
	error?: string;
};
