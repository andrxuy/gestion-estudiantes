import React from 'react'
import Header from './components/Header'
import EstudianteForm from './components/EstudianteForm'
import EstudianteList from './components/EstudianteList'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="epn-app">
      <Header />
      <main className="epn-grid">
        <div className="epn-grid__full">
          <EstudianteForm />
        </div>
        <div className="epn-grid__full" style={{ marginTop: '2rem' }}>
          <EstudianteList />
        </div>
      </main>
    </div>
  )
}

export default App
