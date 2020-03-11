import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { TripRisk } from './triprisk';
 
@Injectable()
 
// Service for triprisks data.
export class TripRiskService {
 
    public idRisk: any | boolean = false;

    public getRiskID(): any | boolean {
        return this.idRisk;
    }

    public setRiskID(idRisk: any): void {
        this.idRisk = idRisk;
    }

    // We need Http to talk to a remote server.
    constructor(private _http : Http){ }
 
    // Get list of triprisks from remote server.
    /*readTripRisks(): Observable<TripRisk[]>{
        return this._http
            .get("http://13.59.46.246:3000/Risks/Trips/getAllTripRisk")
            .map((res: Response) => res.json());
    }*/

    readTripRisks(trip_id, stop_id): Observable<TripRisk[]>{
        stop_id=0;
        return this._http
            .get("http://18.219.197.176:3000/Risks/Trips/getTripRiskByStop?tripID="+trip_id+"&stopID="+stop_id)
            .map((res: Response) => res.json());
    }

    // Send triprisk data to remote server to create it.
    createTripRisk(triprisk): Observable<TripRisk>{
    
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this._http.post(
          "http://18.219.197.176:3000/Risks/Trips/addTripRisk",
          triprisk,
          options
      ).map(res => res.json());
    }

    // Get a triprisk details from remote server.
    readOneTripRisk(risk_id): Observable<TripRisk>{
      return this._http
          .get("http://18.219.197.176:3000/Risks/Trips/getTripRiskByRisk?riskID="+risk_id)
          .map(res => res.json());
    }

    // Send triprisk data to remote server to update it.
    updateTripRisk(triprisk,risk_id): Observable<TripRisk>{
 
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
    
        return this._http.put(
            "http://18.219.197.176:3000/Risks/Trips/updateTripRiskByRisk?riskID="+risk_id,
            triprisk,
            options
        ).map(res => res.json());
      }
 
      // Send risk ID to remote server to delete it.
      deleteTripRisk(risk_id){
      
          let headers = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: headers });
      
          return this._http
              .delete("http://18.219.197.176:3000/Risks/Trips/deleteTripRiskByRisk?riskID="+risk_id)
              .map(res => res.json());
      }
}