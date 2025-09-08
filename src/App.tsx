import './App.css'
import Header from './components/Header/Header'
import Input from './components/Input/Input'
import Filter from './components/Filter/Filter'
import CardList from './components/CardList/CardList'
import { Routes, Route, Navigate } from 'react-router';
import Vacancy from './components/Vacancy/Vacancy'

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* добавлено: перенесли страницу списка на /vacancies согласно заданию */}
        <Route path="/vacancies" element={
          <>
            <Input />
            <div className="main-content">
              <Filter />
              <CardList />
            </div>
          </>
        } />
        {/* добавлено: редирект с корня на /vacancies */}
        <Route path="/" element={<Navigate to="/vacancies" replace />} />
        <Route path='/vacancies/:id' element={<Vacancy />} />
      </Routes>
    </>
  )
}

export default App