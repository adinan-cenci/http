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

/***/ "./src/CastDown.js":
/*!*************************!*\
  !*** ./src/CastDown.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Convert = __webpack_require__(/*! ./Convert.js */ \"./src/Convert.js\");\n\nclass CastDown \n{\n    /**\n     * Convert different types of data into plain objects: query strings,\n     * urls, json, FormData objects, HTMLFormElement objects, Url objects, \n     * URLSearchParams objects\n     * \n     * @param mixed data \n     * @returns object\n     */\n    static toObject(data) \n    {\n        var formData, url, searchParams;\n\n        if (data.constructor.name == 'Object') {\n            return data;\n        }\n\n        if (data instanceof FormData) {\n            return Convert.formDataToObject(data);\n        }\n\n        if (data instanceof HTMLFormElement) {\n            formData = new FormData(data);\n            return Convert.formDataToObject(formData);\n        }\n\n        if (data instanceof URL) {\n            return Convert.queryStringToObject(data.search);\n        }\n\n        if (data instanceof URLSearchParams) {\n            return Convert.searchParamsToObject(data);\n        }\n\n        if (! typeof data == 'string') {\n            return null;\n        }\n\n        if (Convert.isValidJson(data)) {\n            return JSON.parse(data);\n        }\n\n        url = Convert.stringToUrl(data);\n        searchParams = url && url.search ? \n            new URLSearchParams(url.search) : \n            new URLSearchParams(data);\n\n        if (! CastDown.emptySearchParams(searchParams)) {\n            return Convert.searchParamsToObject(searchParams);\n        }\n\n        return null;\n    }\n\n    /**\n     * Convert different types of data into json strings: query strings,\n     * urls, plain objects, FormData objects, HTMLFormElement objects, Url objects, \n     * URLSearchParams objects\n     * \n     * @param mixed data \n     * @returns string Json string.\n     */\n    static toJson(data) \n    {\n        var obj;\n\n        if (Convert.isValidJson(data)) {\n            return data;\n        }\n\n        obj = CastDown.toObject(data);\n\n        return JSON.stringify(obj);\n    }\n\n    /**\n     * Convert different types of data into FormData objects: query strings,\n     * urls, plain objects, json strings, HTMLFormElement objects, Url objects, \n     * URLSearchParams objects\n     * \n     * @param mixed data \n     * @returns FormData\n     */\n    static toFormData(data) \n    {\n        var obj;\n\n        if (data instanceof FormData) {\n            return data;\n        }\n\n        if (data instanceof HTMLFormElement) {\n            return new FormData(data);\n        }\n\n        obj = CastDown.toObject(data);\n\n        return Convert.objectToFormData(obj);\n    }\n\n    /**\n     * @param URLSearchParams\n     * @returns bool\n     */\n    static emptySearchParams(searchParams) \n    {\n        for (var value of searchParams.values()) {\n            if (value) {\n                return false;\n            }\n        }\n\n        return true;\n    }\n}\n\nmodule.exports = CastDown;\n\n//# sourceURL=webpack://http/./src/CastDown.js?");

/***/ }),

/***/ "./src/Convert.js":
/*!************************!*\
  !*** ./src/Convert.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const HelperString = __webpack_require__(/*! ./HelperString.js */ \"./src/HelperString.js\");\nconst HelperUrl = __webpack_require__(/*! ./HelperUrl.js */ \"./src/HelperUrl.js\");\n\nclass Convert \n{\n    /**\n     * Parses an string into an URL object.\n     * The URL class already parses full url, but not relative ones, \n     * hence this method.\n     *\n     * @param string uri Absolute or relative.\n     * @return URL\n     */\n    static stringToUrl(uri) \n    {\n        if (HelperUrl.isAbsolute(uri)) {\n            return new URL(uri);\n        }\n\n        var url;\n        const isRootPath = uri.slice(0, 1) == '/';\n        const baseHref   = HelperUrl.getBaseHref();\n\n        if (isRootPath) {\n            url = new URL(baseHref);\n            url.pathname = uri;\n            url.placeholder = url.toString().replace(uri, '');\n        } else {\n            url = new URL(baseHref + HelperString.ltrim(uri, '/'));\n            url.placeholder = baseHref;\n        }\n\n        return url;\n    }\n\n    /**\n     * Convert an URL object back into string.\n     * The URL class already can do that, but it does not support relative\n     * urls, hence this method.\n     * \n     * @param URL url \n     * @return string\n     */\n    static urlToString(url) \n    {\n        var string = url.toString();\n\n        if (url.placeholder) {\n            string = string.replace(url.placeholder, '');\n        }\n\n        return string;\n    }\n\n    /**\n     * Convert URLSearchParams objects into plain objects.\n     * It will translate array parameters into nested properties, for example:\n     * 'person[name]=foobar' will became {person: {name: 'foobar'}}\n     * \n     * @param URLSearchParams searchParams\n     * @returns object\n     */\n    static searchParamsToObject(searchParams) \n    {\n        var obj = {}\n\n        for (var [paramName, value] of searchParams.entries()) {\n            // Is array ?\n            var keys = paramName.indexOf('[') == -1\n                ? [paramName]\n                : HelperString.rtrim(paramName, ']').split(/\\]?\\[/);\n\n            Convert.addPropertyToObject(obj, keys, value);\n        }\n\n        return obj;\n    }\n\n    /**\n     * Will add a 'value' to object, nesting it inside children properties\n     * based on 'propertiesNames'.\n     * \n     * @param object object \n     * @param string[] propertiesNames \n     * @param mixed value \n     */\n    static addPropertyToObject(object, propertiesNames, value) \n    {\n        var last = propertiesNames.pop();\n        for (var property of propertiesNames) {\n            if (typeof object[property] == 'undefined') {\n                object[property] = !isNaN(property) ? [] : {};\n            }\n            object = object[property];\n        }\n\n        object[last] = value;\n    }\n\n    /**\n     * Converts a plain object into a URLSearchParams.\n     * Nested properties will be rendered as array parameters, for example:\n     * {person: {name: 'foobar'}} will became 'person[name]=foobar'\n     * \n     * @param object \n     * @returns URLSearchParams\n     */\n    static objectToSearchParams(object) \n    {\n        var searchParams = new URLSearchParams();\n\n        for (var propertyName in object) {\n            Convert.addToSearchparam(searchParams, propertyName, object[propertyName]);\n        }\n\n        return searchParams;\n    }\n\n    /**\n     * Will add a new parameter to URLSearchParams or FormData objects.\n     * If 'value' is an array or object, the proprieties children will be\n     * rendered as arrayed parameters, for example:\n     * {person: {name: 'foobar'}} will became 'person[name]=foobar'\n     * \n     * @param URLSearchParams|FormData searchParams \n     * @param string paramName \n     * @param mixed value \n     */\n    static addToSearchparam(searchParams, paramName, value) \n    {\n        if (Array.isArray(value) || typeof value == 'object') {\n\n            for (var propertyName in value) {\n                Convert.addToSearchparam(searchParams, paramName + '[' + propertyName + ']', value[propertyName]);            \n            }\n\n        } else {\n            searchParams.set(paramName, value);\n        }\n    }\n\n    /**\n     * Convert a plain object into a FormData object.\n     * Nested properties will be rendered as array parameters, for example:\n     * {person: {name: 'foobar'}} will became 'person[name]=foobar'\n     * \n     * @param object \n     * @returns FormData\n     */\n    static objectToFormData(object) \n    {\n        var formData = new FormData();\n\n        for (var propertyName in object) {\n            Convert.addToSearchparam(formData, propertyName, object[propertyName]);\n        }\n\n        return formData;\n    }\n\n    /**\n     * Convert FormData objects into plain objects.\n     * It will translate array parameters into nested properties, for example:\n     * 'person[name]=foobar' will became {person: {name: 'foobar'}}\n     * \n     * @param URLSearchParams searchParams\n     * @returns object\n     */\n    static formDataToObject(formData) \n    {\n        return Convert.searchParamsToObject(formData);\n    }\n\n    /**\n     * @param object\n     * @returns string A query string\n     */\n    static objectToQueryString(object) \n    {\n        var serchParams = Convert.objectToSearchParams(object);\n        return serchParams.toString();\n    }\n\n    /**\n     * @param string queryString \n     * @returns object\n     */\n    static queryStringToObject(queryString) \n    {\n        var searchParams = new URLSearchParams(queryString);\n        return Convert.searchParamsToObject(searchParams);\n    }\n\n    /**\n     * @param string data \n     * @returns bool\n     */\n    static isValidJson(data) \n    {\n        if (typeof data != 'string') {\n            return false;\n        }\n\n        try {\n            JSON.parse(data);\n        } catch (error) {\n            return false;\n        }\n\n        return true;\n    }\n}\n\nmodule.exports = Convert;\n\n//# sourceURL=webpack://http/./src/Convert.js?");

/***/ }),

/***/ "./src/HelperString.js":
/*!*****************************!*\
  !*** ./src/HelperString.js ***!
  \*****************************/
/***/ ((module) => {

eval("class HelperString \n{\n    /**\n     * Removes specified character from beggining of of the string.\n     * \n     * @param string string The input string.\n     * @param string char The specified character.\n     * @returns string The trimmed string.\n     */\n    static ltrim(string, char = null) \n    {\n        char = char || '[ \\t\\n\\r\\0\\v]';\n        var exp = new RegExp('^' + char + '+');\n        return string.replace(exp, '');\n    }\n\n    /**\n     * Removes specified character from end of the string.\n     * \n     * @param string string The input string.\n     * @param string char The specified character.\n     * @returns string The trimmed string.\n     */\n    static rtrim(string, char = null) \n    {\n        char = char || '[ \\t\\n\\r\\0\\v]';\n        var exp = new RegExp(char + '+$');\n        return string.replace(exp, '');\n    }\n    \n    /**\n     * Removes specified character from both ends of the string.\n     * \n     * @param string string The input string.\n     * @param string char The specified character.\n     * @returns string The trimmed string.\n     */\n    static trim(string, char = ' ') \n    {\n        string = HelperString.ltrim(string, char);\n        string = HelperString.rtrim(string, char);\n        return string;\n    }\n}\n\nmodule.exports = HelperString;\n\n\n//# sourceURL=webpack://http/./src/HelperString.js?");

/***/ }),

/***/ "./src/HelperUrl.js":
/*!**************************!*\
  !*** ./src/HelperUrl.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const HelperString = __webpack_require__(/*! ./HelperString.js */ \"./src/HelperString.js\");\n\nclass HelperUrl \n{\n    /**\n     * Returns the base href of the document, usefull when working with\n     * relative urls.\n     * \n     * @returns string An url\n     */\n    static getBaseHref() \n    {\n        return HelperUrl.getDocumentBaseHref() ?? HelperUrl.getWindowLocationBaseHref();\n    }\n\n    /**\n     * Attempts to figure out the base href based on the current value of \n     * window.location\n     * \n     * @returns string An url\n     */\n    static getWindowLocationBaseHref() \n    {\n        const location = window.location;\n        var href;\n\n        // Path ends with an \"/\", it must be a directory\n        if (location.pathname.slice(-1) == '/') {\n            href = location.protocol + '//' + location.host + location.pathname;\n        } else {\n            const matchExtension = location.pathname.match(/\\.[\\w]{2,4}$/);\n\n            // There is no extension, it may or may not be a directory\n            // but lets assume it is.\n            href = !matchExtension\n                ? location.protocol + '//' + location.host + location.pathname\n                // There is an extension, likely a file, lets remove the last part of the url.\n                : location.protocol + '//' + location.host + location.pathname.replace(/\\/[^\\/]+$/, '');\n        }\n\n        return HelperString.rtrim(href, '/') + '/';\n    }\n\n    /**\n     * If specified, returns the href attribute in the <base> tag,\n     * returns null otherwise.\n     * \n     * @returns string|null\n     */\n    static getDocumentBaseHref() \n    {\n        const base = document.querySelector('base');\n        if (! base) {\n            return null;\n        }\n\n        const href = base.getAttribute('href');\n        if (! href) {\n            return null;\n        }\n\n        return HelperString.rtrim(href, '/') + '/';\n    }\n\n    /**\n     * @param string uri \n     * @returns bool\n     */\n    static isAbsolute(uri) \n    {\n        return uri.substr(0, 4) == 'http';\n    }\n}\n\nmodule.exports = HelperUrl;\n\n\n//# sourceURL=webpack://http/./src/HelperUrl.js?");

/***/ }),

/***/ "./src/Http.js":
/*!*********************!*\
  !*** ./src/Http.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Convert = __webpack_require__(/*! ./Convert.js */ \"./src/Convert.js\");\nconst CastDown = __webpack_require__(/*! ./CastDown.js */ \"./src/CastDown.js\");\n\nclass Http \n{\n    defaultOptions = {}\n\n    /**\n     * @param object defaultOptions The default options to be used on every\n     * request, except when overwritten ofcourse.\n     */\n    constructor(defaultOptions = {}) \n    {\n        this.defaultOptions = defaultOptions;\n    }\n\n    /**\n     * @param string url \n     * @param object options \n     * @returns Promise\n     */\n    async fetch(url, options = {}) \n    {\n        if (! options.method) {\n            options.method = 'get';\n        }\n\n        return this.request(url, options);\n    }\n\n    async get(url, options = {}) \n    {\n        options.method = 'get';\n        return this.request(url, options);\n    }\n\n    async post(url, options = {})\n    {\n        options.method = 'post';\n        return this.request(url, options);\n    }\n\n    async put(url, options = {}) \n    {\n        options.method = 'put';\n        return this.request(url, options);\n    }\n\n    async delete(url, options = {}) \n    {\n        options.method = 'delete';\n        return this.request(url, options);\n    }\n\n    async options(url, options = {})\n    {\n        options.method = 'options';\n        return this.request(url, options);\n    }\n\n    async patch(url, options = {})\n    {\n        options.method = 'patch';\n        return this.request(url, options);\n    }\n\n    static createRequest(url, options) \n    {\n        if (options.headers == undefined) {\n            options.headers = {};\n        }\n\n        if (! ['get', 'post'].includes(options.method)) {            \n            options.headers['x-http-method-override'] = options.method;\n            options.method = 'post';\n        }\n\n        // Add params to the query string\n        if (options.params) {\n            url = Http.addToQueryString(url, options.params);\n            options.params = undefined;\n        }\n\n        // Can't send body in get requests, put the data on the URL\n        if (options.method == 'get' && options.body) {\n            url = Http.addToQueryString(url, options.body);\n            options.body = undefined;\n        } else if (options.body) {\n            options.body = Http.getHeader(options.headers, 'Content-Type') == 'application/json'\n                ? CastDown.toJson(options.body)\n                : CastDown.toFormData(options.body);\n        }\n\n        Http.clearUpOptions(options);\n\n        return new Request(url, options);\n    }\n\n    static clearUpOptions(options) \n    {\n        for (var property in options) {\n            if (options[property] === undefined) {\n                delete options[property];\n            }\n        }\n\n        if (options.headers) {\n            for (var header in options.headers) {\n                if (options.headers[header] === undefined) {\n                    delete options.headers[header];\n                }\n            }\n        }\n    }\n\n    async request(url, options = {}) \n    {\n        options = {\n            ...this.defaultOptions,\n            ...options\n        };\n\n        var request = Http.createRequest(url, options);\n        return fetch(request);\n    }\n\n    /**\n     * Add data to the query string of the 'url', overwriting any overlaping\n     * parameters.\n     * \n     * @param string url \n     * @param mixed object, FormData, HTMLFormElement, json, querystring, another url\n     * @returns string\n     */\n    static addToQueryString(url, data) \n    {\n        var searchParams;\n        data = CastDown.toObject(data);\n\n        url = url instanceof URL \n            ? url \n            : Convert.stringToUrl(url);\n\n        searchParams = url.search \n            ? new URLSearchParams(url.search)\n            : new URLSearchParams();\n\n        for (var propertyName in data) {\n            Convert.addToSearchparam(searchParams, propertyName, data[propertyName]);\n        }\n\n        url.search = searchParams.toString();\n\n        return Convert.urlToString(url);\n    }\n\n    static getHeader(headers, headerName) \n    {\n        headerName = headerName.toLowerCase();\n\n        for (let prp in headers) {\n            if (prp.toLocaleLowerCase() == headerName) {\n                return headers[prp];\n            }\n        }\n\n        return null;\n    }\n}\n\nmodule.exports = Http;\n\n//# sourceURL=webpack://http/./src/Http.js?");

/***/ }),

/***/ "./tests/test-index.js":
/*!*****************************!*\
  !*** ./tests/test-index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("window.Http = __webpack_require__(/*! ../src/Http.js */ \"./src/Http.js\");\nwindow.HelperString = __webpack_require__(/*! ../src/HelperString.js */ \"./src/HelperString.js\");\nwindow.HelperUrl = __webpack_require__(/*! ../src/HelperUrl.js */ \"./src/HelperUrl.js\");\nwindow.Convert = __webpack_require__(/*! ../src/Convert.js */ \"./src/Convert.js\");\nwindow.CastDown = __webpack_require__(/*! ../src/CastDown.js */ \"./src/CastDown.js\");\n\n//# sourceURL=webpack://http/./tests/test-index.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./tests/test-index.js");
/******/ 	
/******/ })()
;