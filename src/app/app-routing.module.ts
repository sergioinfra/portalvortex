import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CalculadoraDeDanosComponent } from './calculadora-de-danos/calculadora-de-danos.component';

const routes: Routes = [
  { path: 'calculadora-de-danos', component: CalculadoraDeDanosComponent },
  { path: '**', redirectTo: 'calculadora-de-danos' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
