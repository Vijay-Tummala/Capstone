import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RiskService } from '../../risk.service';
import { Observable } from 'rxjs/Observable';
import { Risk } from '../../risk';
 
@Component({
    selector: 'app-delete-risk',
    templateUrl: './delete-risk.component.html',
    styleUrls: ['./delete-risk.component.css'],
    providers: [RiskService]
})
 
export class DeleteRiskComponent {
 
    /*
        @Output will tell the parent component (AppComponent)
        that an event has happened (via .emit(), see readRisks() method below)
    */
    @Output() show_read_risks_event = new EventEmitter();
 
    // @Input enable getting the risk_id from parent component (AppRiskComponent)
    @Input() risk_id;
 
    // initialize risk service
    constructor(private riskService: RiskService){}
 
    // user clicks 'yes' button
    deleteRisk(){
 
        // delete data from database
        this.riskService.deleteRisk(this.risk_id)
            .subscribe(
                 risk => {
 
                    // show an alert to tell the user if risk was created or not
                    console.log(risk);
 
                    // go back to list of risks
                    this.readRisks();
                 },
                 error => console.log(error)
             );
    }
 
    // user clicks the 'read risks' button
    readRisks(){
        this.show_read_risks_event.emit({ title: "Stop - Risks Assessment" });
    }
 
}