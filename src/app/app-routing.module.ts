import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
//para bloquear rutas
import { AuthGuard } from '@auth0/auth0-angular';
import { SearchComponent } from './pages/search/search.component';
import { HomeComponent } from './pages/home/home.component';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './pages/movies/movies.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  //{path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  //{path: '**', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, 
  {path: 'search/:text', component: SearchComponent},
  //{path: 'movie/:id/:pag', component: HomeComponent},
  {path: 'movies/:id', component: MoviesComponent},
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: '**', pathMatch: 'full', redirectTo: '/home'},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
