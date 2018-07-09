import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { environment } from '../environments/environment';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myForm:FormGroup;
  webLink="";
  iosPLink="";
  iosFLink="";
  androidFLink="";
  androidPLink="";
  generatedLink="";
  slug=" ";
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
   
  this.myForm = new FormGroup({
            newWebField: new FormControl(null, Validators.required),
            newAndroidPField: new FormControl(null, Validators.required),
            newIOSPField: new FormControl(null, Validators.required),
            newAndroidFField: new FormControl(null, Validators.required),
            newIOSFField: new FormControl(null, Validators.required),
            slugField: new FormControl(null, Validators.required),
        });
  }

  onSubmit=function(user){



if(this.slug == "" || this.slug == " "){
console.log("Ssg");
  var data = JSON.stringify({web: this.webLink, androidFallback:this.androidFLink,androidPrimary:this.androidPLink,
    iosFallback:this.iosFLink,iosPrimary:this.iosPLink
    })

}else{
  var data = JSON.stringify({slug:this.slug,web: this.webLink, androidFallback:this.androidFLink,androidPrimary:this.androidPLink,
    iosFallback:this.iosFLink,iosPrimary:this.iosPLink
    })
  }
    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

   this.http.post("http://localhost:3000/api"+ '/shortlinks', data, config)
            .subscribe(res => {
              console.log(res);
              this.generatedLink="Your link:http://localhost:4200/"+ res["data"]["slug"]; 
  })

}
}
