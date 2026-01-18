import Hero from "../components/homePage/hero/Hero";
import Services from "../components/homePage/services/Services";
import Container from "../components/shared/container/Container";
import SignUp from "../components/homePage/signup/SignUp";

export default function Home() {
  return (
    <Container className="p-5">
      <Hero />
      <Services />
      <SignUp />
    </Container>
  );
}
