import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { TableComponent } from './table/table.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'header', component: HeaderComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'table', component: TableComponent },
    { path: 'add', component: UserComponent },
    { path: 'update/:userId', component: UserComponent }
];
