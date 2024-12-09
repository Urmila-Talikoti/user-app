import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, LoaderComponent,NgFor],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  productType=['GPay','UPI','Paytm','Cash']
  
  ngOnInit(): void {
    if(this.activatedRoute.snapshot.paramMap.get('userId')){
      this.isEdit=true
      let uId=this.activatedRoute.snapshot.paramMap.get('userId')
      this.getUserDetails(uId)
    }
    
  }
  constructor(private activatedRoute:ActivatedRoute, private toaster:ToastrService,private router:Router ,private service:ApiService){}
 loading=false
 isEdit=false
 userForm=new FormGroup({
  productname:new FormControl('',Validators.required),
  productsku:new FormControl('',Validators.required),
  category:new FormControl('',Validators.required),
 })
 goBack(){
  this.router.navigateByUrl('table')
 }
 onSubmit(){
  if(!this.isEdit){
    this.service.setAction("Adding Order..")
    this.loading=true
    setTimeout(()=>{
      this.service.addUser(this.userForm.value).subscribe({
        next:(data:any)=>{
         if(data.status){
          this.loading=false
          this.toaster.success('Order Added 1','Success',{timeOut:2000,closeButton:true})
          this.userForm.reset()
          this.router.navigateByUrl('table')
         } else{
          this.toaster.error("Something went wrong",'Error',{timeOut:2500})
         }
        }
      })
    },1000);
  } else {
    this.service.setAction("Updating Order..")
    this.loading=true
    setTimeout(()=>{
      let uId=this.activatedRoute.snapshot.paramMap.get('userId')
      this.service.updateUser(uId,this.userForm.value).subscribe({
        next:(data:any)=>{
         if(data.status){
          this.loading=false
          this.toaster.success('Order Updated','Success',{timeOut:2000,closeButton:true})
          this.router.navigateByUrl('table')
         } else{
          this.toaster.error("Something went wrong",'Error',{timeOut:2500})
         }
        }
      })
    },1000);
  }
 }

 getUserDetails(userId:any){
  this.service.getUserDetail(userId).subscribe({
    next:(data:any)=>{
      if(data.status){
        this.userForm.controls['productname'].setValue(data.message.productname)
        this.userForm.controls['productsku'].setValue(data.message.productsku)
        this.userForm.controls['category'].setValue(data.message.category)
      }else{
        this.toaster.error('Internal Server Error','Error',{timeOut:2500})
      }
    }
  })
 }
}
