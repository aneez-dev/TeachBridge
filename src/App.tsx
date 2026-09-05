import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import ClickSpark from './components/ClickSpark'
import { Login } from './pages/Login'
import { TeacherDashboard } from './pages/TeacherDashboard'
import { StudentPage } from './pages/StudentPage'

function App() {
  return (
    <AppProvider>
      <ClickSpark sparkColor="#ffffff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute allow="teacher">
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student"
              element={
                <ProtectedRoute allow="student">
                  <StudentPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ClickSpark>
    </AppProvider>
  )
}

export default App
