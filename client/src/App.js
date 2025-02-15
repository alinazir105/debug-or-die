import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";

import classes from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BackgroundBeams } from "./pages/MainPage/MainPage";
import HomePage from "../src/pages/HomePage/HomePage";
import GameOver from "../src/pages/GameOver/GameOver";
import GlobalTimer from "../src/compenents/GlobalTimer/GlobalTimer";
import NavBar from "./compenents/NavBar/NavBar";
import ScrollToTop from "./compenents/ScrollToTop/ScrollToTop";
import Message from "./compenents/Message/Message";
import FooterFAB from "./compenents/FooterFAB/FooterFAB";
import NavigationStack from "./compenents/NavigationStack/NavigationStack";

import { fetchQuestionListData } from "./store/Questions/questions-actions";
import { getLoggedIn } from "./store/Auth/auth-actions";
import { messageActions } from "./store/Message/message-slice";

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
  const isGameOver = location.pathname === "/gameover";

  // Don't show timer on these routes
  const noTimerRoutes = ["/", "/mainpage", "/login", "/register", "/gameover"];
  const showTimer = !noTimerRoutes.includes(location.pathname);

  return (
    <div className={isMainPage || isHomePage ? "" : classes.App}>
      {/* {showTimer && <GlobalTimer />} */}

      {!isQuestion &&
        !isLogin &&
        !isRegister &&
        !isMainPage &&
        !isHomePage &&
        !isGameOver && <NavBar />}

      {!isMainPage && !isHomePage && <Message />}
      {/* {!isMainPage && <FooterFAB />} */}

      <ScrollToTop />

      {!isMainPage && !isHomePage && <NavigationStack />}

      <Routes>
        <Route path="/mainpage" element={<BackgroundBeams />} />
        <Route path="/homepage" element={<HomePage />} />
        {/* Add your other routes here */}
        <Route path="/gameover" element={<GameOver />} />
      </Routes>
    </div>
  );
};

export default App;
