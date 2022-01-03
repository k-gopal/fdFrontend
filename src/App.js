import { useState } from "react";
import { connect } from "react-redux";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/home/Login";
import { setIsLoggedIn } from "./components/home/redux/action";
import SignUp from "./components/home/SignUp";

const App = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showLogIn, setShowLogIn] = useState(true);
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        handleIsloggedin={setIsLoggedIn}
        showLogIn={setShowLogIn}
      />
      {isLoggedIn ? (
        <Home />
      ) : (
        <>
          {showLogIn ? (
            <Login handleLoggedIn={setIsLoggedIn} />
          ) : (
            <SignUp handleLoggedIn={setIsLoggedIn} />
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.reducerHome.isLoggedIn,
  };
};

const mapDispatchToProps = {
  setIsLoggedIn,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
