import { Component, OnInit,  Input, Output, EventEmitter } from '@angular/core';
import { Observable } from  'rxjs/Observable';
import { TaskserviceService } from '../../taskservice.service';
import { Task } from '../../task';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css'],
  providers: [TaskserviceService]
})
export class DeleteTaskComponent implements OnInit {
  
  @Output() show_read_tasks_event = new EventEmitter();
 
  // @Input enable getting the task_id from parent component (AppComponent)
  @Input() task_id;

  // initialize task service
  constructor(private taskService: TaskserviceService){}

  // user clicks 'yes' button
  deleteTask(){

      // delete data from database
      this.taskService.deleteTask(this.task_id)
          .subscribe(
               task => {

                  // show an alert to tell the user if task was created or not
                  console.log(task);

                  // go back to list of tasks
                  this.readTasks();
               },
               error => console.log(error)
           );
  }

  // user clicks the 'read tasks' button
  readTasks(){
      this.show_read_tasks_event.emit({ title: "Stop - Tasks Assessment" });
  }

  ngOnInit() {
  }

}
