import axios, { AxiosError } from 'axios';
import { ENDPOINTS } from '@/app/api/utils/apiConfig';
import { getauthHeader, DEFAULT_HEADERS } from "@/app/api/utils/AuthHeader";

interface LoginPayload {
    username: string;
    password: string;
}

interface LoginResponse {
    message: string;
    access_token: string;
    refresh_token: string;
}


interface UserDataResponse {
    user_name: string;
    user_email: string;
}

interface EnabledServicesResponse {
    services: string[];
}

interface LogOutPayload {
    access_token: string;
}

interface LogOutResponse {
    user_name: string;
}

interface ErrorResponse {
    message: string;
    detail: string
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(
            ENDPOINTS.LOGIN, 
            payload,
            { headers: DEFAULT_HEADERS }
        );
        
        // Store tokens in session storage
        sessionStorage.setItem('access_token', response.data.access_token);
        sessionStorage.setItem('refresh_token', response.data.refresh_token);
        
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;

            if (axiosError.response) {
                throw new Error(axiosError.response.data.message || axiosError.response.data.detail || 'Error logging in');
            } else if (axiosError.request) {
                throw new Error('No response received from server. Please try again.');
            }
        }
        // Handle generic error
        throw new Error('Error fetching user details.');
    }
};

export const getUserDetails = async (): Promise<UserDataResponse> => {
    try {
        const response = await axios.get<UserDataResponse>(
            ENDPOINTS.USER_DATA, 
            { headers: getauthHeader() }
        );
        
        // Store username in session storage
        window.sessionStorage.setItem("user_name", response.data.user_name);
        window.sessionStorage.setItem("user_email", response.data.user_email);

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;

            if (axiosError.response) {
                throw new Error(axiosError.response.data.message || 'Error logging in');
            } else if (axiosError.request) {
                throw new Error('No response received from server. Please try again.');
            }
        }
        // Handle generic error
        throw new Error('Error fetching user details.');
    }
};

export const getEnabledServices = async (): Promise<EnabledServicesResponse> => {
    try {
        const response = await axios.get<EnabledServicesResponse>(
            ENDPOINTS.ENABLED_SERVICES, 
            { headers: getauthHeader() }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;

            if (axiosError.response) {
                throw new Error(axiosError.response.data.message || 'Invalid Authentication');
            } else if (axiosError.request) {
                throw new Error('No response received from server. Please try again.');
            }
        }
        // Handle generic error
        throw new Error('Error fetching user details.');
    }
};

export const refreshTokens = async (): Promise<LoginResponse> => {
    try {
        const response = await axios.get<LoginResponse>(
            ENDPOINTS.REFRESH, 
            { headers: getauthHeader() }
        );
        // Store tokens in session storage
        sessionStorage.setItem('access_token', response.data.access_token);
        sessionStorage.setItem('refresh_token', response.data.refresh_token);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;

            if (axiosError.response) {
                throw new Error(axiosError.response.data.message || 'Invalid Authentication');
            } else if (axiosError.request) {
                throw new Error('No response received from server. Please try again.');
            }
        }
        // Handle generic error
        throw new Error("Session expired or invalidated or doesn't exist.");
    }
};

export const logout = async (): Promise<LogOutResponse> => {
    try {
        const response = await axios.post<LogOutResponse>(
            ENDPOINTS.LOGOUT, 
            "",
            { headers: getauthHeader() }
        );
        
        // Clear specific session storage keys
        sessionStorage.removeItem('user_name');
        sessionStorage.removeItem('user_email');
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;

            if (axiosError.response) {
                throw new Error(axiosError.response.data.message || 'Error logging out');
            } else if (axiosError.request) {
                throw new Error('No response received from server. Please try again.');
            }
        }
        // Handle generic error
        throw new Error('Error during the logout process.');
    }
};
