# Http

A small http library I made for convenience sake.

## Instantiation

```js
var defaultOptions = {};
const Http = require('Http');
const http = new http(defaultOptions);
```
Use the `defaultOptions` parameter to inform options that should be used in all requests ( except when overwritten ofcourse ).


<br><br>

## Post request

You may use objects...

```js
http.post('my-url.php', { body: { foo: 'bar' } });
```

or `FormData` objects...

```js
http.post('my-url.php', { body: formDataObject });
```

or `HTMLFormElement` elements...

```js
http.post('my-url.php', { body: document.querySelector('form') });
```

or JSON strings...

```js
http.post('my-url.php', { body: '{"foo":"bar"}' });
```

or query strings...

```js
http.post('my-url.php', { body: 'foo=bar&bar=foo' });
```

or query strings attached to full urls...

```js
http.post('my-url.php', { body: 'https://random.com?foo=bar&bar=foo' });
```

You can use all those formats, they will be automatically converted to `FormData` objects.

<br><br>

## Params
The `options.params` propriety will be attached to the URL's query string, it accepts the 
same types as `options.body`.

```js
http.post('my-url.php', { body: { postVar: 'foo' }, params: { getVar: 'bar' } });
```

<br><br>

## Put, Patch, Delete and Options requests

They works just like the `Http.post` method.

- `Http.put(url, options)`
- `Http.patch(url, options)`
- `Http.delete(url, options)`
- `Http.options(url, options)`

<br><br>

## Get requests

The `Http.get` method will accept the same options as the other methods, but 
the data will be attached to the query string instead of the request's body.

<br><br>

## Sending JSON

Set the content type header to `application/json`, the body will be automatically 
converted into json strings instead of `FormData` objects.

```js
const options = {
    headers: { 'Content-Type': 'application/json' },
    body: {
        foo: 'bar',
        bar: 'foo'
    }
};
http.post('sending-json.php', options);
```

<br><br>

## License
MIT