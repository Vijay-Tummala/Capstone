import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TripRiskService } from '../../triprisk.service';
import { Observable } from 'rxjs/Observable';
import { TripRisk } from '../../triprisk';
 
@Component({
    selector: 'app-delete-triprisk',
    templateUrl: './delete-triprisk.component.html',
    styleUrls: ['./delete-triprisk.component.css'],
    providers: [TripRiskService]
})
 
export class DeleteTripRiskComponent {
 
    /*
        @Output will tell the parent component (AppComponent)
        that an event has happened (via .emit(), see readTripRisks() method below)
    */
    @Output() show_read_triprisks_event = new EventEmitter();
 
    // @Input enable getting the risk_id from parent component (AppTripRiskComponent)
    @Input() risk_id;
 
    // initialize triprisk service
    constructor(private tripriskService: TripRiskService){}
 
    // user clicks 'yes' button
    deleteTripRisk(){
 
        // delete data from database
        this.tripriskService.deleteTripRisk(this.risk_id)
            .subscribe(
                 triprisk => {
 
                    // show an alert to tell the user if triprisk was created or not
                    console.log(triprisk);
 
                    // go back to list of triprisks
                    this.readTripRisks();
                 },
                 error => console.log(error)
             );
    }
 
    // user clicks the 'read triprisks' button
    readTripRisks(){
        this.show_read_triprisks_event.emit({ title: "Trip - Risks Assessment" });
    }
 
}