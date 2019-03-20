/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CassandrabenchTestModule } from '../../../../test.module';
import { ServerEntityDetailComponent } from 'app/entities/cassandrabench/server-entity/server-entity-detail.component';
import { ServerEntity } from 'app/shared/model/cassandrabench/server-entity.model';

describe('Component Tests', () => {
  describe('ServerEntity Management Detail Component', () => {
    let comp: ServerEntityDetailComponent;
    let fixture: ComponentFixture<ServerEntityDetailComponent>;
    const route = ({ data: of({ serverEntity: new ServerEntity('9fec3727-3421-4967-b213-ba36557ca194') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CassandrabenchTestModule],
        declarations: [ServerEntityDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ServerEntityDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ServerEntityDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.serverEntity).toEqual(jasmine.objectContaining({ id: '9fec3727-3421-4967-b213-ba36557ca194' }));
      });
    });
  });
});
