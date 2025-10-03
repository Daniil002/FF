import './App.css'
import { Routes, Route, Navigate } from 'react-router';
import Layout from './components/Layout/Layout'
import VacanciesPage from './components/VacanciesPage/VacanciesPage'
import About from './components/About/About'
import Vacancy from './components/Vacancy/Vacancy'
import NotFound from './components/NotFound/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/vacancies" replace />} />
        <Route path="vacancies" element={<VacanciesPage />} />
        <Route path="vacancies/:id" element={<Vacancy />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App