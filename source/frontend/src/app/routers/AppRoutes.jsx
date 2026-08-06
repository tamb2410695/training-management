import { Routes, Route } from "react-router-dom";

import { ROUTES, COMPONENT_ROUTES, ROLES } from "@/constants";

import RoleRoute from "./RoleRoutes";
import ProtectedRoute from "./ProtectedRoute";
import AnonymousRoute from "./AnonymousRoute";

import PublicLayout from "@/layouts/PublicLayout";
import UnauthorizedPage from "@/pages/feedback/StatusPage";

import HomePage from "@/pages/HomePage";

import Login from "@/pages/auth/LoginPage";
import Register from "@/pages/auth/RegisterPage";

import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/features/dashboard/pages/AdminDashboardPage";
import AccountManagementPage from "@/features/accounts/pages/AccountsPage";
import CoursesManagementPage from "@/features/courses/pages/CoursesPage";
import CoursesCategoriesManagementPage from "@/features/coureCategories/pages/CoureCategoriesPage";
import ClassesManagementPage from "@/features/classes/pages/ClassesPage";
import EnrollmentsManagementPage from "@/features/enrollments/pages/EnrollmentsPage";
import RegistrationsManagementPage from "@/features/registrations/pages/RegistrationsPage";
import DocumentsManagementPage from "@/features/documents/pages/DocumentsPage";
import StaffManagementPage from "@/features/staffs/pages/ProfilesPage";
import StudentManagementPage from "@/features/students/pages/StudentsPage";

import StudentLayout from "@/layouts/StudentLayout";
import MyCoursePage from "@/pages/student/MyCoursePage";
import StudentProfilePage from "@/pages/student/StudentProfilePage";

import InstructorLayout from "@/layouts/InstructorLayout";
import TeachingPage from "@/pages/instructor/TeachingPage";
import InstructorProfilePage from "@/pages/instructor/InstructorProfilePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />

        <Route
          path={ROUTES.AUTH.LOGIN}
          element={
            <AnonymousRoute>
              <Login />
            </AnonymousRoute>
          }
        />

        <Route
          path={ROUTES.AUTH.REGISTER}
          element={
            <AnonymousRoute>
              <Register />
            </AnonymousRoute>
          }
        />
      </Route>

      {/* Admin */}
      <Route
        path={ROUTES.ADMIN.DASHBOARD}
        element={
          <ProtectedRoute>
            <RoleRoute roles={[ROLES.ADMIN.CODE]}>
              <AdminLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route
          index
          path={COMPONENT_ROUTES.ADMIN.DASHBOARD}
          element={<AdminDashboard />}
        />

        <Route
          path={COMPONENT_ROUTES.ADMIN.ACCOUNTS}
          element={<AccountManagementPage />}
        />

        <Route
          path={COMPONENT_ROUTES.ADMIN.STUDENTS}
          element={<StudentManagementPage />}
        />

        <Route
          path={COMPONENT_ROUTES.ADMIN.COURSES}
          element={<CoursesManagementPage />}
        />

        <Route
          path={COMPONENT_ROUTES.ADMIN.STAFFS}
          element={<StaffManagementPage />}
        />

        <Route
          path={COMPONENT_ROUTES.ADMIN.COURSE_CATEGORY}
          element={<CoursesCategoriesManagementPage />}
        />
        <Route
          path={COMPONENT_ROUTES.ADMIN.ENROLLMENTS}
          element={<EnrollmentsManagementPage />}
        />
        <Route
          path={COMPONENT_ROUTES.ADMIN.CLASSES}
          element={<ClassesManagementPage />}
        />
        <Route
          path={COMPONENT_ROUTES.ADMIN.REGISTRATIONS}
          element={<RegistrationsManagementPage />}
        />
        <Route
          path={COMPONENT_ROUTES.ADMIN.STAFFS}
          element={<StaffManagementPage />}
        />

        <Route
          path={COMPONENT_ROUTES.ADMIN.DOCUMENTS}
          element={<DocumentsManagementPage />}
        />
      </Route>

      {/* Student */}
      <Route
        path={ROUTES.STUDENT.DASHBOARD}
        element={
          <ProtectedRoute>
            <RoleRoute roles={[ROLES.STUDENT.CODE]}>
              <StudentLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<MyCoursePage />} />

        <Route
          path={COMPONENT_ROUTES.STUDENT.PROFILE}
          element={<StudentProfilePage />}
        />
      </Route>

      {/* Instructor */}
      <Route
        path={ROUTES.INSTRUCTOR.DASHBOARD}
        element={
          <ProtectedRoute>
            <RoleRoute roles={[ROLES.INSTRUCTOR.CODE]}>
              <InstructorLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<TeachingPage />} />

        <Route
          path={COMPONENT_ROUTES.INSTRUCTOR.PROFILE}
          element={<InstructorProfilePage />}
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
