import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, Box } from "@chakra-ui/react";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
    <Box p="3rem">
        <App />
   </Box>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
