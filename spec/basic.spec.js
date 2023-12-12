const postcss = require("postcss")
const plugin = require("../src/index")
const { expectxml, registerSnapshots, expectjs } = require('jasmine-snapshot')

// 创建一个空对象来存储快照
let snapshots = {};

// 在 beforeAll 钩子中注册快照对象
beforeAll(() => {
    registerSnapshots(snapshots, "basic_snapshot");
});


describe('Basic Test Suites', () => {
    it('basic parse', () => {

        const htmlContent = '<div><p class="ikun"></p></div>';

        return postcss([plugin({
            content: htmlContent
        })]).process('@ikuncss utilities;', {
            from: 'src/test.css',
            to: 'dist/output.css'
        }).then(res => {
            // expect(res.css.replace(/\s/g, '')).toBe(`.ikun {
            //     color: red;
            //     background-color: red
            // }`.replace(/\s/g
            //     , ''));

            expectjs(res.css).toMatchSnapshot()
        })
    });


    it('remove redundancy', () => {

        const htmlContent = `
        <div>
            <p class="ikun"></p>
            <div class="ikun">hello</div>
            <h3 class="ikun"></h3>
        </div>`

        return postcss([plugin({
            content: htmlContent
        })]).process('@ikuncss utilities;', {
            from: 'src/test.css',
            to: 'dist/output.css'
        }).then(res => {
            // expect(res.css.replace(/\s/g, '')).toBe(`.ikun {
            //     color: red;
            //     background-color: red
            // }`.replace(/\s/g
            //     , ''));
            expectxml(res.css).toMatchSnapshot()
        })
    });
})
