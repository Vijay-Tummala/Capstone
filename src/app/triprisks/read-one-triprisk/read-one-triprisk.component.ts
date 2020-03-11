import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { TripRiskService } from '../../triprisk.service';
import { Observable } from 'rxjs/Observable';
import { TripRisk } from '../../triprisk';
 
@Component({
    selector: 'app-read-one-triprisk',
    templateUrl: './read-one-triprisk.component.html',
    styleUrls: ['./read-one-triprisk.component.css'],
    providers: [TripRiskService]
})
 
export class ReadOneTripRiskComponent implements OnChanges {
 
    /*
        @Output will tell the parent component (AppComponent)
        that an event has happened (via .emit(), see readTripRisks() method below)
    */
    @Output() show_read_triprisks_event = new EventEmitter();
 
    // @Input means it will accept value from parent component (AppComponent)
    @Input() risk_id;
 
    triprisk: TripRisk;
    riskData = [];
 
    // initialize triprisk service
    constructor(private tripriskService: TripRiskService){}
 
    // user clicks the 'read triprisks' button
    readTripRisks(){
        this.show_read_triprisks_event.emit({ title: "Trip - Risks Assessment" });
    }
 
    // call the record when 'risk_id' was changed
    ngOnChanges(){
        this.tripriskService.readOneTripRisk(this.risk_id)
            .subscribe(
              triprisk => {
                this.triprisk=triprisk;
                this.riskData=triprisk[0];
              //console.log(triprisk[0]);
              console.log(this.riskData);
            });
    }
 
}