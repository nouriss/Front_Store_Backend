/* eslint-disable no-undef */
import { ProductStore } from '../../src/api/models/product';
import {
  ProductType,
  ProductReturnType
} from '../../src/api/interfaces/product';

const store = new ProductStore();

fdescribe('Product  Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });
  const productQuery: ProductType = {
    name: 'Rocket booster FX5',
    price: 1000,
    category: 'Space shuttle engine'
  };

  let resProductQuery: ProductReturnType = {
    id: 1,
    name: 'Rocket booster FX5',
    price: 1000,
    category: 'Space shuttle engine'
  };
  beforeAll(async () => {
    const result = await store.create(productQuery);
    console.log(` Create Product :: ${JSON.stringify(result)}`);
    expect(result.name).toEqual(productQuery.name);
    expect(result.price).toEqual(productQuery.price);
    expect(result.category).toEqual(productQuery.category);
    resProductQuery.id = result.id;
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).not.toEqual([]);
  });

  it('show method should return the correct product', async () => {
    const result = await store.show(resProductQuery.id);
    expect(result.name).toEqual(productQuery.name);
    expect(result.price).toEqual(productQuery.price);
    expect(result.category).toEqual(productQuery.category);
    expect(result.id).toEqual(resProductQuery.id);
  });

  it('update method should return the correct product', async () => {
    const updateProduct: ProductReturnType = resProductQuery;
    updateProduct.name = 'Brigestone f7s';
    updateProduct.price = 300;
    updateProduct.category = 'Aiplane Wheels';
    const result = await store.update(updateProduct);
    console.log(` Update Product :: ${JSON.stringify(result)}`);
    expect(result.name).toEqual(updateProduct.name);
    expect(result.price).toEqual(updateProduct.price);
    expect(result.category).toEqual(updateProduct.category);
    expect(result.id).toEqual(updateProduct.id);
    resProductQuery = updateProduct;
  });

  afterAll(async () => {
    const delResult = await store.delete(resProductQuery.id);
    expect(delResult.name).toEqual(resProductQuery.name);
    expect(delResult.price).toEqual(resProductQuery.price);
    expect(delResult.category).toEqual(resProductQuery.category);
    expect(delResult.id).toEqual(resProductQuery.id);
  });
});
