const Convert = require('./Convert.js');
const CastDown = require('./CastDown.js');

class Http 
{
    fetch(url, options = {}) 
    {
        if (options.method == null || typeof options.method == 'undefined') {
            options.method = get;
        }

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
            default:
                return this.get(url, options);
                break;
        }
    }

    get(url, options = {}) 
    {
        options.method = 'get';

        if (options.params != null && typeof options.params != 'undefined') {
            url = Http.addToQueryString(url, options.params);
            options.params = undefined;
        }

        if (options.body != null && typeof options.body != 'undefined') {
            url = Http.addToQueryString(url, options.body);
            options.body = undefined;
        }

        return this.request(url, options);
    }

    post(url, options = {})
    {
        options.headers = options.headers ?? {};
        options.headers['x-http-method-override'] = 'post';
        options.method = 'post';
        return this.request(url, options);
    }

    put(url, options = {}) 
    {
        options.headers = options.headers ?? {};
        options.headers['x-http-method-override'] = 'put';
        options.method = 'post';
        return this.request(url, options);
    }

    delete(url, options = {}) 
    {
        options.headers = options.headers ?? {};
        options.headers['x-http-method-override'] = 'delete';
        options.method = 'post';
        return this.request(url, options);
    }

    options(url, options = {})
    {
        options.headers = options.headers ?? {};
        options.headers['x-http-method-override'] = 'options';
        options.method = 'post';
        return this.request(url, options);
    }

    patch(url, options = {})
    {
        options.headers = options.headers ?? {};
        options.headers['x-http-method-override'] = 'patch';
        options.method = 'post';
        return this.request(url, options);
    }

    async request(url, options = {}) 
    {
        if (options.params != null && typeof options.params != 'undefined') {
            url = Http.addToQueryString(url, options.params);
            options.params = undefined;
        }

        if (options.body && Http.getHeader(options.headers, 'Content-Type') == 'application/json') {
            options.body = CastDown.toJson(options.body);
        } else if (options.body) {
            options.body = CastDown.toFormData(options.body);
        }

        return this.makeRequest(url, options);
    }

    makeRequest(url, options) 
    {
        return fetch(url, options);
    }

    static addToQueryString(url, data) 
    {
        var params;

        url = url instanceof URL ? url : Convert.stringToUrl(url);
        params = url.search ? new URLSearchParams(url.search) : new URLSearchParams();

        data = CastDown.toObject(data);

        for (var key in data) {
            params.append(key, data[key]);
        }

        url.search = params.toString();

        return Convert.urlToString(url);
    }

    static getHeader(object, headerName) 
    {
        headerName = headerName.toLowerCase();

        for (let prp in object) {
            if (prp.toLocaleLowerCase() == headerName) {
                return object[prp];
            }
        }

        return null;
    }
}

module.exports = Http;