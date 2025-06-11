import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { AlimentosComponent } from './components/alimentos/alimentos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ConsultaSaldoComponent } from './components/consulta-saldo/consulta-saldo.component';
import { ConsultaPedidosComponent } from './components/consulta-pedidos/consulta-pedidos.component';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'alimentos', component: AlimentosComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'consulta-saldo', component: ConsultaSaldoComponent, canActivate: [AuthGuard] },
  { path: 'consulta-pedidos', component: ConsultaPedidosComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 