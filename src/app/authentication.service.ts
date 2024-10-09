import { Injectable } from '@angular/core';
import firebase  from 'firebase/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Platform } from '@ionic/angular';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user:any

  constructor(public ngFireAuth: AngularFireAuth,private platform:Platform,private router:Router) { 
    this.platform.ready().then(() => {
      GoogleAuth.initialize()
    })
  }



  async googleSignIn() {
   
    this.user=await GoogleAuth.signIn();
    return await this.user;
  
  }



  async registerUser(email:string,password:string){
    return await this.ngFireAuth.createUserWithEmailAndPassword(email,password)
  }
  async loginUser(email:string,password:string){
    return await this.ngFireAuth.signInWithEmailAndPassword(email,password)
  }
  async resetPassword(email:string){
    return await this.ngFireAuth.sendPasswordResetEmail(email)
  }

  async getProfile(){
    return await this.ngFireAuth.currentUser
  }
}
