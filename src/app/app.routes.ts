import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { SenhaComponent } from './components/senha/senha.component';
import { NovasenhaComponent } from './components/novasenha/novasenha.component';
import { CrudAdminComponent } from './components/crud/admin/crud-admin/crud-admin.component';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent
    },
    {
        path: "cadastro",
        component: CadastroComponent
    },
    {
        path: "senha",
        component: SenhaComponent
    },
    {
        path: "novasenha",
        component: NovasenhaComponent
    },
    {
        path:"crud_admin",
        component: CrudAdminComponent
    }
];
