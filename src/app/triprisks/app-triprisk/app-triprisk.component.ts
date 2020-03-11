//import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { TripRiskService } from '../../triprisk.service';
import { Observable } from 'rxjs/Observable';
import { TripRisk } from '../../triprisk';
import {MapComponent} from '../../map/map.component';


@Component({
  selector: 'app-app-triprisk',
  templateUrl: './app-triprisk.component.html',
  styleUrls: ['./app-triprisk.component.css']
})
export class AppTripRiskComponent implements OnChanges {

  @Output() show_read_triprisks_event = new EventEmitter();

  @Input() riskTripID;
  @Input() riskStopID;

    // properties for child components
    title="Trip - Risks Assessment";
    risk_id;
    riskTrip;
    riskStop;
    mapObject:MapComponent;
  
     // properties used to identify what views to show
     show_read_triprisks_html=false;
     show_create_triprisk_html=false;
     show_read_one_triprisk_html=false;
     show_update_triprisk_html=false;
     show_delete_triprisk_html=false;

     constructor(
      private map:MapComponent
  ){
      
      this.mapObject=map;
  }     
 
     // show the 'create triprisk form'
 showCreateTripRisk($event){
  
   // set title
   this.title=$event.title;
 
   // hide all html then show only one html
   this.hideAll_Html();
   this.show_create_triprisk_html=true;
 }
 
 // show triprisks list
 showReadTripRisks($event){
   // set title
   this.title=$event.title;
 
   // hide all html then show only one html
   this.hideAll_Html();
   this.show_read_triprisks_html=true;
 }
 
 // show details of a triprisk
 showReadOneTripRisk($event){
  
   // set title and risk ID
   this.title=$event.title;
   this.risk_id=$event.risk_id;
   console.log("risk_id");
   console.log("risk_id" + this.risk_id);
 
   // hide all html then show only one html
   this.hideAll_Html();
   this.show_read_one_triprisk_html=true;
 }
 
 // show the 'update triprisk form'
 showUpdateTripRisk($event){
  
   // set title and risk ID
   this.title=$event.title;
   this.risk_id=$event.risk_id;
 
   // hide all html then show only one html
   this.hideAll_Html();
   this.show_update_triprisk_html=true;
 }
 
 // show 'are you sure?' prompt to confirm deletion of a record
 showDeleteTripRisk($event){
  
     // set title and risk ID
     this.title=$event.title;
     this.risk_id=$event.risk_id;
 
     // hide all html then show only one html
     this.hideAll_Html();
     this.show_delete_triprisk_html=true;
 }
 
 // hide all html views
 hideAll_Html(){
   this.show_read_triprisks_html=false;
   this.show_read_one_triprisk_html=false;
   this.show_create_triprisk_html=false;
   this.show_update_triprisk_html=false;
   this.show_delete_triprisk_html=false;
 }

     // call the record when 'riskTripID' or 'riskStopID' were changed
 ngOnChanges(){
      this.hideAll_Html();
      this.show_read_triprisks_html=true;
  }

}
