import { Component, OnInit ,OnDestroy} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AuthService } from '../services/auth.service';
import{Subscription} from 'rxjs'
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit,OnDestroy {
Uid:any
successUpdate:string=""
dataProfil={
  flName:'',
  image:'',
  bio:'',
  uid:''
}
dataArray:any
task!:AngularFireUploadTask
ref!:AngularFireStorageReference
percontage:any
userSubscribe!:Subscription
  constructor(private sa:AuthService,private fs:AngularFirestore,private fst:AngularFireStorage) { 
    this.userSubscribe=this.sa.user.subscribe((user)=>{
      this.Uid=user?.uid
    })
  }

  ngOnInit(): void {
   
    this.fs.collection("users").snapshotChanges().subscribe((data)=>{
      this.dataArray=data.map((element:any)=>{
        if(element.payload.doc.data().uid===this.Uid){
          this.dataProfil.flName=element.payload.doc.data().flName
        this.dataProfil.image=element.payload.doc.data().image
        this.dataProfil.bio=element.payload.doc.data().bio
        this.dataProfil.uid=element.payload.doc.data().uid
        }
        
        
        
      })
    })
  }
  update(){
    this.fs.collection("users").doc(this.dataProfil.uid).update({
      flName:this.dataProfil.flName,
      bio:this.dataProfil.bio
    }).then(()=>{
      this.successUpdate="Update success !"
      window.location.reload()
    })
  }
  uploadImage($event:any){
    console.log($event);
    const id=Math.random().toString(36).substring(2)
    const file=$event.target.files[0]
    console.log(file);
this.ref=this.fst.ref(id)
this.task=this.ref.put(file)
this.percontage=this.task.percentageChanges()
this.task.then((data=>{
  data.ref.getDownloadURL().then(url=>{
    this.fs.collection("users").doc(this.dataProfil.uid).update({
      image:url
    })
  })
  
}))
  }
ngOnDestroy(){
  this.userSubscribe.unsubscribe()
}
}
