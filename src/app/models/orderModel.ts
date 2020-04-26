import { userModel } from './userModel';
import { productModel } from './productModel';

export interface orderModel{
    user: userModel,
    Products:[{product:productModel,productCount:number}]

}
