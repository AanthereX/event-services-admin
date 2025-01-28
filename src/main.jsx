/** @format */

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import "flatpickr/dist/flatpickr.min.css";
import { persistor, store } from "./store/index.js";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
  <React.Fragment>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position={"bottom-right"}
          richColors
          toastOptions={
            {
              // unstyled: true,
              // classNames: {
              //   toast: "bg-blue-400",
              //   title: "text-red-400",
              //   description: "text-red-400",
              //   actionButton: "bg-zinc-400",
              //   cancelButton: "bg-orange-400",
              //   closeButton: "bg-lime-400",
              // },
            }
          }
        />
      </PersistGate>
    </Provider>
  </React.Fragment>,
);
