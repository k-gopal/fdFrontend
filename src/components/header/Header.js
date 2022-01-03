import React from "react";

const Header = ({ isLoggedIn, handleIsloggedin, showLogIn }) => {
  return (
    <header class="p-3 bg-dark text-white">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-between">
          <div>
            <a
              href="/"
              class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              Real-Time Bidder
            </a>
          </div>

          <div class="text-end ml-5">
            {isLoggedIn ? (
              <button
                type="button"
                class="btn btn-warning"
                onClick={() => {
                  handleIsloggedin(false);
                }}
              >
                Log-Out
              </button>
            ) : (
              <>
                <button
                  type="button"
                  class="btn btn-outline-light me-2"
                  onClick={() => showLogIn(true)}
                >
                  Login
                </button>
                <button
                  type="button"
                  class="btn btn-warning"
                  onClick={() => showLogIn(false)}
                >
                  Sign-up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
