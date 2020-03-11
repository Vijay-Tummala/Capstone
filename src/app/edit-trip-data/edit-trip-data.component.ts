import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MapserviceService} from '../mapservice.service';
import { RiskService } from '../risk.service';
import { TripRiskService } from '../triprisk.service';
import { TaskserviceService } from '../taskservice.service';
import { Observable } from 'rxjs/Observable';
import { Risk } from '../risk';
import { Trip } from '../Trip';
import { Task } from '../task';
import {MapComponent} from '../map/map.component';
import {ActivatedRoute} from '@angular/router';
import { isUndefined } from 'util';
import { AddUserComponent } from '../add-user/add-user.component';
import {DatepickerOptions} from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import {IMyDpOptions} from 'mydatepicker';




@Component({
  selector: 'app-edit-trip-data',
  templateUrl: './edit-trip-data.component.html',
  styleUrls: ['./edit-trip-data.component.css'],
  providers: [MapserviceService, RiskService, TripRiskService, TaskserviceService]
})
export class EditTripDataComponent implements OnChanges {

  @Input() TripID;
  @Input() StopID;
  @Input() isEditTrip;
  @Input() tripJson; 

  selSDate : string; 
  selEDate : string; 

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
  };
  
  update_trip_form: FormGroup;
  update_stop_form: FormGroup;
  update_ec_form: FormGroup;
  add_stop_form: FormGroup;
  tripID;
  editTrip;
  editTripUser;
  mapObject:MapComponent;
  userObject:AddUserComponent;
  tripData;
  stopData;
  ecData;
  riskData;
  tripRiskData;
  partData;
  taskData;
  viewStopID="nil";
  oneTaskData;
  oneECData;
  oneRiskData;
  oneStopData;
  oneTripData;
  stripedDate;
  currentTask: number = 0;
  currentRisk: number = 0;
  currentTripRisk: number = 0;
  items: Array<any>;
  teststop;
  trip;
  stop;
  start_date_test;
  end_date_test;
  uploadedImages:Array<Object> = [{}];
  imgFiles: Array<any> = [];
  

  constructor(
    private mapServicing: MapserviceService, 
    private riskService: RiskService, 
    private tripriskService: TripRiskService, 
    private taskService : TaskserviceService,
    private activeRoute:ActivatedRoute, 
    private map:MapComponent,
    private user:AddUserComponent,
    private formBuilder: FormBuilder
  ) {
        // build angular form
        this.update_trip_form = this.formBuilder.group({
          trip_name: ["", Validators.required],
          description: ["", Validators.required],
          start_date: [null, Validators.required],
          end_date: [null, Validators.required]
        });    
        this.update_stop_form = this.formBuilder.group({
          StopName: ["", Validators.required],
          Description: ["", Validators.required],
          Lat: ["", Validators.required],
          Lng: ["", Validators.required],
          Location: ["", Validators.required],
          StopID: ["", Validators.required]
        });        
        
        // build angular form
        this.update_ec_form = this.formBuilder.group({
            FieldActivityName: ["", Validators.required],
            FieldLeaderCell: ["", Validators.required],
            FieldDates: ["", Validators.required],
            ToGroup: ["", Validators.required],
            FromGroup: ["", Validators.required],
            LocalEmergency: ["", Validators.required],
            Code: ["", Validators.required],
            CallIn: ["", Validators.required],
            OnCall: ["", Validators.required],
            Insurance: ["", Validators.required],
            ISOSNumber: ["", Validators.required],
            FirstAid: ["", Validators.required],
            FirstAidkits: ["", Validators.required],
            MedicalCentre: ["", Validators.required],
            NearestHospital: ["", Validators.required],
            DefinitiveCare: ["", Validators.required],
            ClosestPharmacy: ["", Validators.required],
            InitialResponse: ["", Validators.required],
            EscalateCrisis: ["", Validators.required],
            CrisisCentre: ["", Validators.required],
            Transport: ["", Validators.required],
            LogisticalSupport: ["", Validators.required],
            Other: ["", Validators.required],
            Accommodation: ["", Validators.required],
            ParticipantContact: ["", Validators.required]
        });	        
      this.mapObject=map;
      this.userObject=user;
      console.log("user object loaded: " + this.userObject.isEditTripUser);
      this.tripID=this.mapObject.viewTripID;
      this.editTrip=this.mapObject.isEditTrip;
      this.editTripUser=this.userObject.isEditTripUser;
      //this.userObject.isEditTripUser=true;
      console.log("user object loaded again: " + this.userObject.isEditTripUser);
      console.log("testing trip id value in view data: " + this.tripID);
      console.log("testing trip id value in view data: " + this.mapObject.viewTripID);
   }

   stripDate(date){
      this.stripedDate=date.substring(0, 10);
      console.log("strioed date: " + this.stripedDate);
   }

   triggerEditTripRisk(tripID, stopID) {
     this.mapObject.isTripRiskEdit=true;
     this.mapObject.riskTripID=tripID;
     this.mapObject.riskStopID=stopID;
   }

   triggerEditStop(tripID){
     console.log("triggered edit stops" + tripID);
    this.mapServicing.getStops(tripID)
    .subscribe(
    stop => {
      this.stopData=stop;
      if (Array.isArray(stop) && stop.length) {
        this.mapObject.viewStopID=stop[0].StopID;
        console.log("mapobject viewstopid: " + this.mapObject.viewStopID); 
      }
      console.log(stop);
      console.log(this.stopData);
      //this.stopData=stop[0].StopID;
    });    
   }

   triggerEditImageUpload(tripID){
       console.log("test get images");
       this.mapServicing.getfiles(tripID)
       .subscribe(
            uploadedImages => {       
                for(var img = 0; img<uploadedImages.length; img++){   
                console.log("NodeJS returned: " + uploadedImages[img]);
                this.imgFiles.push('/assets/images/uploads/'+tripID+'/'+uploadedImages[img]);
                }
                this.uploadedImages = this.imgFiles;
        });
    console.log("triggered edit Images Upload" + tripID);
     
  }

   selectedFile: File[];
   url = '';
   onFileChanged(event) {    
    this.selectedFile = event.target.files;
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();  
        reader.readAsDataURL(event.target.files[0]); // read file as data url  
        reader.onload = (event) => { // called once readAsDataURL is completed          
        }
    }
  }

  
  onUpload(tripID) {
    // this.http is the injected HttpClient
        var uploadData = new FormData();
        console.log(this.selectedFile.length);
        for(var i = 0; i<this.selectedFile.length; i++){
            uploadData.append('myFile', this.selectedFile[i], this.selectedFile[i].name);
        }        
        console.log(uploadData);
        console.log(tripID);
        this.mapServicing.edituploadImages(uploadData, tripID);
  }
  
  
   editViewStopData(stopID) {
    console.log("inside edit view stop data");
    console.log("inside edit view stop data:  " + stopID);

    this.viewStopID=stopID;
    this.mapServicing.getStopByStopID(this.viewStopID)
     .subscribe(stop => {
        this.oneStopData=stop[0];
      console.log(this.oneStopData);
      });
   }

   editStopFields(stopID){ 

    this.viewStopID=stopID;
    this.mapServicing.getStopByStopID(this.viewStopID)
     .subscribe(stop => {
        this.stop=stop;
        this.oneStopData=stop[0];
      console.log(this.oneStopData);

        //dealing with default untouched values
        if (!this.update_stop_form.value.StopName) {
            this.update_stop_form.patchValue({StopName: this.oneStopData.StopName});
        } 
        if (!this.update_stop_form.value.Lat) {
            this.update_stop_form.patchValue({Lat: this.oneStopData.Lat});
        } 
        if (!this.update_stop_form.value.Lng) {
            this.update_stop_form.patchValue({Lng: this.oneStopData.Lng});
        } 
        if (!this.update_stop_form.value.Description) {
            this.update_stop_form.patchValue({Description: this.oneStopData.Description});
        }     
        if (!this.update_stop_form.value.Location) {
            this.update_stop_form.patchValue({Location: this.oneStopData.Location});
        }   
        if (!this.update_stop_form.value.StopID) {
            this.update_stop_form.patchValue({StopID: this.oneStopData.StopID});
        }   


        console.log(this.update_stop_form.value);
        this.mapServicing.updateStopByStopID(this.update_stop_form.value,this.viewStopID).subscribe(
            res=>{
                    // go back to list
                    console.log("res is: ",res);
                    console.log("trip id is: " + this.stop[0].TripID);
                    this.triggerEditStop(this.stop[0].TripID);
                },
                error => console.log("error while updating stop: " + error)     
            );           
     });   
   }

   changeMapSetting(){
    this.mapObject.isReadonly = false;
    this.mapObject.clearFields();
    this.mapObject.isCreateSuccessful = false;
    this.mapObject.isUpdateSuccessful = false;
    this.mapObject.isEdit = false;       
   }

   setEditTripUser(){
    this.userObject.isEditTripUser=true;
    this.userObject.editTripID=this.mapObject.viewTripID;
    console.log("set edit trip user trip id: " + this.userObject.editTripID);
    console.log("set edit trip user edit flag: " + this.userObject.isEditTripUser);
   }

   editDeleteStopData(tripID, stopID){
    console.log("stop in remove",stopID);
    this.mapServicing.deleteStopByStopID(stopID).subscribe(
      res=>{
        console.log("res is: " + res);
        this.triggerEditStop(tripID);
      } 
    );
  }

  editDeletePartData(tripID, userID){
    console.log("participant in remove",tripID, userID);
    this.mapServicing.deleteParticipant(tripID, userID)
    .subscribe(
      res=>{
        console.log("res is: " + res);
        this.readParticipants(tripID);
        },
      error => console.log(error)
    );
  }  

   unsetEditFlag(){
       this.mapObject.isStopRiskEdit=false;
       this.mapObject.isStopTaskEdit=false;
       this.mapObject.isTripRiskEdit=false;
       this.mapObject.isEditTrip=false;
       this.userObject.isEditTripUser=false;
   }

   editStopRisks(tripID, stopID){
       this.mapObject.isStopRiskEdit=true;
       this.mapObject.riskTripID=tripID;
       this.mapObject.riskStopID=stopID;
   }

   editStopTasks(tripID, stopID){
    this.mapObject.isStopTaskEdit=true;
    this.mapObject.riskTripID=tripID;
    this.mapObject.riskStopID=stopID;
}

   updateTrip(){

    this.mapServicing.getTripById(this.mapObject.viewTripID)
    .subscribe(trip => {     
        this.trip=trip;         
        this.oneTripData=trip[0];
        console.log(this.trip[0]);
                   

        //dealing with default untouched values
        if (!this.update_trip_form.value.trip_name) {
            this.update_trip_form.patchValue({trip_name: this.trip[0].TripName});
        } 
        if (!this.update_trip_form.value.start_date) {
            this.update_trip_form.patchValue({start_date: this.trip[0].StartDate});
        } else {
            this.start_date_test = this.update_trip_form.value.start_date.formatted;
            this.update_trip_form.patchValue({start_date: this.start_date_test});
        }
        if (!this.update_trip_form.value.end_date) { 
            this.update_trip_form.patchValue({end_date: this.trip[0].EndDate});
        } else {
            this.end_date_test = this.update_trip_form.value.end_date.formatted; 
            this.update_trip_form.patchValue({end_date: this.end_date_test});             
        }
        if (!this.update_trip_form.value.description) {
            this.update_trip_form.patchValue({description: this.trip[0].Description});
        }  
        console.log("check start date: " + this.update_trip_form.value.start_date);
        console.log("check end date: " + this.update_trip_form.value.end_date); 
        // send data to server
        this.mapServicing.updateTrip(this.update_trip_form.value,this.mapObject.viewTripID)
            .subscribe( 
                trip => {
                    // go back to list of risks
                    this.readTrips();
                },
                error => console.log(error)
            );

    });     
   }

   editUpdateStop(){
    this.mapServicing.getTripById(this.mapObject.viewTripID)
    .subscribe(stop => {     
        this.stop=stop;         
        this.oneStopData=stop[0];
        console.log(this.stop[0]);

        //dealing with default untouched values
        if (!this.update_stop_form.value.stop_name) {
            this.update_stop_form.patchValue({stop_name: this.stop[0].StopName});
        } 
        if (!this.update_stop_form.value.lat) {
            this.update_stop_form.patchValue({lat: this.stop[0].Lat});
        } 
        if (!this.update_stop_form.value.lng) {
            this.update_stop_form.patchValue({lng: this.stop[0].Lng});
        } 
        if (!this.update_stop_form.value.stop_desc) {
            this.update_stop_form.patchValue({stop_desc: this.stop[0].Description});
        } 
        if (!this.update_stop_form.value.stop_loc) {
          this.update_stop_form.patchValue({stop_loc: this.stop[0].Location});
        } 
        // send data to server
        this.mapServicing.updateStopWithStopID(this.update_stop_form.value,this.mapObject.viewTripID)
            .subscribe( 
                onestop => {
                    // go back to list of risks
                    this.editViewStopData(onestop.stop_id);
                    console.log("edit update stop trigger view stop: " + onestop.stop_id);
                },
                error => console.log(error)
            );

    });         
   }  

   readParticipants(tripID){
      //fetching trip participants info
      console.log("fetching trip participants info");
      this.mapServicing.getUsersByTrip(tripID)
      .subscribe(
      part => {
        this.partData=part;
        console.log(part);
        console.log(this.partData);
        //this.stopData=stop[0].StopID;
      });        
   }

   readEC(tripID){
             //fetching EC details
      this.mapServicing.getECByTrip(tripID)
      .subscribe(
      ec => {
        this.ecData=ec;
        this.oneECData=ec[0];
        console.log(ec);
        console.log(this.ecData);
        console.log(this.oneECData);
        //this.stopData=stop[0].StopID;
      });    
   }

   //updateEC
// user clicks 'update' button
updateEC(){
  console.log("update ec"); 
//call read one ec to update default values
      this.mapServicing.getECByTrip(this.mapObject.viewTripID)
      .subscribe(
      ec => {
        this.ecData=ec;
        this.oneECData=ec[0];
        console.log(ec);
        console.log(this.ecData);
        console.log(this.oneECData);		

            //dealing with default untouched values
            if (!this.update_ec_form.value.FieldActivityName) {
                this.update_ec_form.patchValue({FieldActivityName: this.ecData[0].FieldActivityName});
            } 
            if (!this.update_ec_form.value.FieldLeaderCell) {
                this.update_ec_form.patchValue({FieldLeaderCell: this.ecData[0].FieldLeaderCell});
            } 
            if (!this.update_ec_form.value.FieldDates) {
                this.update_ec_form.patchValue({FieldDates: this.ecData[0].FieldDates});
            } 
            if (!this.update_ec_form.value.ToGroup) {
                this.update_ec_form.patchValue({ToGroup: this.ecData[0].ToGroup});
            } 
            if (!this.update_ec_form.value.FromGroup) {
                this.update_ec_form.patchValue({FromGroup: this.ecData[0].ToGroup});
            } 
            if (!this.update_ec_form.value.LocalEmergency) {
                this.update_ec_form.patchValue({LocalEmergency: this.ecData[0].LocalEmergency});
            } 
            if (!this.update_ec_form.value.Code) {
                this.update_ec_form.patchValue({Code: this.ecData[0].Code});
            } 
            if (!this.update_ec_form.value.CallIn) {
                this.update_ec_form.patchValue({CallIn: this.ecData[0].CallIn});
            } 
            if (!this.update_ec_form.value.OnCall) {
                this.update_ec_form.patchValue({OnCall: this.ecData[0].OnCall});
            } 
            if (!this.update_ec_form.value.Insurance) {
                this.update_ec_form.patchValue({Insurance: this.ecData[0].Insurance});
            } 
            if (!this.update_ec_form.value.ISOSNumber) {
                this.update_ec_form.patchValue({ISOSNumber: this.ecData[0].ISOSNumber});
            } 
            if (!this.update_ec_form.value.FirstAid) {
                this.update_ec_form.patchValue({FirstAid: this.ecData[0].FirstAid});
            } 
            if (!this.update_ec_form.value.FirstAidkits) {
                this.update_ec_form.patchValue({FirstAidkits: this.ecData[0].FirstAidkits});
            } 
            if (!this.update_ec_form.value.MedicalCentre) {
                this.update_ec_form.patchValue({MedicalCentre: this.ecData[0].MedicalCentre});
            } 
			
            if (!this.update_ec_form.value.NearestHospital) {
                this.update_ec_form.patchValue({NearestHospital: this.ecData[0].NearestHospital});
            } 
            if (!this.update_ec_form.value.DefinitiveCare) {
                this.update_ec_form.patchValue({DefinitiveCare: this.ecData[0].DefinitiveCare});
            } 
            if (!this.update_ec_form.value.ClosestPharmacy) {
                this.update_ec_form.patchValue({ClosestPharmacy: this.ecData[0].ClosestPharmacy});
            } 
            if (!this.update_ec_form.value.InitialResponse) {
                this.update_ec_form.patchValue({InitialResponse: this.ecData[0].InitialResponse});
            } 
            if (!this.update_ec_form.value.EscalateCrisis) {
                this.update_ec_form.patchValue({EscalateCrisis: this.ecData[0].EscalateCrisis});
            } 
            if (!this.update_ec_form.value.CrisisCentre) {
                this.update_ec_form.patchValue({CrisisCentre: this.ecData[0].CrisisCentre});
            } 
            if (!this.update_ec_form.value.Transport) {
                this.update_ec_form.patchValue({Transport: this.ecData[0].Transport});
            } 
            if (!this.update_ec_form.value.LogisticalSupport) {
                this.update_ec_form.patchValue({LogisticalSupport: this.ecData[0].LogisticalSupport});
            } 
            if (!this.update_ec_form.value.Other) {
                this.update_ec_form.patchValue({Other: this.ecData[0].Other});
            } 
            if (!this.update_ec_form.value.Accommodation) {
                this.update_ec_form.patchValue({Accommodation: this.ecData[0].Accommodation});
            } 
            if (!this.update_ec_form.value.ParticipantContact) {
                this.update_ec_form.patchValue({ParticipantContact: this.ecData[0].ParticipantContact});
            } 			
    
            // send data to server
            this.mapServicing.updateEC(this.update_ec_form.value,this.mapObject.viewTripID)
                .subscribe(
                    triprisk => {
                        // go back to list of triprisks
                        this.readEC(this.mapObject.viewTripID);
                    },
                    error => console.log(error)
                );

        });

}
   


   readTrips(){
    //pass trip id 
    this.mapServicing.getTripById(this.mapObject.viewTripID)
    .subscribe(trip => {
      this.tripData=trip[0];
      if (this.tripData) {
        this.selSDate=this.tripData.StartDate.substring(0,10); 
        this.selEDate=this.tripData.EndDate.substring(0,10); 
        console.log(this.selSDate); 
        console.log(this.selEDate);         
      }
      console.log(trip);
      console.log(this.tripData);
      
      this.readParticipants(this.mapObject.viewTripID);
      this.readEC(this.mapObject.viewTripID);
    }); 
   }
   ngOnChanges(){

    this.readTrips();
    this.triggerEditStop(this.mapObject.viewTripID); 
}
}
