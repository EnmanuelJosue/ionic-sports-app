import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {

  constructor(
    private menu: MenuController,
    private router: Router,
    private storage: Storage
  ) { }


  closeMenu(){
    this.menu.close();
  }
  logOut(){
    this.storage.remove('isUserLogin');
    this.router.navigate(['/login']);
    this.menu.close();
  }
  goToHome(){
    this.router.navigate(['/menu/home']);
    this.menu.close();
  }
  goToConfig(){
    this.router.navigate(['/menu/config-time']);
    this.menu.close();
  }
}
