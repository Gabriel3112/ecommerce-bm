import React, { useState, useEffect, useContext, createContext } from "react";

import DesktopScreen from "./Screens/Desktop";
import MobileScreen from "./Screens/Mobile";

import "./App.css";

import HeaderComponent from "./Components/Header";

import FooterComponent from "./Components/Footer";

function App() {
  const viewportContext = createContext({});

  const ViewportProvider = ({ children }) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    useEffect(() => {
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return (
      <viewportContext.Provider value={{ width, height }}>
        {children}
      </viewportContext.Provider>
    );
  };

  const useViewport = () => {
    const { width, height } = useContext(viewportContext);
    return { width, height };
  };

  const MobileComponent = () => <MobileScreen />;
  const DesktopComponent = () => <DesktopScreen />;

  const TypeScreenComponent = () => {
    const { width } = useViewport();
    const breakpoint = 620;

    return width < breakpoint ? <MobileComponent /> : <DesktopComponent />;
  };

  return (
    <div className="Container">
      <div className="header">
        <HeaderComponent />
      </div>

      <div className="main">
        <ViewportProvider>
          <TypeScreenComponent />
        </ViewportProvider>
      </div>

      <div className="footer">
        <FooterComponent />
      </div>
    </div>
  );
}

export default App;
