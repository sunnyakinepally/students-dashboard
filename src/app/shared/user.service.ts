import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private Url = 'http://localhost:3000/api';
  constructor(private http:HttpClient, ) { }
  private apiUrl = 'https://api.github.com';
 
  getStudents(): Observable<any> {
    return this.http.get('http://localhost:3000/api/getStudentData');
  }
poststudents(studentdata:any): Observable<any>{
  console.log('data to send ',studentdata)
return this.http.post('http://localhost:3000/api/putStudentsData',studentdata);
}
deletestudents(deleteddata:any): Observable<any>{
  console.log('deleted data',deleteddata)

  return this.http.post('http://localhost:3000/api/deletestudent',deleteddata)
}

profileupdate(profileupdate:any): Observable<any>{
  console.log('recieved updated data',profileupdate)
  return this.http.post('http://localhost:3000/api/profileupdate',profileupdate)

}
  loggedin(){
    return !! localStorage.getItem("details")
  }



  getallusers(){
    return this.http.get('https://api.github.com/users')
  }

  searchresult(data:any){
    let queryParams = new HttpParams();
    let searcharray=[]
    queryParams = queryParams.append('q', data);
    // let url='https://api.github.com/search/users?q='+data
    // return this.http.get(url)

    if(localStorage.getItem('searchitems')){
      searcharray=JSON.parse(localStorage.getItem('searchitems')as string)
      searcharray=[...searcharray,{data}]
        }else{
      searcharray=[{data}]
        }
        console.log("local items",searcharray)
        localStorage.setItem("searchitems",JSON.stringify(searcharray))

    return this.http.get('https://api.github.com/search/users',{params:queryParams})
  }


 
}
