import { useState } from "react";
import { connect } from "react-redux";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/home/Login";
import { setIsLoggedIn, setNameProfession } from "./components/home/redux/action";
import SignUp from "./components/home/SignUp";

const App = ({ isLoggedIn, setIsLoggedIn, userDetails, setNameProfession }) => {
  const [showLogIn, setShowLogIn] = useState(true);
  console.log(userDetails)
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        handleIsloggedin={setIsLoggedIn}
        showLogIn={setShowLogIn}
      />
      {isLoggedIn ? (
        <Home profession={userDetails.profession} name={userDetails.name} email={userDetails.email} token={userDetails.token} />
      ) : (
        <>
          {showLogIn ? (
            <Login handleLoggedIn={setIsLoggedIn} setNameProfession={setNameProfession} />
          ) : (
            <SignUp handleLoggedIn={setIsLoggedIn} setNameProfession={setNameProfession} />
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.reducerHome.isLoggedIn,
    userDetails: state.reducerHome.userDetails,
  };
};

const mapDispatchToProps = {
  setIsLoggedIn,
  setNameProfession
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
