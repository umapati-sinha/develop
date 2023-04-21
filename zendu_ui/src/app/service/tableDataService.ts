import { Injectable } from '@angular/core';

@Injectable()
export class TableDataService {
  private searchtext:any;
  private filter:any;
  data!: { task: string; status: string; from: string; to: string; address: string; dueDate: string; date: number; }[];

  private getData(page: number, pageSize: number, filter?: any, searchText?: string, searchDate?: number) {
    this.data= [
      {
        task: 'Work Flow: Requires Location',
        status: 'Unassigned',
        from: 'zendu@zendu.com',
        to: 'tracy@zenduit.com',
        address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
        dueDate: 'Apr 20, 4:35 AM',
        date: 20042023
      },
      {
        task: 'Work Flow: Requires Location',
        status: 'Low Risk',
        from: 'zendu@zendu.com',
        to: 'tracy@zenduit.com',
        address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
        dueDate: 'Apr 21, 4:35 PM',
        date: 21042023
      },
      {
        task: 'Work Flow: Requires Location',
        status: 'Uncomplete',
        from: 'zendu@zendu.com',
        to: 'tracy@zenduit.com',
        address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
        dueDate: 'Apr 20, 7:35 AM',
        date: 20042023
      },
      {
        task: 'Work Flow: Requires Location',
        status: 'Low Risk',
        from: 'zendu@zendu.com',
        to: 'tracy@zenduit.com',
        address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
        dueDate: 'Apr 18, 4:35 AM',
        date: 18042023
      },
      {
        task: 'Work Flow: Requires Location',
        status: 'Unassigned',
        from: 'zendu@zendu.com',
        to: 'tracy@zenduit.com',
        address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
        dueDate: 'Apr 18, 6:23 PM',
        date: 18042023
      },
      {
        task: 'Work Flow: Requires Location',
        status: 'Low Risk',
        from: 'zendu@zendu.com',
        to: 'tracy@zenduit.com',
        address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
        dueDate: 'Apr 17, 4:35 AM',
        date: 17042023
      },
      {
        task: 'Work Flow: Requires Location',
        status: 'Uncomplete',
        from: 'zendu@zendu.com',
        to: 'tracy@zenduit.com',
        address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
        dueDate: 'Apr 16, 4:35 AM',
        date: 16042023
      },
      {
        task: 'Work Flow: Requires Location',
        status: 'Low Risk',
        from: 'zendu@zendu.com',
        to: 'tracy@zenduit.com',
        address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
        dueDate: 'Apr 15, 4:35 AM',
        date: 15042023
      },
      {
        task: 'Work Flow: Requires Location',
        status: 'Unassigned',
        from: 'zendu@zendu.com',
        to: 'tracy@zenduit.com',
        address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
        dueDate: 'Apr 18, 4:35 AM',
        date: 18042023
      },
      {
        task: 'Work Flow: Requires Location',
        status: 'Low Risk',
        from: 'zendu@zendu.com',
        to: 'tracy@zenduit.com',
        address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
        dueDate: 'Apr 18, 4:35 AM',
        date: 18042023
      },
      {
        task: 'Work Flow: Requires Location',
        status: 'Uncomplete',
        from: 'zendu@zendu.com',
        to: 'tracy@zenduit.com',
        address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
        dueDate: 'Apr 19, 4:35 AM',
        date: 19042023
      },
      {
        task: 'Work Flow: Requires Location',
        status: 'Low Risk',
        from: 'zendu@zendu.com',
        to: 'tracy@zenduit.com',
        address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
        dueDate: 'Apr 20, 4:35 AM',
        date: 20042023
      },
      {
        task: 'Work Flow: Requires Location',
        status: 'Unassigned',
        from: 'zendu@zendu.com',
        to: 'tracy@zenduit.com',
        address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
        dueDate:'Apr 14, 4:35 AM',
        date: 14042023
      },
      {
        task: 'Work Flow: Requires Location',
        status: 'Low Risk',
        from: 'zendu@zendu.com',
        to: 'tracy@zenduit.com',
        address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
        dueDate: 'Apr 21, 4:35 AM',
        date: 21042023
      },
      {
        task: 'Work Flow: Requires Location',
        status: 'Uncomplete',
        from: 'zendu@zendu.com',
        to: 'tracy@zenduit.com',
        address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
        dueDate: 'Apr 04, 4:35 AM',
        date: 4042023
      },
      {
        task: 'Work Flow: Requires Location',
        status: 'Low Risk',
        from: 'zendu@zendu.com',
        to: 'tracy@zenduit.com',
        address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
        dueDate: 'Apr 19, 4:35 AM',
        date: 19042023
      }
    ];
    let resultData = filter ? this.data.filter((val) => val.status === filter) : this.data;
    if(searchText && searchText.trim().length > 0){
      resultData = resultData.filter((val:any) => val.task.toLowerCase().includes(searchText.toLocaleLowerCase()));
    }

    if(searchDate)
    resultData = resultData.filter((val:any) => val.date === searchDate);
    return {
      data: resultData.slice(page * pageSize, (page * pageSize) + pageSize),
      totalRecords: resultData.length
    };
  }

  private getDate(date: Date) {
    const dateStr = date.toDateString().split(' ');
    const time = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    const val = dateStr[1] + ' ' + dateStr[2] + ',' + time;
    return val;
  }

  getTableData(page: number, pageSize: number, filter?: string, searchText?: string, searchDate?: number){
    return new Promise((resolve, reject) => {
      setTimeout(() =>{
        resolve(this.getData(page, pageSize, filter, searchText, searchDate));
      }, 1000);
    });
  }
}
