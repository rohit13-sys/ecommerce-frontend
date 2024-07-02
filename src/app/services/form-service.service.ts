import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Country} from "../common/country";
import {map} from "rxjs/operators";
import {State} from "../common/state";

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  private countriesUrl = 'http://localhost:8081/api/countries';
  private statesUrl = 'http://localhost:8081/api/states';

  constructor(private httpclient: HttpClient) {
  }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    //build an array for month dropdown
    // - start at desired startmonth and loop until 12

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];

    //build an array for years drop down;
    // - start at current year and loop until next 10 years
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);

  }

  getCountries(): Observable<Country[]> {
    return this.httpclient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(theCountryCode:string):Observable<State[]>{
    const stateSearchUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpclient.get<GetResponseStates>(stateSearchUrl).pipe(
      map(response=>response._embedded.states)
    );
  }


}

interface GetResponseCountries {
  _embedded: {
    countries: Country[]
  }
}


interface GetResponseStates {
  _embedded: {
    states: State[]
  }
}
