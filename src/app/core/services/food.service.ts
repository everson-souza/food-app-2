import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { FoodInterface } from "../models/food.interface";
import { APIInterface } from "../models/api.interface";

@Injectable({
    providedIn: 'root'
})
  
export class FoodService{
    constructor(private http:HttpClient){}

    getFood(): Observable<any>{
        return this.http.get<any>('https://amperoid.tenants.foodji.io/machines/4bf115ee-303a-4089-a3ea-f6e7aae0ab94?description=false');        
    }
}