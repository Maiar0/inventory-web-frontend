import { getAccessToken } from './authClient';
export default class ApiFetch {
    constructor() {
        const apiUrl = import.meta.env.VITE_API_URL;
        const defaultUrl = '/api'; 
        console.log('Computed baseUrl:', apiUrl ? apiUrl : defaultUrl);
        this.baseUrl = apiUrl ? apiUrl : defaultUrl;
    }

    async fetch(url, options = {}) {
        const token = await getAccessToken();
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        
        const res = await fetch(this.baseUrl + url, options);
        console.log('res:', res);
        if (!res.ok) {
            const { error } = await res.json();
            const err = new Error(error.message);
            err.code = error.code;
            throw err;
        }
        
        return res.json();
    }
    async fetchFormData(url, formData, method = 'POST') {
        const token = await getAccessToken();

        const res = await fetch(this.baseUrl + url, {
            method,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });

        if (!res.ok) {
            const { error } = await res.json();
            const err = new Error(error.message);
            err.code = error.code;
            throw err;
        }

        return res.json();
    }
    async fetchAssets() {//this should probably go in a datamanager
    try {
        const result = await this.fetch('/asset/assets', {
            method: 'GET'
        })
        console.log('Assets fetched:', result);
        return result;
    } catch (error) {
        console.error('Error fetching assets:', error);
        }
        return [];
    }
}