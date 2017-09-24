'use strict';

// 1. `npm install` - test framework (mocha) es assertion library (chai) feltelepitese
// 2. `npm t` tesztek futtatasa

// erdemes megnezni es jatszani egy kicsit a mocha kapcsoloival, beallitasaival
// pl. `npm t -- --watch` eseten nem lep ki a futtato, hanem fajlmodositas eseten ujrafuttatja a teszteket
//     `npm t -- --reporter dot` csak a hibakat irja ki, jo tesztek eseten csak egy pontot
// mas reporterek: https://mochajs.org/#reporters

const { expect } = require('chai');

describe('Testing', function() {
  it('simple equals assertion', function() {
    // .equal - referencia szerinti egyezes (=== operator)
    expect(sum(1, 2)).to.equal(3);
    // epp ezert ket objektum nem egyenlo, akkor sem, ha ugyanazok a kulcsok es ertekek
    expect({ a: 42 }).to.not.equal({ a: 42 });
    // ha egyenlonek akarjuk oket tekinteni, akkor a .deep.equal vagy .eql hasznalata szukseges
    expect({ a: 42 }).to.deep.equal({ a: 42 });
    expect({ a: 42 }).to.eql({ a: 42 });
  });

  it('chai matchers', function() {
    // leiras a chai-ba epitett ellenorzokrol: http://chaijs.com/api/bdd/
    expect([1, 2, 3, 4]).to.contain(2);
    expect([1, 2]).to.have.length.below(5);
  });

  it('floating point expectation with tolerance', function() {
    expect(sqrt(4)).to.be.closeTo(2, tolerance);
    expect(sqrt(2)).to.be.closeTo(1.4142, 5e-4);
  });

  it('testing error throwing with .throw assertion', function() {
    expect(() => sqrt(-1), 'calling sqrt with negative number').to.throw(/(N|n)egative/);
  });

  it('testing error throwing manually', function() {
    try {
      sqrt(-4);
    } catch (err) {
      expect(err.message).to.match(/(N|n)egative/);
      return;
    }
    throw new Error('sqrt with negative input should throw error');
  });
});

const sum = (a, b) => a + b;

// Newton fele kozelito algoritmus
const tolerance = 1e-6;
const sqrt = function(input) {
  if (input < 0) throw new Error('Negative input');

  const goodEnough = guess => Math.abs(guess * guess - input) / input < tolerance;

  const iter = function(guess) {
    if (goodEnough(guess)) return guess;
    const nextGuess = (guess + input / guess) / 2;
    return iter(nextGuess);
  };

  return iter(1);
};
