'use strict';

const { Store, StoreValidationError, StoreFindError } = require('./store');
const { expect } = require('chai');

describe('Book Store', function() {
  it('is empty when created', async function() {
    const store = new Store();
    const books = await store.getAll();
    expect(books).to.eql([]);
  });

  describe('adding new books', function() {
    it('returns the created book with ID', async function() {
      const store = new Store();
      const newBook = { title: 'some title', author: 'some author' };

      const result = await store.create(newBook);

      expect(result.title).to.eql('some title');
      expect(result.author).to.eql('some author');
      expect(result).to.include.key('id');
    });

    it('the created book can be retrieved', async function() {
      const store = new Store();
      const newBook = { title: 'some title', author: 'some author' };

      const result = await store.create(newBook);

      const books = await store.getAll();
      expect(books).to.have.lengthOf(1);
      expect(books).to.include(result);
    });

    it('all created books can be retrieved', async function() {
      const store = new Store();
      const newBook = { title: 'some title', author: 'some author' };

      const firstResult = await store.create(newBook);
      const secondResult = await store.create(newBook);

      const books = await store.getAll();
      expect(books).to.have.lengthOf(2);
      expect(books).to.include(firstResult);
      expect(books).to.include(secondResult);
    });

    it('created books get different IDs', async function() {
      const store = new Store();
      const newBook = { title: 'some title', author: 'some author' };

      const firstResult = await store.create(newBook);
      const secondResult = await store.create(newBook);

      expect(firstResult.id).to.not.eql(secondResult.id);
    });

    it('created book can be retrieved by ID', async function() {
      const store = new Store();
      const firstNewBook = { title: 'some title', author: 'some author' };
      const secondNewBook = { title: 'very title', author: 'very author' };

      const firstResult = await store.create(firstNewBook);
      const secondResult = await store.create(secondNewBook);

      const secondBook = await store.getById(secondResult.id);

      expect(secondBook).to.eql(secondResult);
    });

    it('cannot succeed without title', async function() {
      const store = new Store();
      const newBook = { author: 'some author' };

      try {
        await store.create(newBook);
      } catch (error) {
        expect(error).to.be.instanceof(StoreValidationError);
        expect(error.message).to.include('missing');
        expect(error.message).to.include('title');
        return;
      }

      throw new Error('should have thrown error about missing title');
    });

    it('can succeed without author', async function() {
      const store = new Store();
      const newBook = { title: 'some title' };

      const result = await store.create(newBook);

      expect(result.title).to.eql('some title');
      expect(result).to.not.have.any.key('author');
    });
  });

  describe('retrieving book', function() {
    it('throws error if book is not found', async function() {
      const store = new Store();

      try {
        await store.getById(42);
      } catch (error) {
        expect(error).to.be.instanceof(StoreFindError);
        expect(error.message).to.include('missing');
        expect(error.message).to.include('book');
        return;
      }

      throw new Error('should have thrown error about missing book');
    });
  });

  describe('deleting book', function() {
    it('can be done by ID', async function() {
      const store = new Store();
      const newBook = { title: 'some title' };

      const firstResult = await store.create(newBook);
      const secondResult = await store.create(newBook);
      await store.deleteById(firstResult.id);
      const books = await store.getAll();

      expect(books).to.eql([secondResult]);
    });

    it('throws error if book is not found', async function() {
      const store = new Store();

      try {
        await store.deleteById(42);
      } catch (error) {
        expect(error).to.be.instanceof(StoreFindError);
        expect(error.message).to.include('missing');
        expect(error.message).to.include('book');
        return;
      }

      throw new Error('should have thrown error about missing book');
    });

    it('all books can be deleted', async function() {
      const store = new Store();
      const newBook = { title: 'some title' };

      await store.create(newBook);
      await store.create(newBook);

      await store.deleteAll();

      const books = await store.getAll();
      expect(books).to.eql([]);
    });
  });

  describe('updating a book', function() {
    it('can be done by ID', async function() {
      const store = new Store();
      const newBook = { title: 'some title', author: 'some author' };

      const firstResult = await store.create(newBook);
      const updatedBook = { ...firstResult, title: 'modified title' };
      await store.updateById(firstResult.id, updatedBook);

      const book = await store.getById(firstResult.id);

      expect(book).to.eql(updatedBook);
    });

    it('returns the updated book', async function() {
      const store = new Store();
      const newBook = { title: 'some title', author: 'some author' };

      const firstResult = await store.create(newBook);
      const updatedBook = { ...firstResult, title: 'modified title' };
      const result = await store.updateById(firstResult.id, updatedBook);

      expect(result).to.eql(updatedBook);
    });

    it('ID cannot be updated', async function() {
      const store = new Store();
      const newBook = { title: 'some title', author: 'some author' };

      const firstResult = await store.create(newBook);
      const updatedBook = { ...firstResult, id: 42 };
      try {
        await store.updateById(firstResult.id, updatedBook);
      } catch (error) {
        expect(error).to.be.instanceof(StoreValidationError);
        expect(error.message).to.include('ID');
        return;
      }

      throw new Error('should have thrown error about modified ID');
    });

    it('throws error if book is not found', async function() {
      const store = new Store();

      try {
        await store.updateById(42, { id: 42, title: 'some title' });
      } catch (error) {
        expect(error).to.be.instanceof(StoreFindError);
        expect(error.message).to.include('missing');
        expect(error.message).to.include('book');
        return;
      }

      throw new Error('should have thrown error about missing book');
    });

    it('cannot remove title', async function() {
      const store = new Store();
      const newBook = { title: 'some title', author: 'some author' };;

      const firstResult = await store.create(newBook);
      const updatedBook = { author: 'some author', id: firstResult.id };

      try {
        await store.updateById(firstResult.id, updatedBook);
      } catch (error) {
        expect(error).to.be.instanceof(StoreValidationError);
        expect(error.message).to.include('missing');
        expect(error.message).to.include('title');
        return;
      }

      throw new Error('should have thrown error about missing title');
    });
  });
});
