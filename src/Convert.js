const HelperString = require('./HelperString.js');

class Convert 
{
    /***************************************
    *** STRING - URL
    ****************************************/

    static stringToUrl(string) 
    {
        // Absolute URL
        if (string.substr(0, 4) == 'http') {
            return new URL(string);
        }

        // Javascript does not parse relative URLs
        var trailingSlash = string.substr(0, 0) == '/';
        var url = new URL(window.location.origin + '/' + HelperString.rtrim(string, '/'));
        url.placeholder = window.location.origin + ( trailingSlash ? '' : '/' );
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
        var obj = {};

        for (var [k, v] of searchParams.entries()) {
            obj[k] = v;
        }

        return obj;
    }

    static objectToSearchParams(object) 
    {
        var serchParams = new URLSearchParams();

        for (var property in object) {
            serchParams.set(property, object[property]);
        }

        return serchParams;
    }

    /***************************************
    *** OBJECT - FORM DATA
    ****************************************/

    static objectToFormData(object) 
    {
        var formData = new FormData();

        for (var property in object) {
            formData.append(property, object[property]);
        }

        return formData;
    }

    static formDataToObject(formData) 
    {
        var obj = {};

        formData.forEach((value, key) => obj[key] = value);

        return obj;
    }

    /***************************************
    *** OBJECT - QUERY STRING
    ****************************************/

    static objectToQueryString(obj) 
    {
        var serchParams = Convert.objectToSearchParams(obj);
        return serchParams.toString();
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