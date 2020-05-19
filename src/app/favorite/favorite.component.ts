import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MySessionService} from '../session-storage.service';

@Component({
  selector: 'app-myfav',
  template: `
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
	<ul *ngIf="newss"><p></p>
	<li *ngFor="let news of newss.favourites; index as i">
		<h3><b>News name: </b>{{ news.title }}  
		<button (click)="delFavHandler(i,newss.favourites)" class="w3-button w3-black"> Delete</button>
		<button (click)="editFavHandler(i,newss.favourites)" class="w3-button w3-black">Edit Review</button></h3>
		<p><b>Author: </b>{{ news.author}} </p>
		<p><b>Title: </b>{{ news.title}} </p>
		<p><b>Image: </b><img src="{{ news.urlToImage}}" width="50%"> </p>
		<p><b>Description: </b>{{ news.description}} </p>
		<p><textarea rows="2" cols="50">Enter your review here</textarea> </p>
	</li>
	</ul>
  `
})

    
	
	
	
	
export class FavoriteComponent implements OnInit {
newss:Object;

clickMessage = '';
  constructor(private data: DataService,  private session: MySessionService) { }
 
   
   ngOnInit() {
   
     if(this.session&&this.session.getItem("username")!=undefined)
     {	
	  console.log(this.session.getItem("success"))
	  console.log(this.session.getItem("username"))
	  console.log(this.session.getItem("password"))
	  
	 let a=this.session.getItem("username")
	 let b=this.session.getItem("password")
	  
	 
	  this.data.login_getFav(`${a}`,`${b}`,2).subscribe(data=>{
	  
	  this.newss = data;
	  console.log(this.newss);
	 })
     } 
	 else // endif
	 {
		this.clickMessage = `Sorry! Need to login first! `;
		window.alert( this.clickMessage)
	}
   }
  
	delFavHandler(i:number,news:Object,choice:number)
	{if(this.session.getItem("username")!=undefined)
	{ 
     let a=this.session.getItem("username")
	 let b=this.session.getItem("password")
	 let id =i
	 let newsfav=news
	
	 this.data.addFav(`${a}`,`${b}`, id, newsfav,3).subscribe(data=>{
     //this.newss = JSON.stringify(data);	//error mapping as object return not array
      
     this.clickMessage =` News with title: ${news[i].title} is deleted!`
	 window.alert( this.clickMessage)
	 this.ngOnInit()
	})}
    else {
     this.clickMessage = `Need to login first!  News with title: ${news[i].title} is pressed!`;
     window.alert( this.clickMessage)
	 this.ngOnInit()
	}
   }
	editFavHandler(i:number,news:Object)
	{
		this.clickMessage = `Sorry this function not implemented yet!  News with title: ${news[i].title} will be edited!`;
		window.alert( this.clickMessage)
		this.ngOnInit()
	}

}
