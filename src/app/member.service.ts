import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Member } from './member';

@Injectable()
export class MemberService {

  constructor(private _http : Http) { }

      // Send user data to remote server to create it.
      createMember(member): Observable<Member>{
    
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
  
        return this._http.post(
            "http://18.219.197.176:3000/Members/addMember",
            member,
            options
        ).map(res => res.json());
      }

      getorg(value){
        
        return this._http.get("https://api.data.gov/ed/collegescorecard/v1/schools?fields=school.name&per_page=100&api_key=v5JB0MsijwzCQfLvpYpSrXu1yD0enPtayvZC9L9m&page=??&school.name="+value).map(res => res.json());
              
     
    }
      

      


}
