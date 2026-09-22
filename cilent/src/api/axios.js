import axios from "axios";

const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    withCredentials:true,
})

let refreshPromise = null;
let accessToken = null;

export const setAccessToken = (token) => {
    accessToken = token;
}

export const getAccessToken = () => {
    return accessToken;
}

export const clearAccessToken = () => {
    accessToken = null;
}

export const refreshAccessToken = () => {
    if(!refreshPromise){
        refreshPromise = axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`,
            {},
            {
                withCredentials : true
            }
        )
        .then((response) => {
            const newAccessToken = response.data.accessToken;
            setAccessToken(newAccessToken);
            return newAccessToken;
        })
        .finally(() => {
            refreshPromise = null;
        })
    }
    return refreshPromise;
}

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if(accessToken){
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async(error) => {
        const originalRequest = error.config;
        if(error.response?.status != 401 || originalRequest._retry){
            return Promise.reject(error);
        }
        originalRequest._retry = true;
        try {
            if(!refreshPromise){
                refreshPromise = axios.post(`${import.meta.VITE_API_URL}/auth/refresh`,{},{
                    withCredentials:true,
                })
                .then((response) => {
                    const newAccesToken = response.data.accessToken;

                    localStorage.setItem("accessToken",newAccessToken);

                    return newAccessToken;
                })
                .finally(()=> {
                    refreshPromise = null
                })
            }
            const newAccessToken = await refreshPromise;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest)
        } catch (refreshError){
            localStorage.removeItem("accessToken");
            window.dispatchEvent(new Event("auth:logout"));
            return Promise.reject(refreshError);
        }
    }
)

export default api;