/**
 * Componente Footer
 * 
 * Este componente implementa el pie de página de la aplicación con información
 * de contacto de la empresa Milovat Consulting.
 * 
 * Características principales:
 * - Disposición en grid para organizar las diferentes secciones de información
 * - Muestra el logo de la empresa, ubicación física, teléfonos de contacto y correo
 * - Enlaces a redes sociales (Instagram, Twitter, LinkedIn, Facebook)
 * - Diseño responsive que se adapta a diferentes tamaños de pantalla
 * - Estilo visual con fondo negro y detalles en color amber para resaltar elementos
 * 
 * El footer proporciona información institucional esencial para contacto y
 * ayuda a reforzar la identidad de marca en la parte inferior de la aplicación.
 */

import React from 'react';
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import logoImg from '../assets/logo-footer.png';

export function Footer() {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: <FaInstagram size={24} />,
      url: 'https://www.instagram.com/milovatconsultingmexico/'
    },
    {
      name: 'Twitter (X)',
      icon: <FaTwitter size={24} />,
      url: 'https://x.com/mexicomilovat'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin size={24} />,
      url: 'https://www.linkedin.com/in/milovat-consulting-m%C3%A9xico-243544205/?originalSubdomain=mx'
    },
    {
      name: 'Facebook',
      icon: <FaFacebook size={24} />,
      url: 'https://www.facebook.com/Milovat.Consulting/'
    }
  ];

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y derechos */}
          <div className="flex flex-col items-start">
            <img 
              src={logoImg} 
              alt="Milovat Consulting Logo" 
              className="h-16 mb-4" 
            />
            <p className="text-sm mt-4 text-gray-400">
              © {new Date().getFullYear()} Milovat Consulting.<br />
              Todos los derechos reservados.
            </p>
          </div>

          {/* Ubicación */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-amber-500" /> Ubicación
            </h3>
            <address className="not-italic text-gray-300 leading-relaxed">
              Avenida Vasco de Quiroga 4299,<br />
              Col. Santa Fe.<br />
              Delegación Cuajimalpa de Morelos,<br />
              C.P. 05370
            </address>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaPhone className="mr-2 text-amber-500" /> Contacto
            </h3>
            <div className="text-gray-300 leading-relaxed">
              <p>+52(55)52546866</p>
              <p>+52(44)61199907</p>
              <p>+52(55)29372118</p>
              <p>+52(55)74325164</p>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-2 flex items-center">
              <FaEnvelope className="mr-2 text-amber-500" /> Correo
            </h3>
            <a 
              href="mailto:contacto@milovat-consulting.com" 
              className="text-gray-300 hover:text-amber-500 transition-colors"
            >
              contacto@milovat-consulting.com
            </a>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Redes Sociales</h3>
            <div className="flex flex-col space-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-amber-500 transition-colors"
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}