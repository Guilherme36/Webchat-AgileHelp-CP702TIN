import React from 'react';
import '../landing.css';
import image from '../images/Image2.jpg'

function LandingPage() { 
  return (
    <div className="LandingPage">
      <header className="header">
        <nav className="navbar">
          <div className="logo">
          </div>
          <ul className="nav-links">
            <li><a href="#about">Sobre</a></li>
            <li><a href="#features">Funcionalidades</a></li>
          </ul>
        </nav>
        <div className="header-content">
          <h1>AgileHelp</h1>
          <p>Seu assistente inteligente para dúvidas sobre Metodologias Ágeis</p>
          <a href="\home" className="btn">Comece Agora</a>
        </div>
      </header>
        <div className='content'>
            <div className='content-div'>
                <section id="about" className="about">
                    <div className="text-content">
                        <h2>Sobre</h2>
                        <p>Desenvolvido por programadores, para programadores, AgileHelp é um software de chat inteligente que auxilia desenvolvedores com suas dúvidas sobre as Metodologias Ágeis. </p>
                        <br />
                        <p>Utilizando uma AI Generativa treinada no tema, as respostas são formadas de maneira adaptável e eficiente, garantindo que você tenha as informações mais precisas e relevantes.</p>
                        <br />
                    </div>
                </section>

                <section id="why" className="why">
                    <div className="why-content">
                        <img src={image} alt="" />
                        <div className='why-list'>
                            <h2>Por quê Usar?</h2>
                            <ul>
                                <li>🔍 <strong>Respostas Precisas e Confiáveis:</strong> Nossas respostas são baseadas em uma AI generativa especializada em Metodologias Ágeis, garantindo informações sempre atualizadas e precisas.</li>
                                <li>⚡ <strong>Suporte Imediato:</strong> Receba respostas rápidas para suas dúvidas, sem precisar esperar por consultorias ou treinamentos demorados.</li>
                                <li>💡 <strong>Aprimoramento Contínuo:</strong> Com aprendizado contínuo, nossa AI melhora constantemente, oferecendo dicas e soluções cada vez mais eficientes.</li>
                                <li>📈 <strong>Aumento da Produtividade:</strong> Com suporte imediato e preciso, sua equipe pode focar no que realmente importa: entregar software de qualidade.</li>
                            </ul>
                        </div>
                    </div>
                </section>

            </div>
            <img src="https://i.pinimg.com/originals/0c/67/5a/0c675a8e1061478d2b7b21b330093444.gif" alt="" />

        </div>

      <footer className="footer">
        <p>&copy; 2024 AgileHelp. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
