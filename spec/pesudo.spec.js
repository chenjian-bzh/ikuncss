const postcss = require("postcss")
const plugin = require("../src/index")
const { expectxml, registerSnapshots } = require('jasmine-snapshot')

// 创建一个空对象来存储快照
let snapshots = {};

// 在 beforeAll 钩子中注册快照对象
beforeAll(() => {
    registerSnapshots(snapshots, "pesudo_snapshot");
});


describe('test pesudo class', () => {
    it('hover', () => {
        const htmlContent = `
        <div>
            <p class="hover:ikun"></p>
        </div>`

        return postcss([plugin({
            content: htmlContent
        })]).process('@ikuncss utilities;', {
            from: 'src/test.css',
            to: 'dist/output.css'
        }).then(res => {
            // expect(res.css.replace(/\s/g, '')).toBe(`.hover\\:ikun:hover {
            //     color: red;
            //     background-color: red
            // }`.replace(/\s/g
            //     , ''));
            expectxml(res.css).toMatchSnapshot()

        })
    });


    it('hover, active', () => {
        const htmlContent = `
        <div>
            <p class="hover:active:ikun"></p>
        </div>`

        return postcss([plugin({
            content: htmlContent
        })]).process('@ikuncss utilities;', {
            from: 'src/test.css',
            to: 'dist/output.css'
        }).then(res => {
            // expect(res.css.replace(/\s/g, '')).toBe(`.hover\\:active\\:ikun:hover, .hover\\:active\\:ikun:active {
            //     color: red;
            //     background-color: red
            // }`.replace(/\s/g
            //     , ''));
            expectxml(res.css).toMatchSnapshot()

        })
    });
})