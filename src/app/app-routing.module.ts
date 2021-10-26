import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AddStatusComponent } from './main/add-status/add-status.component';
import { AddTeamComponent } from './main/add-team/add-team.component';
import { EditProfileComponent } from './main/edit-profile/edit-profile.component';
import { HomeComponent } from './main/home/home.component';
import { MainComponent } from './main/main.component';
import { ManagerComponent } from './main/manager/manager.component';
import { StatusListComponent } from './main/status-list/status-list.component';
import { TeamsComponent } from './main/teams/teams.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  {
    path: 'user',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'status', component: StatusListComponent },
      { path: 'add-status', component: AddStatusComponent },
      {
        path: 'manager',
        component: ManagerComponent,
        children: [
          { path: '', component: TeamsComponent },
          { path: 'add-team', component: AddTeamComponent },
        ],
      },
      { path: '**', component: NotFoundComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
  // add 404 component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
