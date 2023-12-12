const { pseudoClassVariantsMatchs } = require("../src/utils/generateRules");

describe('test pseudoClassVariantsMatchs function', () => {

    it('without pseudoClass', () => {
        const t = pseudoClassVariantsMatchs('ikun');
        expect(t).toEqual({
            matcher: 'ikun',
            selector: '.ikun'
        });
    })

    it('with pseudoClass', () => {
        const t = pseudoClassVariantsMatchs('hover:active:ikun');
        expect(t).toEqual({
            matcher: 'ikun',
            selector: '.hover\\:active\\:ikun:hover, .hover\\:active\\:ikun:active'
        });
    })
})