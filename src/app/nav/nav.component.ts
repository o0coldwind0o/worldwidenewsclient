import { Component, OnInit } from '@angular/core';
import { MySessionService} from '../session-storage.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})


export class NavComponent implements OnInit {
appTitle = 'Newspaper';
loginPage ='Login/Register'
logoutPage=''
  constructor(private session: MySessionService) { }

  ngOnInit() {
	var  islogName = ''
    this.session.getEmitter().subscribe((islogName) => {
       this.loginPage=islogName;
	   this.logoutPage ='Logout'
	   if(this.loginPage=='Login/Register')
		   this.logoutPage =''
	 });
 }

}

	