import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiServiceService } from '../services/api-service.service';
import { Storage } from '@ionic/storage';
import { InterceptorService } from '../services/interceptors.service';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { DataOfflineService } from '../services/data-offline.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public clientes$ = new Subject<string>();
  noHaveConnection;
  itemsData = [];
    constructor(
      private apiServiceService: ApiServiceService,
      private storage: Storage,
      private interceptorService: InterceptorService,
      private toastController: ToastController,
      private dataOfflineService: DataOfflineService
      ) {}

  ionViewDidEnter(){
    this.apiServiceService.getAllLeagues()
      .subscribe((data)=> {
        this.itemsData = data.countrys;
        this.storage.create();
        this.storage.set('leaguesAvailable', this.itemsData);
        this.dataOfflineService.createToday();
      }, error => {
        this.interceptorService.logCurrentNetworkStatus()
            .then(async (data) => {
              this.noHaveConnection = data;

              if(!this.noHaveConnection){
                this.itemsData = await this.storage.get('leaguesAvailable');

                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                this.itemsData != null ? this.presentToast() : this.dataDeprecated();
                this.dataOfflineService.compareDataTime('leaguesAvailable');
              }

            });

      });


  }
  sendName(nameLeague: string){
    this.apiServiceService.addNameLeague(nameLeague);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Ultimos datos obtenidos antes de estar offline',
      duration: 2000,
      color: 'warning',
    });
    toast.present();
  }

  async dataDeprecated() {
    const toast = await this.toastController.create({
      message: 'Información no actualizada, removida del storage!',
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }
}
