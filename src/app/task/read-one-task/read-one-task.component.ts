import { Component, OnInit,  Input, Output, EventEmitter } from '@angular/core';
import { Observable } from  'rxjs/Observable';
import { TaskserviceService } from '../../taskservice.service';
import { Task } from '../../task';
import {MapComponent} from '../../map/map.component';

@Component({
  selector: 'app-read-one-task',
  templateUrl: './read-one-task.component.html',
  styleUrls: ['./read-one-task.component.css'],
  providers: [TaskserviceService]
})
export class ReadOneTaskComponent implements OnInit {

  @Output() show_read_tasks_event = new EventEmitter();
 
    // @Input means it will accept value from parent component (AppComponent)
    @Input() task_id;
    @Input() startTripFlow;
 
    task: Task;
    task_answer: string;
    taskData = [];
    mapObject:MapComponent;
 
    // initialize task service
    constructor(private taskService: TaskserviceService,private map:MapComponent){
      this.mapObject=map;
      this.startTripFlow=this.mapObject.startTripFlow;
    }
 
    // user clicks the 'read tasks' button
    readTasks(){
        this.show_read_tasks_event.emit({ title: "Stop - Tasks Assessment" });
    }

    createTaskData(){  
      console.log("Coming within TASK-DATA***** task_id is : "+this.task_id);
        const newTaskData = {
    
          TaskID : this.task_id,
          TaskData : this.task_answer
        }
  
        console.log(newTaskData)
        this.taskService.createTaskData(newTaskData).subscribe(
          res =>{
        
            //this.task_id = res;
            
        });
    }
 
    // call the record when 'task_id' was changed
    ngOnChanges(){
        this.taskService.readOneTask(this.task_id)
            .subscribe(
              task => {
                this.task=task;
                this.taskData=task[0];
              //console.log(task[0]);
              console.log(this.taskData);
            });
    }

  ngOnInit() {
  }

}
