import React, { useState, useEffect } from "react";
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
  position: relative;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  background: none !important;
  outline: none;
  
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
  margin-right: 15rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  left: 8rem;
  top: 35px; // Align with other elements
  height: 32px;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavbarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;  // Changed back to center
  justify-content: center;
  z-index: 10;
  padding: 35px 3rem; // Increased padding-top to move content down
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    justify-content: space-between;
    padding: 35px 15px; // Keep consistent padding on mobile
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 120px 24px 40px;
  box-sizing: border-box;
  max-width: 100vw;
  overflow-x: hidden;
  
  @media (max-width: 1024px) {
    padding: 100px 12px 20px;
  }
`;

const StyledContent = styled.div`
  background-color: white;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto 20px;
  padding: 3rem 4rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  overflow-wrap: break-word;
  word-break: break-word;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 1.5rem;
    margin: 0;
  }

  @media (max-width: 480px) {
    padding: 1rem;
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
  z-index: 1000;

  @media (max-width: 1024px) {
    position: relative;
    right: 0;
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
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 1.5rem;
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
  padding: 12px 30px;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  margin: 25px auto;
  font-weight: 500;
  min-width: 200px;
  max-width: 300px;
  display: block;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;

  &:hover {
    background-color: rgb(7, 143, 27);
  }

  @media (max-width: 480px) {
    min-width: 180px;
    padding: 10px 25px;
    font-size: 15px;
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
  const [termsData, setTermsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const paragraphStyle = {
    marginBottom: "1rem",
    lineHeight: "1.6",
    color: "#333",
  };

  const backgroundStyle = {
    minHeight: "100vh",
    width: "100%",
    backgroundImage: `url('https://storage.123fakturera.se/public/wallpapers/sverige43.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    position: "fixed",
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
    zIndex: -1,
    overflowX: "hidden"
  };

  const pageWrapper = {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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

  useEffect(() => {
    const fetchTermsContent = async () => {
      try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';
        console.log('Using API URL:', API_URL); // For debugging
        const response = await fetch(`${API_URL}/api/terms/${language}`);
        if (!response.ok) throw new Error('Failed to fetch content');
        const data = await response.json();
        setTermsData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTermsContent();
  }, [language]);

  // Add fallback menu items
  const defaultMenuItems = {
    sv: {
      home: 'Hem',
      order: 'Beställ',
      customers: 'Våra Kunder',
      about: 'Om oss',
      contact: 'Kontakta oss'
    },
    en: {
      home: 'Home',
      order: 'Order',
      customers: 'Our Customers',
      about: 'About us',
      contact: 'Contact us'
    }
  };

  // Get current menu items
  const currentMenuItems = termsData?.menu_items || defaultMenuItems[language];

  const getContent = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading content: {error}</p>;
    if (!termsData) return null;

    return (
      <>
        <StyledHeading>{termsData.title}</StyledHeading>
        <StyledButton onClick={() => setShowTerms(false)}>
          {termsData.close_button_text}
        </StyledButton>
        <StyledContent>
          <div dangerouslySetInnerHTML={{ __html: termsData.content_body }} />
        </StyledContent>
        <StyledButton onClick={() => setShowTerms(false)}>
          {termsData.close_button_text}
        </StyledButton>
      </>
    );
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
            {Object.entries(currentMenuItems).map(([key, value]) => (
              <a key={key} href="#" style={navLink}>{value}</a>
            ))}
          </NavLinks>

          <MobileMenu $isOpen={showMobileMenu}>
            {Object.entries(currentMenuItems).map(([key, value]) => (
              <a key={key} href="#" style={navLink}>{value}</a>
            ))}
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
            <StyledHeading>
              {termsData?.title || (language === 'sv' ? 'Villkor' : 'Terms')}
            </StyledHeading>
            <StyledButton onClick={() => setShowTerms(false)}>
              {termsData?.close_button_text || (language === 'sv' ? 'Stäng och gå tillbaka' : 'Close and go back')}
            </StyledButton>
            <StyledContent>
              {loading ? (
                <p>Loading content...</p>
              ) : error ? (
                <p>Error loading content. Please try again later.</p>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: termsData?.content_body || '' }} />
              )}
            </StyledContent>
            <StyledButton onClick={() => setShowTerms(false)}>
              {termsData?.close_button_text || (language === 'sv' ? 'Stäng och gå tillbaka' : 'Close and go back')}
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