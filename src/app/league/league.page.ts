import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiServiceService } from '../services/api-service.service';
import { Storage } from '@ionic/storage';
import { InterceptorService } from '../services/interceptors.service';

@Component({
  selector: 'app-league',
  templateUrl: './league.page.html',
  styleUrls: ['./league.page.scss'],
})
export class LeaguePage  {
  idLeague: string;
  nameLeague: string;
  seasonSelected: string;
  options;
  arrayTable = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiServiceService: ApiServiceService,
    private router: Router,
    public toastController: ToastController,
    private storage: Storage,
    private interceptorService: InterceptorService
  ) { }


  ionViewDidEnter(){
    this.getNameLeague();
    this.idLeague = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiServiceService.getSeasonsLeagueById(this.idLeague)
      .subscribe((data) => {
        this.options = data.seasons;
        this.storage.create();
        this.storage.set('dataSeasonsAndId', {
          optionsSeasons: this.options,
          idLeague : this.idLeague
        });
      }, error => {
        this.interceptorService.logCurrentNetworkStatus()
          .then(async (data) => {
            if(!data){
              // this.presentToast();
              const dataSeasonsAndId = await this.storage.get('dataSeasonsAndId');
              if(this.idLeague === dataSeasonsAndId.idLeague){
                this.options = dataSeasonsAndId.optionsSeasons;
              }else{
                this.presentToast();
              }

              // this.itemsData = await this.storage.get('leaguesAvailable');
            }

          });
      });

  }

  getNameLeague(){
    this.apiServiceService.nameLeague$.subscribe((data) => {
      this.nameLeague = data;
    });
  }
  back(){
    this.router.navigate(['/menu/home']);
  }
  changeSelect(e){
    this.seasonSelected = e.target.value;
    this.apiServiceService.getSeason(this.idLeague, this.seasonSelected)
      .subscribe((data)=> {
        if(data === null){
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          this.arrayTable.length>0 ? this.arrayTable = [] : null;
          this.presentToast();
        }else{
          this.arrayTable = data.table;
          this.storage.create();
          this.storage.set('dataLeague', this.arrayTable);
        }
      }, error => {
        this.interceptorService.logCurrentNetworkStatus()
          .then(async (data) => {
            if(!data){
              const dataLeague = await this.storage.get('dataLeague');
              let compareSeason = false;
              dataLeague.forEach(element => {
                if(element.strSeason.includes(this.seasonSelected)){
                  compareSeason = true;
                }
              });
              if(compareSeason){
                this.arrayTable = dataLeague;
              }else{
                this.arrayTable = [];
                this.presentToast();
              }
            }

          });


      });
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'No existe la información',
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }
}
