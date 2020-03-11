//import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Observable } from  'rxjs/Observable';
import { TaskserviceService } from '../../taskservice.service';
import { Task } from '../../task';
import {MapComponent} from '../../map/map.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-read-task',
  templateUrl: './read-task.component.html',
  styleUrls: ['./read-task.component.css'],
  providers: [TaskserviceService]
})
export class ReadTaskComponent implements OnChanges {

  @Output() show_create_task_event=new EventEmitter();
  @Output() show_read_one_task_event=new EventEmitter();
  @Output() show_update_task_event=new EventEmitter();
  @Output() show_delete_task_event=new EventEmitter();

  // @Input means it will accept value from parent component (AppComponent)
    @Input() task_id;
    @Input() riskTripID;
    @Input() riskStopID;
    @Input() startTripFlow;

    tasks = [];
    mapObject:MapComponent;
    tripID;
    stopID;

  constructor(private taskService : TaskserviceService,
              private activeRoute:ActivatedRoute, 
              private map:MapComponent
            ){ 
              this.mapObject=map;
              this.tripID=this.mapObject.riskTripID;
              this.stopID=this.mapObject.riskStopID;
              this.startTripFlow=this.mapObject.startTripFlow;
      
              console.log("checking input in task constructor: " + this.mapObject.riskTripID);
              console.log("checking input in task constructor: " + this.mapObject.riskTripID);

  }

  createTask(){
    // tell the parent component (AppComponent)
    this.show_create_task_event.emit({
        title: "Add Task"
    });
  }
  
  // when user clicks the 'read' button
  readOneTask(id){
    console.log('readOneTask .. ');
    console.log(id);
    // tell the parent component (AppComponent)
    this.show_read_one_task_event.emit({
        task_id: id,
        title: "Read One Task"
    });
  }

  // when user clicks the 'update' button
  updateTask(id){
    // tell the parent component (AppComponent)
    this.show_update_task_event.emit({
        task_id: id,
        title: "Update Task"
    });
    console.log("update1"+id);
  }
  
  // when user clicks the 'delete' button
  deleteTask(id){
    // tell the parent component (AppComponent)
    this.show_delete_task_event.emit({
        task_id: id,
        title: "Delete Task"
    });
  }

  ngOnChanges() {
    this.taskService.readTasks(this.mapObject.riskStopID)
    .subscribe(tasks => {
      this.tasks=tasks
      console.log(tasks)
    });
  }

}
