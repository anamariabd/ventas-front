import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  perfil = localStorage.getItem('perfil')
  title = 'ventas';
  //user = localStorage
 // url = window.location.pathname;
  
 constructor(router:Router) {
  router.events.forEach((event) => {
    if (event instanceof NavigationStart) {
      console.log(event)
      this.perfil = localStorage.getItem('perfil')
      console.log(this.perfil)
    }
    // NavigationEnd
    // NavigationCancel
    // NavigationError
    // RoutesRecognized
  });
}
  
  ngOnInit(): void {
      
   // this.url = window.location.pathname;
    

  }
}
