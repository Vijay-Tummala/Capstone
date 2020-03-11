import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RiskService } from '../../risk.service';
import { Observable } from 'rxjs/Observable';
import { Risk } from '../../risk';

import { MapComponent } from '../../map/map.component';
import {ActivatedRoute} from '@angular/router';
 
@Component({
    selector: 'app-create-risk',
    templateUrl: './create-risk.component.html',
    styleUrls: ['./create-risk.component.css'],
    providers: [RiskService]
})
 
// component for creating a risk record
export class CreateRiskComponent {
 
    // our angular form
    create_risk_form: FormGroup;
    mapObject:MapComponent;
    tripID;
    stopID;
 
    // @Output will tell the parent component (AppComponent) that an event happened in this component
    @Output() show_read_risks_event = new EventEmitter();
 
    // initialize 'risk service' and 'form builder'
    constructor(
        private riskService: RiskService,
        formBuilder: FormBuilder, 
        private activeRoute:ActivatedRoute, 
        private map:MapComponent
    ){
        this.mapObject=map;
        this.tripID=this.mapObject.riskTripID;
        this.stopID=this.mapObject.riskStopID;
        // based on our html form, build our angular form
        this.create_risk_form = formBuilder.group({
            riskName: ["", Validators.required],
            desc: ["", Validators.required],
            outcrop: ["", Validators.required],
            class: ["", Validators.required],
            prob: ["", Validators.required],
            rating: ["", Validators.required],
            mitigation: ["", Validators.required],
            ppe: ["", Validators.required],
            reqEq: ["", Validators.required],
            spWarn: ["", Validators.required],
            resp: ["", Validators.required],
            effect: ["", Validators.required],
            wOut: ["", Validators.required],
            resRisk: ["", Validators.required],
            trip: this.tripID,
            stop: this.stopID
           /* trip: ["", Validators.required],
            stop: ["", Validators.required]*/
        });
        console.log(this.create_risk_form.value);
    }
 
    // user clicks 'create' button
    createRisk(){
 
        // send data to server
        this.riskService.createRisk(this.create_risk_form.value)
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
 
    // what to do when this component were initialized
    ngOnInit(){

    }
}