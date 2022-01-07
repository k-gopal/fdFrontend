import React, { useEffect, useState } from "react";
import { postRequestApi } from "../../../services/common-service";

const ActiveBidsTrans = ({ token, email }) => {
  const [tableData, setTableData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [seeBid, setSeeBid] = useState("");
  const [bidDetails, setBidDetails] = useState({});
  const [initialBidDetails, setInitialBidDetails] = useState({})

  const fetchTableData = async () => {
    let result = await postRequestApi(
      "/bid/listActiveBids",
      {
        limit,
      },
      token
    );

    if (result?.data?.statusCode === 200) {
      setTableData(result?.data?.payload?.result);
    }
  };

  const fetchBidDetails = async () => {
    let result = await postRequestApi(
      "/bid/fetchBidDetails",
      {
        id: seeBid,
        email,
      },
      token
    );

    if (result?.data?.statusCode === 200) {
      setBidDetails({...bidDetails, ...result?.data?.payload?.result[0]});
    }
    console.log({bidDetails})
  };

  const setBidding = async () => {
    let result = await postRequestApi(
      "/bid/setBidding",
      {
        id: seeBid,
        email,
        price: parseInt(bidDetails.price),
        revisions: 1
      },
      token
    );

    if (result?.data?.statusCode === 200) {
        setBidDetails({});
        setInitialBidDetails({});
      alert("Bidded Successfully.");
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [limit]);

  useEffect(() => {
      if(seeBid.length){
          fetchBidDetails();
      }
  }, [seeBid]);

  return (
    <div className="container mt-3">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Sr. No.</th>
            <th scope="col">Destination City</th>
            <th scope="col">Goods Desc</th>
            <th scope="col">Bid Start Time</th>
            <th scope="col">Bid End Time</th>
            <th scope="col">Initial Amount</th>
            <th scope="col">Revisions</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.length
            ? tableData.map((ele, i) => {
                return (
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <th>{ele.city}</th>
                    <th>{ele.goodsDescription}</th>
                    <th>{ele.activeDurationStart}</th>
                    <th>{ele.activeDurationEnd}</th>
                    <th>{ele.initialAmount}</th>
                    <th>{ele.revisions}</th>
                    <th>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                            setSeeBid(ele._id.toString())
                            setInitialBidDetails({
                                price: ele.initialAmount,
                                revisions: ele.revisions
                            })
                            setBidDetails({...bidDetails, price: ele.initialAmount})}}
                        data-bs-toggle="modal"
                        data-bs-target="#seeBidModal"
                      >
                        Bid
                      </button>
                    </th>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-primary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            id="limitDropDown"
          >
            Limit: {limit}
          </button>
          <ul className="dropdown-menu" aria-labelledby="limitDropdown">
            <li>
              <p className="dropdown-item" onClick={() => setLimit(10)}>
                10
              </p>
            </li>
            <li>
              <p className="dropdown-item" onClick={() => setLimit(20)}>
                20
              </p>
            </li>
            <li>
              <p className="dropdown-item" onClick={() => setLimit(50)}>
                50
              </p>
            </li>
            <li>
              <p className="dropdown-item" onClick={() => setLimit(100)}>
                100
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="modal fade"
        id="seeBidModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="seeBidModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="seeBidModal">
                Bid Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Revision: {bidDetails?.revisions ? bidDetails.revisions : 0}
              </p>
              <label className="form-label" for="profession1">
                Bid Price
              </label>
              <input
                className="form-control"
                type="number"
                max={initialBidDetails?.price ? initialBidDetails.price : 0}
                min={0}
                id="profession1"
                name="profession"
                value={bidDetails?.price ? bidDetails.price : 0}
                onChange={(e) =>
                  setBidDetails({ ...bidDetails, price: e.target.value })
                }
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                    (bidDetails?.revisions ? bidDetails.revisions : 0) < (initialBidDetails?.revisions ? initialBidDetails.revisions : 0) &&
                    setBidding()
                }}
              >
                Bid
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveBidsTrans;
