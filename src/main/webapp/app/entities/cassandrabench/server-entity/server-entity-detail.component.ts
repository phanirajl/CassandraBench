import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IServerEntity } from 'app/shared/model/cassandrabench/server-entity.model';

@Component({
  selector: 'jhi-server-entity-detail',
  templateUrl: './server-entity-detail.component.html'
})
export class ServerEntityDetailComponent implements OnInit {
  serverEntity: IServerEntity;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ serverEntity }) => {
      this.serverEntity = serverEntity;
    });
  }

  previousState() {
    window.history.back();
  }
}
