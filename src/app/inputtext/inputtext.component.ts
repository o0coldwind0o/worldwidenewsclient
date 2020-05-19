import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MySessionService } from '../session-storage.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-inputtext',
  //(blur)="addSearch(newSearch.value); newSearch.value='' "
  template: `
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">

    <input #newSearch
      (keyup.enter)="addSearch(newSearch.value)"><br><br>
    <button (click)="addSearch(newSearch.value)" class="w3-button w3-black">Search</button>
    <ul *ngIf="newss">
    <li *ngFor="let news of newss; index as i">
      <h3><b>News name: </b>{{ news.name }} 
        <button (click)="addFavHandler(i, newss, 1)" class="w3-button w3-black">  
          Add to Favourites
        </button>
      </h3>
      <p><b>Author: </b>{{ news.author}} </p>
      <p><b>Title: </b>{{ news.title}} </p>
      <p><b>Image: </b><img src="{{ news.urlToImage}}" width="50%"> </p>
      <p><b>Description: </b>{{ news.description}} </p>
      <hr>
    </li>
    </ul>
  `
})
export class InputtextComponent {

clickMessage = '';
newss:Object;
  constructor(private data: DataService,private session: MySessionService, private router: Router) { }

 addSearch(newSearch:string){
	if(newSearch!=''){
  this.data.getNewss(`${newSearch}`).subscribe(data=>{
  
  this.newss = data;			
//  console.log(this.books)
	})
	}
  }
 
addFavHandler(i:number,news:Object,choice:number)
{if(this.session&&this.session.getItem("username")!=null)
	{ 
     let a=this.session.getItem("username")
	 let b=this.session.getItem("password")
	 let id =i
	 let newsfav=news
	 console.log('a '+a)
	 console.log('b '+b)
	 console.log(id)
	 console.log(newsfav)
	 this.data.addFav(`${a}`,`${b}`, id, newsfav,1).subscribe(data=>{
     //this.books = JSON.stringify(data);	//error mapping as object return not array
      
     this.clickMessage =` Book with title: ${news[i].title} is saved!`
	window.alert( this.clickMessage)
	this.router.navigate(['/favorite'])
	})}
else {
   this.clickMessage = `Need to login first!  book with title: ${news[i].title} is pressed!`;
   window.alert( this.clickMessage)
	}
}
}

