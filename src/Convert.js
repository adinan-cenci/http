const HelperString = require('./HelperString.js');
const HelperUrl = require('./HelperUrl.js');

class Convert 
{
    /***************************************
    *** STRING - URL
    ****************************************/

    static stringToUrl(uri) 
    {
        // Absolute URL
        if (uri.substr(0, 4) == 'http') {
            return new URL(uri);
        }

        // Relative URL
        const trailingSlash = uri.slice(-1) == '/';
        const rootPath      = uri.slice(0, 1) == '/';
        const baseString    = HelperUrl.getBaseHref();

        if (rootPath) {
            var url = new URL(baseString);
            url.pathname = uri;
            url.placeholder = url.toString().replace(uri, '');
        } else {
            var url = new URL(baseString + HelperString.ltrim(uri, '/'));
            url.placeholder = baseString;
        }

        return url;
    }

    static urlToString(url) 
    {
        var string = url.toString();

        if (url.placeholder) {
            string = string.replace(url.placeholder, '');
        }

        return string;
    }

    /***************************************
    *** OBJECT - SEARCH PARAM ( URLSearchParams )
    ****************************************/

    static searchParamsToObject(searchParams) 
    {
        var obj = {}

        for (var [paramName, value] of searchParams.entries()) {
            var keys = paramName.indexOf('[') == -1
                ? [paramName]
                : HelperString.rtrim(paramName, ']').split(/\]?\[/);

            Convert.addPropertyToObject(obj, keys, value);
        }

        return obj;
    }

    static addPropertyToObject(object, keys, value) 
    {
        var last = keys.pop();
        for (var key of keys) {
            if (typeof object[key] == 'undefined') {
                object[key] = !isNaN(key)
                ? []
                : {};
            }
            object = object[key];
        }

        object[last] = value;
    }

    static objectToSearchParams(object) 
    {
        var searchParams = new URLSearchParams();

        for (var propertyName in object) {
            Convert.addToSearchparam(searchParams, propertyName, object[propertyName]);
        }

        return searchParams;
    }

    static addToSearchparam(searchParams, paramName, value) 
    {
        if (Array.isArray(value) || typeof value == 'object') {
            
            for (var propertyName in value) {
                Convert.addToSearchparam(searchParams, paramName + '[' + propertyName + ']', value[propertyName]);            
            }

        } else {
            searchParams.set(paramName, value);
        }
    }

    /***************************************
    *** OBJECT - FORM DATA
    ****************************************/

    static objectToFormData(object) 
    {
        var formData = new FormData();

        for (var propertyName in object) {
            Convert.addToSearchparam(formData, propertyName, object[propertyName]);
        }

        return formData;
    }

    static formDataToObject(formData) 
    {
        return Convert.searchParamsToObject(formData);
    }

    /***************************************
    *** OBJECT - QUERY STRING
    ****************************************/

    static objectToQueryString(obj) 
    {
        var serchParams = Convert.objectToSearchParams(obj);
        return serchParams.toString();
    }

    static queryStringToObject(queryString) 
    {
        var searchParams = new URLSearchParams(queryString);
        return Convert.searchParamsToObject(searchParams);
    }

    static isValidJson(data) 
    {
        if (typeof data != 'string') {
            return false;
        }

        try {
            JSON.parse(data);
        } catch (error) {
            return false;
        }

        return true;
    }
}

module.exports = Convert;