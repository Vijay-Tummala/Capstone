import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import {TaskserviceService} from '../taskservice.service';

//import bootstrap
import * as bootstrap from 'bootstrap';

declare const google: any;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [TaskserviceService]
})

export class TaskComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let mapProp = {
      center: new google.maps.LatLng(51.508742, -0.120850),
      zoom: 10,
      mapTypeId: 'roadmap'
      
  };
  let map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  
  }

}
