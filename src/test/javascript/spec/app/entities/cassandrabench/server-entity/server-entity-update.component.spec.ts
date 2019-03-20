/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CassandrabenchTestModule } from '../../../../test.module';
import { ServerEntityUpdateComponent } from 'app/entities/cassandrabench/server-entity/server-entity-update.component';
import { ServerEntityService } from 'app/entities/cassandrabench/server-entity/server-entity.service';
import { ServerEntity } from 'app/shared/model/cassandrabench/server-entity.model';

describe('Component Tests', () => {
  describe('ServerEntity Management Update Component', () => {
    let comp: ServerEntityUpdateComponent;
    let fixture: ComponentFixture<ServerEntityUpdateComponent>;
    let service: ServerEntityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CassandrabenchTestModule],
        declarations: [ServerEntityUpdateComponent]
      })
        .overrideTemplate(ServerEntityUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServerEntityUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServerEntityService);
    });

    describe('save', () => {
      it(
        'Should call update service on save for existing entity',
        fakeAsync(() => {
          // GIVEN
          const entity = new ServerEntity('9fec3727-3421-4967-b213-ba36557ca194');
          spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
          comp.serverEntity = entity;
          // WHEN
          comp.save();
          tick(); // simulate async

          // THEN
          expect(service.update).toHaveBeenCalledWith(entity);
          expect(comp.isSaving).toEqual(false);
        })
      );

      it(
        'Should call create service on save for new entity',
        fakeAsync(() => {
          // GIVEN
          const entity = new ServerEntity();
          spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
          comp.serverEntity = entity;
          // WHEN
          comp.save();
          tick(); // simulate async

          // THEN
          expect(service.create).toHaveBeenCalledWith(entity);
          expect(comp.isSaving).toEqual(false);
        })
      );
    });
  });
});
