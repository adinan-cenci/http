var assert = chai.assert;

describe('Http', function () {    
    describe('#post', function () {
        it('send form', async function () {

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

            var request = Http.createRequest('post-test.html', {method: 'post', body: form});
            var formData = await request.formData();

            assert.equal(formData.get('name'), 'myself');
            assert.equal(formData.get('pages[0]'), 1);
            assert.equal(formData.get('options[optionx]'), 'this or that');
        });


        it('send query string', async function () {
            var query = 'name=myself&pages[0]=1&options[optionx]=this or that';
            var request = Http.createRequest('post-test.html', {method: 'post', body: query});
            var formData = await request.formData();

            assert.equal(formData.get('name'), 'myself');
            assert.equal(formData.get('pages[0]'), 1);
            assert.equal(formData.get('options[optionx]'), 'this or that');
        });

        it('send query string attached to url', async function () {
            var url = 'https://random.com?name=myself&pages[0]=1&options[optionx]=this or that';
            var request = Http.createRequest('post-test.html', {method: 'post', body: url});
            var formData = await request.formData();

            assert.equal(formData.get('name'), 'myself');
            assert.equal(formData.get('pages[0]'), 1);
            assert.equal(formData.get('options[optionx]'), 'this or that');
        });


        it('send json', async function () {
            var json = '{"name":"myself","pages":[1],"options":{"optionx":"this or that"}}';
            var request = Http.createRequest('post-test.html', {method: 'post', body: json});
            var formData = await request.formData();

            assert.equal(formData.get('name'), 'myself');
            assert.equal(formData.get('pages[0]'), 1);
            assert.equal(formData.get('options[optionx]'), 'this or that');
        });
        
        
    });
});

