'use strict';

// NodeJS alatt 1 modul = 1 fajl
// modulok EXPORTalhatnak dolgokat a kulvilagnak, es IMPORTalhatnak mas modulokat
// exportalas: `module.exports = valami;` utasitas
// importalas: `const otherModule = require('./module-path');` utasitas

// file require
// a require('...') hivas eredmenye az a 'dolog' amit a behivott modul exportal
const myModule = require('./my-module'); // <- nincs .js kiterjesztes, odairhato, de ki tudja talalni a platform
console.log(myModule);
myModule.greeter('Students');

// folder require
// ha a require-nek adott utvonal egy mappara mutat, akkor index.js fajlt keres a mappan belul
console.log(require('./folder'));
// ha masik fajl kellene a mappabol, akkor `require('./folder/other-module');`

// play with node_modules
// ha a require-nek adott utvonal nem relativ (azaz nem './'-rel vagy '../'-rel kezdodik)
//    hanem abszolut (pl. `require('my-module');`, es nem beepitett modulrol van szo
// akkor a platform a behivo fajl melletti node_modules mappaban keresi a modult
// (ha ott nem talalja, akkor egy konyvtarral fejlebb lep, es ott is megnezi a node_modules konyvtarban, es igy tovabb)
console.log(require('where-is-this-file-module'));
console.log(require('where-is-this-folder-module')); // <- akkor is megtalalja, ha mappa

// module caching
// egy alkalmazas futasa soran egy require-rel behivott modul csak egyszer toltodik be!
for (let i = 0; i < 10; i++) {
  console.log(require('./random')); // <- ugyanazt irja ki minden ciklus lepesben
}

// akkor is igy van ha mas modul betoltesen keresztul toltenenk be ugyanazt, latszolag mas utvonallal
console.log('kulonbozo utvonallal', require('./folder/random2'));

// ha mast szeretnenk a kulonbozo hivasoknal kapni, akkor fuggvenyt kell exportalni
for (let i = 0; i < 3; i++) {
  // igy mar mast ir ki, de vegyuk eszre, hogy meg is kell hivni az exportalt fuggvenyt
  console.log( require('./random-fn')() );
}

