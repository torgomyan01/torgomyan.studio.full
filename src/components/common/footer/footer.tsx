import { SITE_URL } from '@/utils/consts';
import './_footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <a href={SITE_URL.PRIVACY_POLICY} className="private-link">
          Политика конфендициальности
        </a>
        <a href={SITE_URL.HOME} className="footer-logo">
          <img src="/images/logo.svg" alt="" />
        </a>
        <p className="copyright">
          © {new Date().getFullYear()} Все права защищены
        </p>
      </div>
    </footer>
  );
}

export default Footer;
