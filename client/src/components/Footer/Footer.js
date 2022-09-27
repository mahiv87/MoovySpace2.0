import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import './footer.scss';

const links = [
  {
    name: 'Source Code',
    link: 'https://github.com/jgault87/MoovySpace',
    id: 'sourceCode',
    icon: function () {
      return <PersonIcon />;
    },
  },
  {
    name: 'Noah Hoffman',
    link: 'https://github.com/Noah8863',
    id: 'noah',
    icon: function () {
      return <PersonIcon />;
    },
  },
  {
    name: 'John Gault (JJ)',
    link: 'https://github.com/jgault87',
    id: 'jj',
    icon: function () {
      return <PersonIcon />;
    },
  },
  {
    name: 'Marcus Herrera',
    link: 'https://github.com/mahiv87',
    id: 'marcus',
    icon: function () {
      return <PersonIcon />;
    },
  },
  {
    name: 'Shlomo Siegelman',
    link: 'https://github.com/ssiegelman15',
    id: 'shlomo',
    icon: function () {
      return <PersonIcon />;
    },
  },
  {
    name: 'Elias Vasquez',
    link: 'https://github.com/gokublue007',
    id: 'elias',
    icon: function () {
      return <PersonIcon />;
    },
  },
];

const Footer = () => {
  return (
    <section id="contact">
      <div id="contact-info">
        {/* Mapping over all the different icons/links and creating an anchor tag and inserting the different object values */}
        <ul className="footWrapper">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.link}
              target="_blank"
              rel="noreferrer"
              style={{ color: 'white' }}
            >
              <li className={`icon ${link.id}`}>
                <span className="tooltip">{link.name}</span>
                <span>{link.icon()}</span>
              </li>
            </a>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Footer;
