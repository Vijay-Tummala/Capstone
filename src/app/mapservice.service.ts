import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Trip } from './Trip';
import { Stop } from './Stop';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import 'rxjs/add/operator/map'
import {HttpClient} from '@angular/common/http';
@Injectable()
export class MapserviceService {
    
  sMsg: string;
  constructor(private http: Http, private httpService: HttpClient) { }
  getCoursesNumberbyEmail(Email){
    return this.http.get('http://18.219.197.176:3000/Courses/getNumberofCoursesByEmail/'+Email).map(res => res.json());
 
   }
  getStudentcourseByEmail(Email){
    return this.http.get('http://18.219.197.176:3000/Courses/getCourseByStudentEmail/'+Email).map(res => res.json());

  }
  getTaskData(firstname,lastname){
    return this.http.get('http://18.219.197.176:3000/Enrollments/getTaskInfofromName/'+ firstname + '/' + lastname).map(res => res.json());
    
  }


  getUsersByProfessorEmail(Email){
    return this.http.get('http://18.219.197.176:3000/Enrollments/getUserByProfessorEmail/'+ Email ).map(res => res.json());
    
  }

  getAllCoursesByEmail(Email){
    return this.http.get('http://18.219.197.176:3000/Courses/getAllCoursesByEmail/'+Email).map(res => res.json());
    
  }
  
    getRoleByEmail(Email){
      return this.http.get('http://18.219.197.176:3000/Users/getRoleByEmail/'+Email).map(res => res.json());
    }
  
    getApprovalByEmail(Email){
      console.log("Email is "+Email);
      return this.http.get('http://18.219.197.176:3000/Users/getApprovalByEmail/'+Email).map(res => res.json());
    }
    createCourse(classDetails){
      console.log(classDetails)
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://18.219.197.176:3000/Courses/addCourse', classDetails, {headers: headers})
      .map(res => res.json());
  
    }
  getTrip(courseId){

    return this.http.get('http://18.219.197.176:3000/Trips/getAllTrip/'+courseId)
  .map(res => res.json());

  }

  getTripById(tripid)
  {
    console.log("service" + tripid)
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://18.219.197.176:3000/Trips/getTripById/'+tripid, {headers:headers})
    .map(res => res.json());
  }

  createNewTrip(newTrip){
    console.log(newTrip)
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://18.219.197.176:3000/Trips/addTrip', newTrip, {headers: headers})
    .map(res => res.json());
  }

  addNewStop(newStop){
    console.log(newStop);
      console.log("in add new call");
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://18.219.197.176:3000/trips/'+newStop.TripID+'/stops', JSON.stringify(newStop), {headers: headers}) 
    }
  
    getStops(id){
      console.log("id in getStope",id);
      return this.http.get('http://18.219.197.176:3000/trips/'+id+'/stops')
      .map(res => res.json());
    
      }
  
  
      getStopByStopID(id){
        console.log("id in stop",id);
        return this.http.get('http://18.219.197.176:3000/trips/stops/'+id) .map(res => res.json());
      }
  
      deleteStopByStopID(id){
          console.log("id in stop",id);
          return this.http.delete('http://18.219.197.176:3000/trips/stops/'+id) .map(res => res.json());
      }
  
    updateStopByStopID(stop,id){
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this.http.put('http://18.219.197.176:3000/trips/stops/'+id,JSON.stringify(stop),{headers: headers}).map(res => res.json());
      }

  updateStopWithStopID(stop,stop_id): Observable<Stop>{ 
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(
        "http://18.219.197.176:3000/trips/stops/"+stop_id,
        stop,
        options
    ).map(res => res.json());
  }

  getAllUsers(){
    return this.http.get('http://18.219.197.176:3000/Members/members').map(res=>res.json());
  }

  getUsersByTrip(trip_id){
      return this.http
          .get("http://18.219.197.176:3000/Members/getMemberByTrip?tripID="+trip_id)
          .map((res: Response) => res.json());
  }

  createNewEmergencyContact(newContact){

    console.log("in contact service",newContact);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://18.219.197.176:3000/trips/'+newContact.TripID+'/emergencyContact', JSON.stringify(newContact), {headers: headers}) 

    }

    getECByTrip(trip_id){
        return this.http
            .get("http://18.219.197.176:3000/getECByTrip?tripID="+trip_id)
            .map((res: Response) => res.json());
    }    

    addUsers(newUserList,TripID){

      var headers = new Headers();
      headers.append('Content-Type', 'application/json');      
      return this.http.post('http://18.219.197.176:3000/trips/'+TripID+'/users', JSON.stringify(newUserList), {headers: headers}) 
      }        

    deleteParticipant(tripID, userID){
      
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
  
      return this.http
          .delete("http://18.219.197.176:3000/deleteParticipant?tripID="+tripID+"&userID="+userID)
          .map(res => res.json());
  }

    // Send trip data to remote server to update it.
    updateTrip(trip,trip_id): Observable<Trip>{
 
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
  
      return this.http.put(
          "http://18.219.197.176:3000/trips/updateTripByTrip?tripID="+trip_id,
          trip,
          options
      ).map(res => res.json());
    }      

    // Send EC data to remote server to update it.
    updateEC(ec,tripID){
 
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
  
      return this.http.put( 
          "http://18.219.197.176:3000/updateECByTrip?tripID="+tripID,
          ec,
          options
      ).map(res => res.json());
    }
    edituploadImages(files, trip_id){
      this.httpService.post('http://18.219.197.176:3000/Trips/uploadImages/'+trip_id, files).subscribe(
        data => {
          // SHOW A MESSAGE RECEIVED FROM THE WEB API.
          this.sMsg = data as string;
          console.log (this.sMsg);
        },
        (err) => {
          console.log (err.message);    // SHOW ERRORS IF ANY.
        }
      );
    }
    getfiles(tripID) {
      return this.http
          .get("http://18.219.197.176:3000/Trips/getImages/"+tripID)
          .map((res: Response) => res.json());
    }

  

}
