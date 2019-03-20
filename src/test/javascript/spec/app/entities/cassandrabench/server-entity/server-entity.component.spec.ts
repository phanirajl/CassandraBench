/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CassandrabenchTestModule } from '../../../../test.module';
import { ServerEntityComponent } from 'app/entities/cassandrabench/server-entity/server-entity.component';
import { ServerEntityService } from 'app/entities/cassandrabench/server-entity/server-entity.service';
import { ServerEntity } from 'app/shared/model/cassandrabench/server-entity.model';

describe('Component Tests', () => {
  describe('ServerEntity Management Component', () => {
    let comp: ServerEntityComponent;
    let fixture: ComponentFixture<ServerEntityComponent>;
    let service: ServerEntityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CassandrabenchTestModule],
        declarations: [ServerEntityComponent],
        providers: []
      })
        .overrideTemplate(ServerEntityComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServerEntityComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServerEntityService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ServerEntity('9fec3727-3421-4967-b213-ba36557ca194')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.serverEntities[0]).toEqual(jasmine.objectContaining({ id: '9fec3727-3421-4967-b213-ba36557ca194' }));
    });
  });
});
