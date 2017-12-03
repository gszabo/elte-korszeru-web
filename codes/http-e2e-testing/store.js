'use strict';

class Store {

  constructor() {
    this._books = [];
  }

  async getAll() {
    return this._books;
  }

  async getById(id) {
    const book = this._books.find(b => b.id === id);
    if (!book) {
      throw new StoreFindError('missing book');
    }
    return book;
  }

  async create(book) {
    if (!book.title) {
      throw new StoreValidationError('missing title');
    }
    const created = { ...book, id: this._books.length };
    this._books.push(created);
    return created;
  }

  async deleteAll() {
    this._books = [];
  }

  async deleteById(id) {
    const booksWithoutDeleted = this._books.filter(b => b.id !== id);
    if (booksWithoutDeleted.length === this._books.length) {
      throw new StoreFindError('missing book');
    }
    this._books = booksWithoutDeleted;
  }

  async updateById(id, book) {
    if (id !== book.id) {
      throw new StoreValidationError('modified ID');
    }
    if (!book.title) {
      throw new StoreValidationError('missing title');
    }
    const bookOfId = this._books.find(b => b.id === id);
    if (!bookOfId) {
      throw new StoreFindError('missing book');
    }
    this._books = this._books.map(b => b.id === id ? book : b);
    return book;
  }

}

class StoreValidationError extends Error {

}

class StoreFindError extends Error {

}

module.exports = { Store, StoreValidationError, StoreFindError };
