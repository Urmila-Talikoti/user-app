import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private loadingAction="Loading..."

  getAction(){
    return this.loadingAction
  }

  setAction(loadingAction:any){
    this.loadingAction=loadingAction
  }
   constructor(private http:HttpClient) { }

  getAllUsers():Observable<any>{
    return this.http.get('https://back-end-ums.vercel.app/api/getUser')
  }
  addUser(userForm:any):Observable<any>{
    return this.http.post('https://back-end-ums.vercel.app/api/addUser',userForm)
  }
  getUserDetail(id:any):Observable<any>{
    return this.http.get(`https://back-end-ums.vercel.app/api/getUser/${id}`)
  }
  updateUser(id:any,userForm:any):Observable<any>{
    return this.http.put(`https://back-end-ums.vercel.app/api/updateUser/${id}`,userForm)
  }
  deleteUser(id:any):Observable<any>{
    return this.http.delete(`https://back-end-ums.vercel.app/api/deleteUser/${id}`)
  }
}
