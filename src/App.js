import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cadastro from './components/JS/Cadastro';
import Login from './components/JS/Login';
import Home from './components/JS/Home';
import Configuracoes from './components/JS/Configuracoes';
import Perfil from './components/JS/Perfil';
import { AppProvider } from './context/AppContext'; // Importa o contexto
import React from 'react';
//import AcertouQuiz from './components/JS/AcertouQuiz';
// import Quiz from './components/JS/Quiz'; // Mantenha o comentário aqui



function App() {


  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cadastro />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/Home" element={<Home />} />
  {/* <Route path="/Quiz" element={<Quiz />} /> */}
          <Route path="/Configuracoes" element={<Configuracoes />} />
          <Route path="/Perfil" element={<Perfil />} />

        </Routes>
      </BrowserRouter>
    </AppProvider>

  );
}

export default App;
