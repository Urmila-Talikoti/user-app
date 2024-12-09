import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { LoaderComponent } from "../loader/loader.component";
import { NgFor, NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  loading = false

  constructor(private service: ApiService, private router: Router, private toaster: ToastrService) { }

  adduser() {
    this.router.navigateByUrl('add')
  }
  
  home() {
    this.router.navigateByUrl('home')
  }

  about() {
    this.router.navigateByUrl('about')
  }

  menu() {
    this.router.navigateByUrl('menu')
  }
}