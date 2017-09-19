import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class BookingService {
    booking: any;
    user: any;
    private bookingUrl = environment.api_url + 'notifications';

    constructor (private http: Http) {
        let date = new Date();
        this.booking = {
            fromAirport: {
                code: 'SEA',
                name: '',
                city: '',
                country: ''
            },
            toAirport: {
                code: 'BCN',
                name: '',
                city: '',
                country: ''
            },
            endDate: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7),
            startDate: date,
            there: {
                distance: '3750',
                duration: '13h 22m',
                fromCode: 'SEA',
                toCode: 'BCN',
                id: '0',
                price: '835',
                segments: [
                    {
                        arrivalTime: '2017-03-04T08:15:00Z',
                        departTime: '2017-03-04T13:08:00Z',
                        flight: '935',
                        fromCity: 'Seattle',
                        fromCode: 'SEA',
                        toCity: 'Paris',
                        toCode: 'CDG'
                    },
                    {
                        arrivalTime: '2017-03-05T11:30:00Z',
                        departTime: '2017-03-04T09:50:00Z',
                        flight: '851',
                        fromCity: 'Paris',
                        fromCode: 'CDG',
                        toCity: 'Barcelona',
                        toCode: 'BCN'
                    }

                ]
            },
            back: {
                distance: '3450',
                duration: '15h 45m',
                fromCode: 'BCN',
                id: '6',
                price: '875',
                segments: [
                    {
                        arrivalTime: '2017-03-04T12:40:00Z',
                        departTime: '2017-03-04T10:30:00Z',
                        flight: '698',
                        fromCity: 'Barcelona',
                        fromCode: 'BCN',
                        toCity: 'Frankfurt',
                        toCode: 'FRA'
                    },
                    {
                        arrivalTime: '2017-03-04T17:15:00Z',
                        departTime: '2017-03-04T15:30:00Z',
                        flight: '334',
                        fromCity: 'Frankfurt',
                        fromCode: 'FRA',
                        toCity: 'Seattle',
                        toCode: 'SEA'
                    }
                ]
            },
            seat: '22B'
        };
    }

    get(): any {
        return this.booking;
    }

    push(): any {
        let data = {"type":1, "tag":this.user.profile.sub};
        let bodyString = JSON.stringify(data);
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.bookingUrl, bodyString, options)
        .map(this.extractData)
        .catch(this.handleError);
    }

    set(data: any) {
        this.booking = data;
    }

    setUser(data: any) {
        this.user = data;
    }

    private extractData(res: Response) {
        return Response;
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
             errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}