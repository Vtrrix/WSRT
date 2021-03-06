import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './main/home/home.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { SideMenuComponent } from './main/side-menu/side-menu.component';
import { BreadcrumbComponent } from './main/breadcrumb/breadcrumb.component';
import { EditProfileComponent } from './main/edit-profile/edit-profile.component';
import { StatusListComponent } from './main/status-list/status-list.component';
import { AddStatusComponent } from './main/add-status/add-status.component';
import { NgxEditorModule, schema } from 'ngx-editor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './not-found/not-found.component';
import { AlertComponent } from './alert/alert.component';
import { ManagerComponent } from './main/manager/manager.component';
import { TeamsComponent } from './main/teams/teams.component';
import { AddTeamComponent } from './main/add-team/add-team.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { StatusComponent } from './main/status/status.component';
import { MemberListComponent } from './main/member-list/member-list.component';
import { AddUserComponent } from './main/add-user/add-user.component';
import { MemberDetailsComponent } from './main/member-details/member-details.component';
import { MemberStatusComponent } from './main/member-status/member-status.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { LoginComponent } from './auth/login/login.component';
import { UpdatePasswordComponent } from './main/update-password/update-password.component';
import { BackToTopComponent } from './main/back-to-top/back-to-top.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AuthComponent,
    HomeComponent,
    NavbarComponent,
    SideMenuComponent,
    BreadcrumbComponent,
    EditProfileComponent,
    StatusListComponent,
    AddStatusComponent,
    NotFoundComponent,
    AlertComponent,
    ManagerComponent,
    TeamsComponent,
    AddTeamComponent,
    StatusComponent,
    MemberListComponent,
    AddUserComponent,
    MemberDetailsComponent,
    MemberStatusComponent,
    ChangePasswordComponent,
    LoginComponent,
    UpdatePasswordComponent,
    BackToTopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        blockquote: 'Blockquote',
        underline: 'Underline',
        strike: 'Strike',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',

        // popups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    }),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
