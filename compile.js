const { readFile, writeFile } = require('fs');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const ikun = require('./src/plugins/index.js');

readFile('src/input.css', (err, css) => {
    if (err) console.error(err);

    postcss([tailwindcss, ikun]).process(css, {
        from: 'src/input.css',
        to: 'src/output.css'
    }).then(result => {
        writeFile('src/output.css', result.css, (err) => {
            err ? console.error(err) : console.log('success.')
        })
    })
})