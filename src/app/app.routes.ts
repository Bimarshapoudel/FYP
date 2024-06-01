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
import { AddStudyMaterialComponent } from './pages/admin/add-study-material/add-study-material.component';
import { AddLessonComponent } from './pages/admin/add-lesson/add-lesson.component';
import { ViewLessonComponent } from './pages/admin/view-lesson/view-lesson.component';
import { UpdateLessonComponent } from './pages/admin/update-lesson/update-lesson.component';
import { ViewStudyMaterialComponent } from './pages/admin/view-study-material/view-study-material.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { StudentWelcomeComponentComponent } from './pages/user/student-welcome-component/student-welcome-component.component';
import { ViewStudentsComponent } from './pages/admin/view-students/view-students.component';
import { TeacherWelcomeComponent } from './pages/user/teacher-welcome/teacher-welcome.component';
import { TeacherViewQuizComponent } from './pages/user/teacher-view-quiz/teacher-view-quiz.component';
import { ViewTeacherComponent } from './pages/admin/view-teacher/view-teacher.component';
import { EnrollStudentComponent } from './pages/admin/enroll-student/enroll-student.component';
import { EnrollTeacherComponent } from './pages/admin/enroll-teacher/enroll-teacher.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { StudentViewLessonComponent } from './pages/user/student-view-lesson/student-view-lesson.component';
import { StudentViewStudyMaterialComponent } from './pages/user/student-view-study-material/student-view-study-material.component';
import { TeacherAddQuizComponent } from './pages/user/teacher-add-quiz/teacher-add-quiz.component';
import { TeacherViewLessonsComponent } from './pages/user/teacher-view-lessons/teacher-view-lessons.component';
import { TeacherAddLessonsComponent } from './pages/user/teacher-add-lessons/teacher-add-lessons.component';
import { TeacherUpdateLessonsComponent } from './pages/user/teacher-update-lessons/teacher-update-lessons.component';
import { TeacherViewStudyMaterialComponent } from './pages/user/teacher-view-study-material/teacher-view-study-material.component';
import { TeacherAddStudyMaterialComponent } from './pages/user/teacher-add-study-material/teacher-add-study-material.component';
import { TeacherAddQuestionsComponent } from './pages/user/teacher-add-questions/teacher-add-questions.component';
import { TeacherViewQuestionsComponent } from './pages/user/teacher-view-questions/teacher-view-questions.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
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
            },
            {
                path: 'register',
                component: SignupComponent,
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
                path: 'lessons',
                component: ViewLessonComponent

            }
            ,
            {
                path: 'add-quiz',
                component: AddQuizComponent

            }
            ,
            {
                path: 'add-lesson',
                component: AddLessonComponent

            }
            ,
            {
                path: 'quiz/:qid',
                component: UpdateQuizComponent

            },
            {
                path: 'categories/:cid',
                component: UpdateCategoryComponent

            }, {
                path: 'add-question/:qid/:title',
                component: AddQuestionComponent
            },
            {
                path: 'lesson/:lid',
                component: UpdateLessonComponent

            }, {
                path: 'view-questions/:qid/:title',
                component: ViewQuizQuestionsComponent
            }, {
                path: 'view-studyMaterial/:lid/:title',
                component: ViewStudyMaterialComponent
            }
            , {
                path: 'add-studyMaterial/:lid',
                component: AddStudyMaterialComponent
            }, {
                path: 'students',
                component: ViewStudentsComponent,
            }
            , {
                path: 'teachers',
                component: ViewTeacherComponent,
            }
            , {
                path: 'enrollStudents',
                component: EnrollStudentComponent,
            }
            , {
                path: 'enrollTeachers',
                component: EnrollTeacherComponent,
            }
        ]
    },
    {
        path: 'student',
        component: StudentComponent,
        canActivate: [studentGuard],
        children: [
            {
                path: 'profile',

                component: ProfileComponent,

            },
            {
                path: ':catid',
                component: StudentLoadQuizComponent
            },
            {
                path: 'lesson/:catid',
                component: StudentViewLessonComponent
            },
            {
                path: 'view-studyMaterial/:lid/:title',
                component: StudentViewStudyMaterialComponent
            },


            {
                path: 'instructions/:qid',
                component: InstructionsComponent,
            }, {
                path: '',
                component: StudentWelcomeComponentComponent
            }


        ]
        ,

    }, {
        path: 'start/:qid',
        component: StartComponent,
        canActivate: [studentGuard],
    }, {
        path: 'profile',
        pathMatch: 'full',
        component: ProfileComponent,

    },
    {
        path: 'activate-account',
        component: ConfirmEmailComponent
    }
    ,
    {
        path: 'teacher',
        component: UserDashboardComponent,
        canActivate: [teacherGuardGuard],
        children: [
            {
                path: '',
                component: TeacherWelcomeComponent

            }, {

                path: 'profile',
                component: ProfileComponent
            }, {
                path: 'quiz/:catid',
                component: TeacherViewQuizComponent
            }, {
                path: 'add-quiz',
                component: TeacherAddQuizComponent

            },

            {
                path: 'lesson/:catid',
                component: TeacherViewLessonsComponent
            },
            {
                path: 'add-lesson',
                component: TeacherAddLessonsComponent

            },
            {
                path: 'lesson/:lid',
                component: TeacherUpdateLessonsComponent

            }, {
                path: 'view-studyMaterial/:lid/:title',
                component: TeacherViewStudyMaterialComponent
            }, {
                path: 'add-studyMaterial/:lid',
                component: TeacherAddStudyMaterialComponent
            }, {
                path: 'add-question/:qid/:title',
                component: TeacherAddQuestionsComponent
            }, {
                path: 'view-questions/:qid/:title',
                component: TeacherViewQuestionsComponent
            }
        ]


    }
];
