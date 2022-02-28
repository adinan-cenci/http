const Convert = require('./Convert.js');

class CastDown 
{
    /***************************************
    *** CAST DOWN
    ****************************************/

    static toObject(data) 
    {
        var formData, isString, url, searchParams;

        if (data.constructor.name == 'Object') {
            return data;
        }

        if (data instanceof FormData) {
            return Convert.formDataToObject(data);
        }

        if (data instanceof HTMLFormElement) {
            formData = new FormData(data);
            return Convert.formDataToObject(formData);
        }

        if (data instanceof URL) {
            return Convert.searchParamsToObject( new URLSearchParams(data.search) );
        }

        if (data instanceof URLSearchParams) {
            return Convert.searchParamsToObject(data);
        }

        if (Convert.isValidJson(data)) {
            return JSON.parse(data);
        }

        if (! typeof data == 'string') {
            return null;
        }

        url = Convert.stringToUrl(data);
        searchParams = url && url.search ? 
            new URLSearchParams(url.search) : 
            new URLSearchParams(data);

        if (! CastDown.emptySearchParams(searchParams)) {
            return Convert.searchParamsToObject(searchParams);
        }
    }

    static toJson(data) 
    {
        var obj;

        if (Convert.isValidJson(data)) {
            return data;
        }

        obj = CastDown.toObject(data);

        return JSON.stringify(obj);
    }

    static toFormData(data) 
    {
        var obj;

        if (data instanceof FormData) {
            return data;
        }

        if (data instanceof HTMLFormElement) {
            return new FormData(data);
        }

        obj = CastDown.toObject(data);

        return Convert.objectToFormData(obj);
    }

    static emptySearchParams(searchParams) 
    {
        for (var value of searchParams.values()) {
            if (value) {
                return false;
            }
        }

        return true;
    }
}

module.exports = CastDown;