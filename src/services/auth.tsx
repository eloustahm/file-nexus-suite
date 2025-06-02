import { http} from '@/lib/api';

export const login = async ({email, password}: { email: string; password: string }) => {

    return http.post('api/auth/login', {
        email,
        password
    });
};

export const csrf = async () => {
    return http.get('/sanctum/csrf-cookie')
}

export const logout = () => http.post('/api/auth/logout')
export const getCurrentUser = async () => {
    const response = await http.get<{ user: any }>('/api/auth/me');
    return response.user;
};
