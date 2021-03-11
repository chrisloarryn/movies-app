import { Injectable } from '@angular/core';
import { LoginI } from '../../models/login.interface';
import { ResponseI, ResponseRefreshedI } from '../../models/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://solodata.es/';
  baseUrl: 'http://161.35.140.236:9005/api' = 'http://161.35.140.236:9005/api';

  constructor(private http: HttpClient) {}

  canMakeRequests(): boolean {
    return !localStorage.getItem('token') // || !localStorage.getItem('refresh_token')
  }

  loginByEmail(form: LoginI): Observable<ResponseI> {
    let composeUrl = `${this.baseUrl}/auth/login`;
    return this.http.post<ResponseI>(composeUrl, form, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        accept: '*/*',
      },
    });
  }

  renewToken(token: string): Observable<ResponseRefreshedI> {
    let composeUrl = `${this.baseUrl}/auth/refresh`;
    return this.http.post<ResponseRefreshedI>(composeUrl, { refresh_token: token });
  }

  getMeData(): Observable<any> {
    let composeUrl = `${this.baseUrl}/user/me`;
    const token = localStorage.getItem('token');
    return this.http.get(composeUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getAllDistributions(movieId: string): Observable<any> {
    let composeUrl = `${this.baseUrl}/movies/${movieId}/actors`
    const token = localStorage.getItem('token');
    return this.http.get(composeUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getImageUrl(path: string, baseUrl: string = 'https://image.tmdb.org/t/p/w200'): string {
    const base = baseUrl
    if (!path) return 'https://static.wikia.nocookie.net/disney/images/2/24/ChickenLittle.png/revision/latest/top-crop/width/360/height/450?cb=20130315134107&path-prefix=es'
    else return `${base}${path}`
  }

  getAllNowPlaying(): Observable<any> {
    let composeUrl = `${this.baseUrl}/movies/now_playing`
    const token = localStorage.getItem('token');
    return this.http.get(composeUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getAllPopulars(): Observable<any> {
    let composeUrl = `${this.baseUrl}/movies/popular`
    const token = localStorage.getItem('token');
    return this.http.get(composeUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  truncateString(str: string, num: number): string {
    // Clear out that junk in your trunk
    if (str.length > num) return `${str.slice(0, num)}...`
    else return str
  }
  

  /* getAllPatients(page: number): Observable<ListapacientesI[]> {
    let direccion = this.url + 'pacientes?page=' + page;
    return this.http.get<ListapacientesI[]>(direccion);
  }

  getSinglePactient(id): Observable<PacienteI> {
    let direccion = this.url + 'pacientes?id=' + id;
    return this.http.get<PacienteI>(direccion);
  }

  putPatient(form: PacienteI): Observable<ResponseI> {
    let direccion = this.url + 'pacientes';
    return this.http.put<ResponseI>(direccion, form);
  }

  deletePatient(from: PacienteI): Observable<ResponseI> {
    let direccion = this.url + 'pacientes';
    let Options = {
      headers: new HttpHeaders({
        'Conten-type': 'application/json',
      }),
      body: from,
    };
    return this.http.delete<ResponseI>(direccion, Options);
  }

  postPatient(form: PacienteI): Observable<ResponseI> {
    let direccion = this.url + 'pacientes';
    return this.http.post<ResponseI>(direccion, form);
  } */
}
