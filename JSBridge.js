/**
 * @description  JSBridge前端交互库
 * @author mayongjing
 * @version 1.0
 * @time 2017-10-26
 */

/**
 * 第一步：设计出一个Native与JS交互的全局对象
 * 我们规定，JS与Native之间的通信必须通过一个全局对象JSbridge来实现，该对象有如下特点：
 * 1、该对象名为“JSBridge”，是H5页面中全局对象window的一个属性
 * 2、该对象有如下方法：
 *   1）registerHandler(String,Function) H5调用，注册本地JS方法，注册后Native可通过
 *     JSBridged调用，调用后将方法注册到本地变量messageHandlers中。
 *   2）callHandler(String,JSON,Function) H5调用，调用原生开放的api，调用后实际上还
 *     是本地通过url scheme触发。调用时会将回调id存放到本地变量responseCallbacks中。
 *   3）_handleMessageFromNative(JSON) Native调用，原生调用H5页面注册的方法，或者
 *     通知H5页面执行回调方法。
 */

/**
 * 第二步，JS如何调用Native
 * 在第一步中，我们定义好了全局对象，可以通过它的callHandler方法来调用原生，那么它内部
 * 经历了怎么样的过程呢？如下：
 * 1、callHandler内部实现过程
 *   1）判断是否有回调函数，如果有，生成一个回调函数id，并将id和对应回调添加进回调函数
 *   集合responseCallbacks中
 *   2）通过特定的参数转换方法，将传入的数据、方法名一起，拼接成一个url scheme
 *      * url scheme的格式如
 *      * 基本有用信息就是后面的callbackId，handlerName与data
 *      * 原生捕获到这个scheme后会进行分析
 *      * var uri = CUSTOM_PROTOCOL_SCHEME://API_Name:callbackId/handlerName?data
 *   3）使用内部早就建立好的一个隐藏的iframe来触发scheme
 *      * 注意，正常来说是可以通过window.location.href达到发起网络请求的效果的，
 *      * 但是有一个很严重的问题，就是如果我们连续多次修改window.location.href的值，
 *      * 在Native层只能接收到最后一次请求，前面的请求都会被忽略掉。
 *      * 所以JS端发起网络请求的时候，需要使用iframe，这样就可以避免这个问题。
 */

/**
 * 第三步，Native如何得知api被调用
 * 在第二步中，我们已经成功在H5页面页面中触发scheme，那么Native如何捕获scheme被触发呢？
 * 根据系统的不同，Android和iOS分别有自己的处理方式
 * 1、Android捕获url scheme
 *    在Android中（WebViewClient里），通过shouldoverrideurlloading可以捕获到url scheme
 *    的触发
 *    public boolean shouldOverrideUrlLoading(WebView view, String url){
 *       // 读取到url后自行进行分析处理
 *
 *       // 如果返回false，则WebView处理链接url，如果返回true，代表WebView根据程序来执行url
 *       return true;
 *	  }
 *
 *     另外，Android中也可以不通过iframe.src来触发scheme，android中可以通过window.prompt(uri, "");
 *     来触发sche,e，然后Native中可以通过重写WebViewClient的onJsPrompt来获取uri
 *
 *  2、iOS捕获url scheme
 *     iOS中，UIWebView有个特性：在UIWebView内发起的所有网络请求，都可以通过delegate函数在
 *     Native层得到通知。这样，我们可以在webview中捕获url scheme的触发（原来是利用shouldStartLoadWithRequest）
 *     - (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType {
 *           NSURL *url = [request URL];
 *           NSString *requestString = [[request URL] absoluteString];
 *          // 获取利润url scheme后自行进行处理
 *
 *       之后Native捕获到了JS调用的url scheme，接下来就该到下一步分析url了
 */

/**
 * 第四步，分析url-参数和回调格式
 * 在前面的步骤中，Native已经接受到了JS调用的方法，那么接下啦，原生就应该按照定义好的数据格式来解析数据了
 * url scheme的格式，前面已经提到。Native接受到Url后，可以安装这种格式将回调参数id、api名、参数提取出来，
 * 然后按照如下步骤进行
 * 1、根据api名，在本地寻找对应的api方法，并且记录该方法执行完后的回调函数id
 * 2、根据提取出来的参数，根据定义和的参数进行转化
 * 3、原生本地执行对应的api功能方法
 * 4、功能执行完毕后，找到这次api调用对应的回调函数id，然后连同需要传递的参数信息，组装成一个JSON格式的参数，
 *   回调的JSON格式为：{responseId:回调id, responseData:回调数据}
 *   responseId String型 H5页面中对于需要执行的回调函数id，在H5中生成url scheme时就已经产生
 *   responseData JSON型 Native需要传递给H5的回调数据，是一个JSON格式：
 *   {code:(整型,调用是否成功,1成功,0失败), result:具体需要传递的结果信息,可以为任意类型, msg:一些其它信息,如调用错误时的错误信息}
 * 5、通过JSBridge通知H5页面回调
 *   参考第五步Native如何调用JS
 */

/**
 * 第五步 Native如何调用JS
 * 到了这一步，就该Native通过JSBridge调用H5的JS方法或者通知H5进行回调了，具体如下：
 *  // 将回调信息传给H5
 *  JSBridge._handleMessageFromNative(messageJSON);
 * 如上，实际上是通过JSBridge的_handleMessageFromNative传递数据给H5，
 * 其中messageJSON数据格式根据两种不同的类型，有所区别，如下：
 * 1、Native通知H5页面进行回调
 *   数据格式为:上文中的回调的JSON格式
 * 2、Native主动调用H5方法
 *   Native主动调用H5方法时,数据格式是:{handlerName:api名, data:数据, callbackId:回调id}
 *   handlerName String型 需要调用的，h5中开放的api的名称
 *   data JSON型 需要传递的数据，固定为JSON格式(因为我们固定H5中注册的方法接收的第一个参数必须是JSON,第二个是回调函数)
 *  注意,这一步中，如果Native调用的api是h5没有注册的，h5页面上会有对应的错误提示。
 *  另外，H5调用Native时，Native处理完毕后一定要及时通知H5进行回调，要不然这个回调函数不会自动销毁，多了后会引发内存泄露。
 */

/**
 * 第六步 H5中api方法的注册以及格式
 * 前面有提到Native主动调用H5中注册的api方法，那么H5中怎么注册供原生调用的api方法呢？格式有时什么呢？如下：
 * 1、H5中注册供原生调用的API
 *  // 注册一个测试函数
 *	JSBridge.registerHandler('testH5Func', function(data, callback){
 *	    alert('测试函数接收到数据:'+JSON.stringify(data));
 *	    callback&&callback('测试回传数据...');
 *	});
 *	如上述代码为注册一个供原生调用的api
 *	2、H5中注册的API格式注意
 *	如上代码，注册的api参数是(data, callback)
 *	其中第一个data即原生传过来的数据，第二个callback是内部封装过一次的，执行callback会触发url scheme，
 *	通知原生获取回调信息
 */

/**
 * 进一步完善JSBridge方案
 * 在前文中，已经完成了一套JSBridge方案，这里，再介绍下如何完善这套方案
 * 1、思路
 * github上有一个开源项目，它里面的JSBridge做法在iOS上进一步优化了，所以参考他的做法，
 * 这里进一步进行了完善。地址github-WebViewJavascriptBridge
 * 大致思路是：H5调用Native的关键步骤进行拆分，由以前的直接传递url scheme变为传递一个统一的url scheme，然后
 * Native主动获取传递的参数
 *   1）完善以前：H5调用Native->将所有参数组装成url scheme->原生捕获scheme，进行分析
 *   2）完善以后：H5调用Native->将所有参数存入本地数组->触发一个固定的url scheme->原生捕获scheme->
 *      原生通过JSBridge主动获取参数->进行分析
 *     

原生通过JSBridge主动获取参数->进行分

作者：撒网要见鱼
链接：http://www.jianshu.com/p/dd12692fcfd6
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 * 在前文中,已经完成了一套JSBridge方案,这里,在介绍下如何完善这套方案
 */

(function() {
	(function(exports) {
		function detect(ua) {
			this.os = {};
			this.os.name = 'browser';
			var funcs = [
				function() { // android
					var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
					if(android) {
						this.os.android = true;
						this.os.version = android[2];
						this.os.isBadAndroid = !(/Chrome\/\d/.test(window.navigator.appVersion));
						this.os.name += '_' + 'Android';
						this.os.name += '_' + 'mobile';
					}
					return this.os.android === true;
				},
				function() { // ios
					var iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/);
					if(iphone) { // iphone
						this.os.ios = this.os.iphone = true;
						this.os.version = iphone[2].replace(/_/g, '.');
						this.os.name += '_' + 'iphone';
						this.os.name += '_' + 'mobile';
					} else {
						var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
						if(ipad) { // ipad
							this.os.ios = this.os.ipad = true;
							this.os.version = ipad[2].replace(/_/g, '.');
							this.os.name += '_' + 'iOS';
							this.os.name += '_' + 'mobile';
						}
					}
					return this.os.ios === true;
				}
			];

			[].every.call(funcs, function(func) {
				return !func.call(exports);
			});
		}

		detect.call(exports, navigator.userAgent);
	})(window.CommonTools = window.CommonTools || {});
	
	// (function(exports) {
	// 	function detect(ua) {
	// 		this.os = this.os || {};
	// 		// 比如 EpointEJS/6.1.1  也可以/(EpointEJS)\/([\d\.]+)/i
	// 		var hybrid = ua.match(/SinopecJsbridgeScheme/i); //TODO ejs
	// 		if(hybrid) {
	// 			this.os.hybrid = true;
	// 			this.os.name += '_' + 'hybrid';
	// 		}
	// 		// 阿里的钉钉 DingTalk/3.0.0 
	// 		var dd = ua.match(/DingTalk/i); // TODO dingding
	// 		if(dd) {
	// 			this.os.dd = true;
	// 			this.os.name += '_' + 'dd';
	// 		}
	// 	}
	// 	detect.call(exports, navigator.userAgent);
	// })(window.CommonTools = window.CommonTools || {});
	

	(function() {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		var JSBridge = window.JSBridge || (window.JSBridge = {});
		// jsbridge协议定义的名称
		var CUSTOM_PROTOCOL_SCHEME = 'SinopecJSBridge';
		// 最外层的api名称
		var API_Name = 'sinopec_bridge';
		// 进行url scheme传值的iframe
		// var messagingIframe = document.createElement('iframe');
		// messagingIframe.style.display = 'none';
		// // messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + API_Name;
		// document.documentElement.appendChild(messagingIframe);

		// 定义的回调函数集合，在原生调用完对应的方法后，会执行对应的回调函数id
		var responseCallbacks = {};
		// 唯一id，用来确保每一个回调函数的唯一性
		var uniqueId = 1;
		// 本地注册的方法集合，原生只能调用本地注册的方法，否则会提示错误
		var messageHandlers = {};
		
		// 实际暴露给原生调用的对象
		var Inner = {
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
				
				_doSend({
					handlerName: handlerName,
					data: data
				}, callback);
			},
			/**
			 * @description 原生调用H5页面注册的方法，或者调用回调方法
			 * @param {String} messageJSON 对应的方法的详情，需要手动转为json
			 */
			_handleMessageFromNative: function(messageJSON) {
				setTimeout(_doDispatchMessageFromNative);
				/**
				 * @description 处理原生过来的方法
				 */
				function _doDispatchMessageFromNative() {
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
						alert("原生调用H5方法出错，传入参数错误")
						return;
					}

					// 回调函数
					var responseCallback;
					if(message.callbackId) {
						// 这里规定，原生执行方法完毕后准备通知h5执行回调时，回调函数id是responseId
						responseCallback = responseCallbacks[message.callbackId];
						if(!responseCallback) {
							return;
						}
						// 执行本地的回调函数
						responseCallback(message.data);
						// delete responseCallbacks[message.callbackId];
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
				}
			}
		};
		/**
		 * @description JS调用原生方法前，会先send到这里进行处理
		 * @param {JSON} message 调用的方法详情，包括方法名，参数
		 * @param {Function} responseCallback 调用完方法后的回调
		 */
		function _doSend(message, responseCallback) {
			if(responseCallback) {
				// 取到一个唯一的callbackid
				var callbackId = Util.getCallbackId();
				// 回调函数添加到集合中
				responseCallbacks[callbackId] = responseCallback;
				// 方法的详情添加回调函数的关键标识
				message['callbackId'] = callbackId;
			}
			
			// 获取触发方法的url scheme
			var uri = Util.getUri(message);
			// android和ios的url scheme调用有所区别
			// hybrid环境判断的UA需要与原生中设置的一致
			// if(CommonTools.os.hybrid) {
				if(CommonTools.os.ios) {
					// ios采用iframe跳转scheme的方法
					// messagingIframe.src = uri;
					window.location.href = uri;
					console.log("ios:触发uri:" + uri);
				} else {
					window.top.prompt(uri, "");
				}
			// } else {
			// 	// 浏览器
			// 	console.error("浏览器中JSBridge无效,scheme:" + uri);
			// }
		}

		var Util = {
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
		for(var key in Inner) {
			if(!hasOwnProperty.call(JSBridge, key)) {
				JSBridge[key] = Inner[key];
			}
		}
	})();
})();