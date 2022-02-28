class HelperString 
{
    static ltrim(string, char = ' ') 
    {
        var exp = new RegExp('^' + char + '+');
        return string.replace(exp, '');
    }

    static rtrim(string, char = ' ') 
    {
        var exp = new RegExp(char + '+$');
        return string.replace(exp, '');
    }
    
    static trim(string, char = ' ') 
    {
        string = HelperString.ltrim(string, char);
        string = HelperString.rtrim(string, char);
        return string;
    }
}

module.exports = HelperString;
