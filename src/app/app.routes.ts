import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';

import { teacherGuardGuard } from './services/guard/TeacherGuard/teacher-guard.guard';
import { StudentComponent } from './pages/user/student-dashboard/student/student.component';
import { studentGuard } from './services/guard/StudentGuard/student.guard';
import { adminGuard } from './services/guard/AdminGuard/admin.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';

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
        canActivate: [adminGuard],
        children: [
            {
                path: '',
                component: WelcomeComponent,
            },
            {
                path: 'profile',
                component: ProfileComponent,
            }
        ]
    }, {
        path: 'teacher',
        component: UserDashboardComponent,
        pathMatch: 'full',
        canActivate: [teacherGuardGuard]
    }, {
        path: 'student',
        component: StudentComponent,
        pathMatch: 'full',
        canActivate: [studentGuard]
    }
];
