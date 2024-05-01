import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  checkoutformGroup!: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

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
      console.log('billing Address :: '+this.checkoutformGroup.controls['billingAddress'].value);
    }else{
      this.checkoutformGroup.controls['billingAddress'].reset;
    }
    }
}
