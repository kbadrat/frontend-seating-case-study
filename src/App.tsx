import "./App.css";
import Header from "./components/Header/Header";
import Cart from "./components/Cart/Cart";
import EventSection from "./components/Event/EventSection";
import { CartProvider } from "./contexts/CartContext";
import { LoginProvider } from "./contexts/LoginContext";

function App() {
    return (
        <div className="flex flex-col grow">
            <LoginProvider>
                <CartProvider>
                    <Header />
                    <EventSection />
                    <Cart />
                </CartProvider>
            </LoginProvider>
        </div>
    );
}

export default App;
