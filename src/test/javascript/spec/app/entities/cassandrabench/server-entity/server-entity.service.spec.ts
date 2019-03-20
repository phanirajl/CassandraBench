/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ServerEntityService } from 'app/entities/cassandrabench/server-entity/server-entity.service';
import { IServerEntity, ServerEntity } from 'app/shared/model/cassandrabench/server-entity.model';

describe('Service Tests', () => {
  describe('ServerEntity Service', () => {
    let injector: TestBed;
    let service: ServerEntityService;
    let httpMock: HttpTestingController;
    let elemDefault: IServerEntity;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      injector = getTestBed();
      service = injector.get(ServerEntityService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new ServerEntity('ID', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 0);
    });

    describe('Service methods', async () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find('9fec3727-3421-4967-b213-ba36557ca194')
          .pipe(take(1))
          .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(JSON.stringify(returnedFromService));
      });

      it('should create a ServerEntity', async () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID'
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new ServerEntity(null))
          .pipe(take(1))
          .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(JSON.stringify(returnedFromService));
      });

      it('should update a ServerEntity', async () => {
        const returnedFromService = Object.assign(
          {
            testName: 'BBBBBB',
            testAddress: 'BBBBBB',
            testLastName: 'BBBBBB',
            testCity: 'BBBBBB',
            testCountry: 'BBBBBB',
            testNumber: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(JSON.stringify(returnedFromService));
      });

      it('should return a list of ServerEntity', async () => {
        const returnedFromService = Object.assign(
          {
            testName: 'BBBBBB',
            testAddress: 'BBBBBB',
            testLastName: 'BBBBBB',
            testCity: 'BBBBBB',
            testCountry: 'BBBBBB',
            testNumber: 1
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => expect(body).toContainEqual(expected));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(JSON.stringify([returnedFromService]));
        httpMock.verify();
      });

      it('should delete a ServerEntity', async () => {
        const rxPromise = service.delete('9fec3727-3421-4967-b213-ba36557ca194').subscribe(resp => expect(resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
