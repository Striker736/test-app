import { useEffect, useState } from "react";
import ModelViewContainer from "containers/ModelViewContainer";
import { OptionContextProvider } from "contexts/OptionContext";

import "./App.css";

const App = () => {
  const [modelData, setModelData] = useState({});

  useEffect(() => {
    fetch("./model.json")
      .then(async (res) => {
        const jsonData = await res.json();
        console.log(jsonData);
        const data = {
          Name: jsonData.Name,
          Surname: jsonData.Surname,
          Images: jsonData.Images.filter((image) => image.Type === "Photo"),
        };
        setModelData(data);
      })
      .catch((e) => {
        console.error("Error in App.js - useEffect , " + e);
      });
  }, []);

  return (
    <OptionContextProvider>
      <ModelViewContainer data={modelData} />
    </OptionContextProvider>
  );
};

export default App;
