import Vue from 'vue';
import axios from './config';
import qs from 'qs';
import moment from 'moment'


const Request = (method, url, data) => {
	const configData = {
		headers: {},
		url
	};

	let Data; // 设置默认source
	if (data instanceof FormData) {
		Data = data;
	} else {
		Data = {
			...data
		};
	}

	if (method === 'get') {
		configData.method = 'get';
		configData.params = Data;

	} else if (method === 'postForm') {
		configData.method = 'post';

		if (Data instanceof FormData) {
			configData.headers['Content-Type'] = 'multipart/form-data; charset=UTF-8';
			configData.data = Data;
		} else {
			configData.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

			configData.data = qs.stringify(Data, {
				serializeDate: function (d) {
					return d;
				}
			})
			// configData.data = qs.stringify(Data);
		}

	} else if (method === 'postJson') {
		configData.method = 'post';
		configData.headers['Content-Type'] = 'application/json; charset=UTF-8';
		for (var index in Data) {
			/*处理moment类型的数据*/
			if(Data[index] instanceof moment){
				Data[index] = Data[index].format('YYYY-MM-DD HH:mm:ss')
			}
		}
		configData.data = Data;
	}

	return axios(configData);
};

class Axios {
	get = (url, data = {}) => {
		return Request('get', url, data)
	};

	postForm = (url, data = {}) => {
		return Request('postForm', url, data)
	};

	postJson = (url, data = {}) => {
		return Request('postJson', url, data)
	};

	// 默认post的Content-Type是application/json
	post = this.postJson;
}

Vue.prototype.$axios = new Axios();

export default axios;