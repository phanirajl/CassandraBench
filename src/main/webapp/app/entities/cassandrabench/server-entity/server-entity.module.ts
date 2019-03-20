import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CassandrabenchSharedModule } from 'app/shared';
import {
  ServerEntityComponent,
  ServerEntityDetailComponent,
  ServerEntityUpdateComponent,
  ServerEntityDeletePopupComponent,
  ServerEntityDeleteDialogComponent,
  serverEntityRoute,
  serverEntityPopupRoute
} from './';

const ENTITY_STATES = [...serverEntityRoute, ...serverEntityPopupRoute];

@NgModule({
  imports: [CassandrabenchSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ServerEntityComponent,
    ServerEntityDetailComponent,
    ServerEntityUpdateComponent,
    ServerEntityDeleteDialogComponent,
    ServerEntityDeletePopupComponent
  ],
  entryComponents: [
    ServerEntityComponent,
    ServerEntityUpdateComponent,
    ServerEntityDeleteDialogComponent,
    ServerEntityDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CassandrabenchServerEntityModule {}
