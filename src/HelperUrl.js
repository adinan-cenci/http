const HelperString = require('./HelperString.js');

class HelperUrl 
{
    static getBaseUrl() 
    {
        const baseHref = HelperUrl.getBaseHref();

        if (baseHref) {
            return baseHref;
        }

        return HelperUrl.getBaseUri();
    }

    static getBaseUri() 
    {
        // Path ends with an "/", it must be a directory
        if (window.location.pathname.slice(-1) == '/') {
            return window.location.protocol + '//' + window.location.host + window.location.pathname;
        }
        
        const matchExtension = window.location.pathname.match(/\.[\w]{2,4}$/);

        // There is no extension, it may or may not be a directory
        // but lets assume it is.
        if (! matchExtension) {
            return window.location.protocol + '//' + window.location.host + window.location.pathname + '/';
        }

        // There is an extension, likely a file, lets remove the last part of the url.
        return window.location.protocol + '//' + window.location.host + window.location.pathname.replace(/\/[^\/]+$/, '') + '/';
    }

    static getBaseHref() 
    {
        const base = document.querySelector('base');

        if (! base) {
            return null;
        }

        const href = base.getAttribute('href');

        if (! href) {
            return href;
        }

        return HelperString.rtrim(href, '/') + '/';
    }
}

module.exports = HelperUrl;
