import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { AdminCenterComponent } from './screens/admin-center/admin-center.component';
import { CreditCardsCenterComponent } from './screens/credit-cards-center/credit-cards-center.component';
import { CreditCardDetailsComponent } from './screens/credit-card-details/credit-card-details.component';
import { CreditCardEditorComponent } from './screens/credit-card-editor/credit-card-editor.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminCenterComponent },
  { path: 'admin/cards', component: CreditCardsCenterComponent },
  { path: 'admin/card/new', component: CreditCardEditorComponent },
  { path: 'admin/card/edit/:id', component: CreditCardEditorComponent },
  { path: 'admin/card/:id', component: CreditCardDetailsComponent },
  { path: 'admin/rules', component: AdminCenterComponent },
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