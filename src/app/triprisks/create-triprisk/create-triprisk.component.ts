import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TripRiskService } from '../../triprisk.service';
import { Observable } from 'rxjs/Observable';
import { TripRisk } from '../../triprisk';

import { MapComponent } from '../../map/map.component';
import {ActivatedRoute} from '@angular/router';
 
@Component({
    selector: 'app-create-triprisk',
    templateUrl: './create-triprisk.component.html',
    styleUrls: ['./create-triprisk.component.css'],
    providers: [TripRiskService]
})
 
// component for creating a triprisk record
export class CreateTripRiskComponent {
 
    // our angular form
    create_triprisk_form: FormGroup;
    mapObject:MapComponent;
    tripID;
    stopID;
 
    // @Output will tell the parent component (AppComponent) that an event happened in this component
    @Output() show_read_triprisks_event = new EventEmitter();
 
    // initialize 'triprisk service' and 'form builder'
    constructor(
        private tripriskService: TripRiskService,
        formBuilder: FormBuilder, 
        private activeRoute:ActivatedRoute, 
        private map:MapComponent
    ){
        this.mapObject=map;
        this.tripID=this.mapObject.riskTripID;
        this.stopID=this.mapObject.riskStopID;
        // based on our html form, build our angular form
        this.create_triprisk_form = formBuilder.group({
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
        console.log(this.create_triprisk_form.value);
    }
 
    // user clicks 'create' button
    createTripRisk(){
        console.log(this.create_triprisk_form.value);
        // send data to server
        this.tripriskService.createTripRisk(this.create_triprisk_form.value)
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
 
    // what to do when this component were initialized
    ngOnInit(){

    }
}