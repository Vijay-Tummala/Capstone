import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TripRisk } from '../../triprisk';
import { TripRiskService } from '../../triprisk.service';
import { Observable } from 'rxjs/Observable';
import { isUndefined } from 'util';

 
@Component({
    selector: 'app-update-triprisk',
    templateUrl: './update-triprisk.component.html',
    styleUrls: ['./update-triprisk.component.css'],
    providers: [TripRiskService]
})
export class UpdateTripRiskComponent implements OnChanges {
 
    // our angular form
    update_triprisk_form: FormGroup;
    triprisk: TripRisk;
    riskData = [];
 
    @Output() show_read_triprisks_event = new EventEmitter();
    @Input() risk_id;
 
    // initialize triprisk services
    constructor(
        private tripriskService: TripRiskService,
        private formBuilder: FormBuilder
    ){
 
        // build angular form
        this.update_triprisk_form = this.formBuilder.group({
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
          resRisk: ["", Validators.required]
        });
    }
 
    // user clicks 'create' button
    updateTripRisk(){
      console.log("update2");
    //call read one triprisk to update default values
      this.tripriskService.readOneTripRisk(this.risk_id)
            .subscribe(triprisk => {              
                this.triprisk=triprisk;
                this.riskData=triprisk[0];
                console.log(this.triprisk[0].RiskName);

                //dealing with default untouched values
                if (!this.update_triprisk_form.value.riskName) {
                    this.update_triprisk_form.patchValue({riskName: this.triprisk[0].RiskName});
                } 
                if (!this.update_triprisk_form.value.desc) {
                    this.update_triprisk_form.patchValue({desc: this.triprisk[0].Description});
                } 
                if (!this.update_triprisk_form.value.outcrop) {
                    this.update_triprisk_form.patchValue({outcrop: this.triprisk[0].Outcrop});
                } 
                if (!this.update_triprisk_form.value.class) {
                    this.update_triprisk_form.patchValue({class: this.triprisk[0].Class});
                } 
                if (!this.update_triprisk_form.value.prob) {
                    this.update_triprisk_form.patchValue({prob: this.triprisk[0].Probability});
                } 
                if (!this.update_triprisk_form.value.rating) {
                    this.update_triprisk_form.patchValue({rating: this.triprisk[0].Rating});
                } 
                if (!this.update_triprisk_form.value.mitigation) {
                    this.update_triprisk_form.patchValue({mitigation: this.triprisk[0].Mitigation});
                } 
                if (!this.update_triprisk_form.value.ppe) {
                    this.update_triprisk_form.patchValue({ppe: this.triprisk[0].Ppe});
                } 
                if (!this.update_triprisk_form.value.reqEq) {
                    this.update_triprisk_form.patchValue({reqEq: this.triprisk[0].ReqEquipment});
                } 
                if (!this.update_triprisk_form.value.spWarn) {
                    this.update_triprisk_form.patchValue({spWarn: this.triprisk[0].SpWarning});
                } 
                if (!this.update_triprisk_form.value.resp) {
                    this.update_triprisk_form.patchValue({resp: this.triprisk[0].Responsible});
                } 
                if (!this.update_triprisk_form.value.effect) {
                    this.update_triprisk_form.patchValue({effect: this.triprisk[0].Effect});
                } 
                if (!this.update_triprisk_form.value.wOut) {
                    this.update_triprisk_form.patchValue({wOut: this.triprisk[0].WorstOutcome});
                } 
                if (!this.update_triprisk_form.value.resRisk) {
                    this.update_triprisk_form.patchValue({resRisk: this.triprisk[0].ResidualRisk});
                } 
        
                // send data to server
                this.tripriskService.updateTripRisk(this.update_triprisk_form.value,this.risk_id)
                    .subscribe(
                        triprisk => {
                            // go back to list of triprisks
                            this.readTripRisks();
                        },
                        error => console.log(error)
                    );

            });

    }
 
    // user clicks the 'read triprisks' button
    readTripRisks(){
        this.show_read_triprisks_event.emit({ title: "Trip - Risks Assessment" });
    }
 
    // call the record when 'risk_id' was changed
    ngOnChanges(){
 
        // read one triprisk record
        this.tripriskService.readOneTripRisk(this.risk_id)
            .subscribe(triprisk => {
 
                // put values in the form
                this.update_triprisk_form.patchValue({
                    riskName: triprisk.RiskName,
                    desc: triprisk.Description,
                    outcrop: triprisk.Outcrop,
                    class: triprisk.Class,
                    prob: triprisk.Probability,
                    rating: triprisk.Rating,
                    mitigation: triprisk.Mitigation,
                    ppe: triprisk.Ppe,
                    reqEq: triprisk.ReqEquipment,
                    spWarn: triprisk.SpWarning,
                    resp: triprisk.Responsible,
                    effect: triprisk.Effect,
                    wOut: triprisk.WorstOutcome,
                    resRisk: triprisk.ResidualRisk
                });
            });
    }
 
    // read categories from database
    ngOnInit(){
        // read one triprisk record
        this.tripriskService.readOneTripRisk(this.risk_id)
            .subscribe(triprisk => {
                // put values in the form
                this.update_triprisk_form.patchValue({
                    riskName: triprisk.RiskName,
                    desc: triprisk.Description,
                    outcrop: triprisk.Outcrop,
                    class: triprisk.Class,
                    prob: triprisk.Probability,
                    rating: triprisk.Rating,
                    mitigation: triprisk.Mitigation,
                    ppe: triprisk.Ppe,
                    reqEq: triprisk.ReqEquipment,
                    spWarn: triprisk.SpWarning,
                    resp: triprisk.Responsible,
                    effect: triprisk.Effect,
                    wOut: triprisk.WorstOutcome,
                    resRisk: triprisk.ResidualRisk
              });
              
                this.triprisk=triprisk;
                this.riskData=triprisk[0];
            });
    }
}