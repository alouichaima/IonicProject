import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private ngFireAuth: AngularFireAuth,private router:Router) { }

  async signOut() {
    try {
      await this.ngFireAuth.signOut();
      console.log("Signed out successfully");
      this.router.navigate(["/login"]);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  }

}