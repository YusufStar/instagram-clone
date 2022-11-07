import React ,{ useState } from "react";
import CustomRouter from "./Router/CustomRouter";
import { createContext } from "react";

export const InstagramContext = createContext();

function App() {
  const [loading, setloading] = useState(true)
  const [user, setuser] = useState(null)
  const [data, setdata] = useState([])
  const [language, setlanguage] = useState("English")

  return (
    <InstagramContext.Provider value={{loading, setloading, user, setuser, language, setlanguage, data, setdata}}>
      <CustomRouter />
    </InstagramContext.Provider>
  );
}

export default App;
