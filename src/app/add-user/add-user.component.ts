import { MapserviceService } from './../mapservice.service';
import { Component, OnInit, OnDestroy,Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import 'rxjs/add/operator/mergeMap';
import { AuthService } from '../shared/auth/auth.service';
import {Subject} from 'rxjs/Subject';
import { EditTripDataComponent } from '../edit-trip-data/edit-trip-data.component';


@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [MapserviceService]
})
export class AddUserComponent implements OnInit,OnDestroy {

  _tripFromMap:string;
  editTripID;
  isEditTripUser;

  @Input()
  set TripFromMap(message : string ){
      this._tripFromMap = message; 
  }
  get TripFromMap(){
      return this._tripFromMap;
  }
  @Input() viewTripID;

  @Output() readParticipants = new EventEmitter();

  users:any[];
  filteredUsers:any[];
  subscription: Subscription;
  constructor(private appService: MapserviceService) {
    this.subscription = appService.getAllUsers().subscribe(res=>{
      this.filteredUsers = this.users=res;
      console.log(this.users);
      console.log("checking value of edit user in user: " + this.isEditTripUser);
    });
   }

   filter(query:String){
     console.log("query",query);
    this.filteredUsers = (query)?
    this.users.filter(p=>p.FirstName.toLowerCase().includes(query.toLowerCase())):this.users;
  }


  submit(DataFromForm: NgForm){
    console.log("DataFromForm ",DataFromForm.value);
  }

  showSuccess(DataFromForm: NgForm)
  {
   var myList1 =  Object.keys(DataFromForm.value); 
   var myList2 = [];
   

    for(var i=0;i<myList1.length;i++){
        if(DataFromForm.value[myList1[i]]===true){
          var myDataObj = {UserID:"",TripID:""};
          myDataObj["UserID"]=this.filteredUsers[i].UserID;
          myDataObj["TripID"]=this.TripFromMap;
          myList2.push(myDataObj);
        }
    }

    console.log("myList1 ",myList1);
    console.log("myList2 ",myList2);
    console.log("DataFromForm ",DataFromForm.value);
    console.log(this.filteredUsers);

    console.log("going to add user",myList2);
    this.appService.addUsers(myList2,this.TripFromMap).subscribe(
      res =>{
        console.log("res of add user", res);
      });
      this.appService.getAllUsers().subscribe(res=>{
        this.filteredUsers = this.users=res;
        console.log(this.users);
      });
  
  }
  addPartEditTrip(DataFromForm: NgForm)
  {
   var myUserList1 = [];
   myUserList1 = Object.keys(DataFromForm.value); 
   var myUserList2 = [];
    

    for(var i=0;i<myUserList1.length;i++){
        if(DataFromForm.value[myUserList1[i]]===true){
          var myDataObj = {UserID:"",TripID:""};
          myDataObj["UserID"]=this.filteredUsers[i].UserID;
          myDataObj["TripID"]=this.viewTripID;
          myUserList2.push(myDataObj);
        }
    }

    console.log("view trip id trip from map: " + this.viewTripID);
    console.log("trip from map: " + this.viewTripID);
    console.log("myList1 ",myUserList1);
    console.log("myList2 ",myUserList2);
    console.log("DataFromForm ",DataFromForm.value);
    console.log(this.filteredUsers);

    console.log("going to add user",myUserList2);
    this.appService.addUsers(myUserList2,this.viewTripID).subscribe(
      res =>{
        console.log("res of add user", res);
        this.readParticipants.emit(this.viewTripID);
      }); 

  
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  ngOnInit() {
  }

}
