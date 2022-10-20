const CastDown = require('../src/CastDown.js');

function assertEquals(actual, expected, description) 
{
    console.log(description + ': ', expected, actual);
    console.log('--------------------------------------')
}

function objectToJson() 
{
    var original = {foo: 'bar', bar: 'foo'};
    var expected = '{"foo":"bar","bar":"foo"}';

    var data = CastDown.toJson(original);

    assertEquals(data, expected, arguments.callee.name);
}
objectToJson();

//---------------------------------------------

function urlStringToJson() 
{
    var original = 'https://mywebsite.com?foo=bar&bar=foo';
    var expected = '{"foo":"bar","bar":"foo"}';

    var data = CastDown.toJson(original);

    assertEquals(data, expected, arguments.callee.name);
}
urlStringToJson();

//---------------------------------------------

function urlToJson() 
{
    var original = new URL('https://mywebsite.com?foo=bar&bar=foo');
    var expected = '{"foo":"bar","bar":"foo"}';

    var data = CastDown.toJson(original);

    assertEquals(data, expected, arguments.callee.name);
}
urlToJson();

//---------------------------------------------

function queryStringToJson() 
{
    var original = '?foo=bar&bar=foo';
    var expected = '{"foo":"bar","bar":"foo"}';

    var data = CastDown.toJson(original);

    assertEquals(data, expected, arguments.callee.name);
}
queryStringToJson();

//---------------------------------------------

function queryStringToJson2() 
{
    var original = 'foo=bar&bar=foo';
    var expected = '{"foo":"bar","bar":"foo"}';

    var data = CastDown.toJson(original);

    assertEquals(data, expected, arguments.callee.name);
}
queryStringToJson2();

//---------------------------------------------

function searchParamToJson() 
{
    var original = new URLSearchParams('foo=bar&bar=foo');
    var expected = '{"foo":"bar","bar":"foo"}';

    var data = CastDown.toJson(original);

    assertEquals(data, expected, arguments.callee.name);
}
searchParamToJson();

//---------------------------------------------

function formDataToJson() 
{
    var original = new FormData();
    original.set('foo', 'bar');
    original.set('bar', 'foo');

    var expected = '{"foo":"bar","bar":"foo"}';

    var data = CastDown.toJson(original);

    assertEquals(data, expected, arguments.callee.name);
}
formDataToJson();

//---------------------------------------------

function formToJson() 
{
    var original = document.createElement('form');
    var first = document.createElement('input');
    first.setAttribute('name', 'foo');
    first.setAttribute('value', 'bar');
    first.setAttribute('type', 'hidden');
    original.append(first);

    var second = document.createElement('input');
    second.setAttribute('name', 'bar');
    second.setAttribute('value', 'foo');
    second.setAttribute('type', 'hidden');
    original.append(second);

    var expected = '{"foo":"bar","bar":"foo"}';

    var data = CastDown.toJson(original);

    assertEquals(data, expected, arguments.callee.name);
}
formToJson();
