//import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from  'rxjs/Observable';
import { TaskserviceService } from '../../taskservice.service';
import { Task } from '../../task';
import { isUndefined } from 'util';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css'],
  providers: [TaskserviceService]
})
export class UpdateTaskComponent implements OnChanges {

  update_task_form: FormGroup;
    task: Task;
    taskData = [];
 
    @Output() show_read_tasks_event = new EventEmitter();
    @Input() task_id;

  constructor(private taskService: TaskserviceService,
    private formBuilder: FormBuilder) {
      this.update_task_form = formBuilder.group({
        Description: ["", Validators.required],
        Category: ["", Validators.required],
        QuestionType: ["", Validators.required],
        Question: ["", Validators.required]
      });
    }


    updateTask(){
      console.log("update2");
    //call read one task to update default values
      this.taskService.readOneTask(this.task_id)
            .subscribe(task => {              
                this.task=task;
                this.taskData=task[0];
                console.log(this.task[0].Description);

                //dealing with default untouched values
                if (!this.update_task_form.value.Description) {
                    this.update_task_form.patchValue({Description: this.task[0].Description});
                } 
                if (!this.update_task_form.value.Category) {
                    this.update_task_form.patchValue({Category: this.task[0].Category});
                }
                if (!this.update_task_form.value.QuestionType) {
                    this.update_task_form.patchValue({QuestionType: this.task[0].QuestionType});
                } 
                if (!this.update_task_form.value.Question) {
                    this.update_task_form.patchValue({Question: this.task[0].Question});
                }  
                
        
                // send data to server
                this.taskService.updateTask(this.update_task_form.value,this.task_id)
                    .subscribe(
                        task => {
                            // go back to list of tasks
                            this.readTasks();
                        },
                        error => console.log(error)
                    );

            });

    }
 
    // user clicks the 'read tasks' button
    readTasks(){
        this.show_read_tasks_event.emit({ title: "Stop - Tasks Assessment" });
    }
 
    // call the record when 'task_id' was changed
    ngOnChanges(){
 
        // read one task record
        this.taskService.readOneTask(this.task_id)
            .subscribe(task => {
 
                // put values in the form
                this.update_task_form.patchValue({
                    Description: task.Description,
                    Category: task.Category,
                    QuestionType: task.QuestionType,
                    Question: task.Question
                });
            });
    }
  ngOnInit() {
    this.taskService.readOneTask(this.task_id)
            .subscribe(task => {
                // put values in the form
                this.update_task_form.patchValue({
                    Description: task.Description,
                    Category: task.Category,
                    QuestionType: task.QuestionType,
                    Question: task.Question
              });
              
                this.task=task;
                this.taskData=task[0];
            });

  }

}
