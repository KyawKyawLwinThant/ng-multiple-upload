import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {combineLatest, from, Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'multi-upload';

  uploads: any[] =[];
  allPercentage:Observable<any>=of();
  files:Observable<any>=of();

  ngOnInit(): void {
    this.files = this.fas.collection('files').valueChanges();
  }

  constructor(private fas:AngularFirestore,private storage:AngularFireStorage) {
  }

  importImages(event:any){
    this.uploads = [];
    const filelist = event.target.files;
    const allPercentage: Observable<number>[] = [];

    for(const file of filelist){
      const path=`files/${file.name}`;
      const ref =this.storage.ref(path);
      const task=this.storage.upload(path,file);
      const _percentage$= task.percentageChanges();

      allPercentage.push(_percentage$ as Observable<number>);


      // create composed object with different information. ADAPT THIS ACCORDING YOUR NEED
      const uploadTrack = {
        fileName: file.name,
        percentage: _percentage$
      }

      this.uploads.push(uploadTrack);
      const _t=task.then((f)=>{
        return f.ref.getDownloadURL().then((url)=>{
          return this.fas.collection('files').add({
            name:f.metadata.name,
            url:url
          });

        })
      });
      this.allPercentage = combineLatest(allPercentage)
        .pipe(
          map((percentages) =>{
            let result= 0;
            for(const percentage of percentages){
              result = result + percentage;
            }
            return  result / percentages.length;
          }),
          tap(console.log)
        )
    }

  }

}
