import { Token } from "./definitions";

let _endpoint = "";

export async function contactBackend<T>(endpointRoute: string, body: Record<string, unknown> = {}): Promise<T> {
    return;
}

function storeSessionData(data: Token) {
    return;
}

function getStoredSessionData() {
    return;
}

export const sessionDataHandler = {
    setEndpoint(endpoint: string = "") {
        _endpoint = endpoint;
    },

    getEndpoint() {
        return _endpoint;
    },

    tryResumeExistingSession(): Token | null {
        return;
    },

    async getUpdatedToken(): Promise<Token> {
        return;
    },

    fetchAndStoreNewSession: async ({ formData }: { formData: Record<string, unknown> }) => {
        return;
    },

    clear: () => {
        return;
    }
};
