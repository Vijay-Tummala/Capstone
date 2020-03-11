import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TaskserviceService } from '../../taskservice.service';
import { Observable } from 'rxjs/Observable';
import { Task } from '../../task';

import { MapComponent } from '../../map/map.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css'],
  providers: [TaskserviceService]
})
export class TaskCreateComponent implements OnInit {

  // our angular form
  create_task_form: FormGroup;
  mapObject:MapComponent;
  tripID;
  stopID;
  QuestionType: string = "";
  
  // @Output will tell the parent component (AppComponent) that an event happened in this component
  @Output() show_read_tasks_event = new EventEmitter();

  constructor(private taskService: TaskserviceService, 
              formBuilder: FormBuilder,
              private activeRoute:ActivatedRoute, 
              private map:MapComponent
            ) {
              this.mapObject=map;
              this.tripID=this.mapObject.riskTripID;
              this.stopID=this.mapObject.riskStopID;
      this.create_task_form = formBuilder.group({
        Description: ["", Validators.required],
        Category: ["", Validators.required],
        QuestionType: ["", Validators.required],
        Question: ["", Validators.required],
        StopID: this.stopID
        //StopID: ["", Validators.required]  
      });
      console.log(this.create_task_form.value);
   }

  createTask(){
 
    // send data to server
    this.taskService.createTask(this.create_task_form.value)
        .subscribe(
             task => {
              console.log("printing question type : " + task.QuestionType);
                // show an alert to tell the user if risk was created or not
                console.log(task);

                // go back to list of risks
                this.readTasks();
             },
             error => console.log(error)
         );
  }
  readTasks(){
    console.log('readTask ...... ');
    this.show_read_tasks_event.emit({ title: "Stop - Tasks Assessment" });
  }

  ngOnInit() {
  }

}
