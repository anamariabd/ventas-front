import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private tokenService: TokenService,
    private _router: Router) { }

    perfil = localStorage.getItem('perfil')
    url = window.location.pathname
    auth = this.tokenService.getToken();
    
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => { 
      console.log(params)
    })      
    this.url = window.location.pathname;
    
    this.perfil = localStorage.getItem('perfil')
    console.log(this.perfil)
  }

  logOut() {
    this.tokenService.logOut();
    console.log("saliendo..")
    this._router.navigate(['/login']);
    localStorage.clear();
  }
}
