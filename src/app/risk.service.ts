import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Risk } from './risk';
 
@Injectable()
 
// Service for risks data.
export class RiskService {
 
    public idRisk: any | boolean = false;

    public getRiskID(): any | boolean {
        return this.idRisk;
    }

    public setRiskID(idRisk: any): void {
        this.idRisk = idRisk;
    }

    // We need Http to talk to a remote server.
    constructor(private _http : Http){ }
 
    // Get list of risks from remote server.
    /*readRisks(): Observable<Risk[]>{
        return this._http
            .get("http://18.219.196.176:4200/Risks/getAllRisk")
            .map((res: Response) => res.json());
    }*/

    readRisks(trip_id, stop_id): Observable<Risk[]>{
        return this._http
            .get("http://18.219.197.176:3000/Risks/getRiskByStop?tripID="+trip_id+"&stopID="+stop_id)
            .map((res: Response) => res.json());
    }

    // Send risk data to remote server to create it.
    createRisk(risk): Observable<Risk>{
    
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this._http.post(
          "http://18.219.197.176:3000/Risks/addRisk",
          risk,
          options
      ).map(res => res.json());
    }

    // Get a risk details from remote server.
    readOneRisk(risk_id): Observable<Risk>{
      return this._http
          .get("http://18.219.197.176:3000/Risks/getRiskByRisk?riskID="+risk_id)
          .map(res => res.json());
    }

    // Send risk data to remote server to update it.
    updateRisk(risk,risk_id): Observable<Risk>{
 
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
    
        return this._http.put(
            "http://18.219.197.176:3000/Risks/updateRiskByRisk?riskID="+risk_id,
            risk,
            options
        ).map(res => res.json());
      }
 
      // Send risk ID to remote server to delete it.
      deleteRisk(risk_id){
      
          let headers = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: headers });
      
          return this._http
              .delete("http://18.219.197.176:3000/Risks/deleteRiskByRisk?riskID="+risk_id)
              .map(res => res.json());
      }
}