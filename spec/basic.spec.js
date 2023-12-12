// const postcss = require("postcss")
// const plugin = require("../src/index")

// describe('Basic Test Suites', () => {
//     test('basic parse', () => {

//         const htmlContent = '<div><p class="ikun"></p></div>';

//         return postcss([plugin({
//             content: htmlContent
//         })]).process('@ikuncss utilities;', {
//             from: 'src/test.css',
//             to: 'dist/output.css'
//         }).then(res => {
//             expect(res.css.replace(/\s/g, '')).toBe(`.ikun {
//                 color: red;
//                 background-color: red
//             }`.replace(/\s/g
//                 , ''));
//         })
//     });


//     test('remove redundancy', () => {

//         const htmlContent = `
//         <div>
//             <p class="ikun"></p>
//             <div class="ikun">hello</div>
//             <h3 class="ikun"></h3>
//         </div>`

//         return postcss([plugin({
//             content: htmlContent
//         })]).process('@ikuncss utilities;', {
//             from: 'src/test.css',
//             to: 'dist/output.css'
//         }).then(res => {
//             expect(res.css.replace(/\s/g, '')).toBe(`.ikun {
//                 color: red;
//                 background-color: red
//             }`.replace(/\s/g
//                 , ''));
//         })
//     });
// })
