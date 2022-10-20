const Http = require('../index.js');
const http = new Http();

function testPostRequestQueryString() 
{
    http.post('post-with-query-string.php', { body: 'foo=bar' });
}
testPostRequestQueryString();

//---------------------------------------------

function testPostRequestObject() 
{
    http.post('post-with-object.php', { body: {foo: 'bar'} });
}
testPostRequestObject();

//---------------------------------------------

function testPostRequestJson() 
{
    http.post('post-with-json.php', { body: '{"foo": "bar"}' });
}
testPostRequestJson();

//---------------------------------------------

function testPostRequestForm() 
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

    http.post('post-with-form.php', { body: form });
}
testPostRequestForm();

//---------------------------------------------

function testPostRequestFormData() 
{
    var formdata = new FormData;
    formdata.append('foo', 'bar');
    formdata.append('bar', 'foo');

    http.post('post-with-form-data.php', { body: formdata });
}
testPostRequestFormData();
