import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export default interface staticData {
  job_titles: string[];
  status_frequencies: string[];
  weekly_status_days: string[];
}

@Injectable({
  providedIn: 'root',
})
export class StaticDataService {
  staticData: staticData;
  constructor(private http: HttpClient) {
    this.staticData = {
      job_titles: [],
      status_frequencies: [],
      weekly_status_days: [],
    };
  }

  getStaticData() {
    return this.http.get<{
      data: staticData;
      message: string;
      statusCode: number;
    }>(
      'https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/static_data',
      {
        headers: new HttpHeaders({
          token: `${localStorage.getItem('token')}`,
        }),
      }
    );
  }
}
