/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! ./src/Http.js */ \"./src/Http.js\");\n\n//# sourceURL=webpack://http/./index.js?");

/***/ }),

/***/ "./src/CastDown.js":
/*!*************************!*\
  !*** ./src/CastDown.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Convert = __webpack_require__(/*! ./Convert.js */ \"./src/Convert.js\");\n\nclass CastDown \n{\n    /***************************************\n    *** CAST DOWN\n    ****************************************/\n\n    static toObject(data) \n    {\n        var formData, isString, url, searchParams;\n\n        if (data.constructor.name == 'Object') {\n            return data;\n        }\n\n        if (data instanceof FormData) {\n            return Convert.formDataToObject(data);\n        }\n\n        if (data instanceof HTMLFormElement) {\n            formData = new FormData(data);\n            return Convert.formDataToObject(formData);\n        }\n\n        if (data instanceof URL) {\n            return Convert.searchParamsToObject( new URLSearchParams(data.search) );\n        }\n\n        if (data instanceof URLSearchParams) {\n            return Convert.searchParamsToObject(data);\n        }\n\n        if (Convert.isValidJson(data)) {\n            return JSON.parse(data);\n        }\n\n        if (! typeof data == 'string') {\n            return null;\n        }\n\n        url = Convert.stringToUrl(data);\n        searchParams = url && url.search ? \n            new URLSearchParams(url.search) : \n            new URLSearchParams(data);\n\n        if (! CastDown.emptySearchParams(searchParams)) {\n            return Convert.searchParamsToObject(searchParams);\n        }\n    }\n\n    static toJson(data) \n    {\n        var obj;\n\n        if (Convert.isValidJson(data)) {\n            return data;\n        }\n\n        obj = CastDown.toObject(data);\n\n        return JSON.stringify(obj);\n    }\n\n    static toFormData(data) \n    {\n        var obj;\n\n        if (data instanceof FormData) {\n            return data;\n        }\n\n        if (data instanceof HTMLFormElement) {\n            return new FormData(data);\n        }\n\n        obj = CastDown.toObject(data);\n\n        return Convert.objectToFormData(obj);\n    }\n\n    static emptySearchParams(searchParams) \n    {\n        for (var value of searchParams.values()) {\n            if (value) {\n                return false;\n            }\n        }\n\n        return true;\n    }\n}\n\nmodule.exports = CastDown;\n\n//# sourceURL=webpack://http/./src/CastDown.js?");

/***/ }),

/***/ "./src/Convert.js":
/*!************************!*\
  !*** ./src/Convert.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const HelperString = __webpack_require__(/*! ./HelperString.js */ \"./src/HelperString.js\");\nconst HelperUrl = __webpack_require__(/*! ./HelperUrl.js */ \"./src/HelperUrl.js\");\n\nclass Convert \n{\n    /***************************************\n    *** STRING - URL\n    ****************************************/\n\n    static stringToUrl(string) \n    {\n        // Absolute URL\n        if (string.substr(0, 4) == 'http') {\n            return new URL(string);\n        }\n\n        // Relative URL\n        const endingSlash   = string.slice(-1) == '/';\n        const beginingSlash = string.slice(0, 1) == '/';\n        const baseString    = HelperUrl.getBaseUrl();\n\n        if (beginingSlash) {\n            var url = new URL(baseString);\n            url.pathname = string;\n            url.placeholder = url.toString().replace(string, '');\n        } else {\n            var url = new URL(baseString + HelperString.ltrim(string, '/'));\n            url.placeholder = baseString + ( endingSlash ? '' : '/' );\n        }\n\n        return url;\n    }\n\n    static urlToString(url) \n    {\n        var string = url.toString();\n\n        if (url.placeholder) {\n            string = string.replace(url.placeholder, '');\n        }\n\n        return string;\n    }\n\n    /***************************************\n    *** OBJECT - SEARCH PARAM ( URLSearchParams )\n    ****************************************/\n\n    static searchParamsToObject(searchParams) \n    {\n        var obj = {};\n\n        for (var [k, v] of searchParams.entries()) {\n            obj[k] = v;\n        }\n\n        return obj;\n    }\n\n    static objectToSearchParams(object) \n    {\n        var serchParams = new URLSearchParams();\n\n        for (var property in object) {\n            serchParams.set(property, object[property]);\n        }\n\n        return serchParams;\n    }\n\n    /***************************************\n    *** OBJECT - FORM DATA\n    ****************************************/\n\n    static objectToFormData(object) \n    {\n        var formData = new FormData();\n\n        for (var property in object) {\n            formData.append(property, object[property]);\n        }\n\n        return formData;\n    }\n\n    static formDataToObject(formData) \n    {\n        var obj = {};\n\n        formData.forEach((value, key) => obj[key] = value);\n\n        return obj;\n    }\n\n    /***************************************\n    *** OBJECT - QUERY STRING\n    ****************************************/\n\n    static objectToQueryString(obj) \n    {\n        var serchParams = Convert.objectToSearchParams(obj);\n        return serchParams.toString();\n    }\n\n    static isValidJson(data) \n    {\n        if (typeof data != 'string') {\n            return false;\n        }\n\n        try {\n            JSON.parse(data);\n        } catch (error) {\n            return false;\n        }\n\n        return true;\n    }\n}\n\nmodule.exports = Convert;\n\n//# sourceURL=webpack://http/./src/Convert.js?");

/***/ }),

/***/ "./src/HelperString.js":
/*!*****************************!*\
  !*** ./src/HelperString.js ***!
  \*****************************/
/***/ ((module) => {

eval("class HelperString \n{\n    static ltrim(string, char = ' ') \n    {\n        var exp = new RegExp('^' + char + '+');\n        return string.replace(exp, '');\n    }\n\n    static rtrim(string, char = ' ') \n    {\n        var exp = new RegExp(char + '+$');\n        return string.replace(exp, '');\n    }\n    \n    static trim(string, char = ' ') \n    {\n        string = HelperString.ltrim(string, char);\n        string = HelperString.rtrim(string, char);\n        return string;\n    }\n}\n\nmodule.exports = HelperString;\n\n\n//# sourceURL=webpack://http/./src/HelperString.js?");

/***/ }),

/***/ "./src/HelperUrl.js":
/*!**************************!*\
  !*** ./src/HelperUrl.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const HelperString = __webpack_require__(/*! ./HelperString.js */ \"./src/HelperString.js\");\n\nclass HelperUrl \n{\n    static getBaseUrl() \n    {\n        const baseHref = HelperUrl.getBaseHref();\n\n        if (baseHref) {\n            return baseHref;\n        }\n\n        return HelperUrl.getBaseUri();\n    }\n\n    static getBaseUri() \n    {\n        // Path ends with an \"/\", it must be a directory\n        if (window.location.pathname.slice(-1) == '/') {\n            return window.location.protocol + '//' + window.location.host + window.location.pathname;\n        }\n        \n        const matchExtension = window.location.pathname.match(/\\.[\\w]{2,4}$/);\n\n        // There is no extension, it may or may not be a directory\n        // but lets assume it is.\n        if (! matchExtension) {\n            return window.location.protocol + '//' + window.location.host + window.location.pathname + '/';\n        }\n\n        // There is an extension, likely a file, lets remove the last part of the url.\n        return window.location.protocol + '//' + window.location.host + window.location.pathname.replace(/\\/[^\\/]+$/, '') + '/';\n    }\n\n    static getBaseHref() \n    {\n        const base = document.querySelector('base');\n\n        if (! base) {\n            return null;\n        }\n\n        const href = base.getAttribute('href');\n\n        if (! href) {\n            return href;\n        }\n\n        return HelperString.rtrim(href, '/') + '/';\n    }\n}\n\nmodule.exports = HelperUrl;\n\n\n//# sourceURL=webpack://http/./src/HelperUrl.js?");

/***/ }),

/***/ "./src/Http.js":
/*!*********************!*\
  !*** ./src/Http.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Convert = __webpack_require__(/*! ./Convert.js */ \"./src/Convert.js\");\nconst CastDown = __webpack_require__(/*! ./CastDown.js */ \"./src/CastDown.js\");\n\nclass Http \n{\n    fetch(url, options = {}) \n    {\n        if (options.method == null || typeof options.method == 'undefined') {\n            options.method = get;\n        }\n\n        switch (options.method) {\n            case 'post':\n                return this.post(url, options);\n                break;\n            case 'put':\n                return this.put(url, options);\n                break;\n            case 'delete':\n                return this.delete(url, options);\n                break;\n            case 'options':\n                return this.options(url, options);\n                break;\n            case 'patch':\n                return this.patch(url, options);\n                break;\n            default:\n                return this.get(url, options);\n                break;\n        }\n    }\n\n    get(url, options = {}) \n    {\n        options.method = 'get';\n\n        if (options.params != null && typeof options.params != 'undefined') {\n            url = Http.addToQueryString(url, options.params);\n            options.params = undefined;\n        }\n\n        if (options.body != null && typeof options.body != 'undefined') {\n            url = Http.addToQueryString(url, options.body);\n            options.body = undefined;\n        }\n\n        return this.request(url, options);\n    }\n\n    post(url, options = {})\n    {\n        options.headers = options.headers ?? {};\n        options.headers['x-http-method-override'] = 'post';\n        options.method = 'post';\n        return this.request(url, options);\n    }\n\n    put(url, options = {}) \n    {\n        options.headers = options.headers ?? {};\n        options.headers['x-http-method-override'] = 'put';\n        options.method = 'post';\n        return this.request(url, options);\n    }\n\n    delete(url, options = {}) \n    {\n        options.headers = options.headers ?? {};\n        options.headers['x-http-method-override'] = 'delete';\n        options.method = 'post';\n        return this.request(url, options);\n    }\n\n    options(url, options = {})\n    {\n        options.headers = options.headers ?? {};\n        options.headers['x-http-method-override'] = 'options';\n        options.method = 'post';\n        return this.request(url, options);\n    }\n\n    patch(url, options = {})\n    {\n        options.headers = options.headers ?? {};\n        options.headers['x-http-method-override'] = 'patch';\n        options.method = 'post';\n        return this.request(url, options);\n    }\n\n    async request(url, options = {}) \n    {\n        if (options.params != null && typeof options.params != 'undefined') {\n            url = Http.addToQueryString(url, options.params);\n            options.params = undefined;\n        }\n\n        if (options.body && Http.getHeader(options.headers, 'Content-Type') == 'application/json') {\n            options.body = CastDown.toJson(options.body);\n        } else if (options.body) {\n            options.body = CastDown.toFormData(options.body);\n        }\n\n        return this.makeRequest(url, options);\n    }\n\n    makeRequest(url, options) \n    {\n        return fetch(url, options);\n    }\n\n    static addToQueryString(url, data) \n    {\n        var params;\n\n        url = url instanceof URL ? url : Convert.stringToUrl(url);\n        params = url.search ? new URLSearchParams(url.search) : new URLSearchParams();\n\n        data = CastDown.toObject(data);\n\n        for (var key in data) {\n            params.append(key, data[key]);\n        }\n\n        url.search = params.toString();\n\n        return Convert.urlToString(url);\n    }\n\n    static getHeader(object, headerName) \n    {\n        headerName = headerName.toLowerCase();\n\n        for (let prp in object) {\n            if (prp.toLocaleLowerCase() == headerName) {\n                return object[prp];\n            }\n        }\n\n        return null;\n    }\n}\n\nmodule.exports = Http;\n\n//# sourceURL=webpack://http/./src/Http.js?");

/***/ }),

/***/ "./test/test-http-get.js":
/*!*******************************!*\
  !*** ./test/test-http-get.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Http = __webpack_require__(/*! ../index.js */ \"./index.js\");\nconst http = new Http();\n\nwindow.http = http;\nfunction testGetRequestQueryString() \n{\n    http.get('get-with-query-string.php', { body: 'foo=bar' });\n}\ntestGetRequestQueryString();\n\n//---------------------------------------------\n\nfunction testGetRequestObject() \n{\n    http.get('get-with-object.php', { body: {foo: 'bar'} });\n}\ntestGetRequestObject();\n\n//---------------------------------------------\n\nfunction testGetRequestJson() \n{\n    http.get('get-with-json.php', { body: '{\"foo\": \"bar\"}' });\n}\ntestGetRequestJson();\n\n//---------------------------------------------\n\nfunction testGetRequestForm() \n{\n    var form = document.createElement('form');\n    var first = document.createElement('input');\n    first.setAttribute('name', 'foo');\n    first.setAttribute('value', 'bar');\n    first.setAttribute('type', 'hidden');\n    form.append(first);\n\n    var second = document.createElement('input');\n    second.setAttribute('name', 'bar');\n    second.setAttribute('value', 'foo');\n    second.setAttribute('type', 'hidden');\n    form.append(second);\n\n    http.get('get-with-form.php', { body: form });\n}\ntestGetRequestForm();\n\n//---------------------------------------------\n\nfunction testGetRequestFormData() \n{\n    var formdata = new FormData;\n    formdata.append('foo', 'bar');\n    formdata.append('bar', 'foo');\n\n    http.get('get-with-form-data.php', { body: formdata });\n}\ntestGetRequestFormData();\n\n\n//# sourceURL=webpack://http/./test/test-http-get.js?");

/***/ }),

/***/ "./test/test-http-post.js":
/*!********************************!*\
  !*** ./test/test-http-post.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Http = __webpack_require__(/*! ../index.js */ \"./index.js\");\nconst http = new Http();\n\nfunction testPostRequestQueryString() \n{\n    http.post('post-with-query-string.php', { body: 'foo=bar' });\n}\ntestPostRequestQueryString();\n\n//---------------------------------------------\n\nfunction testPostRequestObject() \n{\n    http.post('post-with-object.php', { body: {foo: 'bar'} });\n}\ntestPostRequestObject();\n\n//---------------------------------------------\n\nfunction testPostRequestJson() \n{\n    http.post('post-with-json.php', { body: '{\"foo\": \"bar\"}' });\n}\ntestPostRequestJson();\n\n//---------------------------------------------\n\nfunction testPostRequestForm() \n{\n    var form = document.createElement('form');\n    var first = document.createElement('input');\n    first.setAttribute('name', 'foo');\n    first.setAttribute('value', 'bar');\n    first.setAttribute('type', 'hidden');\n    form.append(first);\n\n    var second = document.createElement('input');\n    second.setAttribute('name', 'bar');\n    second.setAttribute('value', 'foo');\n    second.setAttribute('type', 'hidden');\n    form.append(second);\n\n    http.post('post-with-form.php', { body: form });\n}\ntestPostRequestForm();\n\n//---------------------------------------------\n\nfunction testPostRequestFormData() \n{\n    var formdata = new FormData;\n    formdata.append('foo', 'bar');\n    formdata.append('bar', 'foo');\n\n    http.post('post-with-form-data.php', { body: formdata });\n}\ntestPostRequestFormData();\n\n\n//# sourceURL=webpack://http/./test/test-http-post.js?");

/***/ }),

/***/ "./test/test-http.js":
/*!***************************!*\
  !*** ./test/test-http.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("__webpack_require__(/*! ./test-http-post.js */ \"./test/test-http-post.js\");\n__webpack_require__(/*! ./test-http-get.js */ \"./test/test-http-get.js\");\n\n//# sourceURL=webpack://http/./test/test-http.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./test/test-http.js");
/******/ 	
/******/ })()
;