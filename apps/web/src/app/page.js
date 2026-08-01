import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import AppleSlider from "../components/AppleSlider";
import Products from "../components/Products";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <AppleSlider />
        <Products />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
