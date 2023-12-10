const { writeFile, mkdir, rmdirSync } = require('fs');
const postcss = require('postcss');
const ikun = require('../src/index');

rmdirSync('dist', { force: true, recursive: true });

postcss([ikun({
    content: "<div><p class='.ikun'></p></div>",
})]).process(`@ikuncss utilities;

#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}`, {
    from: 'src/test.css',
    to: 'dist/output.css'
}).then(result => {
    mkdir('dist', () => {
        writeFile('dist/output.css', result.css, (err) => {
            err ? console.error(err) : console.log('success.')
        });
    })
});