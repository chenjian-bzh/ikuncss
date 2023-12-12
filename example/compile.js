const { writeFile, mkdir, rmdirSync, existsSync } = require('fs');
const postcss = require('postcss');
const ikun = require('../src/index');

if (existsSync('dist')) {
    rmdirSync('dist', { force: true, recursive: true });
}

postcss([ikun({
    // content: "<div><p class='ikun'></p></div>",
    content: "example/**/*.{html,jsx}"
})]).process(`@ikuncss utilities;`, {
    from: 'src/test.css',
    to: 'dist/output.css'
}).then(result => {
    mkdir('dist', () => {
        writeFile('dist/output.css', result.css, (err) => {
            err ? console.error(err) : console.log('success.')
        });
    })
});