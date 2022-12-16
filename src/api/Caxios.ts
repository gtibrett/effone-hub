import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

type Cache = {
	timestamp: number;
	response: AxiosResponse;
}

function get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>, cacheFor?: number): Promise<R> {
	if (cacheFor) {
		const cache: any = JSON.parse((localStorage.getItem('Caxios') || 'null')) || {};
		const configKey  = JSON.stringify(config);
		if (cache !== null) {
			if (cache?.[url]?.[configKey]?.timestamp + cacheFor > Date.now()) {
				return new Promise((resolve) => {
					resolve(cache?.[url]?.[configKey]?.response);
				});
			}
		}
		
		return axios.get<T, R, D>(url, config)
		            .then((response) => {
			            localStorage.setItem('Caxios', JSON.stringify({
				            ...cache,
				            [url]: {
					            ...cache[url] || {},
					            [configKey]: {
						            timestamp: Date.now(),
						            response
					            }
				            }
			            }));
			
			            return response;
		            });
	}
	
	return axios.get<T, R, D>(url, config);
}

export default {
	get
};