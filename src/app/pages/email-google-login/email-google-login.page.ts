import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-email-google-login',
  templateUrl: './email-google-login.page.html',
  styleUrls: ['./email-google-login.page.scss'],
})
export class EmailGoogleLoginPage implements OnInit {
user:any
  constructor(private authService:AuthenticationService,private router:Router) { }

  ngOnInit() {
  }

   async signInWithGoogle(){
     this.user= await this.authService.googleSignIn();
     console.log(this.user);
     if(this.user){
      this.router.navigate(['/home'])
     }
  }
}
