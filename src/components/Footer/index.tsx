import { Container } from './styles';

const Footer = (): JSX.Element => {
  return (
    <Container>
      <span className="copyright">Copyright &copy; 2022 <a href="/" target="_blank" title="ICOMM Group">ICOMM Group</a></span>
      <span className="separator">|</span>
      <span className="rights">Todos os direitos reservados.</span>
    </Container>
    );
  };
  
export default Footer;