'use strict';

// ---------------- Cmdline arguments ----------------

// cmd line argumentumok a process.argv tombbol erhetok el
// argv[0]:   futtato NodeJS eleresi utvonala
// argv[1]:   aktualisan futtatott fajl
// argv[2..]: tobbi argumentum, mint string!

// Argumentumok áthozása command line-ból
const a = parseFloat(process.argv[2]);
const b = parseFloat(process.argv[3]);

const sum = (a, b) => a + b;
console.log(sum(a, b));

// ha szofisztikalt cmdline toolt akarunk kesziteni, akkor felmerulnek igenyek:
// - bemeno parameterek validalasa
// - opcionalis parameterek, default ertekekkel
// - kapcsolokkal jelezni a parameterek nevet, hogy tetszoleges sorrendben megadhatok legyenek
// - rovid aliasok a hosszu kapcsoloknak
// - help, usage szovegek kiirasa ha hibas az input
// ezekben sokat tud segiteni pl a 'yargs' nevu csomag (https://www.npmjs.com/package/yargs)

// ---------------- Environment variables ----------------

// Kornyezeti valtozokat a process.env objektumon keresztul lehet elerni
// ahhoz, hogy ez kiirjon valamit, igy kell futtatni a fajlt: `ALMAFA=42 node index.js`
// kulonben undefined lesz
console.log('Process env', process.env.ALMAFA);

// Az alkalmazás kényszerített megállítása
process.exit(123); // <- kilepesi kod, az OS megkapja
