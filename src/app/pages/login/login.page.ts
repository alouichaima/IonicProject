import { Component, OnInit } from '@angular/core';

import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';

interface UserData {
  isAdmin: boolean;
  email: string;
  fullname:string;
  
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public isAdmin= false
loginForm!: FormGroup 

 

  constructor( 
    private loadingController: LoadingController,
     private authService: AuthenticationService,
      private router: Router,
       public formBuilder: FormBuilder,
       private toastController:ToastController,
       private firestore: Firestore) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [
        // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
        Validators.required,
      ]
      ],
    });
  }

  async login() {
    
    const loading = await this.loadingController.create();
    await loading.present();
    

    if (this.loginForm.valid) {
      try {
        const userCredential = await this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password);
        if (userCredential && userCredential.user) {
          // Fetch the user data from Firestore using uid from userCredential.user
          const userDocRef = doc(this.firestore, `users/${userCredential.user.uid}`);
          const userDoc = await getDoc(userDocRef);
          const userData = userDoc.data() as UserData; // Cast to UserData
          
          console.log('User Data:', userData); // Log user data
          
          loading.dismiss();
          
          // Check if the user is an admin
          if (userData?.['isAdmin']) {
              console.log('User is Admin:', userData['isAdmin']);
              this.router.navigate(['/dashboard-admin']);
          } else {
              console.log('User is not Admin');
              this.router.navigate(['/home']);
          }
          
          
        }
      } catch (err: any) {  // Cast err to `any` to avoid TypeScript error
        this.presentToast(err.message);
        console.log(err);
        loading.dismiss();
      }
    } else {
      console.log('Please provide all the required values!');
    }
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
    });
    await toast.present();
  }
}