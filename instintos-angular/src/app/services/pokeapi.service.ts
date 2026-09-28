import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

@Injectable({providedIn:'root'})
export class PokeApiService {
  private readonly url='https://pokeapi.co/api/v2/pokemon?limit=1';
  constructor(private http:HttpClient){}
  checkConnection(){
    return this.http.get<{count:number}>(this.url).pipe(
      map(r=>({connected:true,count:r.count})),
      catchError(()=>of({connected:false,count:0}))
    );
  }
}
