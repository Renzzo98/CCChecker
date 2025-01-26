import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { AdminCenterComponent } from './screens/admin-center/admin-center.component';
import { CreditCardsCenterComponent } from './screens/credit-cards-center/credit-cards-center.component';
import { CreditCardDetailsComponent } from './screens/credit-card-details/credit-card-details.component';
import { CreditCardEditorComponent } from './screens/credit-card-editor/credit-card-editor.component';
import { DealsCenterComponent } from './screens/deals-center/deals-center.component';
import { DealDetailsComponent } from './screens/deal-details/deal-details.component';
import { DealEditorComponent } from './screens/deal-editor/deal-editor.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminCenterComponent },
  { path: 'admin/cards', component: CreditCardsCenterComponent },
  { path: 'admin/card/new', component: CreditCardEditorComponent },
  { path: 'admin/card/edit/:id', component: CreditCardEditorComponent, data: { renderMode: 'client' } },
  { path: 'admin/card/:id', component: CreditCardDetailsComponent, data: { renderMode: 'client' } },
  { path: 'admin/deals', component: DealsCenterComponent },
  { path: 'admin/deal/new', component: DealEditorComponent },
  { path: 'admin/deal/edit/:id', component: DealEditorComponent, data: { renderMode: 'client' } },
  { path: 'admin/deal/:id', component: DealDetailsComponent, data: { renderMode: 'client' } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { } 