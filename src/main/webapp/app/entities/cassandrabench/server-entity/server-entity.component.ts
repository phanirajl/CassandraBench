import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IServerEntity } from 'app/shared/model/cassandrabench/server-entity.model';
import { Principal } from 'app/core';
import { ServerEntityService } from './server-entity.service';

@Component({
  selector: 'jhi-server-entity',
  templateUrl: './server-entity.component.html'
})
export class ServerEntityComponent implements OnInit, OnDestroy {
  serverEntities: IServerEntity[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    private serverEntityService: ServerEntityService,
    private jhiAlertService: JhiAlertService,
    private eventManager: JhiEventManager,
    private principal: Principal
  ) {}

  loadAll() {
    this.serverEntityService.query().subscribe(
      (res: HttpResponse<IServerEntity[]>) => {
        this.serverEntities = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
    this.principal.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInServerEntities();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IServerEntity) {
    return item.id;
  }

  registerChangeInServerEntities() {
    this.eventSubscriber = this.eventManager.subscribe('serverEntityListModification', response => this.loadAll());
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
