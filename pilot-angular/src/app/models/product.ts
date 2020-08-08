import { BrandEntity } from './brand';

export interface ProductEntity{
    productId : number;
    productName : string; 
    quantity : number;
    price : number;
    brandEntity : BrandEntity;
    saleDate : string;
    image : string;
    description : string;
}