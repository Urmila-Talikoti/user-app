import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-user',
  imports: [ReactiveFormsModule, NgClass, NgIf, LoaderComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.paramMap.get('userId')){
      this.isEdit=true
      let uId=this.activatedRoute.snapshot.paramMap.get('userId')
      this.getUserDetails(uId)
    }
  }
  constructor(private activatedRoute:ActivatedRoute ,private toaster:ToastrService, private service:ApiService,private router:Router){

  }

  loading=false
  isEdit=false

  userForm = new FormGroup({
    fullName:new FormControl('',Validators.required),
    userName:new FormControl('',[Validators.required,Validators.email]),
    mobileNo:new FormControl('',[Validators.required])
  })

  goback(){
    this.router.navigateByUrl('')
  }

  onSubmit(){
    if(!this.isEdit){
      this.service.setAction("Adding user...")
      this.loading=true
      setTimeout(()=>{
        this.service.addUser(this.userForm.value).subscribe({
          next:(data:any)=>{
            if(data.status){
              this.loading=false
              this.toaster.success("user added !!","Success",{timeOut:2500,closeButton:true})
              this.userForm.reset()
              this.router.navigateByUrl('')
            } else{
              this.toaster.error('something went wrong !!',"Error",{timeOut:2500,closeButton:true})
            }
          }
        })
      },1200);
    } else{
      this.service.setAction("Updating user...")
      this.loading=true
      setTimeout(()=>{
        let uId=this.activatedRoute.snapshot.paramMap.get('userId')
        this.service.updateUser(uId,this.userForm.value).subscribe({
          next:(data:any)=>{
            if(data.status){
              this.loading=false
              this.toaster.success("user updated !!","Success",{timeOut:2500,closeButton:true})
              this.userForm.reset()
              this.router.navigateByUrl('')
            } else{
              this.toaster.error('something went wrong !!',"Error",{timeOut:2500,closeButton:true})
            }
          }
        })
      },1200);
    }
  }

  getUserDetails(userId:any){
    this.service.getUserDetail(userId).subscribe(
      (data:any)=>{
        if(data.status){
          this.userForm.controls['fullName'].setValue(data.message.fullName)
          this.userForm.controls['userName'].setValue(data.message.userName)
          this.userForm.controls['mobileNo'].setValue(data.message.mobileNo)
        }else{
          this.toaster.error('server error',"Error",{timeOut:2500})
        }
      }
    )
  }

}
