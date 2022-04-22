import {useState} from "react";
import Hero from "./components/Hero";
import SocialLinks from "./components/Social";
import Footer from "./components/Footer";
import Data from "./data";

function App() {
    const [data, setData] = useState(Data);
    let header = data.header;
    let content = data.content;
    let social = data.social;
    let footer = data.footer;
  return (
    <div className="h-full">
        <section className="w-full px-6 pb-6 antialiased bg-white">
            <Hero name={header.name} surname={header.surname} avatar={header.avatar} description={content.description} skills={content.skills} />
            <SocialLinks />
        </section>
        <section className="bg-white">
            <Footer />
        </section>
    </div>
  );
}

export default App;
