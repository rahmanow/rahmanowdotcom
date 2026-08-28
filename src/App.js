import Hero from "./components/Hero";
import SocialLinks from "./components/Social";
import Footer from "./components/Footer";
import Data from "./data";

function App() {
    const { header, content, social, footer } = Data;
  return (
    <div className="h-full">
        <section className="w-full px-6 pb-6 antialiased bg-white">
            <Hero name={header.name} surname={header.surname} avatar={header.avatar} description={content.description} skills={content.skills} />
            <SocialLinks links={social} />
        </section>
        <section className="bg-white">
            <Footer copyright={footer.copyright} />
        </section>
    </div>
  );
}

export default App;
