import { MapComponent } from './../map/map.component';
import { MapserviceService } from './../mapservice.service';
import { Component, OnInit, Input } from '@angular/core';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'emergency',
  templateUrl: './emergency-contact.component.html',
  styleUrls: ['./emergency-contact.component.css'],
})
export class EmergencyContactComponent implements OnInit {
  _tripFromMap:string;

  @Input()
  set TripFromMap(message : string ){
      this._tripFromMap = message; 
  }
  get TripFromMap(){
      return this._tripFromMap;
  }

  public field_activity;
  public field_lead;
  public field_date;
  public to_group;
  public from_group;
  public local_em;
  public code;
  public call_in;
  public on_call;
  public insurance;
  public isos_num;
  public first_aid;
  public kits;
  public medical_centre;
  public hospital;
  public definitive_care;
  public pharmacy;
  public response;
  public escalate_to_crisis;
  public say_at_crisis;
  public transport;
  public logistical;
  public other;
  public accommodation;
  public contact_detail;

  public ECId;

  public tripID;
  



  constructor(private mapServicing: MapserviceService) {   
}


addEmergencyContact(){
this.tripID = this.TripFromMap;
console.log("map trip data:",this.tripID);
  let emergencyContact = {
    TripID: this.tripID,
    FieldActivityName: this.field_activity,
    FieldLeaderCell : this.field_lead,
    FieldDates : this.field_date,
    ToGroup: this.to_group,
    FromGroup: this.from_group,
    LocalEmergency: this.local_em,
    Code: this.code,
    CallIn: this.call_in,
    OnCall: this.on_call,
    Insurance: this.insurance,
    ISOSNumber: this.isos_num,
    FirstAid: this.first_aid,
    FirstAidkits: this.kits,
    MedicalCentre: this.medical_centre,
    NearestHospital: this.hospital,
    DefinitiveCare: this.definitive_care,
    ClosestPharmacy: this.pharmacy,
    InitialResponse: this.response,
    EscalateCrisis: this.escalate_to_crisis,
    CrisisCentre: this.say_at_crisis,
    Transport: this.transport,
    LogisticalSupport:this.logistical,
    Other: this.other,
    Accommodation: this.accommodation,
    ParticipantContact: this.contact_detail

  }

  console.log("going to add contact",emergencyContact);
  this.clearECForm();
  this.mapServicing.createNewEmergencyContact(emergencyContact).subscribe(
    res =>{
      console.log("res of contact", res);
      this.ECId = res;
    });

}

  ngOnInit() {
  }


  clearECForm(){
   this.field_activity='';
    this.field_lead='';
   this.field_date='';
   this.to_group='';
    this.from_group='';
    this.local_em='';
    this.code='';
    this.call_in='';
    this.on_call='';
    this.insurance='';
    this.isos_num='';
    this.first_aid='';
    this.kits='';
    this.medical_centre='';
    this.hospital='';
    this.definitive_care='';
    this.pharmacy='';
    this.response,
    this.escalate_to_crisis='';
    this.say_at_crisis='';
    this.transport='';
    this.logistical='';
    this.other='';
    this.accommodation='';
    this.contact_detail='';
  }

  
}
