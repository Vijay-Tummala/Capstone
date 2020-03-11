//import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { TripRiskService } from '../../triprisk.service';
import { Observable } from 'rxjs/Observable';
import { TripRisk } from '../../triprisk';
import {MapComponent} from '../../map/map.component'

//import {MapserviceService} from '../../mapservice.service';
//import { MapComponent } from '../../map/map.component';
import {ActivatedRoute} from '@angular/router';
 
@Component({
    selector: 'app-read-triprisks',
    templateUrl: './read-triprisks.component.html',
    styleUrls: ['./read-triprisks.component.css'],
    providers: [TripRiskService]
})
 
export class ReadTripRisksComponent implements OnChanges {
 
    // store list of triprisks
    //triprisks: TripRisk[];
    /*
    * Needed to notify the 'consumer of this component', which is the 'AppComponent',
      that an 'event' happened in this component.
*/
    @Output() show_create_triprisk_event=new EventEmitter();
    @Output() show_read_one_triprisk_event=new EventEmitter();
    @Output() show_update_triprisk_event=new EventEmitter();
    @Output() show_delete_triprisk_event=new EventEmitter();

    // @Input means it will accept value from parent component (AppComponent)
    @Input() risk_id;
    @Input() riskTripID;
    @Input() riskStopID;

    triprisks = [];
    mapObject:MapComponent;
    tripID;
    stopID;
    // initialize tripriskService to retrieve list triprisks in the ngOnInit()
    //add map component and stop component along with their services to read tripid and stopid
    constructor(
        private tripriskService: TripRiskService, 
        private activeRoute:ActivatedRoute, 
        private map:MapComponent
    ){
        
        this.mapObject=map;
        this.tripID=this.mapObject.riskTripID;
        this.stopID=this.mapObject.riskStopID;

        console.log("checking input in triprisk constructor: " + this.mapObject.riskTripID);
        console.log("checking input in triprisk constructor: " + this.mapObject.riskTripID);
    }
 
    // methods that we will use later
    // when user clicks the 'create' button
    createTripRisk(){
      // tell the parent component (AppComponent)
      this.show_create_triprisk_event.emit({
          title: "Add Risk"
      });
    }
    
    // when user clicks the 'read' button
    readOneTripRisk(id){
      console.log('rp comp readOneTripRisk');
      console.log(id);
      // tell the parent component (AppComponent)
      this.show_read_one_triprisk_event.emit({
          risk_id: id,
          title: "Read One Risk"
      });
    }

    // when user clicks the 'update' button
    updateTripRisk(id){
      // tell the parent component (AppComponent)
      this.show_update_triprisk_event.emit({
          risk_id: id,
          title: "Update Risk"
      });
      console.log("update1"+id);
    }
    
    // when user clicks the 'delete' button
    deleteTripRisk(id){
      // tell the parent component (AppComponent)
      this.show_delete_triprisk_event.emit({
          risk_id: id,
          title: "Delete Risk"
      });
    }
 
    // Read triprisks from API.
    ngOnChanges(){
        //pass stopid and trip id 
        //this.tripriskService.readTripRisks()
        this.tripriskService.readTripRisks(this.mapObject.riskTripID,this.mapObject.riskStopID)
            .subscribe(triprisksInit => {
              this.triprisks=triprisksInit
              console.log(triprisksInit)
            });
    }
}