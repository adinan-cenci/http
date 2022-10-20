const HelperString = require('./HelperString.js');

class HelperUrl 
{
    // Always return a string with a trailing slash
    static getBaseHref() 
    {
        return HelperUrl.getDocumentBaseHref() ?? HelperUrl.getWindowLocationBaseHref();
    }

    static getWindowLocationBaseHref() 
    {
        const location = window.location;
        var href;

        // Path ends with an "/", it must be a directory
        if (location.pathname.slice(-1) == '/') {
            href = location.protocol + '//' + location.host + location.pathname;
        } else {
            const matchExtension = location.pathname.match(/\.[\w]{2,4}$/);

            // There is no extension, it may or may not be a directory
            // but lets assume it is.
            href = !matchExtension
                ? location.protocol + '//' + location.host + location.pathname
                // There is an extension, likely a file, lets remove the last part of the url.
                : location.protocol + '//' + location.host + location.pathname.replace(/\/[^\/]+$/, '');
        }

        return HelperString.rtrim(href, '/') + '/';
    }

    static getDocumentBaseHref() 
    {
        const base = document.querySelector('base');
        if (! base) {
            return null;
        }

        const href = base.getAttribute('href');
        if (! href) {
            return null;
        }

        return HelperString.rtrim(href, '/') + '/';
    }
}

module.exports = HelperUrl;
