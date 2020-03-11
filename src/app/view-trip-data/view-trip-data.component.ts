import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import {MapserviceService} from '../mapservice.service';
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

@Component({
  selector: 'app-view-trip-data',
  templateUrl: './view-trip-data.component.html',
  styleUrls: ['./view-trip-data.component.css'],
  providers: [MapserviceService, RiskService, TripRiskService, TaskserviceService]
})
export class ViewTripDataComponent implements OnChanges {

  @Input() TripID;
  @Input() trip;

  tripID;
  mapObject:MapComponent;
  tripData;
  stopData=[];
  partData=[];
  ecData=[];
  riskData=[];
  tripRiskData=[];
  taskData=[];
  viewStopID="nil";
  oneTaskData=[];
  oneRiskData=[];
  oneStopData=[];
  oneECData=[];
  stripedDate;
  currentTask: number = 0;
  currentRisk: number = 0;
  currentTripRisk: number = 0;
  items: Array<any>;
  sDate;
  eDate;

  constructor(
    private mapServicing: MapserviceService, 
    private riskService: RiskService, 
    private tripriskService: TripRiskService, 
    private taskService : TaskserviceService,
    private activeRoute:ActivatedRoute, 
    private map:MapComponent
  ) {
      this.mapObject=map;
      this.tripID=this.mapObject.viewTripID;
      console.log("testing trip id value in view data: " + this.tripID);
      console.log("testing trip id value in view data: " + this.mapObject.viewTripID);
   }

   stripDate(date){
      this.stripedDate=date.substring(0, 10);
      console.log("strioed date: " + this.stripedDate);
   }

   viewStopData(stopID) {
    console.log("inside view stop data");
    console.log("inside view stop data: " + stopID);

    this.viewStopID=stopID;
    this.mapServicing.getStopByStopID(this.viewStopID)
     .subscribe(stop => {
        this.oneStopData=stop[0];
      console.log(this.oneStopData);
      });

   }

   viewTripRiskData(tripID, stopID) {
     this.currentTripRisk=0;
    console.log("inside view trip risk data");
    console.log("inside view trip risk data: " + stopID);
    console.log("inside view trip risk data: " + tripID);

    this.tripriskService.readTripRisks(tripID,stopID)
    .subscribe(triprisk => {
      this.tripRiskData=triprisk;
      console.log(this.tripRiskData);
    });

   }

   readStopRisks(stopID){ 
     this.currentRisk=0;
     console.log("inside read stop risks");
     console.log("inside read stop risks: " + stopID);
    this.viewStopID=stopID;
        //fetching risk info
        this.riskService.readRisks(this.mapObject.viewTripID,this.viewStopID)
        .subscribe(risk => {
            this.riskData=risk;
            console.log(risk);
            console.log(this.riskData);
        });
   }

   readStopTasks(stopID){ 
     this.currentTask=0;
    console.log("inside read stop tasks");
    console.log("inside read stop tasks: " + stopID);
      this.viewStopID=stopID;
        //fetching task info
        this.taskService.readTasks(this.viewStopID)
        .subscribe(task => {
              this.taskData=task;
              console.log(task);
              console.log(this.taskData);
        });
   }

   readEemCon(){
      //fetching EC details
      this.mapServicing.getECByTrip(this.mapObject.viewTripID)
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

   readViewTrip(){
    //pass trip id 
    this.mapServicing.getTripById(this.mapObject.viewTripID)
    .subscribe(trip => {
      this.tripData=trip[0];
      console.log(trip);
      console.log(this.tripData);
      if(trip[0]) {  
      this.sDate=this.tripData.StartDate.substring(0,10);
      this.eDate=this.tripData.EndDate.substring(0,10); 
      console.log("start date in view trip: " + this.sDate);
      console.log("end date in view trip: " + this.eDate);
    } 
      //fetching stop info
      this.mapServicing.getStops(this.mapObject.viewTripID)
      .subscribe(
      stop => {
        this.stopData=stop;
        if (Array.isArray(stop) && stop.length) {
          this.viewStopID=stop[0].StopID;
        }
        console.log(stop);
        console.log(this.stopData);
        //this.stopData=stop[0].StopID;
      });

      //fetching trip risk info
      this.tripriskService.readTripRisks(this.mapObject.viewTripID,this.viewStopID)
      .subscribe(triprisk => {
        this.tripRiskData=triprisk
        console.log(triprisk)
      });

      //fetching trip participants info
      this.mapServicing.getUsersByTrip(this.mapObject.viewTripID)
      .subscribe(
      part => {
        this.partData=part;
        console.log(part);
        console.log(this.partData);
        //this.stopData=stop[0].StopID;
      });     
      this.readEemCon();      
  
    });
   }

   ngOnChanges(){
    this.readViewTrip();

}
}
