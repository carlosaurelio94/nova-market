const { faker } = require('@faker-js/faker');


class StoresService {

  constructor() {
    this.stores = [];
    this.generate();
  }

  generate(){
    this.stores = [{id: 1, name: 'Caballito', location: 'Caba', image: "https://picsum.photos/seed/jqxDmN/640/480"}, {id: 2, name: 'Palermo', location: 'Caba', image: "https://picsum.photos/seed/jqxDmN/640/480"}];
  }

  create(data){
    const newStore = {
      id: faker.number.int({ min: 1, max: 1000 }),
      ...data
    }
    this.stores.push(newStore);
    return newStore;
  }

  find(){
    return this.stores;
  }

  findOne(id){
    let findById = this.stores.find(item => item.id === id);
    if(findById == undefined){
      return {status:404, data:"Id error"};
    } else {
      return {status:202, data:findById};
    }
  }

  update(id, changes){
    const index = this.stores.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Store not found')
    }
    const store = this.stores[index]
    this.stores[index] = {
      ...store,
      ...changes
    };
    return this.stores[index];
  }

  delete(id){
    const index = this.stores.findIndex(item => item.id === id);
    if(index === -1) {
      throw new Error ('Store not found');
    }
    this.stores.splice(index,1);
    return { id };
  }

}

module.exports = StoresService
