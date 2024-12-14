import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
// import { AlertController } from '@ionic/angular/providers/alert-controller';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  productId:any
  
  @Input() isEditMode = false;
  @Input() productData: any;
  productForm: FormGroup;
 

  constructor(private productService: ProductService, private fb: FormBuilder,private router:Router,private route: ActivatedRoute,private alertController: AlertController) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      
      status: [true],
    });
  }
  ngOnInit(): void {

  }

  ionViewWillEnter(){
    this.productId = this.route.snapshot.paramMap.get('id')!;
    console.log(this.productId)

    if (this.productId) {
      this.isEditMode = true;
      const product:Product | undefined  =this.productService.getProductById(this.productId)
      console.log(product)
        if (product) {
          this.productForm.patchValue(product);
        }
    }
  }

  ngOnChanges() {
    if (this.isEditMode && this.productData) {
      this.productForm.patchValue(this.productData);
    }
  }

  // saveProduct() {
  //   if (this.productForm.valid) {
    
  //     if (this.isEditMode) {
  //       this.productService.editProduct(this.productId,this.productForm.value);
  //       this.productForm.reset();
  
  //       this.router.navigate(["home"]);
  //     } else {
  //       this.productService.addProduct(this.productForm.value);
  //       this.productForm.reset(); 
  //       this.router.navigate(["home"]);
  //     }
  //   }
  // }

  async saveProduct() {
    if (this.productForm.valid) {
      if (this.isEditMode) {
        this.productService.editProduct(this.productId, this.productForm.value);
        this.productForm.reset();
        this.showAlert('Success', 'Product updated successfully!');
      } else {
        this.productService.addProduct(this.productForm.value);
        this.productForm.reset();
        this.showAlert('Success', 'Product added successfully!');
      }
      this.router.navigate(['home']);
    } else {
      this.showAlert('Error', 'Please fill all required fields!');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
