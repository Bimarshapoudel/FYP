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
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { StudentLoadQuizComponent } from './pages/user/student-load-quiz/student-load-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartComponent } from './pages/user/start/start.component';

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
            }, {
                path: 'categories',
                component: ViewCategoriesComponent
            },
            {
                path: 'add-category',
                component: AddCategoryComponent

            }
            ,
            {
                path: 'quizzes',
                component: ViewQuizzesComponent

            }
            ,
            {
                path: 'add-quiz',
                component: AddQuizComponent

            }
            ,
            {
                path: 'quiz/:qid',
                component: UpdateQuizComponent

            }, {
                path: 'view-questions/:qid/:title',
                component: ViewQuizQuestionsComponent
            }
            , {
                path: 'add-question/:qid/:title',
                component: AddQuestionComponent
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
        canActivate: [studentGuard],
        children: [{
            path: ':catid',
            component: StudentLoadQuizComponent
        },
        {
            path: 'profile',
            component: ProfileComponent,
        },
        {
            path: 'instructions/:qid',
            component: InstructionsComponent,
        }
            ,

        ]
        ,

    }, {
        path: 'start/:qid',
        component: StartComponent,
        canActivate: [studentGuard],
    }
];
