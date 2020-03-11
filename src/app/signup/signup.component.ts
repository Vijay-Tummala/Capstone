import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';

import { MemberService } from '../member.service';
import { Observable } from 'rxjs/Observable';
import { Member } from '../member';
import {ActivatedRoute} from '@angular/router';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MemberService]
})
export class SignupComponent implements OnInit {

  public form: FormGroup;
  public userData;
  public org;
  public orglist;
  public organisation;
  myControl = new FormControl();
  options: string[] = [];
    filteredOptions: Observable<string[]>;
  
  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private memberService: MemberService) { 
      this.form = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      password1: ["", Validators.required],
      fname: ["", Validators.required],
      lname: ["", Validators.required],
      org: ["", Validators.required],
      role: ["", Validators.required]
    })
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
    map(value => this._filter(value))
    );
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    //console.log(value);
    this.getorgs(value);
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  signup() {
    const inputValue = this.form.value;
    console.log(inputValue.email, inputValue.password,inputValue.fname, inputValue.lname, this.organisation, inputValue.role);
    //call to auth service
    this.userData = {
      fname: inputValue.fname,
      lname: inputValue.lname,
      email: inputValue.email,
      org: this.organisation,
      role: inputValue.role
    };
    
    this.authService.signup(inputValue.email, inputValue.password)
      .subscribe(
        success => {
          this.userData = {
            fname: inputValue.fname,
            lname: inputValue.lname,
            email: inputValue.email,
            org: this.organisation,
            role: inputValue.role
          };
          this.memberService.createMember(this.userData) .subscribe(
            member => {
               // show an alert to tell the user if member was created or not
               console.log(member);
               this.router.navigate(['map']);
             //  this.getOrganizations();
            },
            error => console.log(error)
        );

        },
        error => alert(error)
      )
  }

  displayname(organization){
    console.log("the org is ",organization);
    this.organisation = organization;

  }


  
  getorgs(value){
    this.memberService.getorg(value).subscribe(
      res =>{
    
      this.org= res.results;
      //console.log(this.org)
      this.options = this.org;
      /* for (var each of this.options){
        this.name = each["school.name"]
          console.log(name)
         //this.options = each["school.name"];
      }   */
      for(var i=0; i< this.org.length;i++){
        this.options[i] = this.org[i]["school.name"];
      }
      
      //console.log(this.options)
    });

    
  }
   
   
  

}
