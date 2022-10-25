import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import {Observable} from 'rxjs'
import firebase from 'firebase/compat/app'
import {Firestore,collection} from '@angular/fire/firestore'
import { User } from '../models/user';
import{ addDoc,doc} from '@firebase/firestore'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
user:Observable<firebase.User| null | undefined>
  constructor(private fa:AngularFireAuth,public firestore:Firestore) {
   this.user=this.fa.user
    
   }
// adduser(user:User){
// // const  userRef=addDoc(collection(this.firestore,'users'),{
// //   name: 
// // })



// }

// fonction permet d'enregistrer les données d'un nouveau user (email,password) dans la database
  signUp(email:any,password:any){
   return  this.fa.createUserWithEmailAndPassword(email,password)
  }
  signIn(email:any,password:any){
    return this.fa.signInWithEmailAndPassword(email,password)

  }
}
