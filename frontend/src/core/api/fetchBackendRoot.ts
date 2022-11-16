import axios from 'axios';

class FetchBackend
{
	constructor(private readonly apiUrl: string) {}

	get = async (url: string): Promise<any> => {
		const uri = `${this.apiUrl}${url}`;
		return await axios.get(uri);
	}

	post = async (url: string, data?: any): Promise<any> => {
		const uri = `${this.apiUrl}${url}`;
		return await axios.post(uri, data);
	}

	put = async (url: string, data?: any): Promise<any> => {
		const uri = `${this.apiUrl}${url}`;
		return await axios.put(uri, data);
	}

	delete = async (url: string, data?: any): Promise<any> => {
		const uri = `${this.apiUrl}${url}`;
		return await axios.delete(uri, data);
	}
}

export const fetchBackend = new FetchBackend('/api/');
