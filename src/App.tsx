
import './App.css'
import Header from './components/Header/Header'
import Input from './components/Input/Input'
import Filter from './components/Filter/Filter'
import CardList from './components/CardList/CardList'

function App() {
  return (
    <>
      <Header />
      <Input />
      <div className="main-content">
        <Filter />
        <CardList />
      </div>
    </>
  )
}

export default App
