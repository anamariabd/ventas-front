import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  perfil:any = "";
  title = 'ventas';
  //user = localStorage
  url = window.location.pathname;
  
 constructor(router:Router) {
  router.events.forEach((event) => {
    if (event instanceof RoutesRecognized) {
      console.log(event)
      this.url = window.location.pathname;
      this.perfil = localStorage.getItem('perfil')
      console.log(this.perfil)
    }
  });
}
  
  ngOnInit(): void {
      
   // this.url = window.location.pathname;
    

  }
}
