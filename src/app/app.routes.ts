import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { SenhaComponent } from './components/senha/senha.component';
import { NovasenhaComponent } from './components/novasenha/novasenha.component';
import { CrudAdminComponent } from './components/crud/admin/crud-admin/crud-admin.component';
import { CrudAdminRestaurantesComponent } from './components/crud/admin/crud-admin-restaurantes/crud-admin-restaurantes.component';
import { CrudAdminReceitasComponent } from './components/crud/admin/crud-admin-receitas/crud-admin-receitas.component';
import { CrudAdminLivrosComponent } from './components/crud/admin/crud-admin-livros/crud-admin-livros.component';
import { CrudEditorLivrosComponent } from './components/crud/editor/crud-editor-livros/crud-editor-livros.component';
import { CrudEditorReceitasComponent } from './components/crud/editor/crud-editor-receitas/crud-editor-receitas.component';
import { CrudCozinheiroReceitasComponent } from './components/crud/cozinheiro/crud-cozinheiro-receitas/crud-cozinheiro-receitas.component';

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
        path:"crud_admin_funcionarios",
        component: CrudAdminComponent
    },
    {
        path:"crud_admin_restaurantes",
        component: CrudAdminRestaurantesComponent
    },
    {
        path:"crud_admin_receitas",
        component: CrudAdminReceitasComponent
    },
    {
        path: "crud_admin_livros",
        component: CrudAdminLivrosComponent
    },
    {
        path: "crud_editor_livros",
        component: CrudEditorLivrosComponent
    },
    {
        path: "crud_editor_receitas",
        component: CrudEditorReceitasComponent
    },
    {
        path: "crud_cozinheiro_receitas",
        component: CrudCozinheiroReceitasComponent
    }
];
