import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { LoginAndRegisterService } from '../services/login.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  validationMessages = {
    email: [
      {type:'required', message:'El email es requerido'},
      {type:'pattern', message:'No es un email valido'},
    ],
    password: [
      {type:'required', message:'la contraseña es requerida'},
      {type:'minlength', message:'Minimo 5 caracteres'},
    ]
  };
  toastLoad: any;
  toastNoConecction: any;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storage: Storage,
    private loginAndRegisterService: LoginAndRegisterService,
    private toastController: ToastController
  ) {
    this.loginForm = this.fb.group({
      email:['', [ Validators.required,
                   Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [ Validators.required,
                       Validators.minLength(5)]]
    });
   }


  async loginUser(){
    await this.sendInfo();
    const body = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.loginAndRegisterService.loginUser(body)
      .subscribe((data)=> {
        if(data.body.logged){
          this.hideToast();
          this.storage.create();
          this.storage.set('isUserLogin', true);
          this.router.navigate(['/menu/home']);
        }
      },async error => {
        if(error.error.error){
          await this.hideToast();
          if(error.error.error=== 'User not found'){
            this.errorMessage('Usuario no se encuentra registrado en DB');
            this.loginForm.reset();
            this.router.navigate(['/register']);
          }
          if(error.error.error=== 'Invalid password'){
            this.errorMessage('Contraseña Incorecta');
          }
        }else{
          this.noConnectionToast();
          setTimeout(async () => {
            this.toastNoConecction =  await this.toastController.dismiss();
            await this.hideToast();
            this.authService.loginUser(body)
            .then( () => {
              this.storage.create();
              this.storage.set('isUserLogin', true);
              this.loginForm.reset();
              this.router.navigate(['/menu/home']);
            })
            .catch((er) => {
              this.errorMessage(er);
              this.loginForm.reset();
            });
          }, 2000);

        }
      });
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }
  async noConnectionToast() {
    this.toastNoConecction = await this.toastController.create({
      message: 'No hay conexión, se comprobara del storage',
      duration: 2000,
      color: 'danger',
    });
    this.toastNoConecction.present();
  }
  async errorMessage(error) {
    const toast = await this.toastController.create({
      message: error,
      duration: 2000,
      color: 'danger',
    });
     toast.present();
  }
  async sendInfo() {
    this.toastLoad = await this.toastController.create({
      message: 'Enviando información',
      position: 'top',
      color: 'tertiary',
    });
     this.toastLoad.present();
  }
  async hideToast(){
    this.toastLoad =   await this.toastController.dismiss();
  }

}
