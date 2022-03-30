import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-config-time',
  templateUrl: './config-time.page.html',
  styleUrls: ['./config-time.page.scss'],
})
export class ConfigTimePage {
  options = [
    {
      value: 'Minutos'
    },
    {
      value: 'Segundos'
    },
    {
      value: 'Horas'
    },
  ];
  timeValueOpts: string;
  arrayOptions = [];
  configForm: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private storage: Storage
  ) {
    this.configForm = this.fb.group({
      timeName: ['', Validators.required],
      timeValue: ['', Validators.required]
    });
   }

  async ionViewDidEnter(){
    const value = await this.storage.get('times');
    if(value){
      this.optionsTime(value.timeName);
      this.configForm.controls['timeName'].setValue(value.timeName);
      this.configForm.controls['timeValue'].setValue(value.timeValue);
    }
  }
  goToMenu(){
    this.router.navigate(['/menu/home']);
  }
  changeTime(e){
    this.optionsTime(e.target.value);
  }
  optionsTime(value){
    this.timeValueOpts = value;
    if(this.timeValueOpts === 'Segundos'){
      this.arrayOptions = [];
      for (let index = 1; index <= 60; index++) {
        this.arrayOptions.push(index);
      }
    }
    if(this.timeValueOpts === 'Minutos'){
      this.arrayOptions = [];
      for (let index = 1; index <= 60; index++) {
        this.arrayOptions.push(index);
      }
    }
    if(this.timeValueOpts === 'Horas'){
      this.arrayOptions = [];
      for (let index = 1; index <= 24; index++) {
        this.arrayOptions.push(index);
      }
    }
  }
  registerConfig(){
    this.storage.create();
    this.storage.set('times', this.configForm.value);
    this.router.navigate(['./']);
  }
}
