import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface status {
  title: string;
  concerns: string;
  status_read: boolean;
  task_done: string;
  status_id: string;
  next_week_plans: string;
  submit_time_stamp: string;
  managerial_remarks: string;
}

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  // represents the list of all the status ID fetched from api
  public fullStatusListID: string[];
  public lastStatusID: string;
  public FromDate: string | null;
  public ToDate: string | null;

  constructor(private http: HttpClient) {
    this.fullStatusListID = ['-1'];
    this.lastStatusID = '-1';
    this.FromDate = null;
    this.ToDate = null;
  }

  getStatusList(pageSize: number, username: string | null) {
    let url: string;
    let urlUsername = username;
    if (!urlUsername) {
      urlUsername = localStorage.getItem('username');
    }

    if (this.FromDate && this.ToDate) {
      url = `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/${urlUsername}/statuses?key=${this.lastStatusID}&limit=${pageSize}&start_date=${this.FromDate}&end_date=${this.ToDate}`;
    } else {
      url = `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/${urlUsername}/statuses?key=${this.lastStatusID}&limit=${pageSize}`;
    }
    return this.http.get<{
      data: { status_list: status[]; hasMorePages: boolean };
      statusCode: number;
    }>(url, {
      headers: new HttpHeaders({
        token: `${localStorage.getItem('token')}`,
      }),
    });
  }

  getStatus(statusID: string, username: string | null) {
    let url = `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/${localStorage.getItem(
      'username'
    )}/statuses/${statusID}`;

    if (username) {
      url = `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/${username}/statuses/${statusID}`;
    }
    return this.http.get<{
      data: status;
      meassage: string;
      statusCode: number;
    }>(url, {
      headers: new HttpHeaders({
        token: `${localStorage.getItem('token')}`,
      }),
    });
  }
  addStatus(
    status_id: string,
    title: string,
    status: string,
    task_done: string,
    next_week_plans: string,
    concerns: string,
    leaves_planned: string[]
  ) {
    return this.http.post<{
      message: string;
      data: string;
      statusCode: number;
    }>(
      `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/${localStorage.getItem(
        'username'
      )}/statuses`,
      {
        status_id: status_id,
        title: title,
        status: status,
        task_done: task_done,
        next_week_plans: next_week_plans,
        concerns: concerns,
        leaves_planned: leaves_planned,
      },
      {
        headers: new HttpHeaders({
          token: `${localStorage.getItem('token')}`,
        }),
      }
    );
  }

  addRemark(remark: string, username: string, statusID: string) {
    return this.http.put<{ data: string; message: string; statusCode: number }>(
      `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/${username}/statuses/${statusID}`,

      {
        managerial_remarks: remark,
        status_read: true,
      },
      {
        headers: new HttpHeaders({
          token: `${localStorage.getItem('token')}`,
        }),
      }
    );
  }
}
