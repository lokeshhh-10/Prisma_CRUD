const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/products', async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({});
    res.json(products);
    
  } catch (error) {
    next(error);
  }
});

router.get('/products/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const product = await prisma.product.findUnique({
      where: {id: Number(id)},
      include: {category: true}
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/products', async (req, res, next) => {
  try {
    const data = req.body;
    const newProduct = await prisma.product.create({
      data: data
    });
    res.json(newProduct);
  } catch (error) {
    next(error);
    
  }
});

router.delete('/products/:id', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.patch('/products/:id', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

module.exports = router;
