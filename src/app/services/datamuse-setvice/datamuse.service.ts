import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DatamuseService {
  private baseUrl = 'https://api.datamuse.com/words?ml='

  constructor(
    private httpClient: HttpClient
  ) { }

  getSynonyms(word: string) {
    return this.httpClient.get<any[]>(`${this.baseUrl}${word}`);
  }

}
