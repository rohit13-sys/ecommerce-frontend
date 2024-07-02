import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import {FormServiceService} from "../../services/form-service.service";
import {DatePipe} from "@angular/common";
import {Country} from "../../common/country";
import {State} from "../../common/state";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  totalPrice:number = 0;
  totalQuantity:number = 0;
  checkoutformGroup!: FormGroup;
  creditCardMonths:number[]=[];
  creditCardYears:number[]=[];
  countries:Country[]=[];
  shippingAddressState:State[] = [];
  billingAddressState:State[] = [];
  constructor(private formBuilder: FormBuilder,private cartService:CartService,
              private formService:FormServiceService) { }

  ngOnInit(): void {
    this.checkoutformGroup=this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street : [''],
        city : [''],
        state : [''],
        country : [''],
        zipCode : ['']
      }),
      billingAddress: this.formBuilder.group({
        street : [''],
        city : [''],
        state : [''],
        country : [''],
        zipCode : ['']
      }),
      creditCard: this.formBuilder.group({
        cardType : [''],
        nameOnCard : [''],
        cardNumber : [''],
        securityCode : [''],
        expirationMonth : [''],
        expirationYear: ['']
      })
    });

    this.computeCartDetails();
    console.log("Total Price : "+this.totalPrice+", Total Quanitty : "+this.totalQuantity);

    const startMonth:number = new Date().getMonth()+1;
    console.log("start month : "+startMonth);

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data=>{
        console.log("Retrieved Credit card month : "+JSON.stringify(data))
        this.creditCardMonths = data;
      }
    );

    this.formService.getCreditCardYears().subscribe(
      data=>{
        console.log("Retrieved Credit card month : "+JSON.stringify(data))
        this.creditCardYears = data;
      }
    );

    this.formService.getCountries().subscribe(
      data=>{
        console.log("countries : "+JSON.stringify(data))
        this.countries = data;
      }
    );



  }

  onSubmit(){
    console.log("handling the submit button");
    console.log(this.checkoutformGroup.get('customer')?.value);
    console.log('Email is '+this.checkoutformGroup.get('customer')?.value.email);
  }

  copyShippingAddressToBillingAddress(event:Event) {
    console.log('inside method');
    console.log(this.checkoutformGroup.controls['shippingAddress'].value);
    console.log(event);

    if((<HTMLInputElement>event['target']).checked){
      this.checkoutformGroup.controls['billingAddress'].setValue(this.checkoutformGroup.controls['shippingAddress'].value);
      this.billingAddressState = this.shippingAddressState;
      console.log('billing Address :: '+this.checkoutformGroup.controls['billingAddress'].value);
    }else{
      this.checkoutformGroup.controls['billingAddress'].reset('');
      this.billingAddressState = []
      console.log('billing Address :: '+this.checkoutformGroup.controls['billingAddress'].value);
    }
    }

    computeCartDetails(){
        //subscribe to cart total price
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);

    //sunscribe to cart total quantity
    this.cartService.totalQuanitty.subscribe(data => this.totalQuantity = data);

    //compiute cart total price and quantity
    this.cartService.computeCartTotals();
    }


  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutformGroup.get('creditCard');
    const currentYear : number = new Date().getFullYear();
    const selectedYear:number = Number(creditCardFormGroup?.value.expirationYear);

    let startMonth;

    if(currentYear === selectedYear){
      startMonth = new Date().getMonth()+1;
    }else {
      startMonth = 1;
    }

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data=>{
        console.log("Retrieved Credit card month : "+JSON.stringify(data))
        this.creditCardMonths = data;
      }
    );
  }

  getStates(formGroupData:String){
    // @ts-ignore
      const formGroup = this.checkoutformGroup.get(formGroupData);
    const countryCode = formGroup?.value.country.code;

    this.formService.getStates(countryCode).subscribe(
      data=>{
        if(formGroupData === 'shippingAddress'){
          this.shippingAddressState = data;
        }else {
          this.billingAddressState = data;
        }

        // @ts-ignore
          formGroup?.get("state").setValue(data[0]);
      }
    );

  }
}
