import Vue from 'vue';

// jsbridge协议定义的名称
const CUSTOM_PROTOCOL_SCHEME = 'SinopecJSBridge';
// 最外层的api名称
const API_Name = 'sinopec_bridge';
// 唯一id，用来确保每一个回调函数的唯一性
const uniqueId = 1;

let Util = {
	getCallbackId: function() {
		// 如果无法解析端口,可以换为Math.floor(Math.random() * (1 << 30));
		// return 'cb_' + (uniqueId++) + '_' + new Date().getTime();
		// 目前采用端口直接解析，因此需要数字
		return Math.floor(Math.random() * (1 << 30)) + '';
	},
	// 获取url scheme
	// 第二个参数是兼容android中的做法
	// android中由于原生不能获取JS函数的返回值，所以得通过协议传输
	getUri: function(message) {
		var uri = CUSTOM_PROTOCOL_SCHEME + '://' + API_Name;
		if(message) {
			// 回调id作为端口存在
			var callbackId, method, params;
			if(message.callbackId) {
				// 第一种:h5主动调用原生
				callbackId = message.callbackId;
				method = message.handlerName;
				params = message.data;
			} else if(message.responseId) {
				// 第二种:原生调用h5后，h5回调
				// 这种情况下需要原生自行分析传过去的port是否是它定义的回调
				callbackId = message.responseId;
				method = message.handlerName;
				params = message.responseData;
			}
			// 参数转为字符串
			params = this.getParam(params);
			// uri 补充
			uri += ':' + callbackId + '/' + method + '?' + params;
		}

		return uri;
	},
	getParam: function(obj) {
		if(obj && typeof obj === 'object') {
			return JSON.stringify(obj);
		} else {
			return obj || '';
		}
	}
};

export let JSBridge = {

	// 定义的回调函数集合，在原生调用完对应的方法后，会执行对应的回调函数id
    responseCallbacks: {},
	// 本地注册的方法集合，原生只能调用本地注册的方法，否则会提示错误
    messageHandlers: {},
	
	/**
	 * @description 注册本地JS方法通过JSBridge给原生调用
	 * 我们规定，原生必须通过JSBridge来调用H5的方法
	 * 注意，这里一般对本地函数有一些要求，要求第一个参数是data，第二个参数是callback
	 * @param {String} handlerName 方法名
	 * @param {Function} handler 对应的方法
	 */
	registerHandler: function(handlerName, handler) {
		messageHandlers[handlerName] = handler;
	},
	/**
	 * @description 调用原生开放的方法
	 * @param {String} handlerName 方法名
	 * @param {JSON} data 参数
	 * @param {Function} callback 回调函数
	 */
	callHandler: function(handlerName, data, callback) {
		// 如果没有 data
		if(arguments.length == 3 && typeof data == 'function') {
			callback = data;
			data = null;
		}

		this._doSend({
			handlerName: handlerName,
			data: data
		}, callback);
	},
	/**
	 * @description 原生调用H5页面注册的方法，或者调用回调方法
	 * @param {String} messageJSON 对应的方法的详情，需要手动转为json
	 */
	_handleMessageFromNative: function(messageJSON) {

		// setTimeout(_doDispatchMessageFromNative);
		/**
		 * @description 处理原生过来的方法
		 */
		// function _doDispatchMessageFromNative() {
			var message;
			try {
				if(typeof messageJSON === 'string') {
					message = JSON.parse(messageJSON);
				} else {
					message = messageJSON;
				}
			} catch(e) {
				// TODO handle the exception
				console.error("原生调用H5方法出错，传入参数错误");
				return;
			}


			// 回调函数
			var responseCallback;
			if(message.callbackId) {
				// 这里规定，原生执行方法完毕后准备通知h5执行回调时，回调函数id是responseId
				responseCallback = this.responseCallbacks[message.callbackId];
				if(!responseCallback) {
					return;
				}
				// 执行本地的回调函数
				responseCallback(message.data);
				// delete this.responseCallbacks[message.callbackId];
			} else {
				// 否则,代表原生主动执行h5本地的函数
				// 从本地注册的函数中获取
				var handler = messageHandlers[message.handlerName];
				if(!handler) {
					// 本地没有注册这个函数
				} else {
					// 执行本地函数,按照要求传入数据和回调
					handler(message.data);
				}
			}
		// }
	},
	/**
	 * @description JS调用原生方法前，会先send到这里进行处理
	 * @param {JSON} message 调用的方法详情，包括方法名，参数
	 * @param {Function} responseCallback 调用完方法后的回调
	 */
	_doSend: function(message, responseCallback) {
		if(responseCallback) {
			// 取到一个唯一的callbackid
			var callbackId = Util.getCallbackId();
			// 回调函数添加到集合中
			this.responseCallbacks[callbackId] = responseCallback;
			// 方法的详情添加回调函数的关键标识
			message['callbackId'] = callbackId;
		}
		
		// 获取触发方法的url scheme
		var uri = Util.getUri(message);
		window.location.href = uri;
	}
}














