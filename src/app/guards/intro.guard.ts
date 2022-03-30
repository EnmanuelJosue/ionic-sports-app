import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {
  constructor(
    private storage: Storage,
    private router: Router
    ){}
  async canActivate(){
    this.storage.create();
    const introShowed = await this.storage.get('introShowed');
    if(introShowed){
      return true;
    }else{
      this.router.navigate(['/intro']);
    }
  }

}
