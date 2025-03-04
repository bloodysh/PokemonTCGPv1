import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionGridComponent } from './collection-grid/collection-grid.component';
import { HomeComponent } from './home/home.component';
import { CardDetailsComponent } from './card-details/card-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/collection', pathMatch: 'full' },
  { path: 'collection', component: CollectionGridComponent },
  { path: 'home', component: HomeComponent },
  { path: 'card-details/:id', component: CardDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
