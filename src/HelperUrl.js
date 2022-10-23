const HelperString = require('./HelperString.js');

class HelperUrl 
{
    /**
     * Returns the base href of the document, usefull when working with
     * relative urls.
     * 
     * @returns string An url
     */
    static getBaseHref() 
    {
        return HelperUrl.getDocumentBaseHref() ?? HelperUrl.getWindowLocationBaseHref();
    }

    /**
     * Attempts to figure out the base href based on the current value of 
     * window.location
     * 
     * @returns string An url
     */
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

    /**
     * If specified, returns the href attribute in the <base> tag,
     * returns null otherwise.
     * 
     * @returns string|null
     */
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

    /**
     * @param string uri 
     * @returns bool
     */
    static isAbsolute(uri) 
    {
        return uri.substr(0, 4) == 'http';
    }
}

module.exports = HelperUrl;
