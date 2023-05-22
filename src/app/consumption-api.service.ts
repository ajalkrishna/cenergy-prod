import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumptionApiService {

  urlEndpoint = 'https://api-v2-sandbox.data.n3rgy.com/mpxn/2234567891000/utility/electricity/readingtype/consumption';
  apiHeader: HttpHeaders = new HttpHeaders({ 'x-api-key': "d388dc30-7562-4835-a21f-93eee1515cbe" })

  constructor(private hc:HttpClient) { }

  getConsumption(urlParamsObj):Observable<any>{
    let urlParams: HttpParams = new HttpParams();
    urlParams = urlParams.append('start', urlParamsObj.start);
    urlParams = urlParams.append('end', urlParamsObj.end);
    urlParams = urlParams.append('granularity', urlParamsObj.granularity);
    urlParams = urlParams.append('outputFormat', 'json');
    return this.hc.get(this.urlEndpoint,{
      headers: this.apiHeader,
      params:urlParams
    })
  }
}
