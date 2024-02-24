import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { adminGuard } from './services/guard/admin.guard';
import { teacherGuardGuard } from './services/guard/TeacherGuard/teacher-guard.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'signup',
        component: SignupComponent,
        pathMatch: 'full',
    }, {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
    }, {
        path: 'admin',
        component: DashboardComponent,
        pathMatch: 'full',
        canActivate: [adminGuard]
    }, {
        path: 'teacher',
        component: UserDashboardComponent,
        pathMatch: 'full',
        canActivate: [teacherGuardGuard]
    }
];
