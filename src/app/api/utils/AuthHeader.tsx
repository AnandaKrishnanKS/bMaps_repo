export function getauthHeader() {
    const access_token = sessionStorage.getItem("access_token") || null
    if (access_token) {
        return { "X-API-token": access_token, 'Access-Control-Allow-Origin': '*' };
    } else {
        return {};
    }
}

export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
};