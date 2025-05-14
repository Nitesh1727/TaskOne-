import React, { useState } from "react";
import styled from 'styled-components';

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: 1024px) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 60px;
    left: 15px; // Aligned with hamburger
    width: 200px;
    background-color: white;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    z-index: 1001;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    border-radius: 8px;

    a {
      color: #333 !important;
      font-size: 1rem;
      text-shadow: none !important;
      padding: 8px;
      width: 100%;
      border-radius: 4px;
      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
`;

const HamburgerButton = styled.button`
  display: none;
  position: fixed;
  left: 24px;  // Increased left spacing
  top: 20px;
  width: 36px;
  height: 36px;
  padding: 0;
  z-index: 1000;
  border: none;
  background: none !important;
  outline: none;
  box-shadow: none !important;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:active, &:focus, &:hover {
    background: none !important;
    box-shadow: none !important;
    outline: none;
  }

  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2.8rem;
  margin-left: 15rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  left: 8rem;
  height: 32px;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavbarContainer = styled.div`
  position: absolute;  // Changed from fixed to absolute
  top: 20px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 2.8rem;
  z-index: 10;
  padding: 1rem;
  justify-content: center;
  width: 100%;  // Changed from max-width to width
  
  @media (max-width: 1024px) {
    justify-content: space-between;
    padding: 1rem 20px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 80px 16px 40px; // Reduced side padding
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    padding: 60px 16px 20px;
  }
`;

const StyledContent = styled.div`
  background-color: white;
  width: 90%;
  max-width: 1400px;
  margin: 0 auto 30px;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  overflow-wrap: break-word;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 1.5rem;
    border-radius: 16px;
    margin: 10px auto 25px;
  }

  @media (max-width: 480px) {
    padding: 1.2rem;
    border-radius: 12px;
  }
`;

const LanguageSwitcher = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 1rem;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  z-index: 1000;

  @media (max-width: 1024px) {
    position: fixed;
    right: 15px;
    top: 20px;
    margin-right: 15px;
    padding-right: 15px;
    background: none;
    
    img {
      margin-right: 5px; // Extra space for the flag
    }
  }
`;

const LanguageSwitcherButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 1rem;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
`;

const LanguageDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  padding: 0.5rem;
  margin-top: 5px;
  z-index: 1001;
  min-width: 150px;

  @media (max-width: 1024px) {
    right: 20px;
    left: auto;
    transform: none;
  }
`;

const LanguageOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  color: #333;
  background-color: ${props => props.$isSelected ? '#f5f5f5' : 'transparent'};
  font-weight: ${props => props.$isSelected ? '500' : 'normal'};
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const StyledHeading = styled.h1`
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  padding: 0.5rem 1.5rem;
`;

const StyledButton = styled.button`
  background-color: rgb(8, 158, 30);
  color: white;
  border: none;
  padding: 15px 50px;
  border-radius: 30px;
  font-size: 18px;
  cursor: pointer;
  margin: 25px auto 25px; // Added top margin
  font-weight: 500;
  min-width: 250px;
  display: block;
  max-width: 90%;

  @media (max-width: 480px) {
    min-width: 200px;
    padding: 12px 30px;
    font-size: 16px;
  }
`;

const AlternativeView = styled.div`
  color: #333;
  font-size: 1.5rem;
  margin: auto;
  background-color: white;
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  margin-top: 150px;
`;

function App() {
  const [showTerms, setShowTerms] = useState(true);
  const [language, setLanguage] = useState('sv');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const paragraphStyle = {
    marginBottom: "1rem",
    lineHeight: "1.6",
    color: "#333",
  };

  const backgroundStyle = {
    minHeight: "100vh",
    width: "100vw",
    backgroundImage: `url('https://storage.123fakturera.se/public/wallpapers/sverige43.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    position: "fixed", // Changed from absolute to fixed
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
    zIndex: -1, // Ensure background stays behind content
  };

  const pageWrapper = {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch"
  };

  const logoContainerStyle = {
    position: "absolute",
    left: "8rem", // Move diamond more to the right
    display: "block",
    '@media (maxWidth: 1024px)': {
      display: 'none',
      visibility: 'hidden',
      opacity: 0,
      width: 0,
      height: 0,
      pointerEvents: 'none'
    }
  };

  const navLinksContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "2.8rem", // Reduced from 3.5rem
    marginLeft: "15rem", // Add margin to move nav links right
    '@media (maxWidth: 1024px)': {
      display: showMobileMenu ? 'flex' : 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 0,
      gap: '2rem',
      zIndex: 999
    }
  };

  const navLink = {
    color: "white",
    fontWeight: 500,
    textDecoration: "none",
    fontSize: "1.05rem", // Decreased from 1.1rem
    whiteSpace: "nowrap",
    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
    padding: "0.25rem 0.5rem", // Added padding to make clickable area bigger
  };

  const translations = {
    sv: {
      title: 'Villkor',
      closeButton: 'Stäng och gå tillbaka',
      menu: {
        home: 'Hem',
        order: 'Beställ',
        customers: 'Våra Kunder',
        about: 'Om oss',
        contact: 'Kontakta oss',
      },
      content: (
        <>
          <p style={paragraphStyle}>
            <strong>GENOM ATT</strong> klicka på Fakturera Nu så väljer ni att
            registrera enligt den information som ni har lagt in och texten
            på registrerings sidan och villkoren här, och accepterar samtidigt
            villkoren här.
          </p>
          <p style={paragraphStyle}>
            Ni kan använda programmet <strong>GRATIS i 14 dagar</strong>.
          </p>
          <p style={paragraphStyle}>
            123 Fakturera är så lätt och självförklarande att chansen för att
            du kommer behöva support är minimal, men om du skulle behöva
            support, så är vi här för dig, med vårt kontor bemannat större
            delen av dygnet. Efter provperioden så fortsätter abonnemanget
            och kostar 99 kronor exkl. moms per månad, som faktureras
            årligen. Om du inte vill behålla programmet, så är det bara att
            avbryta provperioden genom att ge oss besked inom 14 dagar från
            registrering.
          </p>
          <p style={paragraphStyle}>
            Ni har självklart rätt att avsluta användningen av programmet utan
            kostnad, genom att ge oss besked per email inom 14 dagar från
            registrering, att ni inte vill fortsätta med programmet, och betalar då självklart inte heller något.
          </p>
          <p style={paragraphStyle}>
            Om vi inte inom 14 dagar från registrering mottar sådant besked från er, så kan ordern av naturliga orsaker inte ändras. Med registrering menas det datum och klockslag då ni valde att trycka på knappen Fakturera Nu.
          </p>
          <p style={paragraphStyle}>
            Fakturering sker för ett år i taget.
          </p>
          <p style={paragraphStyle}>
            Priset för 123 Fakturera (specialpris kr 99:- / ord. pris kr 159:- per månad) är för årsavgift Start för ett års användning av programmet.
          </p>
          <p style={paragraphStyle}>
            (Vid användning av specialpriset kr 99:- så räknas ett års perioden från registrering.)
          </p>
          <p style={paragraphStyle}>
            Alla priser är exkl. moms.
          </p>
          <p style={paragraphStyle}>
            Offert, Lagerstyrning, Medlemsfakturering, Fleranvändarversion och Engelsk utskrift är (eller kan vara) tilläggsmoduler som kan beställas senare.
          </p>
          <p style={paragraphStyle}>
            Förmedling, samt fakturering kan komma att ske från K-Soft Sverige AB, Box 2826, 187 28 Täby. Vi kan i framtiden välja att samarbeta med annat företag för t.ex. förmedling och fakturering. Kundförhållandet är dock självklart med oss. Betalningen görs till det företag som fakturan kommer från.
          </p>
          <p style={paragraphStyle}>
            Årsavgiften är löpande men om ni inte vill fortsätta att använda programmet, så är det bara att ge besked trettio dagar innan ingången av nästföljande ett års period.
          </p>
          <p style={paragraphStyle}>
            Introduktionspriset (kr 99:- per månad) är för årsavgift Start för det första året. Efter det första året faktureras ord. pris vilket för närvarande är, för årsavgift Start, ett hundra och femtinio kronor per månad, för årsavgift Fjärrstyrning, tre hundra kronor per månad och för årsavgift Pro, tre hundra och trettiotre kronor per månad. Efter ett år faktureras årsavgift Fjärrstyrning som standard men ni kan välja Start eller Pro genom att ge besked när som helst innan förfallodagen.
          </p>
          <p style={paragraphStyle}>
            Om ni väljer att behålla programmet genom att inte ge oss besked per email innan 14 dagar från registrering, om att ni inte vill fortsätta med programmet, så accepterar ni att ni kommer att betala fakturan för er beställning. Att inte betala fakturan eller sen betalning ger inte rätt till att annullera beställningen. Vi hjälper gärna att fiksa logo för er till självkostpris.
          </p>
          <p style={paragraphStyle}>
            Licens för användning av 123 Fakturera säljs självklart enligt gällande lagar.
          </p>
          <p style={paragraphStyle}>
            För att lättare kunna hjälpa er och ge er support samt för att följa lagarna, måste vi av naturliga orsaker spara er information.
          </p>
          <p style={paragraphStyle}>
            I samband med lagring av information så kräver lagen att vi ger er följande information:
          </p>
          <p style={paragraphStyle}>
            Om ni beställer som privatperson så har ni den ångerrätt som lagen fastställer. Er information sparas så att vi kan hjälpa er m.m. Vi kommer använda den för att kunna hjälpa er om ni behöver hjälp, följa lagarna ang. bokföring m.m. När det kommer uppgraderingar och liknande, kan vi komma att skicka er erbjudande och liknande om våra produkter och tjänster per email eller liknande. Ni kan också komma att bli kontaktad per email, post och telefon. Om ni inte vill bli kontaktad, bara skicka oss en email ang. det.
          </p>
          <p style={paragraphStyle}>
            Ni kan när som helst begära att inte få tillsänt information om uppgraderingar per email, brev eller liknande och vi kommer då självklart inte att göra det. Sådan begäran skickar ni till oss per email, brev eller liknande.
          </p>
          <p style={paragraphStyle}>
            Av naturliga orsaker måste vi spara, databehandla och flytta era data. Er information sparas tills vidare. Ni ger oss medgivande till att lagra, databehandla och flytta era data, samt att skicka er erbjudanden och liknande per email, brev och liknande. Pga. sättet det fungerar på med programvara behöver medgivandet också ges till andra parter. Medgivandet ges därför till oss, samt till de företag och/eller person/personer som äger programvaran, källkod, hemsidan och liknande. Det ges också till nuvarande och framtida företag ägda och/eller kontrollerade av en eller flera av de som i dag äger och/eller kontrollerar oss. Det ges också till nuvarande och framtida personer (om några) som äger eller kommer till att äga programvaran, källkod, hemsidan och liknande. Detta både för nuvarande och framtida produkter och tjänster. Det ges också till ett annat företag, (som K-Soft Sverige AB), som vi kan använda för att skicka/sälja produkter, uppgraderingar och liknande, antingen genom att under förmedla programvaran eller på annat sätt.
          </p>
          <p style={paragraphStyle}>
            Ni har självklart rätt att begära tillgång till, rättelse eller radering av informationen vi har om er. Ni har också rätt att begära begränsning av behandlingen av era uppgifter, eller att invända mot behandling samt rätten till dataportabilitet. Ni har självklart rätt att klaga till tillsynsmyndighet. Mer juridisk info om oss hittar ni här. Det är lagarna i Irland som är gällande lagar. Det är självklart helt frivilligt att lägga er order. Vi använder självklart inte någon automatiserad profilering och inte heller något automatiserat beslutsfattande.
          </p>
          <p style={paragraphStyle}>
            Om ni vill kontakta oss, vänligen använd då informationen på denna hemsidan.
          </p>
          <p style={paragraphStyle}>
            Klicka på Fakturera Nu för att registrera i enlighet med den information som ni har lagt in och villkoren här. (Datum och tidpunkt för inläggningen läggs in automatiskt i våra register.)
          </p>
          <p style={paragraphStyle}>
            Vår erfarenhet är att våra kunder är mycket nöjda med sättet vi arbetar på och vi hoppas och tror att det också kommer att bli er upplevelse.
          </p>
          <p style={paragraphStyle}>
            Ha en trevlig dag!
          </p>
        </>
      )
    },
    en: {
      title: 'Terms',
      closeButton: 'Close and go back',
      menu: {
        home: 'Home',
        order: 'Order',
        customers: 'Our Customers',
        about: 'About us',
        contact: 'Contact us',
      },
      content: (
        <>
          <p style={paragraphStyle}>
            <strong>BY</strong> clicking on Invoice Now, you choose to register according to the information you have provided and the terms and conditions here, and simultaneously accept the terms and conditions here.
          </p>
          <p style={paragraphStyle}>
            You can use the program <strong>FOR FREE for 14 days</strong>.
          </p>
          <p style={paragraphStyle}>
            123 Invoice is so easy and self-explanatory that the chance of you needing support is minimal, but if you do need support, we are here for you, with our office staffed most of the day. After the trial period, the subscription continues and costs 99 kronor excl. VAT per month, billed annually. If you do not wish to keep the program, you can simply cancel the trial period by notifying us within 14 days of registration.
          </p>
          <p style={paragraphStyle}>
            You of course have the right to terminate the use of the program at no cost, by notifying us by email within 14 days of registration, that you do not wish to continue with the program, and will of course not pay anything.
          </p>
          <p style={paragraphStyle}>
            If we do not receive such notice from you within 14 days of registration, the order cannot be changed for natural reasons. Registration means the date and time when you chose to click the Invoice Now button.
          </p>
          <p style={paragraphStyle}>
            Billing is done for one year at a time.
          </p>
          <p style={paragraphStyle}>
            The price for 123 Invoice (special price SEK 99:- / regular price SEK 159:- per month) is for the annual fee Start for one year's use of the program.
          </p>
          <p style={paragraphStyle}>
            (When using the special price SEK 99:-, one year's period is counted from registration.)
          </p>
          <p style={paragraphStyle}>
            All prices are excl. VAT.
          </p>
          <p style={paragraphStyle}>
            Quote, Inventory Management, Membership Invoicing, Multi-user version, and English printout are (or may be) additional modules that can be ordered later.
          </p>
          <p style={paragraphStyle}>
            Mediation, as well as invoicing, may be done by K-Soft Sweden AB, Box 2826, 187 28 Täby. In the future, we may choose to collaborate with another company for, e.g., mediation and invoicing. The customer relationship is of course with us. Payment is made to the company from which the invoice comes.
          </p>
          <p style={paragraphStyle}>
            The annual fee is ongoing, but if you do not wish to continue using the program, you can simply give notice thirty days before the start of the next annual period.
          </p>
          <p style={paragraphStyle}>
            The introductory price (SEK 99:- per month) is for the annual fee Start for the first year. After the first year, the regular price is billed, which currently is, for the annual fee Start, one hundred and fifty-nine kronor per month, for the annual fee Remote Control, three hundred kronor per month, and for the annual fee Pro, three hundred and thirty-three kronor per month. After one year, the annual fee Remote Control is billed as standard, but you can choose Start or Pro by notifying us at any time before the due date.
          </p>
          <p style={paragraphStyle}>
            If you choose to keep the program by not notifying us by email within 14 days of registration, that you do not wish to continue with the program, you accept that you will pay the invoice for your order. Not paying the invoice or late payment does not entitle you to cancel the order. We are happy to help fix a logo for you at cost price.
          </p>
          <p style={paragraphStyle}>
            License for the use of 123 Invoice is of course sold in accordance with applicable laws.
          </p>
          <p style={paragraphStyle}>
            In order to better assist you and provide you with support, as well as to comply with the laws, we must for natural reasons save your information.
          </p>
          <p style={paragraphStyle}>
            In connection with the storage of information, the law requires us to provide you with the following information:
          </p>
          <p style={paragraphStyle}>
            If you order as a private person, you have the right of withdrawal as determined by law. Your information is saved so that we can assist you, etc. We will use it to help you if you need assistance, comply with the laws regarding accounting, etc. When there are upgrades and similar, we may send you offers and similar about our products and services by email or similar. You may also be contacted by email, post, and phone. If you do not wish to be contacted, just send us an email about it.
          </p>
          <p style={paragraphStyle}>
            You can at any time request not to receive information about upgrades by email, letter, or similar, and we will of course not do so. Such requests should be sent to us by email, letter, or similar.
          </p>
          <p style={paragraphStyle}>
            For natural reasons, we must save, process, and transfer your data. Your information is saved until further notice. You give us permission to store, process, and transfer your data, as well as to send you offers and similar by email, letter, and similar. Due to the way it works with software, the consent must also be given to other parties. The consent is therefore given to us, as well as to the companies and/or person/persons who own the software, source code, website, and similar. It is also given to current and future companies owned and/or controlled by one or more of those who today own and/or control us. It is also given to current and future persons (if any) who own or will come to own the software, source code, website, and similar. This applies to both current and future products and services. It is also given to another company, (such as K-Soft Sweden AB), which we may use to send/sell products, upgrades, and similar, either by mediating the software or in another way.
          </p>
          <p style={paragraphStyle}>
            You of course have the right to request access to, correction, or deletion of the information we have about you. You also have the right to request restriction of the processing of your data, or to object to processing and the right to data portability. You of course have the right to complain to the supervisory authority. More legal info about us can be found here. The laws in Ireland are the applicable laws. It is of course completely voluntary to place your order. We of course do not use any automated profiling or automated decision-making.
          </p>
          <p style={paragraphStyle}>
            If you wish to contact us, please use the information on this website.
          </p>
          <p style={paragraphStyle}>
            Click on Invoice Now to register in accordance with the information you have provided and the terms and conditions here. (Date and time of entry are automatically recorded in our registers.)
          </p>
          <p style={paragraphStyle}>
            Our experience is that our customers are very satisfied with the way we work, and we hope and believe that it will also be your experience.
          </p>
          <p style={paragraphStyle}>
            Have a nice day!
          </p>
        </>
      )
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'sv' ? 'en' : 'sv');
  };

  const languageOptions = [
    { code: 'sv', name: 'Svenska', display: 'Svenska', flag: 'https://storage.123fakturera.se/public/flags/SE.png' },
    { code: 'en', name: 'English', display: 'English', flag: 'https://storage.123fakturera.se/public/flags/GB.png' }
  ];

  const handleLanguageSelect = (langCode) => {
    setLanguage(langCode);
    setShowLanguageDropdown(false);
  };

  const hamburgerButtonStyle = {
    display: 'none',
    position: 'fixed',
    left: '20px', // Position on the left
    top: '20px',
    width: '30px',
    height: '24px',
    padding: 0,
    zIndex: 1000,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    '@media (max-width: 1024px)': {
      display: 'block'
    }
  };

  const hamburgerLineStyle = {
    width: '100%',
    height: '3px', // Increased from 2px
    backgroundColor: 'white',
    position: 'absolute',
    transition: 'opacity 0.3s',
    borderRadius: '2px', // Added for better visibility
    boxShadow: '0 1px 2px rgba(0,0,0,0.2)', // Added shadow for contrast
  };

  return (
    <>
      <div style={backgroundStyle} />
      <div style={pageWrapper}>
        <NavbarContainer>
          <HamburgerButton onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <span style={{
              position: 'absolute',
              left: 8,
              right: 8,
              top: 12,
              height: 2,
              width: '20px',
              background: 'white',
              borderRadius: 2,
              transition: 'opacity 0.3s'
            }} />
            <span style={{
              position: 'absolute',
              left: 8,
              right: 8,
              top: '50%',
              height: 2,
              width: '20px',
              background: 'white',
              borderRadius: 2,
              transform: 'translateY(-50%)'
            }} />
            <span style={{
              position: 'absolute',
              left: 8,
              right: 8,
              bottom: 12,
              height: 2,
              width: '20px',
              background: 'white',
              borderRadius: 2,
              transition: 'opacity 0.3s'
            }} />
          </HamburgerButton>

          <LogoContainer>
            <img
              src="https://storage.123fakturera.se/public/icons/diamond.png"
              alt="Logo"
              style={{ height: "32px" }}
            />
          </LogoContainer>

          <NavLinks>
            <a href="#" style={navLink}>{translations[language].menu.home}</a>
            <a href="#" style={navLink}>{translations[language].menu.order}</a>
            <a href="#" style={navLink}>{translations[language].menu.customers}</a>
            <a href="#" style={navLink}>{translations[language].menu.about}</a>
            <a href="#" style={navLink}>{translations[language].menu.contact}</a>
          </NavLinks>

          <MobileMenu $isOpen={showMobileMenu}>
            <a href="#" style={navLink}>{translations[language].menu.home}</a>
            <a href="#" style={navLink}>{translations[language].menu.order}</a>
            <a href="#" style={navLink}>{translations[language].menu.customers}</a>
            <a href="#" style={navLink}>{translations[language].menu.about}</a>
            <a href="#" style={navLink}>{translations[language].menu.contact}</a>
          </MobileMenu>

          <LanguageSwitcher>
            <LanguageSwitcherButton onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}>
              <span>{languageOptions.find(lang => lang.code === language)?.display}</span>
              <img
                src={languageOptions.find(lang => lang.code === language)?.flag}
                alt={language.toUpperCase()}
                style={{ height: "16px" }}
              />
            </LanguageSwitcherButton>

            {showLanguageDropdown && (
              <LanguageDropdown>
                {languageOptions.map((lang) => (
                  <LanguageOption
                    key={lang.code}
                    $isSelected={lang.code === language}
                    onClick={() => handleLanguageSelect(lang.code)}
                  >
                    <span>{lang.display}</span>
                    <img src={lang.flag} alt={lang.code} style={{ height: "16px" }} />
                  </LanguageOption>
                ))}
              </LanguageDropdown>
            )}
          </LanguageSwitcher>
        </NavbarContainer>

        {showTerms ? (
          <ContentWrapper>
            <StyledHeading>{translations[language].title}</StyledHeading>
            <StyledButton onClick={() => setShowTerms(false)}>
              {translations[language].closeButton}
            </StyledButton>
            <StyledContent>
              {translations[language].content}
            </StyledContent>
            <StyledButton onClick={() => setShowTerms(false)}>
              {translations[language].closeButton}
            </StyledButton>
          </ContentWrapper>
        ) : (
          <AlternativeView>
            🔄 Du har stängt villkoren. Här kan du bygga en ny vy!
          </AlternativeView>
        )}
      </div>
    </>
  );
}

export default App;