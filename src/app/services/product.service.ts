import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSignal: WritableSignal<Product[]> = signal<Product[]>([]);

  get products(): Signal<Product[]> {
    return this.productsSignal.asReadonly(); 
  }

  // add product
  addProduct(newProduct: Omit<Product, 'id'>): void {
    const currentProducts = this.productsSignal();
    const nextId = currentProducts.length + 1; 
    const productWithId: Product = { id: nextId, ...newProduct };
    this.productsSignal.set([...currentProducts, productWithId]); 
    console.log(this.productsSignal());
  }

  // edit product
  editProduct(id: any, updatedProduct: Product[]): void {
    if (id > 0) {
      const productToUpdate: any = updatedProduct;
      const updatedProducts = this.productsSignal().map((product) =>
        product.id == id ? { ...product, ...productToUpdate } : product
      );
      this.productsSignal.set([...updatedProducts]);
    } else {
      console.error('Invalid updatedProduct response:', updatedProduct);
    }
  }

  // delete products

  deleteProduct(productId: number): void {
    const filteredProducts = this.productsSignal().filter((product) => product.id !== productId);
    this.productsSignal.set(filteredProducts); 
  }

  // filter products
  filterByCategory(category: string): Product[] {
    return this.productsSignal().filter((product) => product.category === category);
  }


  //get by id product
  getProductById(id: number) {
    return this.productsSignal().find((product) => product.id == id);
  }

}
