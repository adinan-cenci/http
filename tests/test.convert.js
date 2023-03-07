var assert = chai.assert;

describe('Convert URL ( REMOVE THE "index.html" FROM THE URL FOR THE TEST TO WORK )', function () {    
    describe('#stringToUrl()', function () {
        it('should instantiate full URL objects from relative paths', function () {
            var url = Convert.stringToUrl('my-folder-thingy');
                                    // this is why we can't have the filename in the url
            assert.equal(url.pathname, window.location.pathname + 'my-folder-thingy');
        });

        it('and it will observe root paths', function () {
            var url = Convert.stringToUrl('/my-folder-thingy');
            assert.equal(url.pathname, '/my-folder-thingy');
        });
    });

    describe('#urlToString()', function () {
        it('it should undo #stringToUrl, returning the original string', function () {
            var uri = 'my-folder-thingy/my-file.php';
            var url = Convert.stringToUrl(uri);
            assert.equal(Convert.urlToString(url), uri);
        });

        it('root paths included', function () {
            var uri = '/my-folder-thingy/my-file.php';
            var url = Convert.stringToUrl(uri);
            assert.equal(Convert.urlToString(url), uri);
        });
    });
});

describe('Convert', function () {
    describe('#objectToSearchParams()', function () {
        it('it should convert objects to URLSearchParams objects', function () {
            var originalObject = { query: 'search this', pages: [1, 2], person: {name: 'adinan', surname:'cenci'} };
            var searchParams = Convert.objectToSearchParams(originalObject);
            assert.equal(searchParams.get('query'), 'search this');
            assert.equal(searchParams.get('pages[0]'), '1');
            assert.equal(searchParams.get('pages[1]'), '2');
            assert.equal(searchParams.get('person[name]'), 'adinan');
            assert.equal(searchParams.get('person[surname]'), 'cenci');
        });
    });

    describe('#searchParamsToObject()', function () {
        it('It should convert URLSearchParams to plain objects', function () {
            var originalSearchParams = new URLSearchParams('query=search+this&pages[0]=1&pages[1]=2&person[name]=adinan&person[surname]=cenci');
            var object = Convert.searchParamsToObject(originalSearchParams);
            assert.equal(object.query, 'search this');
            assert.equal(object.pages[0], '1');
            assert.equal(object.pages[1], '2');
            assert.equal(object.person.name, 'adinan');
            assert.equal(object.person.surname, 'cenci');
        });
    });

    describe('#objectToFormData()', function () {
        it('it should convert objects to FormData objects', function () {
            var originalObject = { query: 'search this', pages: [1, 2], person: {name: 'adinan', surname: 'cenci'} };
            var formData = Convert.objectToFormData(originalObject);
            assert.equal(formData.get('query'), 'search this');
            assert.equal(formData.get('pages[0]'), '1');
            assert.equal(formData.get('pages[1]'), '2');
            assert.equal(formData.get('person[name]'), 'adinan');
            assert.equal(formData.get('person[surname]'), 'cenci');
        });
    });

    describe('#formDataToObject()', function () {
        it('It should convert FormData to plain objects', function () {
            var form = document.createElement('form');
            var text = document.createElement('input');
            var checkbox = document.createElement('input');
            var formData;
            text.setAttribute('type', 'text');
            text.setAttribute('name', 'name');
            text.setAttribute('value', 'myself');
            form.append(text);            
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('name', 'options[optionx]');
            checkbox.setAttribute('value', 'this or that');
            checkbox.setAttribute('checked', 'checked');
            form.append(checkbox);
            formData = new FormData(form);

            var object = Convert.formDataToObject(formData);
            assert.equal(object.name, 'myself');
            assert.equal(object.options.optionx, 'this or that');
        });
    });

    describe('#objectToQueryString', function () {
        it('It should convert plain objects to query strings', function () {
            var originalObject = { query: 'search this', pages: [1, 2], person: {name: 'adinan', surname: 'cenci'} };
            var queryString = decodeURIComponent(Convert.objectToQueryString(originalObject));
            assert.equal(queryString, 'query=search+this&pages[0]=1&pages[1]=2&person[name]=adinan&person[surname]=cenci');
        });
    });

    describe('#QueryStringToObject', function () {
        it('It should convert query strings to plain objects', function () {
            var originalQueryString = 'query=search+this&pages[0]=1&pages[1]=2&person[name]=adinan&person[surname]=cenci';
            var object = Convert.queryStringToObject(originalQueryString);
            assert.equal(object.query, 'search this');
            assert.equal(object.pages[0], '1');
            assert.equal(object.pages[1], '2');
            assert.equal(object.person.name, 'adinan');
            assert.equal(object.person.surname, 'cenci');            
        });
    });

});
