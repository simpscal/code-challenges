import { toast } from 'sonner';

export class ApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

type RequestOptions = Omit<RequestInit, 'body'> & { body?: unknown };

const ERROR_MESSAGES: Record<number, string> = {
    400: 'The request was invalid.',
    404: 'The requested resource was not found.',
    500: 'Something went wrong on the server.',
};

async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const { body, headers, ...rest } = options;

    const response = await fetch(url, {
        ...rest,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const message = ERROR_MESSAGES[response.status] ?? 'Unexpected error. Please try again.';
        toast.error(message);
        throw new ApiError(message, response.status);
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
}

export const apiClient = {
    get: <T>(url: string, options?: RequestOptions) => request<T>(url, { ...options, method: 'GET' }),
    post: <T>(url: string, body?: unknown, options?: RequestOptions) =>
        request<T>(url, { ...options, method: 'POST', body }),
};
