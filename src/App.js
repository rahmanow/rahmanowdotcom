import Hero from "./components/Hero";
import SocialLinks from "./components/Social";
import Footer from "./components/Footer";
import Data from "./data";

function App() {
    const { header, content, social, footer } = Data;
  return (
    <div className="h-full">
        {/* <main> and <footer> give assistive technology landmarks to jump
            between; the page previously had none. */}
        <main className="w-full px-6 pb-6 antialiased bg-white">
            <Hero name={header.name} surname={header.surname} avatar={header.avatar} description={content.description} skills={content.skills} />
            <SocialLinks links={social} />
        </main>
        <Footer copyright={footer.copyright} />
    </div>
  );
}

export default App;
