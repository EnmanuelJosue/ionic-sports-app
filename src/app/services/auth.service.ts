import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storage: Storage
  ) { }

  loginUser(loginData){

    return new Promise (async (resolve, reject) => {
      await this.storage.create();
      const dataStorage = await this.storage.get('user');

      loginData.password = btoa(loginData.password);
      if(dataStorage!=null){
        if(loginData.username === dataStorage.email && loginData.password ===dataStorage.password){
          resolve('Correcto');
        }else{
          reject('Datos incorrectos en Storage');
        }
      }else{
        reject('Usuario no registrado');
      }
    });
  }

  registerUser(registerData){
    this.storage.create();
    registerData.password = btoa(registerData.password);
    return this.storage.set('user', registerData);
  }
}
