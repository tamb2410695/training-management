import { Routes, Route } from "react-router-dom";

import { ROUTES, COMPONENT_ROUTES, ROLES } from "../../constants";

import RoleRoute from "./RoleRoutes";
import ProtectedRoute from "./ProtectedRoute";
import AnonymousRoute from "./AnonymousRoute";

import PublicLayout from "../../layouts/PublicLayout";
import UnauthorizedPage from "../../pages/UnauthorizedPage";

import HomePage from "../../pages/HomePage";

import Login from "../../pages/auth/LoginPage";
import Register from "../../pages/auth/RegisterPage";

import AdminLayout from "../../layouts/AdminLayout";
import AdminDashboard from "../../pages/admin/AdminDashboardPage";
import AccountManagementPage from "../../pages/admin/AccountManagementPage";
import StudentManagementPage from "../../pages/admin/StudentManagementPage";
import InstructorManagementPage from "../../pages/admin/InstructorManagementPage";

import StudentLayout from "../../layouts/StudentLayout";
import MyCoursePage from "../../pages/student/MyCoursePage";
import StudentProfilePage from "../../pages/student/StudentProfilePage";

import InstructorLayout from "../../layouts/InstructorLayout";
import TeachingPage from "../../pages/instructor/TeachingPage";
import InstructorProfilePage from "../../pages/instructor/InstructorProfilePage";

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
          path={COMPONENT_ROUTES.ADMIN.INSTRUCTORS}
          element={<InstructorManagementPage />}
        />
      </Route>

      {/* Student */}
      <Route
        path={ROUTES.STUDENT.PROFILE}
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
        path={ROUTES.INSTRUCTOR.PROFILE}
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
