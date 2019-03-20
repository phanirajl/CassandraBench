import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IServerEntity } from 'app/shared/model/cassandrabench/server-entity.model';

type EntityResponseType = HttpResponse<IServerEntity>;
type EntityArrayResponseType = HttpResponse<IServerEntity[]>;

@Injectable({ providedIn: 'root' })
export class ServerEntityService {
  public resourceUrl = SERVER_API_URL + 'api/server-entities';

  constructor(private http: HttpClient) {}

  create(serverEntity: IServerEntity): Observable<EntityResponseType> {
    return this.http.post<IServerEntity>(this.resourceUrl, serverEntity, { observe: 'response' });
  }

  update(serverEntity: IServerEntity): Observable<EntityResponseType> {
    return this.http.put<IServerEntity>(this.resourceUrl, serverEntity, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IServerEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IServerEntity[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
