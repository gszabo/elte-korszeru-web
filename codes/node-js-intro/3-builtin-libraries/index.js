'use strict';

const fs = require('fs');

// 1. Szinkron fájl olvasás (blokkol, kerüljük!)
const contents = fs.readFileSync('./data.txt', 'utf8');
console.log(contents);

// JSON fajlt require-rel is be lehet olvasni, tamogatja a platform
const dataJSON = require('./data.json');
console.log('from json', dataJSON.value);

// 2. Aszinkron fájl beolvasás
fs.readFile('./data.txt', function(err, contents) {
  // nem adtunk meg encodingot, ilyenkor a contents egy Buffer binaris adathalmaz
  // a contents.toString() hivas decodolja UTF8 alapjan szovegge
  console.log('ASYNC', contents, contents.toString());
});

// 3. Útvonal feloldás
const path = require('path');

// ezek itt igazabol string muveleteket vegeznek, nem nezik, hogy letezik-e a fajl
console.log('dirname', path.dirname('./alma/korte/index.js'));
console.log('extname', path.extname('./alma/korte/index.js'));
console.log(path.parse('./alma/korte/index.js'));

// relativ utvonal feloldasa az aktualis konyvtarhoz kepest
console.log('resolve', path.resolve('./alma/korte'));

// 4. Url móka
const url = require('url');

// url darabokra bontasa
console.log(url.parse('http://index.hu:80'));

// masodik parameter azt mondja meg, hogy a queryStringet parsolja be objektumma
console.log(url.parse('http://index.hu:80?parameter=almafa', false).query); // => 'parameter=almafa'
console.log(url.parse('http://index.hu:80?parameter=almafa', true).query); // => { parameter: 'almafa' }

console.log(url.resolve('http://index.hu:80', 'almafa')); // => http://index.hu:80/almafa
