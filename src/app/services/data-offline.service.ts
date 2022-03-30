import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class DataOfflineService {
  itemsData = [];
  constructor(
    private storage: Storage,
  ) { }

  async consultTime(){
    const value = await this.storage.get('times');
    if(value===null){
      return {
        timeName: null,
        timeValue: 1,
      };
    }

    if(value.timeName==='Minutos'){
      const compare = {
        timeName: 'minutes',
        timeValue: value.timeValue,
      };
      return compare;
    }
    if(value.timeName==='Segundos'){
      const compare = {
        timeName: 'seconds',
        timeValue: value.timeValue,
      };
      return compare;
    }
    if(value.timeName==='Horas'){
      const compare = {
        timeName: 'hours',
        timeValue: value.timeValue,
      };
      return compare;
    }
  }

  createToday(){
    const today = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    this.storage.create();
    this.storage.set('dataToday', today);
  }
  async compareDataTime(dataStoreRemove){
    const today = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const exist = await this.storage.get('dataToday');
    const {timeName, timeValue} = await this.consultTime();
    let timeStringEvaluation;
    timeName ? timeStringEvaluation = timeName : timeStringEvaluation = 'minutes';

    if(exist){
      const diference = moment(today).diff(exist, timeStringEvaluation );
      if(diference>=timeValue){
        this.storage.remove(dataStoreRemove);
        this.storage.remove('dataSeasonsAndId');
        this.storage.remove('dataLeague');
      }
    }
  }

}
