class HelperString 
{
    /**
     * Removes specified character from beggining of of the string.
     * 
     * @param string string The input string.
     * @param string char The specified character.
     * @returns string The trimmed string.
     */
    static ltrim(string, char = null) 
    {
        char = char || '[ \t\n\r\0\v]';
        var exp = new RegExp('^' + char + '+');
        return string.replace(exp, '');
    }

    /**
     * Removes specified character from end of the string.
     * 
     * @param string string The input string.
     * @param string char The specified character.
     * @returns string The trimmed string.
     */
    static rtrim(string, char = null) 
    {
        char = char || '[ \t\n\r\0\v]';
        var exp = new RegExp(char + '+$');
        return string.replace(exp, '');
    }
    
    /**
     * Removes specified character from both ends of the string.
     * 
     * @param string string The input string.
     * @param string char The specified character.
     * @returns string The trimmed string.
     */
    static trim(string, char = ' ') 
    {
        string = HelperString.ltrim(string, char);
        string = HelperString.rtrim(string, char);
        return string;
    }
}

module.exports = HelperString;
