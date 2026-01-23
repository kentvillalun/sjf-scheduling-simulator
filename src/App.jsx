import "./App.css";
import { Header } from "./components/sections/Header.jsx";
import { Form } from "./components/sections/Form.jsx";
import { Spotlight } from "./components/ui/Spotlight.jsx";

function App() {
  return (
    <>
    
    
      <main className="bg-black min-h-screen flex justify-start items-center text-white flex-col bg-[radial-gradient(#1f2937_1px,transparent_1px)] bg-size-[40px_40px]">
        <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60 lg:-top-60"
        fill="white"
      />
        <Header />
        <Form />
      </main>
    </>
  );
}

export default App;
