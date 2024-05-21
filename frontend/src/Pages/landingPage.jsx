import React from 'react';
import '../landing.css';

function LandingPage() { 
  return (
    <div className="LandingPage">
      <header className="header">
        <nav className="navbar">
          <div className="logo">AgileHelp</div>
          <ul className="nav-links">
            <li><a href="#about">Sobre</a></li>
            <li><a href="#features">Funcionalidades</a></li>
            <li><a href="#contact">Contato</a></li>
          </ul>
        </nav>
        <div className="header-content">
          <h1>AgileHelp</h1>
          <p>Seu assistente inteligente para dúvidas sobre Metodologias Ágeis</p>
          <a href="\home" className="btn">Comece Agora</a>
        </div>
      </header>

      <section id="about" className="about">
        <h2>Sobre</h2>
        <p>AgileHelp é um software de chat inteligente que auxilia desenvolvedores a resolver dúvidas   Metodologias Ágeis de forma rápida e eficiente.</p>
      </section>

      <section id="features" className="features">
        <h2>Funcionalidades</h2>
        <ul>
          <li>Respostas rápidas e precisas</li>
          <li></li>
        </ul>
      </section>

      <section id="contact" className="contact">
        <h2>Contato</h2>
        <p>Entre em contato conosco para saber mais sobre o AgileHelp e como podemos ajudar sua equipe a ser mais ágil e eficiente.</p>
        <form className="contact-form">
          <input type="text" placeholder="Nome" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Mensagem" required></textarea>
          <button type="submit">Enviar</button>
        </form>
      </section>

      <footer className="footer">
        <p>&copy; 2024 AgileHelp. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
