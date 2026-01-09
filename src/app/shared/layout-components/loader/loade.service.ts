import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadeService {

  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  setLoaderBehaviour(latestValue: any){
    return this.isLoading.next(latestValue);
  }

  constructor() { }
}
