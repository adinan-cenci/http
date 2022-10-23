var assert = chai.assert;

describe('HelperString', function () {
    describe('#ltrim()', function () {
        it('should remove blank characters from the beggingin of the string', function () {
            assert.equal(HelperString.ltrim('     foo bar  '), 'foo bar  ');
        });

        it('or a specific character if informed', function () {
            assert.equal(HelperString.ltrim('ZZfoo bar', 'Z'), 'foo bar');
        });
    });

    describe('#rtrim()', function () {
        it('should remove blank characters from the end of the string', function () {
            assert.equal(HelperString.rtrim('  foo bar     '), '  foo bar');
        });

        it('or a specific character if informed', function () {
            assert.equal(HelperString.rtrim('foo barZZ', 'Z'), 'foo bar');
        });
    });

    describe('#trim()', function () {
        it('should remove blank characters from both ends of the string', function () {
            assert.equal(HelperString.trim('    foo bar     '), 'foo bar');
        });

        it('or a specific character if informed', function () {
            assert.equal(HelperString.trim('ZZfoo barZZ', 'Z'), 'foo bar');
        });
    });

});
