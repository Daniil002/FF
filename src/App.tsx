import './App.css'
import Header from './components/Header/Header'
import Input from './components/Input/Input'
import Filter from './components/Filter/Filter'
import CardList from './components/CardList/CardList'
import { Routes, Route } from 'react-router';
import Vacancy from './components/Vacancy/Vacancy'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Input />
            <div className="main-content">
              <Filter />
              <CardList />
            </div>
          </>
        } />
        <Route path='/vacancies/:id' element={<Vacancy />} />
      </Routes>
    </>
  )
}

export default App