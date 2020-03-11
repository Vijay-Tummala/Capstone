import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MapserviceService} from '../mapservice.service';
import { Router } from '@angular/router';
//import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
import {Trip} from '../Trip';
//import * as myGlobals from '../globals';
import 'rxjs/add/operator/mergeMap';
import { AuthService } from '../shared/auth/auth.service';
import {Subject} from 'rxjs/Subject';
import { ViewChild } from '@angular/core';
import {DatepickerOptions} from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import {IMyDpOptions} from 'mydatepicker'; 
import { AngularFireAuth } from 'angularfire2/auth';
import * as jsPDF from 'jspdf';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';


declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'], 
  providers: [MapserviceService]
})
export class MapComponent implements OnInit {
  currentYear = (new Date()).getFullYear();
  nextYear = ((new Date()).getFullYear()) + 1;
  @Output() show_read_stops_event = new EventEmitter();

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
};
  public isLoggedIn;
  public trip;
  public tripbyid;
  public updatetripid;
  public map;
  public mapProp;
  public card;
  public newmap;
  public input;
  public searchBox;
  public start;
  public end;
  public stoplocation;
  public stoplocationbox;
  public start_lat;
  public end_lat;
  public start_long;
  public end_long;
  public locationBox;
  public location;
  public stop_lat;
  public stop_long;
  public userEmail;
  public course;
  public courseId;
  public role;
  public RoleID;
  public approve;
  public Approval;
  public courseName;
  public Id;
  public names;
  public questiontype;
  public question;
  public taskdata;
  public tripname;
  public Organization;
  public coursenum;
  public submissionTime;
  public taskid;
  public userid;

  public markers = [];
  public stoparray = []
  public tripId;
  public stopId;
  public showstops;
  stopMarkers = [];
  //labelIndex : any;
  trip_name : string;
  description : string;
  start_date : string;
  end_date : string;
  course_name : string;
  semester : string;
//stop data
  stop_name;
  stop_description;
  stop_location;
  stop_latitude;
  stop_longitude;
  previous = [];

  //Stop array and values from created stop

  stops= [];

  // For startTripFlow:
  sts1 = [];
  sts = [];

  stopid;
  tripid;
  index;

  stopforupdate;

  //risk tripid and stopid for individual stop
  riskTripID="";
  riskStopID="";
  viewTripID="0";
  viewStopID="0";
  tripData: Trip;


//Check Condition

isReadonly=false;
isEdit = false;
isCreateSuccessful = false;
isUpdateSuccessful = false;
isStartTripFlow = false;
startTripFlow = false;

//toggle conditions
isActive=true;
isEditTrip=false;
isStopRiskEdit=false;
isTripRiskEdit=false;
isStopTaskEdit=false;
  
  public labels = ['A','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  public labelIndex = 0
  //public long;
  
  public i =0;
  public prev = 0;

  public geocoder = new google.maps.Geocoder();

  public infowindow = new google.maps.InfoWindow;

  constructor(
              private activeRoute:ActivatedRoute, 
              private mapServicing: MapserviceService,
              private router: Router,
              private authService: AuthService,
              public afAuth: AngularFireAuth,
  ) {

    //var lat;
    //var long;
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in'+res.email);
        this.userEmail = res.email;
        this.getRoleEmail(this.userEmail);
        this.getApprovalEmail(this.userEmail);
      } else {
        console.log('user not logged in');
      }
    });
    authService.isAuthenticated()
    .subscribe(
      success => this.isLoggedIn = success
    )
   }


   captureAll(){
     this.infoPDF();
     //console.log(this.names);
    
var zip = new JSZip();
//const folder = zip.folder('Submissions')
//zip.file("Hello1.pdf","Hello first World\n");
//zip.file("Hello2.txt","Hello second World\n");
var name=[];
 name=this.names;
console.log("ghghgghgh"+name[0])
  for(let each of name){
    //console.log(this.names);
    this.mapServicing.getTaskData(each.firstname,each.lastname)
    .subscribe(
        res =>{

          this.questiontype = res[0].questiontype;
          this.question = res[0].question;
          this.taskdata = res[0].taskdata;     
          this.tripname = res[0].tripname;
          this.Organization = res[0].Organization;
          this.semester = res[0].semester;
          this.courseName = res[0].courseName;
          var str=[];
              var abc = this.semester;
               str=abc.split('-');
               //console.log(str);
              
              var semname;
            if(str[1] == ("08")){
                semname = "Fall"
            }else if(str[1] == ("06")){
              semname = "Summer"
            }else{
              semname = "Spring"
            }

            var semester = semname + " " + str[0];

          var doc = new jsPDF();
          var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
          doc.text(this.Organization,pageWidth/2,10,'center')
          doc.text(semester,pageWidth/2,20,'center')
          doc.text(10,40,'First Name: ')
          doc.text(each.firstname,50,40)
          doc.text(10,50,'Last Name: ')
          doc.text(each.lastname,50,50)
          doc.text(10,60,'Question Type: ')
          doc.text(this.questiontype,50,60)
          doc.text(10,70,'Question: ')
          doc.text(this.question,50,70)
          doc.text(10,80,'Task Data: ')
          doc.text(this.taskdata,50,80)

     
       var filename =this.courseName+'_'+ this.tripname;
     zip.file(each.firstname + '_' + each.lastname + '_' + this.tripname + '.pdf',doc.output());
      zip.generateAsync({type:"blob"}).then(function(content){
      FileSaver.saveAs(content,filename+".zip");
    }) 

    

        });


  }
  
    

}

captureScreen(firstname,lastname)
{
  
  this.mapServicing.getTaskData(firstname,lastname)
  .subscribe(
      res =>{
        console.log(res);
        var doc = new jsPDF();
        let j = 50;
        let k;
        this.tripname = res[0].tripName;
        this.Organization = res[0].Organization;
        this.semester = res[0].semester;
        var str=[];
        var abc = this.semester;
         str=abc.split('-');
        
        
        var semname;
      if(str[1] == ("08")){
          semname = "Fall"
      }else if(str[1] == ("06")){
        semname = "Summer"
      }else{
        semname = "Spring"
      }

      var semester = semname + " " + str[0];
      var image = new Image(); 
      var abc = 'http://ec2-18-219-197-176.us-east-2.compute.amazonaws.com/assets/images/uploads'

        var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
        doc.text(this.Organization,pageWidth/2,10,'center')
        doc.text(semester,pageWidth/2,20,'center')
        doc.text(10,40,'First Name: ')
        doc.text(firstname,50,40)
        doc.text(10,50,'Last Name: ')
        doc.text(lastname,50,50)
        for(let i=0;i<res.length;i++)
        {
        
        this.questiontype = res[i].questiontype;
        this.question = res[i].question;
        this.taskdata = res[i].TaskData;
        this.submissionTime = res[i].submissionTime;  
        this.taskid = res[i].TaskID;
        this.userid = res[i].userId; 

       
        doc.text(10,(k=j+20),'Task '+(i+1))

        doc.text(10,(k=j+30),'Question Type: ')
        doc.text(this.questiontype,50,k)
        doc.text(10,(k=j+40),'Question: ')
        doc.text(this.question,50,k)
        doc.text(10,(k=j+50),'Task Data: ')
        doc.text(this.taskdata,50,(k))
        doc.text(10,(k=j+60),'Submission Time: ')
        doc.text(this.submissionTime,60,(k))

if(res[i].imageNames != null){
  var images = res[i].imageNames;

  var img =[];
  img = images.split(',');
  
  for(let i =0;i<img.length;i++){
    let b = i+1;

    image.src=abc + "/"+this.taskid+"/"+ img[i];
    
    switch(b){
      case 1: doc.addImage(image,'jpeg',10,k=j+70,60,60);
     
      break;
      case 2 :   doc.addImage(image,'jpeg',75,k=j+70,60,60)
      break;
      case 3: doc.addImage(image,'jpeg',140,k=j+70,60,60)
      break;
      case 4 :   doc.addImage(image,'jpeg',10,k=j+140,60,60)
      break;
      case 5: doc.addImage(image,'jpeg',75,k=j+140,60,60)
      break;
    default: break;
    } 
  }

 }


if(i != 0){

doc.addPage();
j=0;

}

         
    } 

doc.save(firstname + '_' + lastname + '_' + this.tripname + '.pdf');
});
}



      infoPDF(){
        this.mapServicing.getUsersByProfessorEmail(this.userEmail)
        .subscribe(
            res =>{
          
            this.names = res;
            console.log(this.names)
            
            for (var each of this.names){
                console.log(each.firstname + ' '+ each.lastname)
            } 
          });
      } 

      getnumberofcourse(email){
    
        this.mapServicing.getCoursesNumberbyEmail(email).subscribe(
          res =>{
            var abc=res;
           this.coursenum = abc[0]["countnum"];
           
    
            console.log(this.coursenum);
        });
      }

   getRoleEmail(email){
     console.log("Email sent to function is "+email);
    this.mapServicing.getRoleByEmail(email).subscribe(
      res =>{
        console.log("The response is "+JSON.stringify(res));
        this.role = res;
        this.RoleID = this.role[0]["RoleID"];

        console.log("The role of user is "+this.RoleID);
    });
   }

   getApprovalEmail(email){
   this.mapServicing.getApprovalByEmail(email).subscribe(
     res =>{
       this.approve = res;
       this.Approval = this.approve[0]["Approval"];

       console.log("Approval value: "+this.Approval);
   });
  }

   activeButton() {
     this.isActive=!this.isActive;
   }

   logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

  login()
  {
    this.router.navigate(['login']);
    console.log("Hi");
  }

  readStops(){
    this.show_read_stops_event.emit();
} 

//user clicks View Trip Data menu
  viewTripData(trip) {
      //add logic to capture tripID here
      this.tripData = trip;
      console.log("testing view trip id in map component: " + this.viewTripID);
  }

  editTripData(trip) {
    //add logic to capture tripID here
    this.tripData = trip;
    this.isStopRiskEdit=true;
    this.isStopTaskEdit=true;
    this.isTripRiskEdit=true;
    this.isEditTrip=true;
    console.log("testing edit trip id in map component: " + this.isEditTrip);
}
    // user clicks the 'read risks' button
    readRisks(stop){
      this.riskTripID=stop[0].TripID;
      this.riskStopID=stop[0].StopID;
      this.startTripFlow=this.isStartTripFlow;

      console.log("tripid onclick testing in map " + this.riskTripID);
      console.log("stopid onclick testing in map " + this.riskStopID);
      console.log("testing for start trip flow map " + this.startTripFlow);
    }

        // user clicks the 'read risks' button
    readTripRisks(){
      this.riskTripID=this.tripId;

      console.log("tripid onclick testing in map for trip risk " + this.riskTripID);
    }

    addCourse(){
     // console.log(this.authService.userInfo);
      var sem= $('select[name=sem]').val();
      var year=  $('select[name=year]').val();

      if(year=='1'){
        var fullYear=this.nextYear;
      }
      else{
        var fullYear=this.currentYear;
      }
      var date= fullYear + '-' + sem + '-' + '05';
      const classDetails = {
        coursename : this.course_name,
        semester :date ,
        Email : this.userEmail,
      }
      console.log(classDetails);
      this.mapServicing.createCourse(classDetails).subscribe(
        res =>{
          this.courseId = res.insertId;
          console.log(this.courseId);
      });
    }


    getcourseId(courseId){
       this.courseId = courseId;
      console.log(this.courseId);
    }

   createTrip(){
     this.clearPreviousMarkers();
      this.labelIndex = 0;
    this.isStartTripFlow = false;
    this.stops = [];
      const newTrip = {
  
        trip_name : this.trip_name,
        description : this.description,
// changed
        //start_date : this.start_date,
        //end_date : this.end_date
        start_date : this.start_date["formatted"],
        end_date : this.end_date["formatted"],
        course_Id :this.courseId
      }

      console.log(newTrip)
      console.log("the courseid is "+ this.Id);
      this.mapServicing.createNewTrip(newTrip).subscribe(
        res =>{
      
          this.tripId = res;
          console.log(this.tripId)
      });
    }
  

  autocomplete()
  {

    var pacContainerInitialized = false; 
                        $('#stop_location').keypress(function() { 
                                if (!pacContainerInitialized) { 
                                        $('.pac-container').css('z-index', '9999'); 
                                        pacContainerInitialized = true; 
                                } 
                        }); 
    console.log("Entered autocomplete")
    var locationmap = this.map
    var searchStop = document.getElementById('stop_location')
    console.log("searchStop:",searchStop);
    
    var searchStopBox = new google.maps.places.SearchBox(searchStop);
    console.log(searchStopBox);
  }

  save()
  {
    var saveMap = this.map
    var newgeocoder = this.geocoder
//changed
    //var location = $("#stopLocation").val()
    var location = $("#stop_location").val()
  
    this.stop_lat = ($( "#lat" ).val())
    this.stop_long = ($( "#lng" ).val())
    console.log(location)
    console.log
    if(location != "" && this.stop_lat != "")
    {
      console.log("Went in")
      //directly save to databse
    }
    else if(location != ""){
      
      //this.geocodeAddress(newgeocoder, saveMap, location) 
      this.geocodeAddress(this.geocoder, this.map, location); 
    }

    else if(this.stop_lat != ""){
      
      var location1 = {lat: parseFloat(this.stop_lat), lng: parseFloat(this.stop_long)};
      console.log(location1);
      this.geocodeLatLng(this.geocoder, this.map, this.infowindow, location1);

    }
  }

  //create stop


  createStop(){

    console.log(this.tripId)
    this.isReadonly = false;
    console.log("isread:",this.isReadonly);
    this.isCreateSuccessful = true;
//changed
    var saveMap = this.map
    var newgeocoder = this.geocoder
    var location = $("#stop_location").val()
    this.stop_lat = ($( "#lat" ).val())
    this.stop_long = ($( "#lng" ).val())

    if(location != "" && this.stop_lat != "")
    {
      console.log("Went in")
      let newStop = {
  
        //StopName : this.stop_name,
        //Description : this.stop_description,
        StopName : ($("#stopName").val()),
        Description : ($("#stopDesc").val()),
        Lat : ($( "#lat" ).val()),
        Lng : ($( "#lng" ).val()),
        TripID: this.tripId,
        //Location : this.stop_location
      Location : ($("#stop_location").val())  
      };
  
  
      console.log("new stop: "+newStop);
    
       this.mapServicing.addNewStop(newStop).map(res => res.json()).mergeMap(
        res => this.mapServicing.getStopByStopID(res))
       .subscribe(
        data => {this.stops.push(data);
          console.log("stops from stop.ts",this.stops); 
          this.stopId = this.stops[0][0].StopID;
          
  
          console.log("stopId in stop: " + this.stopId);
          console.log("tripId in stop: " + this.stops[0][0].TripID);
        });
      //directly save to databse
    }

    else if(location != "")
    {
      console.log("Went inside location")
      console.log(location)
      //this.geocodeAddress(newgeocoder, saveMap, location) 
      //this.geocodeAddress(this.geocoder, this.map, location); 

      var c;
      var a;
      a = this.labels
      //console.log(a)
      console.log(this.labelIndex++)
      var b = this.labelIndex
  
      var address = location 
      console.log(this.tripId)
    console.log(address)
    
   var newStop = {
  
      //StopName : this.stop_name,
      //Description : this.stop_description,
      StopName : ($("#stopName").val()),
      Description : ($("#stopDesc").val()),
      Lat : ($( "#lat" ).val()),
      Lng : ($( "#lng" ).val()),
      TripID: this.tripId,
      //Location : this.stop_location
    Location : ($("#stop_location").val())  
    };

    var mapservice = this.mapServicing
    var pushstops = this.stops
    var pushstopid = this.stopId
    var stopmarker = this.stopMarkers
      this.geocoder.geocode({'address': address}, function(results, status) {
        console.log(results)
        if (status === 'OK') {

          console.log(this.tripId)
          saveMap.setCenter(results[0].geometry.location);
          console.log(results[0].geometry.location)
          var loc =[]
          loc[0]=results[0].geometry.location.lat();
          loc[1]=results[0].geometry.location.lng();
  
          console.log(loc[0])
          console.log(loc[1])
  //changed
          $('#lat').val(loc[0]);
          $('#lng').val(loc[1]);
          console.log( $('#lat').val(loc[0]))
        console.log($('#lng').val(loc[1]))

        c = a[b]
          var marker = new google.maps.Marker({
            map: saveMap,
            position: results[0].geometry.location, 
            label:c
          
          });
          stopmarker.push(marker)
          newStop["Lat"] = ($( "#lat" ).val())
         newStop["Lng"] = ($( "#lng" ).val())
          var finalstop = newStop
        console.log(newStop);
      console.log(finalstop)
         
      mapservice.addNewStop(newStop).map(res => res.json()).mergeMap(
        res => mapservice.getStopByStopID(res))
       .subscribe(
        data => {pushstops.push(data);
          console.log("stops from stop.ts",pushstops); 
          pushstopid = pushstops[0][0].StopID;
          
  
          console.log("stopId in stop: " + pushstopid);
          console.log("tripId in stop: " + pushstops[0][0].TripID);
          $( "#lat" ).val('')
          $( "#lng" ).val('')

        });
          
          
        } else {
          //alert('Geocode was not successful for the following reason: ' + status);
        }
        //return results;
      });
      

    }

    else if(this.stop_lat != ""){
      
      var location1 = {lat: parseFloat(this.stop_lat), lng: parseFloat(this.stop_long)};
      console.log(location1);
      //this.geocodeLatLng(this.geocoder, this.map, this.infowindow, location1);

      var c;
    var a;
    a = this.labels

    console.log(this.labelIndex++)
    var b = this.labelIndex

    var latlng = location1;
    let newStop = {
  
      //StopName : this.stop_name,
      //Description : this.stop_description,
      StopName : ($("#stopName").val()),
      Description : ($("#stopDesc").val()),
      Lat : ($( "#lat" ).val()),
      Lng : ($( "#lng" ).val()),
      TripID: this.tripId,
      //Location : this.stop_location
    Location : ($("#stop_location").val())  
    };
    var mapservice = this.mapServicing
    var pushstops = this.stops
    var pushstopid = this.stopId
    var infowindow = this.infowindow
    var stopmarker = this.stopMarkers
    this.geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          saveMap.setZoom(11);
          c = a[b]
          var marker = new google.maps.Marker({
            position: latlng,
            map: saveMap,
            label: c
          });
          stopmarker.push(marker)
          infowindow.setContent(results[0].formatted_address);
          console.log(results[0].formatted_address)
//changed
          $('#stop_location').val(results[0].formatted_address);
          infowindow.open(saveMap, marker);
          newStop["Location"] = ($("#stop_location").val())  
          mapservice.addNewStop(newStop).map(res => res.json()).mergeMap(
            res => mapservice.getStopByStopID(res))
           .subscribe(
            data => {pushstops.push(data);
              console.log("stops from stop.ts",this.stops); 
              pushstopid = pushstops[0][0].StopID;
              
      
              console.log("stopId in stop: " + pushstopid);
              console.log("tripId in stop: " + pushstops[0][0].TripID);
              $("#stop_location").val('')
            });

        } else {
          //window.alert('No results found');
        }
      } else {
        //window.alert('Geocoder failed due to: ' + status);
      }
    });



      
  
  
      console.log("new stop: "+newStop);
    
      

    }

    //this.save();

    /*let newStop = {
  
      //StopName : this.stop_name,
      //Description : this.stop_description,
      StopName : ($("#stopName").val()),
      Description : ($("#stopDesc").val()),
      Lat : ($( "#lat" ).val()),
      Lng : ($( "#lng" ).val()),
      TripID: this.tripId,
      //Location : this.stop_location
		Location : ($("#stop_location").val())  
    };


    console.log("new stop: "+newStop);
  
     this.mapServicing.addNewStop(newStop).map(res => res.json()).mergeMap(
      res => this.mapServicing.getStopByStopID(res))
     .subscribe(
      data => {this.stops.push(data);
        console.log("stops from stop.ts",this.stops); 
        this.stopId = this.stops[0][0].StopID;
        

        console.log("stopId in stop: " + this.stopId);
        console.log("tripId in stop: " + this.stops[0][0].TripID);
      });*/
      
  }

  // For StartTripFlow:
  getStopsByTrip(trip_id) {
    this.stops=[];
    this.isStartTripFlow = true;
    console.log("Coming within getStopsBy trip ID");
    //alert('Starting the trip .... \n' + 'To Complete the task click on specify task from Stop-summary window')
    this.mapServicing.getStops(trip_id)
    .subscribe(sts1 => {
      
      console.log(sts1);
      this.sts1=sts1;
      for (var each in this.sts1){
        console.log(each);
        console.log("can come till here ...");
        let arr1 = [];
        arr1[0] = sts1[each];
        this.stops.push(arr1);
    }
    console.log(this.stops);
    console.log("Printing this line : " + this.stops[0][0].StopName);
    });
    //console.log("Printing this line : " + this.stops[0][0].StopName);
  }
  

  createFromEditStop(){
    this.isReadonly = false;
    console.log("isread:",this.isReadonly);
    this.isCreateSuccessful = true;

    this.save();

    let newStop = {
  
      StopName : this.stop_name,
      Description : this.stop_description,
      Lat : ($( "#lat" ).val()),
      Lng : ($( "#lng" ).val()),
      TripID: this.viewTripID,
      Location : this.stop_location
  
    };
    

    console.log("new stop: "+newStop);
  
     this.mapServicing.addNewStop(newStop).map(res => res.json()).mergeMap(
      res => this.mapServicing.getStopByStopID(res))
     .subscribe(
      data => {this.stops.push(data);
        console.log("stops from stop.ts",this.stops); 
        this.stopId = this.stops[0][0].StopID;
        this.viewStopID=this.stops[0][0].StopID;
        

        console.log("stopId in stop: " + this.stopId);
        console.log("stopId in viewstopid: " + this.viewStopID); 
        console.log("tripId in stop: " + this.stops[0][0].TripID);
      });
      
  }

  //Update stop

  removeStop(stop){
    this.isReadonly = false;
    console.log("stop in remove",stop[0].StopID);
    this.mapServicing.deleteStopByStopID(stop[0].StopID).subscribe(
      res=>{
        let index = this.stops.indexOf(stop);
        this.stops.splice(index, 1);
      }
    );
  }
  
  viewStop(stop){
    this.isEdit = false;
    this.refreshData(stop);
    this.isReadonly = true;
  }
  
  
  editStop(stop){
    this.isReadonly = false;
    this.isEdit = true;
    this.refreshData(stop);
    this.stopid = stop[0].StopID;
    this.tripid = stop[0].TripID;
    this.index = this.stops.indexOf(stop[0]);
    this.stopforupdate = stop[0];

  }
  
  updateStop(data){
    this.isReadonly = false;
    console.log("inside update updated data",data);
    console.log("data in edit stop: " + data.stopName);
    console.log("update stopfor values: ", this.stopforupdate);
    if(data.stopName){
      this.stopforupdate.StopName = data.stopName;
    }
    if(data.stopDesc){
      this.stopforupdate.Description = data.stopDesc;
    }
    if(data.stopLocation){
      this.stopforupdate.Location = data.stopLocation;
    }
    if(data.lat){
      this.stopforupdate.Lat = data.lat;
    }
    if(data.lng){
      this.stopforupdate.Lng = data.lng;
    }

    this.stopforupdate.StopID = this.stopid;

    let updatedStop = this.stopforupdate;
    /*{
  
      /*StopName : data.stopName,
      Description : data.stopDesc,
      Lat : data.lat,
      Lng : data.lng,
      TripID: this.tripid,
      Location : data.stopLocation,
      StopID: this.stopid*/
      /*StopName : ($("#stopName").val()),
      Description : ($("#stopDesc").val()),
      Lat : this.stop_latitude,
      Lng : this.stop_longitude,
      TripID: this.tripId,
      //Location : this.stop_location
    Location : this.stop_location,
    StopID: this.stopid
  
  };*/
    console.log("updated stop: ",updatedStop);

	if(!this.isEditTrip){
    	this.updateData(data);
	}
  
    console.log("after setting name",this.stop_name);
    console.log("after setting stopid",this.stopid);
    this.mapServicing.updateStopByStopID(updatedStop,this.stopid).subscribe(
      res=>{
      }
    );
  } 
  
  refreshData(stop){
    this.stop_name = stop[0].StopName;
    this.stop_description = stop[0].Description;
    this.stop_latitude = stop[0].Lat;
    this.stop_longitude = stop[0].Lng;
    this.stop_location = stop[0].Location;
  }
  
  clearFields(){
    this.stop_name = '';
    this.stop_description = '';
    this.stop_latitude = '';
    this.stop_longitude = '';
    this.stop_location = '';
    
  
  }


  clearTripFields(){
    this.trip_name='';
    this.description='';
    this.start_date='';
    this.end_date='';
  }
  
  
  changeSetting(){
    this.isReadonly = false;
    this.clearFields();
    this.isCreateSuccessful = false;
    this.isUpdateSuccessful = false;
    this.isEdit = false;
  }
  
  
  updateData(data){
    this.isUpdateSuccessful = true;
    let newUpdatedStop = {
      StopName : data.stopName,
      Description : data.stopDesc,
      Lat : data.lat,
      Lng : data.lng,
      TripID: this.tripid,
      Location : data.stopLocation
  
    };
    console.log("testing updateData: " + newUpdatedStop);
    this.stops[this.index]=newUpdatedStop;
    console.log("testing updateData1: " + this.stops[this.index]);
  }


  searchMap()
  {
    var c;
    var a;
    var funThis=this;
    a = this.labels

    console.log(this.labelIndex++)
    var b = this.labelIndex
    
    
      $('#IndividualStopModal').modal('hide')
      var finalmap= this.map
      google.maps.event.clearListeners(finalmap, 'click');
   
      var newgeocoder = this.geocoder
      google.maps.event.addListener(finalmap, 'click', function(event) {

        var lat_1 = parseFloat(event.latLng.lat()).toFixed(6);
        var lng_1 = parseFloat(event.latLng.lng()).toFixed(6);

        $("#lat").val(lat_1)
        $("#lng").val(lng_1)

        var location2 = {lat: parseFloat(lat_1), lng: parseFloat(lng_1)}

        console.log(location2)

        newgeocoder.geocode({'location': location2}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
//changed
        //      $("#stopLocation").val(results[0].formatted_address)
              $("#stop_location").val(results[0].formatted_address)              



              console.log(a)
          console.log(b)

        c= a[b]
        console.log("The label" + c)

        addMarker(event.latLng, finalmap, c)
        //k = k+1;
        $('#IndividualStopModal').modal('show')
            } 
          }
        });
      });



    function addMarker(location, map, c) 
    {
     
      
        
        console.log("Value entered")
          var marker = new google.maps.Marker({
          position: location,
          label: c,
          map: map
        });
        
        funThis.stopMarkers.push(marker);
        console.log("funThis marker: " + funThis.stopMarkers);   
      
    }  
  
  }

  clearStopMarkers() { 
    console.log("in clear stop marker: " + this.stopMarkers);
      console.log("in clear stop marker length: " + this.stopMarkers.length);
      for (var i = 0; i < this.stopMarkers.length; i++) {
        this.stopMarkers[i].setMap(null);
      }
      this.stopMarkers = [];
      this.clearTripFields();
      //this.refreshTrips();
      this.clearFields();
  }

  loadtripdetails(tripid)
  {
//changed
    this.clearPreviousMarkers();
    var newmarkerarray = [];
    var newmarkers = this.markers
    console.log(this.map)
    var newMap = this.map
    console.log(tripid)
    this.updatetripid = tripid;
    this.viewTripID = tripid;
    this.mapServicing.getTripById(tripid).subscribe(
      res =>{
      this.tripbyid = res;
      console.log(this.tripbyid);
        var id = this.tripbyid[0]["TripID"]
        console.log(id)
      this.mapServicing.getStops(id).subscribe(
        res =>{
          this.showstops = res;
          console.log(this.showstops)
           var neighborhoods = []
          
          var labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
          for (var eachstop of this.showstops){
            console.log(eachstop.Lat)
            console.log(eachstop.Lng)
            //console.log(labels[labelcount])
            var latlng = {lat: eachstop.Lat, lng: eachstop.Lng, stopid: eachstop.StopID}
            neighborhoods.push(latlng)
            //labelcount =  labelcount +1;
          }
          console.log(neighborhoods)
          
          
          var labelcount = 0
          clearMarkers();
          for (var i = 0; i < neighborhoods.length; i++) {
            var labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
            console.log("went in")
            addMarkerWithTimeout({lat: neighborhoods[i]["lat"], lng: neighborhoods[i]["lng"]}, i * 200, labels[labelcount], neighborhoods[i]["stopid"]);
            labelcount = labelcount + 1
          }

          function addMarkerWithTimeout(position, timeout, label, stopid) {
            console.log("Went in again")
            window.setTimeout(function() {
              
              newmarkers.push(new google.maps.Marker({
                position: position,
                map: newMap,
                label: label,
                animation: google.maps.Animation.DROP, 
                stopid: stopid
              }));
              
             
             //var markerarray = []
           for (var each of newmarkers){
            each.addListener('click', function() {
              newmarkerarray.push(each.stopid)
              console.log(newmarkerarray)
              
              google.maps.event.clearListeners(newMap, 'click');

            });
            
           
           }

              //this.stoparray = newmarkers
              //console.log(this.stoparray)
              //displaystops(this.stoparray)
            }, timeout);

            
            
          }

          this.previous = newmarkers;
    
          /*function displaystops(stoparray){
            console.log(stoparray)
            for (var eachstop of stoparray){
             eachstop.addListener('click', function() {
                console.log(eachstop)
            });
            }
            
          }*/
          
          
          function clearMarkers() {
            console.log("Went in clear")
            console.log(newmarkers.length)
            for (var i = 0; i < newmarkers.length; i++) {
              newmarkers[i].setMap(null);
              this.previous[i].setMap(null);
            }
            newmarkers = [];
          }
        })
      //$('#TripModal').modal('show');
 
      
       
    });
    
  }


   clearPreviousMarkers() {
    for (var i = 0; i < this.previous.length; i++) {
      this.previous[i].setMap(null);

    }
    this.previous = [];
  }
  
  refreshTrips(courseId){
    this.mapServicing.getTrip(courseId).subscribe(
      res =>{
    
      this.trip = res;
      console.log(this.trip)
      
      for (var each of this.trip){
          console.log(each.TripName)
      } 
    });
  }

  
  refreshClasses(){
    this.mapServicing.getAllCoursesByEmail(this.userEmail).subscribe(
      res =>{
    
      this.course = res;
      console.log(this.course)
      
      for (var each of this.course){
          console.log(each.courseName)
      } 
    });
  }
  studentclasses(){
    this.mapServicing.getStudentcourseByEmail(this.userEmail).subscribe(
      res =>{
    
      this.course = res;
      console.log(this.course)
      
      for (var each of this.course){
          console.log(each.courseName)
      } 
    });

  }
  


  updateTrip(){
    console.log(this.updatetripid)
  }

  geocodeLatLng(geocoder, map, infowindow, location1) {

    var c;
    var a;
    a = this.labels

    console.log(this.labelIndex++)
    var b = this.labelIndex

    var latlng = location1;
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          map.setZoom(11);
          c = a[b]
          var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            label: c
          });
          infowindow.setContent(results[0].formatted_address);
          console.log(results[0].formatted_address)
//changed
          $('#stop_location').val(results[0].formatted_address);
          infowindow.open(map, marker);
        } else {
          //window.alert('No results found');
        }
      } else {
        //window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  geocodeAddress(geocoder, resultsMap, location) 
  {


    var c;
    var a;
    a = this.labels
    //console.log(a)
    console.log(this.labelIndex++)
    var b = this.labelIndex

    var address = location 
	console.log(address)
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        console.log(results[0].geometry.location)
        var loc =[]
        loc[0]=results[0].geometry.location.lat();
        loc[1]=results[0].geometry.location.lng();

        console.log(loc[0])
        console.log(loc[1])
//changed
        $('#lat').val(loc[0]);
        $('#lng').val(loc[1]);
        console.log( $('#lat').val(loc[0]))
      console.log($('#lng').val(loc[1]))

        c = a[b]
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location, 
          label:c
        
        });
        
      } else {
        //alert('Geocode was not successful for the following reason: ' + status);
      }
      //return results;
    });
  }



  getstartlocation(){
    
    console.log($( "#start_location" ).val())
    this.start = ($( "#start_location" ).val())
    this.geocodeAddress(this.geocoder, this.map, this.start)
  }

  getstartlatitude(){
    
    console.log($("#start_latitude").val())
    console.log($("#start_longitude").val())
    this.start_lat = ($( "#start_latitude" ).val())
    this.start_long = ($( "#start_longitude" ).val())
    var location1 = {lat: parseFloat(this.start_lat), lng: parseFloat(this.start_long)}
    this.geocodeLatLng(this.geocoder, this.map, this.infowindow, location1)

   }
   

  
 
  ngOnInit() {

    var label = ['A','B','C', 'D', 'E', 'F']
    var labelIndex = 0;
    
    //$('.modal').modal();
    

      
      
    /* this.mapServicing.getTrip().subscribe(
      res =>{
    
      this.trip = res;
      console.log(this.trip)
      
      for (var each of this.trip){
          console.log(each.TripName)
      }    
    }); */

    

    this.mapProp = {
      //removed to enable current geolocation and vice versa
      center: new google.maps.LatLng(51.508742, -0.120850),
      zoom: 15,
      mapTypeId: 'roadmap'
      
      
  };

 
  
  this.map = new google.maps.Map(document.getElementById("googleMap"), this.mapProp);
  this.card = document.getElementById('pac-card');

  this.input = document.getElementById('searchBox');
  console.log(this.input)

  this.searchBox = new google.maps.places.SearchBox(this.input);

  this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(this.card);




  var finalbox = this.searchBox

  var finalmap = this.map
  this.map.addListener('bounds_changed', function() {
    console.log("New change Listener entered")
   finalbox.setBounds(finalmap.getBounds());

  });

  

  var markers = [];
  
  finalbox.addListener('places_changed', function() {
    var places = finalbox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: finalmap,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    finalmap.fitBounds(bounds);
  });




  /*var infoWindow;
   //var bangalore = { lat: 12.97, lng: 77.59 };
 


  infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(finalmap);
        finalmap.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, finalmap.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, finalmap.getCenter());
    }
  

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(finalmap);
  }*/

}
  



}