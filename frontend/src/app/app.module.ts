import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Angular Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Components
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { AlimentosComponent } from './components/alimentos/alimentos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ConsultaSaldoComponent } from './components/consulta-saldo/consulta-saldo.component';
import { ConsultaPedidosComponent } from './components/consulta-pedidos/consulta-pedidos.component';
import { EditarUsuarioDialogComponent } from './components/dialogs/editar-usuario-dialog.component';
import { EditarAlimentoDialogComponent } from './components/dialogs/editar-alimento-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';

// Routing
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AlimentosComponent,
    UsuariosComponent,
    ConsultaSaldoComponent,
    ConsultaPedidosComponent,
    EditarUsuarioDialogComponent,
    EditarAlimentoDialogComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 