'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const { Store, StoreValidationError, StoreFindError } = require('./store');
const store = new Store();

app.get('/books', async function(req, res) {
  res.status(200).send(await store.getAll()).end();
});

app.post('/books', async function(req, res) {
  try {
    const createdBook = await store.create(req.body);
    res.status(201).send(createdBook).end();
  } catch(error) {
    if (error instanceof StoreValidationError) {
      res.status(400).end();
    } else {
      res.status(500).end();
    }
  }
});

app.delete('/books', async function(req, res) {
  await store.deleteAll();
  res.end();
});

app.put('/books/:id', async function(req, res) {
  try {
    await store.updateById(parseInt(req.params.id), req.body);
    res.end();
  } catch (error) {
    if (error instanceof StoreFindError) {
      res.status(404).end();
    } else if (error instanceof StoreValidationError) {
      res.status(400).end();
    } else {
      res.status(500).end();
    }
  }
});

module.exports = app;
