import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
keyParams:any
dataProduct={
  description:'',
  image:'',
  title:'',
  uid:''
}
dataArray:any
  constructor(private parms:ActivatedRoute,private fs:AngularFirestore) { 
    this.parms.params.subscribe(query=>{
     this.keyParams=query['id']
    })
  }

  ngOnInit(): void {
    this.fs.collection("products").snapshotChanges().subscribe((data)=>{
      this.dataArray=data.map((element:any)=>{
        if(element.payload.doc.id===this.keyParams){
          this.dataProduct.description=element.payload.doc.data().description
        this.dataProduct.image=element.payload.doc.data().image
        this.dataProduct.title=element.payload.doc.data().title
        this.dataProduct.uid=element.payload.doc.data().uid
        }
        
        
        
      })
    })
  }
// autre methode
  // ngOnInit(): void {
  //   this.fs.collection("products").ref.doc(this.keyParams).get().then((data)=>{
  //     
  //       if(element.payload.doc.id===this.keyParams){
  //         this.dataProduct.description=element.payload.doc.data().description
  //       this.dataProduct.image=element.payload.doc.data().image
  //       this.dataProduct.title=element.payload.doc.data().title
  //       this.dataProduct.uid=element.payload.doc.data().uid
  //      }
  //     })
  // }

}
