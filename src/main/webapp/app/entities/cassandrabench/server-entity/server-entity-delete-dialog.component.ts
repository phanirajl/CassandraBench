import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IServerEntity } from 'app/shared/model/cassandrabench/server-entity.model';
import { ServerEntityService } from './server-entity.service';

@Component({
  selector: 'jhi-server-entity-delete-dialog',
  templateUrl: './server-entity-delete-dialog.component.html'
})
export class ServerEntityDeleteDialogComponent {
  serverEntity: IServerEntity;

  constructor(
    private serverEntityService: ServerEntityService,
    public activeModal: NgbActiveModal,
    private eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.serverEntityService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'serverEntityListModification',
        content: 'Deleted an serverEntity'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-server-entity-delete-popup',
  template: ''
})
export class ServerEntityDeletePopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ serverEntity }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ServerEntityDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.serverEntity = serverEntity;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
