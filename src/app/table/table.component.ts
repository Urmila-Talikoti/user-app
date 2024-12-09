import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor,LoaderComponent,NgIf],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  loading=false
  constructor(private service:ApiService,private router:Router,private toaster:ToastrService){}
  ngOnInit(): void {
    this.getAllusers()
  }
  users:any=[]

  addUser(){
    this.router.navigateByUrl('add')
  }
  editUser(id:any){
    this.router.navigateByUrl(`update/${id}`)
  }
  deleteUser(id:any){
    this.service.setAction("Deleting Order...")
    this.loading=true
    setTimeout(()=>{
      this.service.deleteUser(id).subscribe({
        next:(data:any)=>{
          
          this.loading=false
          if(data.status){
            this.toaster.success('Order deleted..','Success',{timeOut:2500})
            this.getAllusers()
          }
        },
        error:(err:any)=>{
          this.toaster.error('Internal Server Error','Error',{timeOut:2500,closeButton:true})
          console.log(err)
        }
      })
    },1200);
  }
  getAllusers(){
    this.service.setAction("Getting Details...")
    this.loading=true
    setTimeout(()=>{
      this.service.getAllUsers().subscribe({
        next:(data:any)=>{
          this.users=data.message
          this.loading=false
        },
        error:(err:any)=>{
          this.toaster.error('Internal Server Error','Error',{timeOut:2500,closeButton:true})
          console.log(err)
        }
      })
    },1200);

  }

}
