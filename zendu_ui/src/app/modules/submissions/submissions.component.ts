import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, EventEmitter  } from '@angular/core';
import { TableDataService } from 'src/app/service/tableDataService';
import { ExportService } from 'src/app/service/exportService';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css'],
})
export class SubmissionsComponent implements OnInit {
  value: any;
  formList: any[] = [];
  statusList: any[] = [];
  selectedStatus: any;
  selectedForm: any = {};
  selectedDate: any;
  stateOptions: any = [];
  selectedDashboard: any;
  tableData: any[] = [];
  selectedDatas: any[] = [];
  tableHeaders: any = [];
  selectAll = false;
  loading = false;
  totalRecords = 0;
  res: any;
  rows = 4;
  first = 0;
  pageReport = '';
  currentPage = 0;
  searchText!: string;
  map!: google.maps.Map;
  lat = 40.730610;
  lng = -73.935242;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    mapTypeControl: false,
    streetViewControl: false,
  };
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });

  @ViewChild('mapContainer', {static: false}) gmap!: ElementRef;
  @ViewChild('dashboardChanger') eleRef!: ElementRef;

  zoom = 12;
checkBox: boolean[] = [];
  markers = [
    {
      position: new google.maps.LatLng(40.73061, 73.935242),
      map: this.map,
      title: "Marker 1"
    },
    {
      position: new google.maps.LatLng(32.06485, 34.763226),
      map: this.map,
      title: "Marker 2"
    }
  ];

  public myEvent: EventEmitter<void>;
  constructor(
    private tableDataService: TableDataService,
    private exportDataService: ExportService) {
    this.myEvent = new EventEmitter<void>()
   }

  changeDashboard: any;
  firstLoad! : boolean;
  mapInitializer(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

    //Adding Click event to default marker

    //Adding default marker to map
    this.marker.setMap(this.map);

    //Adding other markers
    this.loadAllMarkers();
  }

  loadAllMarkers(): void {
    this.markers.forEach(markerInfo => {
      //Creating a new marker object
      const marker = new google.maps.Marker({
        ...markerInfo
      });

      //creating a new info window with markers info

      //Add click event to open info window on marker

      //Adding marker to google map
      marker.setMap(this.map);
    });
  }


  ngOnInit(): void {
    this.firstLoad = true;
    this.formList = [
      { label: 'Form 1', value: 'Form 1' },
      { label: 'Form 2', value: 'Form 2' },
      { label: 'Form 3', value: 'Form 3' }
    ];

    this.statusList = [
      { label: 'Select Status', value: 'Select Status' },
      { label: 'Unassigned', value: 'Unassigned' },
      { label: 'Uncomplete', value: 'Uncomplete' },
      { label: 'Low Risk', value: 'Low Risk' }
    ];

    this.stateOptions = [
      { label: 'Map', value: 'Map' },
      { label: 'List', value: 'List' }
    ];
    this.selectedDashboard = 'Map';

    this.tableHeaders = [
      { label: 'Task', value: 'task' },
      { label: 'Status', value: 'status' },
      { label: 'From', value: 'from' },
      { label: 'To', value: 'to' },
      { label: 'Customer Address', value: 'address' },
      { label: 'Due Date', value: 'dueDate' },
    ];

    this.loading = true;
    for(let i = 0; i < this.rows; i++){
this.checkBox[i]= false;
    }
    this.loadDatas();
  }

  onSelectAllChange() {
    if (this.selectAll) {
      this.selectedDatas = this.tableData;
      for(let i = 0; i < this.rows; i++){
        this.checkBox[i]= true;
            }
    } else {
      this.selectedDatas = [];
      this.selectAll = false;
      for(let i = 0; i < this.rows; i++){
        this.checkBox[i]= false;
            }
    }
  }

  loadDatas(filter?: any, searchText?: string, searchDate?: number) {
    this.loading = true,
    setTimeout(() => {
      this.tableDataService.getTableData(this.currentPage, this.rows, filter, searchText, searchDate).then(
        (res) => {
          this.res = res;
          this.tableData = this.res.data;
          this.totalRecords = this.res.totalRecords;
          this.loading = false;
          this.pageReport =
            this.first +
            1 +
            ' - ' +
            (this.first + this.rows <= this.totalRecords
              ? +(this.first + this.rows)
              : this.totalRecords + ' of ' + this.totalRecords) +
            ' submissions';
        },
        (error) => {
          console.log(error);
        }
      );
    }, 10);
  }

  onSelectionChange(i: number) {
    this.checkBox[i]?this.selectedDatas.push(this.tableData[i]): '';
     this.selectAll = this.selectedDatas.length === this.tableData.length;
  }

  getDate(date: Date) {
    const dateStr = date.toDateString().split(' ');
    const time = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    const val = dateStr[1] + ' ' + dateStr[2] + ',' + time;
    return val;
  }

  getStatusStyle(val: string) {
    switch (val) {
      case 'Low Risk':
        return {
          'background-color': '#c6f7d8',
          color: '#178e42',
          'border-style': 'solid',
          'border-width': '1px',
          'border-radius': '4px',
        };
      case 'Uncomplete':
        return {
          'background-color': '#ecc2c2',
          color: 'rgb(159, 3, 3)',
          'border-style': 'solid',
          'border-width': '1px',
          'border-radius': '4px',
        };
      case 'Unassigned':
        return {
          'background-color': '#e9e9e9',
          color: 'rgb(93, 93, 93)',
          'border-style': 'solid',
          'border-width': '1px',
          'border-radius': '4px',
        };
      default:
        return 'blue';
    }
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.currentPage = event.page;
    this.loadDatas();
    //this.pageReport = this.first+' - '+(this.first+this.rows)+' of '+this.totalRecords;
  }

  onDropdownChange(event: any){
    this.loadDatas(event.value === 'Select Status' ? null : event.value);
  }

  ngAfterViewInit(){
if(this.firstLoad){
  this.mapInitializer();
  this.firstLoad = false;
}
    this.myEvent.subscribe(() => {

      if (this.selectedDashboard === 'List') {
        this.selectedDashboard = 'List';
        this.rows = 10;
      } else {
        this.selectedDashboard = 'Map';
        this.rows = 4;
        this.mapInitializer();
      }
      this.loadDatas();
    },
    (err: Error) => console.error(err));

  }

  dashboardChange(): void {
    this.myEvent.emit();
  }

  onSearch(){
    this.searchText = this.searchText.trim();
    if(this.searchText.length > 0){
      this.loadDatas(this.selectedStatus,this.searchText);
    }
  }

  onDateSelect(event?:any){
    if(event){
      this.loadDatas(this.selectedStatus, this.searchText, this.getNumericDate(this.selectedDate.toLocaleTimeString('en-US', {day: 'numeric', month: 'numeric', year: 'numeric'})));
    }
  }

  exportCsv(){
    const headers: any[]=[] ;
    this.tableHeaders.forEach((element: { label: any; value: any}) => {
      headers.push(element.value);
    });
    this.exportDataService.csvDownload(headers,this.selectedDatas.length>0?this.selectedDatas : this.tableData);
  }
  private getNumericDate(val: any){
    let result=0;
    const value=val.split('/');
    result+=Number.parseInt(value[1]);
    result*=100;
    result+=Number.parseInt(value[0]);
    result*=10000;
    result+=Number.parseInt(value[2]);
    return result;
  }
}
