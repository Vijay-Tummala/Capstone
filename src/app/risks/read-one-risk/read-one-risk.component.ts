import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { RiskService } from '../../risk.service';
import { Observable } from 'rxjs/Observable';
import { Risk } from '../../risk';
 
@Component({
    selector: 'app-read-one-risk',
    templateUrl: './read-one-risk.component.html',
    styleUrls: ['./read-one-risk.component.css'],
    providers: [RiskService]
})
 
export class ReadOneRiskComponent implements OnChanges {
 
    /*
        @Output will tell the parent component (AppComponent)
        that an event has happened (via .emit(), see readRisks() method below)
    */
    @Output() show_read_risks_event = new EventEmitter();
 
    // @Input means it will accept value from parent component (AppComponent)
    @Input() risk_id;
 
    risk: Risk;
    riskData = [];
 
    // initialize risk service
    constructor(private riskService: RiskService){}
 
    // user clicks the 'read risks' button
    readRisks(){
        this.show_read_risks_event.emit({ title: "Stop - Risks Assessment" });
    }
 
    // call the record when 'risk_id' was changed
    ngOnChanges(){
        this.riskService.readOneRisk(this.risk_id)
            .subscribe(
              risk => {
                this.risk=risk;
                this.riskData=risk[0];
              //console.log(risk[0]);
              console.log(this.riskData);
            });
    }
 
}