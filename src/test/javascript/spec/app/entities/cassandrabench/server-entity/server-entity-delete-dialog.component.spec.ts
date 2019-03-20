/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CassandrabenchTestModule } from '../../../../test.module';
import { ServerEntityDeleteDialogComponent } from 'app/entities/cassandrabench/server-entity/server-entity-delete-dialog.component';
import { ServerEntityService } from 'app/entities/cassandrabench/server-entity/server-entity.service';

describe('Component Tests', () => {
  describe('ServerEntity Management Delete Component', () => {
    let comp: ServerEntityDeleteDialogComponent;
    let fixture: ComponentFixture<ServerEntityDeleteDialogComponent>;
    let service: ServerEntityService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CassandrabenchTestModule],
        declarations: [ServerEntityDeleteDialogComponent]
      })
        .overrideTemplate(ServerEntityDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ServerEntityDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServerEntityService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('9fec3727-3421-4967-b213-ba36557ca194');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('9fec3727-3421-4967-b213-ba36557ca194');
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
