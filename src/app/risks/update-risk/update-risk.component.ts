import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Risk } from '../../risk';
import { RiskService } from '../../risk.service';
import { Observable } from 'rxjs/Observable';
import { isUndefined } from 'util';

 
@Component({
    selector: 'app-update-risk',
    templateUrl: './update-risk.component.html',
    styleUrls: ['./update-risk.component.css'],
    providers: [RiskService]
})
export class UpdateRiskComponent implements OnChanges {
 
    // our angular form
    update_risk_form: FormGroup;
    risk: Risk;
    riskData = [];
 
    @Output() show_read_risks_event = new EventEmitter();
    @Input() risk_id;
 
    // initialize risk services
    constructor(
        private riskService: RiskService,
        private formBuilder: FormBuilder
    ){
 
        // build angular form
        this.update_risk_form = this.formBuilder.group({
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
    updateRisk(){
      console.log("update2");
    //call read one risk to update default values
      this.riskService.readOneRisk(this.risk_id)
            .subscribe(risk => {              
                this.risk=risk;
                this.riskData=risk[0];
                console.log(this.risk[0].RiskName);

                //dealing with default untouched values
                if (!this.update_risk_form.value.riskName) {
                    this.update_risk_form.patchValue({riskName: this.risk[0].RiskName});
                } 
                if (!this.update_risk_form.value.desc) {
                    this.update_risk_form.patchValue({desc: this.risk[0].Description});
                } 
                if (!this.update_risk_form.value.outcrop) {
                    this.update_risk_form.patchValue({outcrop: this.risk[0].Outcrop});
                } 
                if (!this.update_risk_form.value.class) {
                    this.update_risk_form.patchValue({class: this.risk[0].Class});
                } 
                if (!this.update_risk_form.value.prob) {
                    this.update_risk_form.patchValue({prob: this.risk[0].Probability});
                } 
                if (!this.update_risk_form.value.rating) {
                    this.update_risk_form.patchValue({rating: this.risk[0].Rating});
                } 
                if (!this.update_risk_form.value.mitigation) {
                    this.update_risk_form.patchValue({mitigation: this.risk[0].Mitigation});
                } 
                if (!this.update_risk_form.value.ppe) {
                    this.update_risk_form.patchValue({ppe: this.risk[0].Ppe});
                } 
                if (!this.update_risk_form.value.reqEq) {
                    this.update_risk_form.patchValue({reqEq: this.risk[0].ReqEquipment});
                } 
                if (!this.update_risk_form.value.spWarn) {
                    this.update_risk_form.patchValue({spWarn: this.risk[0].SpWarning});
                } 
                if (!this.update_risk_form.value.resp) {
                    this.update_risk_form.patchValue({resp: this.risk[0].Responsible});
                } 
                if (!this.update_risk_form.value.effect) {
                    this.update_risk_form.patchValue({effect: this.risk[0].Effect});
                } 
                if (!this.update_risk_form.value.wOut) {
                    this.update_risk_form.patchValue({wOut: this.risk[0].WorstOutcome});
                } 
                if (!this.update_risk_form.value.resRisk) {
                    this.update_risk_form.patchValue({resRisk: this.risk[0].ResidualRisk});
                } 
        
                // send data to server
                this.riskService.updateRisk(this.update_risk_form.value,this.risk_id)
                    .subscribe(
                        risk => {
                            // go back to list of risks
                            this.readRisks();
                        },
                        error => console.log(error)
                    );

            });

    }
 
    // user clicks the 'read risks' button
    readRisks(){
        this.show_read_risks_event.emit({ title: "Stop - Risks Assessment" });
    }
 
    // call the record when 'risk_id' was changed
    ngOnChanges(){
 
        // read one risk record
        this.riskService.readOneRisk(this.risk_id)
            .subscribe(risk => {
 
                // put values in the form
                this.update_risk_form.patchValue({
                    riskName: risk.RiskName,
                    desc: risk.Description,
                    outcrop: risk.Outcrop,
                    class: risk.Class,
                    prob: risk.Probability,
                    rating: risk.Rating,
                    mitigation: risk.Mitigation,
                    ppe: risk.Ppe,
                    reqEq: risk.ReqEquipment,
                    spWarn: risk.SpWarning,
                    resp: risk.Responsible,
                    effect: risk.Effect,
                    wOut: risk.WorstOutcome,
                    resRisk: risk.ResidualRisk
                });
            });
    }
 
    // read categories from database
    ngOnInit(){
        // read one risk record
        this.riskService.readOneRisk(this.risk_id)
            .subscribe(risk => {
                // put values in the form
                this.update_risk_form.patchValue({
                    riskName: risk.RiskName,
                    desc: risk.Description,
                    outcrop: risk.Outcrop,
                    class: risk.Class,
                    prob: risk.Probability,
                    rating: risk.Rating,
                    mitigation: risk.Mitigation,
                    ppe: risk.Ppe,
                    reqEq: risk.ReqEquipment,
                    spWarn: risk.SpWarning,
                    resp: risk.Responsible,
                    effect: risk.Effect,
                    wOut: risk.WorstOutcome,
                    resRisk: risk.ResidualRisk
              });
              
                this.risk=risk;
                this.riskData=risk[0];
            });
    }
}