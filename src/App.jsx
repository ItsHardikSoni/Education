import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import CoursesPage from "./pages/CoursesPage"
import CourseDetailPage from "./pages/CourseDetailPage"
import LessonPage from "./pages/LessonPage"
import ProjectsPage from "./pages/ProjectsPage"
import FAQPage from "./pages/FAQPage"
import ContactPage from "./pages/ContactPage"
import AdminLoginPage from "./pages/admin/LoginPage"
import AdminDashboardPage from "./pages/admin/DashboardPage"
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

// ✅ PageWrapper with animation
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <PageWrapper key="home">
            <HomePage />
          </PageWrapper>
        ),
      },
      {
        path: "about",
        element: (
          <PageWrapper key="about">
            <AboutPage />
          </PageWrapper>
        ),
      },
      {
        path: "courses",
        element: (
          <PageWrapper key="courses">
            <CoursesPage />
          </PageWrapper>
        ),
      },
      {
        path: "courses/:courseId",
        element: (
          <PageWrapper key="course-detail">
            <CourseDetailPage />
          </PageWrapper>
        ),
      },
      {
        path: "courses/:courseId/lesson/:lessonId",
        element: (
          <PageWrapper key="lesson">
            <LessonPage />
          </PageWrapper>
        ),
      },
      {
        path: "projects",
        element: (
          <PageWrapper key="projects">
            <ProjectsPage />
          </PageWrapper>
        ),
      },
      {
        path: "faq",
        element: (
          <PageWrapper key="faq">
            <FAQPage />
          </PageWrapper>
        ),
      },
      {
        path: "contact",
        element: (
          <PageWrapper key="contact">
            <ContactPage />
          </PageWrapper>
        ),
      },
    ],
  },
  {
    path: "/admin/login",
    element: (
      <PageWrapper key="admin-login">
        <AdminLoginPage />
      </PageWrapper>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <PageWrapper key="admin-dashboard">
        <ProtectedRoute>
          <AdminDashboardPage />
        </ProtectedRoute>
      </PageWrapper>
    ),
  },
])

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
