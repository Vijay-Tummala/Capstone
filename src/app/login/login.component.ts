import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public user$ = this.authService.user;
  public isLoggedIn;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
    console.log("inside login constructor");
      this.form = this.formBuilder.group({
        email: ["", Validators.required],
        password: ["", Validators.required],
      });
      //success => this.isLoggedIn = success;
      authService.isAuthenticated()
        .subscribe(
          success => this.isLoggedIn = success
        )
   }

  
  

  landingpage()
  {
    this.router.navigate(['landing'])
    console.log("Hi")
  }
  ngOnInit() {
  }

  login() {
    //this.router.navigate(['map']);
    const inputValue = this.form.value;
    console.log(inputValue.email, inputValue.password);
    //call to auth service
    this.authService.login(inputValue.email, inputValue.password)
      .subscribe(
        success => this.router.navigate(['map']),
        error => alert(error)
      )
      
  }

   logout(){
     this.authService.logout();
   }


   public value;
forgotpassword(){
  
  const inputValue = this.form.value;
  
  if(inputValue.email == ""){
    this.value = 0;
    console.log(this.value)
    alert("Please enter your email address and then click forgot password")
  } else{
    this.authService.resetPassword(inputValue.email)
    alert("An email has been sent to reset your password.")
  }
  
}
}
