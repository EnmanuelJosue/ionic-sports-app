import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import Swiper, {SwiperOptions, Pagination} from 'swiper';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  swiperConfig: SwiperOptions = {
    pagination: true,
  };
  slides = [
    {
      title: 'Bienvenidos a SportApp',
      subtitle: 'Aquí encontraras información de ligas de inglaterra',
      img: '/assets/logos/logo.png',
    },
    {
      title: 'Las mejores ligas en una sola App',
      subtitle: 'Mira la información de tu equipo favorito',
      img: '/assets/logos/logo.png',
    },
  ];
  constructor(
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
    Swiper.use([Pagination]);
  }

  finish(){
    this.storage.create();
    this.storage.set('introShowed', true);
    this.router.navigate(['/menu/home']);
  }

}
