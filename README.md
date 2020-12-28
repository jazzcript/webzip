# WebZip

Get a file inside a zip url

`npm i webzip`


# Usage


```javascript
const webzip = require('webzip');

const zipUrl = 'https://accounts.clickbank.com/feeds/marketplace_feed_v2.xml.zip';
// file inside .zip
const file = 'marketplace_feed_v2.xml';

const products = webzip(zipUrl, file);

products.then(function (fileBuffer) {
  const content = fileBuffer.toString('utf8');
  console.log(content);
});
```