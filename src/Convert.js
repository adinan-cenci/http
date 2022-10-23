const HelperString = require('./HelperString.js');
const HelperUrl = require('./HelperUrl.js');

class Convert 
{
    /**
     * Parses an string into an URL object.
     * The URL class already parses full url, but not relative ones, 
     * hence this method.
     *
     * @param string uri Absolute or relative.
     * @return URL
     */
    static stringToUrl(uri) 
    {
        if (HelperUrl.isAbsolute(uri)) {
            return new URL(uri);
        }

        var url;
        const isRootPath = uri.slice(0, 1) == '/';
        const baseHref   = HelperUrl.getBaseHref();

        if (isRootPath) {
            url = new URL(baseHref);
            url.pathname = uri;
            url.placeholder = url.toString().replace(uri, '');
        } else {
            url = new URL(baseHref + HelperString.ltrim(uri, '/'));
            url.placeholder = baseHref;
        }

        return url;
    }

    /**
     * Convert an URL object back into string.
     * The URL class already can do that, but it does not support relative
     * urls, hence this method.
     * 
     * @param URL url 
     * @return string
     */
    static urlToString(url) 
    {
        var string = url.toString();

        if (url.placeholder) {
            string = string.replace(url.placeholder, '');
        }

        return string;
    }

    /**
     * Convert URLSearchParams objects into plain objects.
     * It will translate array parameters into nested properties, for example:
     * 'person[name]=foobar' will became {person: {name: 'foobar'}}
     * 
     * @param URLSearchParams searchParams
     * @returns object
     */
    static searchParamsToObject(searchParams) 
    {
        var obj = {}

        for (var [paramName, value] of searchParams.entries()) {
            // Is array ?
            var keys = paramName.indexOf('[') == -1
                ? [paramName]
                : HelperString.rtrim(paramName, ']').split(/\]?\[/);

            Convert.addPropertyToObject(obj, keys, value);
        }

        return obj;
    }

    /**
     * Will add a 'value' to object, nesting it inside children properties
     * based on 'propertiesNames'.
     * 
     * @param object object 
     * @param string[] propertiesNames 
     * @param mixed value 
     */
    static addPropertyToObject(object, propertiesNames, value) 
    {
        var last = propertiesNames.pop();
        for (var property of propertiesNames) {
            if (typeof object[property] == 'undefined') {
                object[property] = !isNaN(property) ? [] : {};
            }
            object = object[property];
        }

        object[last] = value;
    }

    /**
     * Converts a plain object into a URLSearchParams.
     * Nested properties will be rendered as array parameters, for example:
     * {person: {name: 'foobar'}} will became 'person[name]=foobar'
     * 
     * @param object 
     * @returns URLSearchParams
     */
    static objectToSearchParams(object) 
    {
        var searchParams = new URLSearchParams();

        for (var propertyName in object) {
            Convert.addToSearchparam(searchParams, propertyName, object[propertyName]);
        }

        return searchParams;
    }

    /**
     * Will add a new parameter to URLSearchParams or FormData objects.
     * If 'value' is an array or object, the proprieties children will be
     * rendered as arrayed parameters, for example:
     * {person: {name: 'foobar'}} will became 'person[name]=foobar'
     * 
     * @param URLSearchParams|FormData searchParams 
     * @param string paramName 
     * @param mixed value 
     */
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

    /**
     * Convert a plain object into a FormData object.
     * Nested properties will be rendered as array parameters, for example:
     * {person: {name: 'foobar'}} will became 'person[name]=foobar'
     * 
     * @param object 
     * @returns FormData
     */
    static objectToFormData(object) 
    {
        var formData = new FormData();

        for (var propertyName in object) {
            Convert.addToSearchparam(formData, propertyName, object[propertyName]);
        }

        return formData;
    }

    /**
     * Convert FormData objects into plain objects.
     * It will translate array parameters into nested properties, for example:
     * 'person[name]=foobar' will became {person: {name: 'foobar'}}
     * 
     * @param URLSearchParams searchParams
     * @returns object
     */
    static formDataToObject(formData) 
    {
        return Convert.searchParamsToObject(formData);
    }

    /**
     * @param object
     * @returns string A query string
     */
    static objectToQueryString(object) 
    {
        var serchParams = Convert.objectToSearchParams(object);
        return serchParams.toString();
    }

    /**
     * @param string queryString 
     * @returns object
     */
    static queryStringToObject(queryString) 
    {
        var searchParams = new URLSearchParams(queryString);
        return Convert.searchParamsToObject(searchParams);
    }

    /**
     * @param string data 
     * @returns bool
     */
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