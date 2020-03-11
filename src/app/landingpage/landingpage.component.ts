import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  public form: FormGroup;
  public user$ = this.authService.user;
  public isLoggedIn;
  constructor(private activeRoute:ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
    this.form = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
    authService.isAuthenticated()
    .subscribe(
      success => this.isLoggedIn = success
    )
  }

  maps()
  {
    this.router.navigate(['map'])
  }
  ngOnInit() {
  }

  logout(){
    this.authService.logout();
  }

}
