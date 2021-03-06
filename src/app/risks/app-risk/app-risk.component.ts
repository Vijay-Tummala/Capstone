//import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { RiskService } from '../../risk.service';
import { Observable } from 'rxjs/Observable';
import { Risk } from '../../risk';
import {MapComponent} from '../../map/map.component';


@Component({
  selector: 'app-app-risk',
  templateUrl: './app-risk.component.html',
  styleUrls: ['./app-risk.component.css']
})
export class AppRiskComponent implements OnChanges {

  @Output() show_read_risks_event = new EventEmitter();

  @Input() riskTripID;
  @Input() riskStopID;
  @Input() startTripFlow;
 

    // properties for child components
    title="Stop - Risks Assessment";
    risk_id;
    riskTrip;
    riskStop;
    mapObject:MapComponent;
  
     // properties used to identify what views to show
     show_read_risks_html=false;
     show_create_risk_html=false;
     show_read_one_risk_html=false;
     show_update_risk_html=false;
     show_delete_risk_html=false;

     constructor(
      private map:MapComponent
  ){
      
      this.mapObject=map;
  }
 
     // show the 'create risk form'
 showCreateRisk($event){
  
   // set title
   this.title=$event.title;
 
   // hide all html then show only one html
   this.hideAll_Html();
   this.show_create_risk_html=true;
 }
 
 // show risks list
 showReadRisks($event){
   // set title
   this.title=$event.title;
 
   // hide all html then show only one html
   this.hideAll_Html();
   this.show_read_risks_html=true;
 }
 
 // show details of a risk
 showReadOneRisk($event){
  
   // set title and risk ID
   this.title=$event.title;
   this.risk_id=$event.risk_id;
   console.log("risk_id");
   console.log("risk_id" + this.risk_id);
 
   // hide all html then show only one html
   this.hideAll_Html();
   this.show_read_one_risk_html=true;
 }
 
 // show the 'update risk form'
 showUpdateRisk($event){
  
   // set title and risk ID
   this.title=$event.title;
   this.risk_id=$event.risk_id;
 
   // hide all html then show only one html
   this.hideAll_Html();
   this.show_update_risk_html=true;
 }
 
 // show 'are you sure?' prompt to confirm deletion of a record
 showDeleteRisk($event){
  
     // set title and risk ID
     this.title=$event.title;
     this.risk_id=$event.risk_id;
 
     // hide all html then show only one html
     this.hideAll_Html();
     this.show_delete_risk_html=true;
 }
 
 // hide all html views
 hideAll_Html(){
   this.show_read_risks_html=false;
   this.show_read_one_risk_html=false;
   this.show_create_risk_html=false;
   this.show_update_risk_html=false;
   this.show_delete_risk_html=false;
 }

     // call the record when 'riskTripID' or 'riskStopID' were changed
 ngOnChanges(){
      this.hideAll_Html();
      this.show_read_risks_html=true;
  }

}
