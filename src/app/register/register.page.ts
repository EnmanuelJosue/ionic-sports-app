import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { LoginAndRegisterService } from '../services/login.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;
  validationMessages = {
    name: [
      {type:'required', message:'El nombre es requerido'},
      {type:'pattern', message:'Minimo 3 caracteres'},
    ],
    lastname: [
      {type:'required', message:'El apellido es requerido'},
      {type:'pattern', message:'Minimo 3 caracteres'},
    ],
    email: [
      {type:'required', message:'El email es requerido'},
      {type:'pattern', message:'No es un email valido'},
    ],
    password: [
      {type:'required', message:'la contraseña es requerida'},
      {type:'minlength', message:'Minimo 5 caracteres'},
    ]
  };
  errorMessage = '';
  toastError: any;
  toastSendInfo: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loginAndRegisterService: LoginAndRegisterService,
    private toastController: ToastController
  ) {
    this.registerForm = this.fb.group({
      name:['', [ Validators.required,
        Validators.minLength(3)]],
      lastname:['', [ Validators.required,
        Validators.minLength(3)]],
      email:['', [ Validators.required,
                   Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [ Validators.required,
                       Validators.minLength(5)]]
    });
   }



  async registerUser(){
    await this.sendInfo();
    const body = {
      firstname: this.registerForm.value.name,
      lastname: this.registerForm.value.lastname,
      username: this.registerForm.value.email,
      password: this.registerForm.value.password
    };
    this.loginAndRegisterService.registerUser(body)
      .subscribe(async () => {
        this.toastSendInfo = await this.toastController.dismiss();
        this.successMessage('Usuario Registrado en DataBase');
        this.authService.registerUser(this.registerForm.value);
        this.router.navigate(['/login']);
      }, error => {
        this.authService.registerUser(this.registerForm.value)
        .then( async ()=> {
          this.toastSendInfo = await this.toastController.dismiss();
          await this.error();
          setTimeout(async () => {
            this.toastError = await this.toastController.dismiss();
          }, 1000);
          setTimeout(async () => {
              await this.successMessage('Usuario Registrado solo en Storage');
              this.router.navigate(['/login']);
            }, 2000);
          })
          .catch(async (e)=>{
            await this.successMessage(e);
            this.router.navigate(['/login']);
          });

      });
  }
  goToLogin(){
    this.registerForm.reset();
    this.router.navigate(['/login']);
  }

  async sendInfo() {
    this.toastSendInfo = await this.toastController.create({
      message: 'Enviando información',
      duration: 300,
      color: 'tertiary',
    });
    this.toastSendInfo.present();
  }
  async successMessage(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }
  async error(){
    this.toastError = await this.toastController.create({
      message: 'Sin conexion, se registrara en el storage',
      position: 'top',
      duration: 1000,
      color: 'danger',
    });
    this.toastError.present();
  }
}
