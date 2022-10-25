import { Component, OnInit } from '@angular/core';
import { Router, UrlSerializer } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
Uid:any
  constructor(private sa:AuthService,private route:Router) {
    this.sa.user.subscribe(user=>{this.Uid=user?.uid})
  }
messageError:any
  ngOnInit(): void {
   
  }
login(f:any){
  let data=f.value
  
this.sa.signIn(data.email,data.password)
.then((user)=>{
  console.log(data);
  console.log("login !")
  this.route.navigate(['/'])
  localStorage.setItem('userConnect',JSON.stringify(user.user?.uid))
})

.catch(()=>{
  console.log("error !")
  this.messageError='Incorrect Email and Password'
 })

}
}
