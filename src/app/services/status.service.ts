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

  getStatusList(pageSize: number) {
    if (this.FromDate && this.ToDate) {
      return this.http.get<[status[], number]>(
        `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/${localStorage.getItem(
          'username'
        )}/statuses?key=${this.lastStatusID}&limit=${pageSize}&start_date=${
          this.FromDate
        }&end_date=${this.ToDate}`,
        {
          headers: new HttpHeaders({
            token: `${localStorage.getItem('token')}`,
          }),
        }
      );
    }
    return this.http.get<[status[], number]>(
      `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/${localStorage.getItem(
        'username'
      )}/statuses?key=${this.lastStatusID}&limit=${pageSize}`,
      {
        headers: new HttpHeaders({
          token: `${localStorage.getItem('token')}`,
        }),
      }
    );
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
    return this.http.post<[string, number]>(
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
}
