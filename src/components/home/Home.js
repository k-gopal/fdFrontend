import React, { useState } from "react";
import ActiveBid from "./contractor/ActiveBid";
import ClosedBid from "./contractor/ClosedBid";
import CreateBid from "./contractor/CreateBid";
import ActiveBidsTrans from "./transporter/ActiveBidsTrans";
import ClosedBidsTrans from "./transporter/ClosedBidsTrans";

const Home = ({ profession, name, email, token }) => {
  const [activeTab, setActiveTab] = useState(1);
  console.log(profession);
  return (
    <div className="container mt-2">
      <h4>Hi {name}</h4>
      <ul className="nav nav-pills nav-fill">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 1 && "active"}`}
            onClick={() => setActiveTab(1)}
          >
            {profession === "contractor" ? "Create Bid" : "Active Bids"}
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 2 && "active"}`}
            onClick={() => setActiveTab(2)}
          >
            {profession === "contractor" ? "Active Bids" : "Bidded On"}
          </button>
        </li>
        {profession === "contractor" ? (
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 3 && "active"}`}
              onClick={() => setActiveTab(3)}
            >
              Closed Bids
            </button>
          </li>
        ) : null}
      </ul>
      <div className="mt-3">
        {profession === "contractor" ? (
          <>
            {activeTab === 1 ? (
              <CreateBid />
            ) : activeTab === 2 ? (
              <ActiveBid email={email} token={token} />
            ) : activeTab === 3 ? (
              <ClosedBid email={email} token={token} />
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            {activeTab === 1 ? (
              <ActiveBidsTrans token={token} email={email} />
            ) : activeTab === 2 ? (
              <ClosedBidsTrans token={token} email={email} />
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
