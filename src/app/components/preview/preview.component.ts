import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  messageDetail:any;
  Allmessage:any;

  constructor(private httpClient: HttpClient,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loadData()
  }


  
  loadData(){
    this.httpClient.get('../../../assets/data/data.json').subscribe(res=>{
      this.Allmessage = res;
      const id = this.route.snapshot.params['id']
      if(id){
        this.messageDetail = this.Allmessage.filter(a=> a.id==id)[0]
        console.log(this.messageDetail)
      }
    })
  }

  goToHome(){
    this.router.navigate(['']);
  }

}
