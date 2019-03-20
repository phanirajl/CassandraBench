import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ServerEntity } from 'app/shared/model/cassandrabench/server-entity.model';
import { ServerEntityService } from './server-entity.service';
import { ServerEntityComponent } from './server-entity.component';
import { ServerEntityDetailComponent } from './server-entity-detail.component';
import { ServerEntityUpdateComponent } from './server-entity-update.component';
import { ServerEntityDeletePopupComponent } from './server-entity-delete-dialog.component';
import { IServerEntity } from 'app/shared/model/cassandrabench/server-entity.model';

@Injectable({ providedIn: 'root' })
export class ServerEntityResolve implements Resolve<IServerEntity> {
  constructor(private service: ServerEntityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ServerEntity> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ServerEntity>) => response.ok),
        map((serverEntity: HttpResponse<ServerEntity>) => serverEntity.body)
      );
    }
    return of(new ServerEntity());
  }
}

export const serverEntityRoute: Routes = [
  {
    path: 'server-entity',
    component: ServerEntityComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ServerEntities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'server-entity/:id/view',
    component: ServerEntityDetailComponent,
    resolve: {
      serverEntity: ServerEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ServerEntities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'server-entity/new',
    component: ServerEntityUpdateComponent,
    resolve: {
      serverEntity: ServerEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ServerEntities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'server-entity/:id/edit',
    component: ServerEntityUpdateComponent,
    resolve: {
      serverEntity: ServerEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ServerEntities'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const serverEntityPopupRoute: Routes = [
  {
    path: 'server-entity/:id/delete',
    component: ServerEntityDeletePopupComponent,
    resolve: {
      serverEntity: ServerEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ServerEntities'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
