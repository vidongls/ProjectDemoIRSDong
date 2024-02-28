import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class Api {
	axiosInstance: AxiosInstance;

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: "http://127.0.0.1:3000",
		});
	}

	getInstance = () => {
		this.initialize();
		return this.axiosInstance;
	};

	get = (url: string, config: AxiosRequestConfig) => {
		return this.getInstance().get(url, config);
	};

	initialize = () => {
		this.axiosInstance.defaults.timeout = 30000;
		this.axiosInstance.interceptors.response.use(function (response: any) {
			return response;
		});
	};
}

const api = new Api();

export default api;
