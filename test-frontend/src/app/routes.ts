import { Routes } from "@angular/router";
import { HomePageComponent } from "./home/home-page.component";
import { UserLoginComponent } from "./user/login.component";

export const appRoutes: Routes = [
    { path: 'login', component: UserLoginComponent },
    { path: 'home', component: HomePageComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
]