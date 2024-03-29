# Http

A small http library I made out of convenience.

## Instantiation

```js
var defaultOptions = {};
const Http = require('Http');
const http = new Http(defaultOptions);
```

Use the `defaultOptions` parameter to inform options that should be used in all requests ( except when overwritten ofcourse ).

<br><br>

## The body of a request

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

or the query strings attached to full urls...

```js
http.post('my-url.php', { body: 'https://random.com?foo=bar&bar=foo' });
```

You can use all those formats, they will be automatically converted into a `FormData` object.

<br><br>

## Options

The library adds support to a few custom properties.  

**Query params**  
The `options.queryParams` propriety will be attached to the URL's query string, it accepts the same types as `options.body`.

If the url already has a query string, then they will be merged.

```js
http.post('my-url.php', { body: { postVar: 'foo' }, queryParams: { getVar: 'bar' } });
```

**Base Href**  
By default the document's base href is used, but you can specify a different one in the `baseHref` option, for example:

```js
// https://my-site.com

http = new Http({ baseHref: 'https://another-site.com' });

// Will make a request to https://another-site.com/foo-bar.txt
http.get('foo-bar.txt');
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