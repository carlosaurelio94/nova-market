const express = require('express');

const StoresService = require('../services/stores.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createStoreScheme, updateStoreScheme, getStoreScheme } = require('../schemes/store.scheme');

const router = express.Router();
const service = new StoresService();

router.get('/', async (req, res) => {
  const stores = await service.find();
  res.json(stores);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', validatorHandler(getStoreScheme, 'params'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const store = await service.findOne(id);
    res.json(store);
  } catch(error) {
    next(error);
  }
});

router.post('/', validatorHandler(createStoreScheme, 'body'),async (req, res) => {
  const body = req.body;
  const newStore = await service.create(body);
  res.status(201).json(newStoret);
});

router.patch('/:id', validatorHandler(getStoreScheme, 'params'), validatorHandler(updateStoreScheme, 'body'),async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const store = await service.update(id, body)
    res.json(store)
  } catch(error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id)
  res.json(rta)
});

module.exports = router
