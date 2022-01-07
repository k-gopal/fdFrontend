import React, { useEffect, useState } from "react";
import { postRequestApi } from "../../../services/common-service";

const ClosedBidsTrans = ({ email, token }) => {
  const [tableData, setTableData] = useState([]);
  const [limit, setLimit] = useState(10);

  const fetchTableData = async () => {
    let result = await postRequestApi(
      "/bid/listBiddedOn",
      {
        email,
        limit,
      },
      token
    );

    if (result?.data?.statusCode === 200) {
      setTableData(result?.data?.payload?.result);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [limit]);
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
    </div>
  );
};

export default ClosedBidsTrans;