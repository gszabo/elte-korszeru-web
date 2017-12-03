'use strict';

const request = require('supertest-as-promised');
const api = require('./api');
const { expect } = require('chai');

describe('HTTP API /books', function() {

  const expectBooks = async function(expectedBooks) {
    const response = await request(api).get('/books');
    const books = response.body;

    expect(books).to.eql(expectedBooks);
  };

  beforeEach(async function() {
    await request(api).delete('/books');
  });

  describe('GET', function() {
    it('responds 200', async function() {
      const response = await request(api).get('/books');
      expect(response.status).to.eql(200);
    });

    it('responds with empty json body', async function() {
      const response = await request(api).get('/books');
      expect(response.type).to.eql('application/json');
      expect(response.body).to.eql([]);
    });
  });

  describe('POST', function() {
    it('creates new books', async function() {
      const book = { title: 'my title' };
      const postResponse = await request(api)
        .post('/books')
        .send(book);
      expect(postResponse.status).to.eql(201);
      expect(postResponse.body.title).to.eql('my title');
      expect(postResponse.body).to.include.key('id');

      expectBooks([postResponse.body]);
    });

    it('responds with 400 if title is missing', async function() {
      const book = { author: 'my author' };
      const postResponse = await request(api)
        .post('/books')
        .send(book);
      expect(postResponse.status).to.eql(400);
    });
  });

  describe('DELETE', function() {
    it('clears books', async function() {
      const book = { title: 'my title' };
      const postResponse = await request(api)
        .post('/books')
        .send(book);

      await request(api).delete('/books');

      expectBooks([]);
    });
  });

  describe('PUT /:id', function() {

    it('updates books', async function() {
      const book = { title: 'my title' };
      const postResponse = await request(api)
        .post('/books')
        .send(book);

      const id = postResponse.body.id;
      const updatedBook = { ...postResponse.body, title: 'modified title' };
      await request(api).put('/books/' + id).send(updatedBook);

      expectBooks([{ id, title: 'modified title' }]);
    });

    it('responds 400 if title is missing', async function() {
      const book = { title: 'my title' };
      const postResponse = await request(api)
        .post('/books')
        .send(book);

      const id = postResponse.body.id;
      const updatedBook = { ...postResponse.body, title: null };
      const response = await request(api).put('/books/' + id).send(updatedBook);

      expect(response.status).to.eql(400);
    });

    it('responds 404 if book does not exist', async function() {
      const id = 42;
      const updatedBook = { id, title: 'modified title' };
      const response = await request(api).put('/books/' + id).send(updatedBook);
      expect(response.status).to.eql(404);
    });

  });
});
