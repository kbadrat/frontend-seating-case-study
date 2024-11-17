import "./App.css";
import Header from "./components/Header/Header";
import Cart from "./components/Cart/Cart";
import EventSection from "./components/Event/EventSection";
import { CartProvider } from "./hooks/useCart";

function App() {
    return (
        <div className="flex flex-col grow">
            <CartProvider>
                <Header />
                <EventSection />
                <Cart />
            </CartProvider>
        </div>
    );
}

export default App;
