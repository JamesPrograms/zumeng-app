// 引入axios插件
import axios from 'axios';
import {Indicator} from 'mint-ui';

const isRequestLocalData = true; // 是否请求本地数据
// const baseURL = 'http://39.108.253.177:9300'; // 调用服务器接口数据地址
/**
 * 发送请求的方法
 * param options 实际调用请求时的配置参数
 * param type 请求类型 'get' 或者 'post'
 */
const sendAxios = (options, type) => {
    // 1. 基础的配置参数
    let config = {
        baseURL: options.baseURL ? options.baseURL : (isRequestLocalData ? '' : 'api/'), // 实际调试过程中直接用api/作为baseURL跨域访问
        responseType: 'json',
        timeout: options.timeout ? options.timeout : 60000,
        url: options.url,
        method: type,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: [function (data) {
            let ret = '';
            for (let it in data) {
                if ((typeof data[it]) == Object) {
                    ret += encodeURIComponent(it) + '=' + JSON.stringify(data[it]) + '&';
                } else {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
                }
            }
            return ret;
        }]
    };

    // 2. 根据请求类型传不同的数据参数：get传params；post传data
    if (options.data) {
        if (type === 'get') {
            config.params = options.data;
        } else {
            config.data = options.data;
        }
    }

    if (options.headers) {
        config.headers = options.headers;
    }

    // 3. 是否做取消请求的操作
    if (options.cancel) {
        const CancelToken = axios.CancelToken;
        config.cancelToken = new CancelToken(function executor(cancel) {
            // 取消请求
            cancel(`已取消请求接口: ${options.url}`);
        });
    }

    // 4. 配置参数中有loading参数，显示loading(以请求没有被取消为前提)
    if (!options.cancel && options.loading) {
        Indicator.open('加载中...');
    }

    // 5. 发送请求

    axios(config).then(
        response => {
            // 5.1 请求成功后关闭loading
            if (options.loading) {
                Indicator.close();
            }
            // 5.2 调用回调方法
            options.sucFunc(response.data, response);
        }
    ).catch(
        thrown => {
            if (axios.isCancel(thrown)) {
                console.log(thrown.message);
            } else {
                // 处理报错信息
            }
        }
    );

};

/* 暴露方法 */
export default {
    get(options) {
        sendAxios(options, 'get');

    },
    post(options) {
        sendAxios(options, 'post');
    },
    origin: axios  // axios原有对象
}
