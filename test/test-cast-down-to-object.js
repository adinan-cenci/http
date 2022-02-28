const CastDown= require('../src/CastDown.js');

function assertEquals(actual, expected, description) 
{
    console.log(description + ': ', expected, actual);
    console.log('--------------------------------------')
}


function jsonToObject() 
{
    var original = '{"foo":"bar","bar":"foo"}';
    var expected = {foo: 'bar', bar: 'foo'};

    var data = CastDown.toObject(original);

    assertEquals(data, expected, arguments.callee.name);
}
jsonToObject();

//---------------------------------------------

function urlStringToObject() 
{
    var original = 'https://mywebsite.com?foo=bar&bar=foo';
    var expected = {foo: 'bar', bar: 'foo'};

    var data = CastDown.toObject(original);

    assertEquals(data, expected, arguments.callee.name);
}
urlStringToObject();

//---------------------------------------------

function urlToObject() 
{
    var original = new URL('https://mywebsite.com?foo=bar&bar=foo');
    var expected = {foo: 'bar', bar: 'foo'};

    var data = CastDown.toObject(original);

    assertEquals(data, expected, arguments.callee.name);
}
urlToObject();

//---------------------------------------------

function queryStringToObject() 
{
    var original = '?foo=bar&bar=foo';
    var expected = {foo: 'bar', bar: 'foo'};

    var data = CastDown.toObject(original);

    assertEquals(data, expected, arguments.callee.name);
}
queryStringToObject();

//---------------------------------------------

function queryStringToObject2() 
{
    var original = 'foo=bar&bar=foo';
    var expected = {foo: 'bar', bar: 'foo'};

    var data = CastDown.toObject(original);

    assertEquals(data, expected, arguments.callee.name);
}
queryStringToObject2();

//---------------------------------------------

function searchParamToObject() 
{
    var original = new URLSearchParams('foo=bar&bar=foo');
    var expected = {foo: 'bar', bar: 'foo'};

    var data = CastDown.toObject(original);

    assertEquals(data, expected, arguments.callee.name);
}
searchParamToObject();

//---------------------------------------------

function formDataToObject() 
{
    var original = new FormData();
    original.set('foo', 'bar');
    original.set('bar', 'foo');

    var expected = {foo: 'bar', bar: 'foo'};

    var data = CastDown.toObject(original);

    assertEquals(data, expected, arguments.callee.name);
}
formDataToObject();

//---------------------------------------------

function formToObject() 
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

    var expected = {foo: 'bar', bar: 'foo'};

    var data = CastDown.toObject(original);

    assertEquals(data, expected, arguments.callee.name);
}
formToObject();
