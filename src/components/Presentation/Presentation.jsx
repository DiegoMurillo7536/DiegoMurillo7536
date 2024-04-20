import Header from "../Header/Header";
import About from "../About/About";

const Presentation = () => {
  return (
    
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-cerulean-100 to-cerulean-600 shadow-2xl m-10 rounded-lg p-10">
        <Header />
        <About />
        <br />
        <br />
        <br />
         <a href=""><p className="text-cerulean-900 underline font-sembold text-2xl">Ver más</p></a>
      </div>
    
  );
};

export default Presentation;
