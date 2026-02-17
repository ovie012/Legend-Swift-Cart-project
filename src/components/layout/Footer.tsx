import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Logo, LogoLink } from './Navbar';

const FooterLogo = styled(Logo)`
  height: 32px;
  width: 32px;
  margin-right: 5px;
`;

const FooterLogoText = styled.h3`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
`;

const Footer = () => (
  <footer className="border-t border-border bg-muted/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <FooterLogoText className="font-bold text-foreground mb-3">
            <FooterLogo src="/legendCartIcon.png" alt="Legend Store Logo" />
            LEGEND STORE
          </FooterLogoText>
          <p className="text-sm text-muted-foreground">
            Modern e-commerce experience with curated products.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Quick Links</h4>
          <div className="space-y-2">
            <Link to="/products" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
              Products
            </Link>
            <Link to="/cart" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cart
            </Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Support</h4>
          <span className="block text-sm text-muted-foreground">help@store.com</span>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
        © 2026 LEGEND STORE. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
