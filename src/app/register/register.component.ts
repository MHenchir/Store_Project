import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import{AngularFirestore} from '@angular/fire/compat/firestore'
import { Router } from '@angular/router';
import {Firestore,addDoc,collection} from '@angular/fire/firestore'
import { getFirestore } from "@angular/fire/firestore";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  constructor( private sa:AuthService, private fs:AngularFirestore, private route:Router,private firestore:Firestore) { }

  ngOnInit(): void {
  }
  // enregistrement d'un nouveau user (email,password) dans le database
register(f:any){
  let data=f.value
// console.log(f.value);
this.sa.signUp(data.email,data.password).then((user)=>{
  
  // const  userRef=addDoc(collection(this.firestore,'users'),{
  //   name:data.flName,
  //   Email:data.email,
  //   uid:user.user?.uid,
  //   bio:data.Bio

  // }).then(()=>{
  //   this.route.navigate(['/'])
  // }).catch(()=>{console.log("error fail !!");})
  this.fs.collection("users").doc(user.user?.uid).set({
    flName:data.flName,
    email:data.email,
    bio:data.Bio,
    uid:user.user?.uid,
    image:'https://www.addsystems.com/wp-content/uploads/2017/01/Anonym-e1491994623630.jpg'
  }).then(()=>{
   
    this.route.navigate(['/'])})


}).catch(()=>{
console.log("error !");
})
}
}
