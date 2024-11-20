import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Providers from "./contexts/Providers";
import EventPage from "./Pages/EventPage";
import CartPage from "./Pages/CartPage";

function App() {
    return (
        <BrowserRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <Providers>
                <div className="flex flex-col grow">
                    <Header />
                    <Routes>
                        <Route path="/" element={<EventPage />} />
                        <Route path="/cart" element={<CartPage />} />
                    </Routes>
                </div>
            </Providers>
        </BrowserRouter>
    );
}

export default App;
