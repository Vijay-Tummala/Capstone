import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Task } from './task';
import { TaskData } from './taskData';


@Injectable()
export class TaskserviceService {

  constructor(private http: Http) { }

  getTripById(tripid)
  {
    console.log("service" + tripid)
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://18.219.197.176:3000/Trips/getTripById/'+tripid, {headers:headers})
    .map(res => res.json());
  }

  // Send task data to remote server to create it.
  createTask(task): Observable<Task>{
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(
        "http://18.219.197.176:3000/Tasks/",
        task,
        options
    ).map(res => res.json());
  }

  // Get a task details from remote server
  readOneTask(taskId): Observable<Task>{
    return this.http
        .get("http://18.219.197.176:3000/Tasks/"+taskId)
        .map(res => res.json());
  }

  // Get list of tasks from remote server.
  readTasks(stopID): Observable<Task[]>{
    return this.http
        .get("http://18.219.197.176:3000/Tasks/Stop/"+stopID)
        .map((res: Response) => res.json());
  }


    // Send task data to remote server to update it.
    updateTask(task,task_id): Observable<Task>{
 
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
  
      return this.http.put(
          "http://18.219.197.176:3000/Tasks/"+task_id,
          task,
          options
      ).map(res => res.json());
    }

   // Send task ID to remote server to delete it.
   deleteTask(task_id){
      
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http
        .delete("http://18.219.197.176:3000/Tasks/"+task_id)
        .map(res => res.json());
  }

  createTaskData(taskData): Observable<TaskData>{
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(
        "http://18.219.197.176:3000/TaskData/",
        taskData,
        options
    ).map(res => res.json());
  }

}
