//import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { TaskserviceService } from '../../taskservice.service';
import { Observable } from 'rxjs/Observable';
import { Task } from '../../task';
import {MapComponent} from '../../map/map.component';

@Component({
  selector: 'app-app-task',
  templateUrl: './app-task.component.html',
  styleUrls: ['./app-task.component.css']
})
export class AppTaskComponent implements OnChanges {

  @Output() show_read_tasks_event = new EventEmitter();

  @Input() riskTripID;
  @Input() riskStopID;
  @Input() startTripFlow;

  title="Stop - Tasks Assessment";
  task_id;
  mapObject:MapComponent;

  // properties used to identify what views to show
  show_read_tasks_html=false;
  show_create_task_html=false;
  show_read_one_task_html=false;
  show_update_task_html=false;
  show_delete_task_html=false;

  constructor(
    private map:MapComponent
){
    
    this.mapObject=map;
}

  showCreateTask($event){
  
    // set title
    this.title=$event.title;
  
    // hide all html then show only one html
    this.hideAll_Html();
    this.show_create_task_html=true;
  }
  
  // show tasks list
  showReadTasks($event){
    // set title
    this.title=$event.title;
  
    // hide all html then show only one html
    this.hideAll_Html();
    this.show_read_tasks_html=true;
  }
  
  // show details of a task
  showReadOneTask($event){
   
    // set title and task ID
    this.title=$event.title;
    this.task_id=$event.task_id;
    console.log("task_id");
    console.log("task_id" + this.task_id);
  
    // hide all html then show only one html
    this.hideAll_Html();
    this.show_read_one_task_html=true;
  }
  
  // show the 'update task form'
  showUpdateTask($event){
   
    // set title and task ID
    this.title=$event.title;
    this.task_id=$event.task_id;
  
    // hide all html then show only one html
    this.hideAll_Html();
    this.show_update_task_html=true;
  }
  
  // show 'are you sure?' prompt to confirm deletion of a record
  showDeleteTask($event){
   
      // set title and task ID
      this.title=$event.title;
      this.task_id=$event.task_id;
  
      // hide all html then show only one html
      this.hideAll_Html();
      this.show_delete_task_html=true;
  }
  
  // hide all html views
  hideAll_Html(){
    this.show_read_tasks_html=false;
    this.show_read_one_task_html=false;
    this.show_create_task_html=false;
    this.show_update_task_html=false;
    this.show_delete_task_html=false;
  }

    // call the record when 'riskTripID' or 'riskStopID' were changed
    ngOnChanges(){
      this.hideAll_Html();
      this.show_read_tasks_html=true;
}
 

}
