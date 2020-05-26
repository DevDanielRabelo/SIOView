import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShippingCompanyComponent } from './pages/shipping-company/shipping-company.component';
import { EmployeesComponent } from './pages/employees/employees.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], },
  { path: 'transportadora', component: ShippingCompanyComponent, canActivate: [AuthGuard], },
  { path: 'funcionarios', component: EmployeesComponent, canActivate: [AuthGuard], },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
