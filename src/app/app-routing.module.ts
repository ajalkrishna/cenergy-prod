import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnergyPageComponent } from './energy-page/energy-page.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'energy-usage', component: EnergyPageComponent },
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
