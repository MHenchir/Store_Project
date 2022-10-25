import { Component, OnInit ,OnDestroy} from '@angular/core';
import{AngularFirestore} from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import {Firestore,addDoc,collection} from '@angular/fire/firestore'
import{Observable,interval,Subscription} from 'rxjs'

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit,OnDestroy {
Uid:any
message:string=''
dataArray:any[]=[]
successUpdate:any
getProducts!:Subscription
  constructor(private fs:AngularFirestore ,private sa:AuthService) { 
    this.sa.user.subscribe(user=>{this.Uid=user?.uid})
  }

  ngOnInit(): void {
   this.getProducts=this.fs.collection("products").snapshotChanges().subscribe((data)=>{
      this.dataArray=data.map((element:any)=>{
        console.log(element.payload.doc.data());
        console.log(element);
        return {
          id:element.payload.doc.id,
          title:element.payload.doc.data().title,
          description:element.payload.doc.data().description,
          image:element.payload.doc.data().image,
          uid:element.payload.doc.data().uid
        }
      })
    })
    console.log(this.dataArray);
    
  }
addProduct(f:any){
  let data=f.value
this.fs.collection("products").add({
  title:data.title,
  description:data.description,
  image:data.image,
  uid:this.Uid
}).then(()=>{this.message="added"
window.location.reload()})


}
delete(id:any){
this.fs.collection("products").doc(id).delete()
}
update(id:any){
  this.fs.collection("products").doc(id).update({
    title:this.dataArray[this.dataArray.findIndex((obj:any)=>obj.id==id)].title,
    descrption:this.dataArray[this.dataArray.findIndex((obj:any)=>obj.id==id)].description
  }).then(()=>{
    this.successUpdate="Update success !"
    window.location.reload()
  })
}
ngOnDestroy(){
this.getProducts.unsubscribe()
}
}
