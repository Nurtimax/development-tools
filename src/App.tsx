import React from "react";
import "./App.css";
import ConvertObject from "./components/convert-object";
import { Container, Toolbar } from "@mui/material";

function App() {
     return (
          <>
               <Toolbar />
               <Container>
                    <ConvertObject />
               </Container>
          </>
     );
}

export default App;
