import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import classes from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import MainPage from "../src/pages/MainPage/MainPage";
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

  return (
    <div className={isMainPage ? "" : classes.App}>
      {!isMainPage && <NavBar />}
      {!isMainPage && <Message />}
      {/* {!isMainPage && <FooterFAB />} */}
      {!isMainPage && <ScrollToTop />}
      {!isMainPage && <NavigationStack />}

      <Routes>
        <Route path="/mainpage" element={<MainPage />} />
      </Routes>
    </div>
  );
};

export default App;
