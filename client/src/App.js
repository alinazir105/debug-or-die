import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import classes from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import MainPage from "../src/pages/MainPage/MainPage";
import HomePage from "../src/pages/HomePage/HomePage";
import { useLocation } from "react-router";

import NavBar from "./compenents/NavBar/NavBar";
import ScrollToTop from "./compenents/ScrollToTop/ScrollToTop";

import { useDispatch } from "react-redux";
import { fetchQuestionListData } from "./store/Questions/questions-actions";
import { getLoggedIn } from "./store/Auth/auth-actions";
import Message from "./compenents/Message/Message";

import { messageActions } from "./store/Message/message-slice";
import FooterFAB from "./compenents/FooterFAB/FooterFAB";
import NavigationStack from "./compenents/NavigationStack/NavigationStack";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getLoggedIn());
    dispatch(fetchQuestionListData());
    dispatch(
      messageActions.set({
        type: "info",
        message: "Welcome to website !",
        description:
          "This website is to solve coding questions and check against testcases",
      })
    );
  }, [dispatch]);

  const isMainPage = location.pathname === "/mainpage";
  const isHomePage = location.pathname === "/homepage";

  return (
    <div className={isMainPage || isHomePage ? "" : classes.App}>
      {!isMainPage && !isHomePage && <NavBar />}
      {!isMainPage && !isHomePage && <Message />}
      {/* {!isMainPage && <FooterFAB />} */}
      {!isMainPage && !isHomePage && <ScrollToTop />}
      {!isMainPage && !isHomePage && <NavigationStack />}

      <Routes>
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
