import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private storage: Storage,
    private router: Router
  ){}
  async canActivate(){
    this.storage.create();
    const isLogin = await this.storage.get('isUserLogin');
    if(isLogin){
      return true;
    }else{
      this.router.navigate(['/login']);
    }
  }
}
