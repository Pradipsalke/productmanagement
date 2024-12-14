import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddProductPageRoutingModule } from './add-product-routing.module';
import { AddProductPage } from './add-product.page';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddProductPageRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [AddProductPage]
})
export class AddProductPageModule {}
