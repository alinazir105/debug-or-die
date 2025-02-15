import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import classes from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BackgroundBeams } from "./pages/MainPage/MainPage";
import HomePage from "../src/pages/HomePage/HomePage";
import GlobalTimer from "../src/compenents/GlobalTimer/GlobalTimer";
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
    // dispatch(getLoggedIn());
    dispatch(fetchQuestionListData());
    // dispatch(
    //   messageActions.set({
    //     type: "info",
    //     message: "Welcome to website !",
    //     description:
    //       "This website is to solve coding questions and check against testcases",
    //   })
    // );
  }, [dispatch]);

  const isMainPage = location.pathname === "/mainpage";
  const isHomePage = location.pathname === "/homepage";
  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";
  const isQuestion = location.pathname.startsWith("/questions/");

  const noTimerRoutes = ["/", "/mainpage", "/login", "/register", "/gameover"];
  const showTimer = !noTimerRoutes.includes(location.pathname);

  return (
    <div className={isMainPage || isHomePage ? "" : classes.App}>
      {/* {showTimer && <GlobalTimer />} */}
      {!isQuestion && !isLogin && !isRegister && !isMainPage && !isHomePage && (
        <NavBar />
      )}
      {!isMainPage && !isHomePage && <Message />}
      {/* {!isMainPage && <FooterFAB />} */}
      {/* {!isMainPage && !isHomePage && <ScrollToTop />} */}
      <ScrollToTop />
      {!isMainPage && !isHomePage && <NavigationStack />}

      <Routes>
        <Route path="/mainpage" element={<BackgroundBeams />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
