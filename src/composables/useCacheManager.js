const cache = {
    assets:{
        data:[],
        lastFetched:null,
        loading:false,
        error:null
    },
    products:{
        data:[],
        lastFetched:null,
        loading:false,
        error:null
    },
    catalog:{
        data:[],
        lastFetched:null,
        loading:false,
        error:null
    },
    invoices:{
        data:[],
        lastFetched:null,
        loading:false,
        error:null
    },
    orders:{
        data:[],
        lastFetched:null,
        loading:false,
        error:null
    },
    completedOrders:{
        data:[],
        lastFetched:null,
        loading:false,
        error:null
    },
    stockAdjustments:{
        data:[],
        lastFetched:null,
        loading:false,
        error:null
    },
    stockMovements:{
        data:[],
        lastFetched:null,
        loading:false,
        error:null
    }
}
const STALE_TIME = 1000 * 60 * 5; // 5 minutes

const getData = async (key) => {
    const now = Date.now();
    const lastFetched = cache[key].lastFetched;
    if (!lastFetched || now - lastFetched > STALE_TIME || cache[key].error) {
        if (cache[key].loading) {//check if the data is being fetched
            while (cache[key].loading) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            return cache[key].data;
        }

        cache[key].loading = true;
        try {
            await fetchData(key);
        } finally {
            cache[key].loading = false; 
        }
    }
    return cache[key].data;
}

import ApiFetch from '../api/ApiFetch';
const api = new ApiFetch();

const fetchData = async (key) => {
    let endpoint = '';
    try{
        switch(key){
            case 'assets':
                endpoint = '/asset/assets';
                break;
            case 'products':
                endpoint = '/product/products';
                break;
            case 'catalog':
                endpoint = '/catalog/all';
                break;
            case 'invoices':
                endpoint = '/invoices/all';
                break;
            case 'orders':
                endpoint = '/orders/all';
                break;
            case 'completedOrders':
                endpoint = '/completedOrders/all';
                break;
            case 'stockAdjustments':
                endpoint = '/stockAdjustments/all';
                break;
            case 'stockMovements':
                endpoint = '/stockMovements/all';
                break;
            default:
                throw new Error(`Invalid key: ${key}`);
        }
        cache[key].data = await api.get(endpoint);
        cache[key].lastFetched = Date.now();
        cache[key].error = null;
        return cache[key].data;
    } catch (error) {
        cache[key].error = error;
        console.error(`Error fetching data for key: ${key}`, error);
        throw error;
    }
}

const refreshData = async (key) => {
    try{
        invalidateData(key);
        return await getData(key);
    } catch (error) {
        console.error(`Error refreshing data for key: ${key}`, error);
        throw error;
    }
}

const invalidateData = (key) => {
    cache[key].data = null;
    cache[key].lastFetched = null;
    return cache[key].data;
}

const isLoading = (key) => {
    return cache[key].loading;
}

const getCacheAge = (key) => {
    if (!cache[key].lastFetched) return null;
    return Date.now() - cache[key].lastFetched;
}

const getError = (key) => {
    return cache[key].error;
}

const clearCache = () => {
    Object.keys(cache).forEach(key => {
        invalidateData(key);
    });
}

const hasData = (key) => {
    return cache[key].data && cache[key].data.length > 0;
}

const preloadData = async (key) => {
    if (!cache[key].loading && (!cache[key].lastFetched || getCacheAge(key) > STALE_TIME)) {
        refreshData(key).catch(console.error);
    }
}

const getMultipleData = async (keys) => {
    const promises = keys.map(key => getData(key));
    return await Promise.all(promises);
}

export const useCacheManager = () => {
    return {
        // Core methods
        getData,           // Get data (cached if fresh)
        fetchData,         // Force fetch from server
        refreshData,       // Get fresh data with loading state
        
        // Cache management
        invalidateData,    // Clear specific cache
        clearCache,        // Clear all caches
        
        // State checking
        isLoading,         // Check if data is loading
        getError,          // Get error for specific data
        hasData,           // Check if data exists
        getCacheAge,       // How old is the cache
        
        // Advanced
        preloadData,       // Background loading
        getMultipleData,   // Batch loading
    };
}
