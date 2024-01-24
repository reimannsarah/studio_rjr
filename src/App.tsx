import { useEffect } from "react";
import "./App.css";
import Hero from "./components/main/Hero";
import main from "./services/blobServiceClient";

function App() {
  useEffect(() => {
    main()
      .then((blobInfos) => {
        sessionStorage.setItem("blobInfos", JSON.stringify(blobInfos));
      })
      .catch((err) => console.error(err));

    const storedBlobInfos = sessionStorage.getItem("blobInfos");
    if (storedBlobInfos) {
      console.log(JSON.parse(storedBlobInfos));
    }
  }, []);

  return (
    <>
      <Hero />
    </>
  );
}

export default App;
