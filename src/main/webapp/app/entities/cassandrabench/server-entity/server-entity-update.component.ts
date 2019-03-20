import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IServerEntity } from 'app/shared/model/cassandrabench/server-entity.model';
import { ServerEntityService } from './server-entity.service';

@Component({
  selector: 'jhi-server-entity-update',
  templateUrl: './server-entity-update.component.html'
})
export class ServerEntityUpdateComponent implements OnInit {
  serverEntity: IServerEntity;
  isSaving: boolean;

  constructor(private serverEntityService: ServerEntityService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ serverEntity }) => {
      this.serverEntity = serverEntity;
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.serverEntity.id !== undefined) {
      this.subscribeToSaveResponse(this.serverEntityService.update(this.serverEntity));
    } else {
      this.subscribeToSaveResponse(this.serverEntityService.create(this.serverEntity));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IServerEntity>>) {
    result.subscribe((res: HttpResponse<IServerEntity>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }
}
