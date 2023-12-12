const { pseudoClassVariantsMatchs } = require("../src/utils/generateRules");

describe('test pseudoClassVariantsMatchs function', () => {

    test('without pseudoClass', () => {
        const t = pseudoClassVariantsMatchs('ikun');
        expect(t).toEqual({
            matcher: 'ikun',
            selector: '.ikun'
        });
    })

    test('with pseudoClass', () => {
        const t = pseudoClassVariantsMatchs('hover:active:ikun');
        expect(t).toEqual({
            matcher: 'ikun',
            selector: '.hover\\:active\\:ikun:hover, .hover\\:active\\:ikun:active'
        });
    })
})