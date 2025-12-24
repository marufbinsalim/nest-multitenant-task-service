type AuthenticatedRequest = Request & {
    user: {
        sub: string;
        email: string;
    }
};

export type { AuthenticatedRequest };