'use strict';

// Új npm package telepítése: npm install reverse-string
// Ezt követően a require(package név)-el behúzható
const reverse = require('reverse-string');
console.log(reverse('alma'));

// Note: ez a reverse-string csomag akkor is jol mukodik, ha a szoveg pl. emojikat tartalmaz
// a naiv `text.split('').reverse().join('')` implementacio ezt elrontana
// ilyen szempontokat is erdemes merlegelni, mikor arrol dontunk hogy libet hasznalunk vagy megirjuk magunknak

// npm init: a packages.json legenerálása, npm inicializálása a projekthez

// npm run szkriptNév: a packages.json scripts részében definiált script futtatása
//    az itt definialt scriptek Unix alatt az sh shellben futnak, Windows alatt a cmd.exe shellben
//    ez feluldefinialhato a script-shell konfiguracioval: pl `npm config set script-shell c:\...\powershell.exe`
// ha a script altal definialt parancsnak extra argumentumokat szeretnenk adni, akkor azok -- utan johetnek
// pl. `npm run test -- --watch`, a -- valasztja el az npm argumentumait a futtatott dolog argumentumaitol

// npm start: a packages.json-ben definitált start szkript futtatása (kivételesen nem kell a "run", mint fentebb)
// npm test: a packages.json-ben definitált teszt-szkript futtatása (kivételesen nem kell a "run", mint fentebb)

// Példa packages.json-re:
//{
//  "name": "node-demo",
//  "version": "1.0.0",
//  "description": "",
//  "main": "index.js",
//  "scripts": {
//    "start": "node app.js",
//    "serve": "node ...",
//    "test": "mocha \"**/*.spec.js\""
//  },
//  "author": "",
//  "license": "ISC",
//  "dependencies": {
//    "reverse-string": "0.0.4"
//  }
//}

// szamos parancsnak letezik rovid formaja, pl. `npm t` == `npm test`, `npm i` == `npm install`, ...

// ha egy X scripthez definialunk egy preX vagy postX nevu scriptet is, akkor azokat is lefuttatja az npm
// az X script elott/utan
