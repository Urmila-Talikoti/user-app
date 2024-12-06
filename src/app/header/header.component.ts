import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { LoaderComponent } from "../loader/loader.component";
import { NgFor, NgIf } from '@angular/common';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  imports: [LoaderComponent,NgIf,NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  loading=false
  constructor(private service:ApiService,private router:Router,private toaster:ToastrService){}

  ngOnInit(): void {
    this.getAllusers()
  }
  users:any=[]

  adduser(){
    this.router.navigateByUrl('add')
  }
  edituser(id:any){
    this.router.navigateByUrl(`update/${id}`)
  }

  deleteUser(id:any){
    this.service.setAction("Deleting User...")
    this.loading=true
    setTimeout(()=>{
      this.service.deleteUser(id).subscribe({
        next:(data:any)=>{
          this.loading=false
          if(data.status){
            this.toaster.success('user Deleted !!',"Success",{timeOut:2500 })
            this.getAllusers()
          }
        },
        error:(error:any)=>{
          this.toaster.error('server error',"Error",{timeOut:2500,closeButton:true})
          console.log(error)
        }
      })
    },1200)
  }

  getAllusers(){
    this.service.setAction("Getting Users...")
    this.loading=true
    setTimeout(()=>{
      this.service.getAllUsers().subscribe({
        next:(data:any)=>{
          this.users=data.message
          this.loading=false
        },
        error:(error:any)=>{
          this.toaster.error('server error',"Error",{timeOut:2500,closeButton:true})
          console.log(error)
        }
      })
    },1200);
  }
}
