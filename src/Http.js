const Convert      = require('./Convert.js');
const CastDown     = require('./CastDown.js');
const HelperUrl    = require('./HelperUrl.js');
const HelperString = require('./HelperString.js');

class Http 
{
    defaultOptions = {}

    /**
     * @param object defaultOptions The default options to be used on every
     * request, except when overwritten ofcourse.
     */
    constructor(defaultOptions = {}) 
    {
        if (defaultOptions.baseHref != undefined) {
            defaultOptions.baseHref = HelperString.rtrim(defaultOptions.baseHref, '/') + '/';
        }

        this.defaultOptions = defaultOptions;
    }

    /**
     * @param string url 
     * @param object options 
     * @returns Promise
     */
    async fetch(url, options = {}) 
    {
        if (! options.method) {
            options.method = 'get';
        }

        return this.request(url, options);
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
        if (typeof url == 'string') {
            url = HelperUrl.isRelative(url)
                ? new URL(url, options.baseHref || HelperUrl.getBaseHref())
                : new URL(url);
        }

        if (options.headers == undefined) {
            options.headers = {};
        }

        // Add queryParams to the query string
        if (options.queryParams) {
            url = Http.addToQueryString(url, options.queryParams);
            options.queryParams = undefined;
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

        Http.clearUpOptions(options);

        return new Request(url, options);
    }

    static clearUpOptions(options) 
    {
        for (var property in options) {
            if (options[property] === undefined) {
                delete options[property];
            }
        }

        if (options.headers) {
            for (var header in options.headers) {
                if (options.headers[header] === undefined) {
                    delete options.headers[header];
                }
            }
        }
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
     * @param string|URL url 
     * @param mixed object, FormData, HTMLFormElement, json, querystring, another url
     * @returns string
     */
    static addToQueryString(url, data) 
    {
        var searchParams;
        data = CastDown.toObject(data);

        var isObject = url instanceof URL;

        url = isObject 
            ? url 
            : Convert.stringToUrl(url);

        searchParams = url.search 
            ? new URLSearchParams(url.search)
            : new URLSearchParams();

        for (var propertyName in data) {
            Convert.addToSearchparam(searchParams, propertyName, data[propertyName]);
        }

        url.search = searchParams.toString();

        return isObject 
            ? url 
            : Convert.urlToString(url);
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