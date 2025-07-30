import { getAccessToken } from './authClient';
export default class NavApi{
    constructor(){
        const envUrl = import.meta.env.VITE_API_URL; 
        const defaultUrl = '/api';
        console.log('Computed baseUrl:', envUrl ? envUrl : defaultUrl);
        this.baseUrl = envUrl ? envUrl : defaultUrl;
    }

    async getNavigationForHome() {
        const token = await getAccessToken();
        const res = await fetch(this.baseUrl + '/nav/home', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            //,body: JSON.stringify({data: 'data'})
        });
        if(!res.ok){
            const { error } = await res.json();
            const err = new Error(error.message);
            err.code = error.code;
            throw err;
        }
        return res.json();
    }
    async getNavigation(path){
        const token = await getAccessToken();
        const res = await fetch (this.baseUrl + '/nav' + path, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if(!res.ok){
            const { error } = await res.json();
            const err = new Error(error.message);
            err.code = error.code;
            throw err;
        }
        return res.json();
    }
}
