const Http = require('../index.js');
const http = new Http();

window.http = http;
function testGetRequestQueryString() 
{
    http.get('get-with-query-string.php', { body: 'foo=bar' });
}
testGetRequestQueryString();

//---------------------------------------------

function testGetRequestObject() 
{
    http.get('get-with-object.php', { body: {foo: 'bar'} });
}
testGetRequestObject();

//---------------------------------------------

function testGetRequestJson() 
{
    http.get('get-with-json.php', { body: '{"foo": "bar"}' });
}
testGetRequestJson();

//---------------------------------------------

function testGetRequestForm() 
{
    var form = document.createElement('form');
    var first = document.createElement('input');
    first.setAttribute('name', 'foo');
    first.setAttribute('value', 'bar');
    first.setAttribute('type', 'hidden');
    form.append(first);

    var second = document.createElement('input');
    second.setAttribute('name', 'bar');
    second.setAttribute('value', 'foo');
    second.setAttribute('type', 'hidden');
    form.append(second);

    http.get('get-with-form.php', { body: form });
}
testGetRequestForm();

//---------------------------------------------

function testGetRequestFormData() 
{
    var formdata = new FormData;
    formdata.append('foo', 'bar');
    formdata.append('bar', 'foo');

    http.get('get-with-form-data.php', { body: formdata });
}
testGetRequestFormData();
