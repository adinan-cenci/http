const Convert = require('./Convert.js');
const CastDown = require('./CastDown.js');

class Http 
{
    defaultOptions = {}

    /**
     * @param object defaultOptions The default options to be used on every
     * request, except when overwritten ofcourse.
     */
    constructor(defaultOptions = {}) 
    {
        this.defaultOptions = defaultOptions;
    }

    /**
     * @param string url 
     * @param object options 
     * @returns Promise
     */
    async fetch(url, options = {}) 
    {
        switch (options.method) {
            case 'post':
                return this.post(url, options);
                break;
            case 'put':
                return this.put(url, options);
                break;
            case 'delete':
                return this.delete(url, options);
                break;
            case 'options':
                return this.options(url, options);
                break;
            case 'patch':
                return this.patch(url, options);
                break;
            case 'get':
                return this.get(url, options);
                break;
            default:
                return this.request(url, options);
                break;
        }
    }

    async get(url, options = {}) 
    {
        options.method = 'get';
        return this.request(url, options);
    }

    async post(url, options = {})
    {
        options.method = 'post';
        return this.request(url, options);
    }

    async put(url, options = {}) 
    {
        options.method = 'put';
        return this.request(url, options);
    }

    async delete(url, options = {}) 
    {
        options.method = 'delete';
        return this.request(url, options);
    }

    async options(url, options = {})
    {
        options.method = 'options';
        return this.request(url, options);
    }

    async patch(url, options = {})
    {
        options.method = 'patch';
        return this.request(url, options);
    }

    static createRequest(url, options) 
    {
        if (! ['get', 'post'].includes(options.method)) {            
            options.headers['x-http-method-override'] = options.method;
            options.method = 'post';
        }

        // Add params to the query string
        if (options.params) {
            url = Http.addToQueryString(url, options.params);
            options.params = undefined;
        }

        // Can't send body in get requests, put the data on the URL
        if (options.method == 'get' && options.body) {
            url = Http.addToQueryString(url, options.body);
            options.body = undefined;
        } else if (options.body) {
            options.body = Http.getHeader(options.headers, 'Content-Type') == 'application/json'
                ? CastDown.toJson(options.body)
                : CastDown.toFormData(options.body);
        }

        return new Request(url, options);
    }

    async request(url, options = {}) 
    {
        options = {
            ...this.defaultOptions,
            ...options
        };

        var request = Http.createRequest(url, options);
        return fetch(request);
    }

    /**
     * Add data to the query string of the 'url', overwriting any overlaping
     * parameters.
     * 
     * @param string url 
     * @param mixed object, FormData, HTMLFormElement, json, querystring, another url
     * @returns string
     */
    static addToQueryString(url, data) 
    {
        var searchParams;
        data = CastDown.toObject(data);

        url = url instanceof URL 
            ? url 
            : Convert.stringToUrl(url);

        searchParams = url.search 
            ? new URLSearchParams(url.search)
            : new URLSearchParams();

        for (var propertyName in data) {
            Convert.addToSearchparam(searchParams, propertyName, data[propertyName]);
        }

        url.search = searchParams.toString();

        return Convert.urlToString(url);
    }

    static getHeader(headers, headerName) 
    {
        headerName = headerName.toLowerCase();

        for (let prp in headers) {
            if (prp.toLocaleLowerCase() == headerName) {
                return headers[prp];
            }
        }

        return null;
    }
}

module.exports = Http;