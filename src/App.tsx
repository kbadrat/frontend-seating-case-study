import "./App.css";
import Header from "./components/Header/Header";
import Cart from "./components/Cart/Cart";
import EventSection from "./components/Event/EventSection";

function App() {
    return (
        <div className="flex flex-col grow">
            <Header />
            <EventSection />
            <Cart />
        </div>
    );
}

export default App;
