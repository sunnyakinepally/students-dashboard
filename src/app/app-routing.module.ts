import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobdisplayComponent } from './jobdisplay/jobdisplay.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './service/auth.guard';
import { SearchComponent } from './search/search.component';
import { HistoryComponent } from './history/history.component';


const routes: Routes = [
  { path:'home',component:HomeComponent, canActivate:[AuthGuard] },
{path:'',component:LoginComponent},
{path:'signup',component:SignupComponent},
{path:'search',component:SearchComponent},
{path:'History', component:HistoryComponent},
{path:'job',component:JobdisplayComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
