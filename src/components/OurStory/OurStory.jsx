import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OurStory.css';
import Navbar from '../Navbar'; // Adjust the path as necessary
import Footer from '../Footer'; // Adjust the path as necessary

function OurStory() {
  const [language, setLanguage] = useState('fr'); // 'fr' pour français, 'en' pour anglais

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="our-story-container">
      <Navbar /> {/* Navbar */}

      {/* Language Selector */}
      <div className="language-selector text-center py-3">
        <button 
          className={`btn ${language === 'fr' ? 'btn-primary' : 'btn-outline-primary'} mx-2`}
          onClick={() => handleLanguageChange('fr')}
        >
          Français
        </button>
        <button 
          className={`btn ${language === 'en' ? 'btn-primary' : 'btn-outline-primary'} mx-2`}
          onClick={() => handleLanguageChange('en')}
        >
          English
        </button>
      </div>

      {/* Main Content */}
      <header className="text-center py-5 bg-light">
        {language === 'fr' ? (
          <>
            <h1>Notre Histoire</h1>
            <p className="lead">
              Découvrez notre passion pour les parfums et notre engagement à vous offrir des expériences olfactives uniques.
            </p>
          </>
        ) : (
          <>
            <h1>Our Story</h1>
            <p className="lead">
              Discover our passion for perfumes and our commitment to delivering unique fragrance experiences.
            </p>
          </>
        )}
      </header>
      
      <section className="container py-5">
        {/* Mission Section */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <img src="mission.jpg" alt="Mission" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-6">
            {language === 'fr' ? (
              <>
                <h2>Notre Mission</h2>
                <p>
                  Notre mission est de rendre le monde du parfum accessible à tous en proposant une large gamme de produits de qualité
                  qui reflètent la diversité des goûts et des cultures.
                </p>
              </>
            ) : (
              <>
                <h2>Our Mission</h2>
                <p>
                  Our mission is to make the world of perfume accessible to everyone by offering a wide range of quality products
                  that reflect diverse tastes and cultures.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Vision Section */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6 order-md-2">
            <img src="vision.jpg" alt="Vision" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-6 order-md-1">
            {language === 'fr' ? (
              <>
                <h2>Notre Vision</h2>
                <p>
                  Nous imaginons un monde où les parfums transcendent les frontières, rapprochent les gens et célèbrent la beauté
                  des cultures et des individus.
                </p>
              </>
            ) : (
              <>
                <h2>Our Vision</h2>
                <p>
                  We envision a world where perfumes transcend borders, connect people, and celebrate the beauty of cultures and individuals.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Team Section */}
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src="team.jpg" alt="Team" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-6">
            {language === 'fr' ? (
              <>
                <h2>Rencontrez l'Équipe</h2>
                <p>
                  Derrière chaque grande idée se trouve une équipe passionnée. Notre équipe est dédiée, talentueuse et prête à faire
                  la différence. Ensemble, nous concrétisons notre mission et notre vision.
                </p>
              </>
            ) : (
              <>
                <h2>Meet the Team</h2>
                <p>
                  Behind every great idea is a passionate team. Our team is dedicated, talented, and ready to make a difference. Together,
                  we bring our mission and vision to life.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer /> {/* Footer */}
    </div>
  );
}

export default OurStory;
