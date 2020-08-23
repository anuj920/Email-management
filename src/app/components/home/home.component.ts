import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SortDefault } from './home.entity'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  data:any;
  filtereddata:any;
  sortingCase:SortDefault;
  from_date:Date;
  to_date:Date;
  min_date: Date;
  max_date: Date;

  constructor(private httpClient: HttpClient,private route: Router) { 
    this.sortingCase = new SortDefault()
  }

  ngOnInit() {
    this.loadData();

  }


  loadData(){
    this.httpClient.get('../../../assets/data/data.json').subscribe(res=>{
      this.data = res;
      this.filtereddata = res;
      this.sortByDate()
    })
  }

  sortByDate(){
    if(this.sortingCase.create && this.sortingCase.create_ASC){
        this.sortingCase.create_ASC = false
        this.data.sort(function(a,b){
          return (new Date(b.create).getTime() - new Date(a.create).getTime()) * -1
        })
      }
    else{
      this.sortingCase = new SortDefault()
      this.sortingCase["create"] = true
      this.sortingCase["create_ASC"] = true
      this.data.sort(function(a,b){
        return new Date(b.create).getTime() - new Date(a.create).getTime()
      })
      if(!this.from_date && !this.to_date){
        this.from_date = new Date(this.data[this.data.length-1].create)
        this.to_date = new Date(this.data[0].create)
        this.min_date = this.from_date;
        this.max_date = this.to_date;
      }
    }
  }

  sortByValue(value){
    const value_asc = value+"_ASC";
    if(this.sortingCase[value] && this.sortingCase[value_asc]){
      this.sortingCase[value_asc] = false
      this.data.sort((b,a)=>(a[value].toUpperCase() > b[value].toUpperCase()) ? 1 : ((b[value].toUpperCase() > a[value].toUpperCase()) ? -1 : 0))
    }
    else{
      this.sortingCase = new SortDefault()
      this.sortingCase[value] = true
      this.sortingCase[value_asc] = true
      this.data.sort((a,b)=>(a[value].toUpperCase() > b[value].toUpperCase()) ? 1 : ((b[value].toUpperCase() > a[value].toUpperCase()) ? -1 : 0))
    }
  }

  sortByid(){
    if(this.sortingCase.id && this.sortingCase.id_ASC){
      this.sortingCase.id_ASC = false
      this.data.sort(function(a,b){
        return (parseInt(a.id) - parseInt(b.id)) * -1
      })
    }
    else{
      this.sortingCase = new SortDefault()
      this.sortingCase["id"] = true
      this.sortingCase["id_ASC"] = true
      this.data.sort(function(a,b){
        return parseInt(a.id) - parseInt(b.id)
      })
    }
  }

  filterByDate(){
    this.from_date = new Date(this.from_date)
    this.to_date = new Date(this.to_date)
    if(this.from_date>this.to_date){
      alert("Please Provide Valid Date Range");
    }
    else{
      this.data = this.filtereddata.filter(a=>(
        new Date(a.create)>= (this.from_date) && new Date(a.create) <= (this.to_date)
      ))
      this.sortingCase = new SortDefault();
      this.sortByDate()
    }
  }

  goToPreview(id){
    if(id){
      this.route.navigate(['preview',id])
    }
  }

}
