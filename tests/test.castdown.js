var assert = chai.assert;

describe('Castdown', function () {    
    describe('#toObject()', function () {
        it('HTMLFormElement and FormData to plain object', function () {

            var form = document.createElement('form');
            var text = document.createElement('input');
            var number = document.createElement('input');
            var checkbox = document.createElement('input');
            var formData;
            var object;
            text.setAttribute('type', 'text');
            text.setAttribute('name', 'pages[0]');
            text.setAttribute('value', '1');
            form.append(text);    
            number.setAttribute('type', 'text');
            number.setAttribute('name', 'name');
            number.setAttribute('value', 'myself');
            form.append(number);         
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('name', 'options[optionx]');
            checkbox.setAttribute('value', 'this or that');
            checkbox.setAttribute('checked', 'checked');
            form.append(checkbox);

            object = CastDown.toObject(form);
            assert.equal(object.name, 'myself');
            assert.equal(object.pages[0], 1);
            assert.equal(object.options.optionx, 'this or that');

            // form
            object = CastDown.toObject( new FormData(form) );
            assert.equal(object.name, 'myself');
            assert.equal(object.pages[0], 1);
            assert.equal(object.options.optionx, 'this or that');
        });

        it('URL to plain object', function () {
            var url = new URL('https://foobar.com/path-to-file/index.html?name=myself&pages[0]=1&options[optionx]=this or that');
            var object = CastDown.toObject(url);
            assert.equal(object.name, 'myself');
            assert.equal(object.pages[0], 1);
            assert.equal(object.options.optionx, 'this or that');
        });

        it('url search param to plain object', function () {
            var searchparam = new URLSearchParams('name=myself&pages[0]=1&options[optionx]=this or that');
            var object = CastDown.toObject(searchparam);
            assert.equal(object.name, 'myself');
            assert.equal(object.pages[0], 1);
            assert.equal(object.options.optionx, 'this or that');
        });

        it('string URL to plain object', function () {
            var url = 'https://foobar.com/path-to-file/index.html?name=myself&pages[0]=1&options[optionx]=this or that';
            var object = CastDown.toObject(url);
            assert.equal(object.name, 'myself');
            assert.equal(object.pages[0], 1);
            assert.equal(object.options.optionx, 'this or that');
        });

        it('relative URL to plain object', function () {
            var url = 'index.html?name=myself&pages[0]=1&options[optionx]=this or that';
            var object = CastDown.toObject(url);
            assert.equal(object.name, 'myself');
            assert.equal(object.pages[0], 1);
            assert.equal(object.options.optionx, 'this or that');
        });

        it('query string to plain object', function () {
            var url = 'name=myself&pages[0]=1&options[optionx]=this or that';
            var object = CastDown.toObject(url);
            assert.equal(object.name, 'myself');
            assert.equal(object.pages[0], 1);
            assert.equal(object.options.optionx, 'this or that');
        });

        it('json to plain object', function () {
            var url = '{"name":"myself","pages":[1],"options":{"optionx":"this or that"}}';
            var object = CastDown.toObject(url);
            assert.equal(object.name, 'myself');
            assert.equal(object.pages[0], 1);
            assert.equal(object.options.optionx, 'this or that');
        });
        
    });
});

