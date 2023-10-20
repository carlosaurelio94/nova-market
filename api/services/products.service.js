const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate(){
    this.products = [{id: 1, name: 'Carrot', quantity: 50, price: 100}, {id: 2, name: 'Apple', quantity: 27, price: 50}];
  }

  async create(data){
    const newProduct = {
      id: faker.number.int({ min: 1, max: 1000 }),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products)
      }, 1000)
    })
  }

  async findOne(id){
    let findById = this.products.find(item => item.id === id);
    if(!findById){
      throw boom.notFound('product not found');
    }
    if(findById.isBlock) {
      throw boom.conflict('product is block')
    }
    return findById;
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id == id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id == id);
    if(index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index,1);
    return { id };
  }

}

module.exports = ProductsService
