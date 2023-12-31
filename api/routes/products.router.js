const express = require('express');

const ProductsService = require('./../services/products.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductScheme, updateProductScheme, getProductScheme } = require('./../schemes/product.scheme');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', validatorHandler(getProductScheme, 'params'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await service.findOne(id);
    res.json(product);
  } catch(error) {
    next(error);
  }
});

router.post('/', validatorHandler(createProductScheme, 'body'),async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id', validatorHandler(getProductScheme, 'params'), validatorHandler(updateProductScheme, 'body'),async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body)
    res.json(product)
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
