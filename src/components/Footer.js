import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa'; // Icônes des réseaux sociaux

function Footer() {
  return (
    <footer style={styles.footerBg}>
      <div className="container" style={styles.container}>
        {/* Partie principale du footer */}
        <p style={styles.footerMainText}>&copy; 2024 SHOPPE. All Rights Reserved.</p>

        {/* Séparation */}
        <hr style={styles.footerSeparator} />

        <div style={styles.footerContent}>
          {/* Section des liens */}
          <p style={styles.footerLinks}>Contact | Terms of Service | Shipping & Returns</p>

          {/* Section de contact (côté) */}
          <div style={styles.contactInfo}>
            <p>Contactez-nous :</p>
            <p>Téléphone : +216 50442695</p>
            <p>Email : contact@shoppe.com</p>
          </div>
        </div>

        {/* Section des réseaux sociaux (en dessous) */}
        <div style={styles.socialIcons}>
          <a href="https://www.facebook.com" style={styles.socialIcon}>
            <FaFacebook size={30} color="#3b5998" />
          </a>
          <a href="https://www.instagram.com" style={styles.socialIcon}>
            <FaInstagram size={30} color="#E4405F" />
          </a>
        </div>

        {/* Texte de crédit */}
        <p style={styles.footerCredit}>By Aziz Channoufi +216 50442695</p>
      </div>
    </footer>
  );
}

const styles = {
  footerBg: {
    backgroundColor: '#f8f9fa', // Fond clair
    padding: '30px 0', // Réduction de l'espace vertical
    boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.1)', // Ombre discrète
  },
  container: {
    textAlign: 'center',
  },
  footerMainText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  footerSeparator: {
    borderTop: '2px solid #e0e0e0', // Séparateur gris clair
    margin: '20px auto',
    width: '50%', // Largeur du séparateur
  },
  footerContent: {
    display: 'flex', // Utilisation de Flexbox pour disposer les sections sur une ligne
    justifyContent: 'space-between', // Espacement entre la section contact et les liens
    marginBottom: '20px',
    flexWrap: 'wrap', // Permet aux éléments de se réorganiser en dessous si l'espace est réduit
  },
  footerLinks: {
    color: '#555',
    fontSize: '1rem',
    fontWeight: '600',
    flex: 1, // Permet de donner un espace flexible à cette partie
  },
  contactInfo: {
    color: '#555',
    fontSize: '1rem',
    flex: 1, // Permet d'ajuster l'espace de cette partie à côté des liens
    marginTop: '10px',
  },
  socialIcons: {
    marginTop: '20px', // Espacement avec la partie précédente
  },
  socialIcon: {
    margin: '0 10px',
    transition: 'transform 0.3s ease',
  },
  footerCredit: {
    color: '#888',
    fontSize: '0.9rem',
    marginTop: '20px', // Ajout d'un peu d'espace
  },
};

export default Footer;
