import { Component, OnInit, Signal  } from '@angular/core';
import {ProductService} from '../services/product.service'
import { Product } from '../model/product.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ViewDidEnter } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit {
  filteredProducts: Product[] = [];
  categoryForm!: FormGroup;
  selectedCategory: string = '';
  categories: string[] = ['Electronics', 'Clothing', 'Books', 'Furniture', 'Toys'];

  constructor(private productService: ProductService, private fb: FormBuilder,private alertController: AlertController) {}
  
  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      category: ['']
    });

    this.categoryForm.get('category')?.valueChanges.subscribe((value) => {
      this.filterProducts(value);
    });

  }

  ionViewWillEnter(){
    this.filteredProducts = this.productService.products();
    console.log(this.filteredProducts);
  }

  filterProducts(category: string) {
    console.log('Filtered products for category:', category);
    this.filteredProducts = this.productService.filterByCategory(category);
  }

  async deleteProduct(productId: number,name:string) {
    const confirmDelete = await this.showConfirmAlert(`Are you sure you want to delete : "${name}"`);
    if (confirmDelete) {
      this.productService.deleteProduct(productId);
      this.filteredProducts = this.productService.products(); 
      this.showSuccessAlert(`${name} deleted successfully!`);
    }
  }

  async showConfirmAlert(message: string): Promise<boolean> {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => false
        },
        {
          text: 'OK',
          handler: () => true
        }
      ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role === 'OK';
  }

  async showSuccessAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Success',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
