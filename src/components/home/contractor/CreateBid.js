import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { postRequestApi } from "../../../services/common-service";

const CreateBid = ({ userDetails }) => {
  const [formData, setFormaData] = useState({
    city: "",
    goodsDescription: "",
    activeDurationStart: "",
    activeDurationEnd: "",
    initialAmount: 1,
    revisions: 1,
  });

  useEffect(() => {
    if (formData.revisions < 0) {
      setFormaData({ ...formData, revisions: 0 });
    }
    if (formData.initialAmount < 0) {
      setFormaData({ ...formData, initialAmount: 0 });
    }
  }, [formData.initialAmount, formData.revisions]);

  const validateData = () => {
    if (
      !formData.city.length &&
      !formData.goodsDescription.length &&
      !formData.activeDurationStart.length &&
      !formData.activeDurationEnd.length &&
      !formData.initialAmount.length &&
      !formData.revisions.length
    ) {
      return false;
    } else if (formData.activeDurationEnd <= formData.activeDurationStart) {
      return false;
    } else if (formData.initialAmount <= 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async () => {
    if (validateData()) {
      console.log(formData);
      const result = await postRequestApi(
        "/bid/createBid",
        {
          ...formData,
        },
        userDetails.token
      );
      if (result?.data?.statusCode === 200) {
        console.log(result);
        setFormaData({
          city: "",
          goodsDescription: "",
          activeDurationStart: "",
          activeDurationEnd: "",
          initialAmount: 1,
          revisions: 1,
        });
      }
    } else {
      alert("Please fill valid data.");
    }
  };
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-lg-8 col-md-10 col-sm-12">
        <div className="shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="text-dark fw-bold">Create Bid</h3>
          <hr />
          <label htmlFor="city" className="form-label">
            Destination City<sup style={{ color: "red" }}>*</sup>:
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={(e) =>
              setFormaData({ ...formData, city: e.target.value })
            }
            className="form-control"
          />
          <label htmlFor="goodsDescription" className="form-label mt-1">
            Goods Description<sup style={{ color: "red" }}>*</sup>:
          </label>
          <textarea
            rows={3}
            name="goodsDescription"
            value={formData.goodsDescription}
            onChange={(e) =>
              setFormaData({ ...formData, goodsDescription: e.target.value })
            }
            className="form-control"
          />
          <label htmlFor="activDurationStart" className="form-label mt-1">
            Start Bidding At<sup style={{ color: "red" }}>*</sup>:
          </label>
          <input
            type="datetime-local"
            name="activDurationStart"
            value={formData.activeDurationStart}
            onChange={(e) =>
              setFormaData({ ...formData, activeDurationStart: e.target.value })
            }
            className="form-control"
          />
          <label htmlFor="activeDurationEnd" className="form-label mt-1">
            End Bidding At<sup style={{ color: "red" }}>*</sup>:
          </label>
          <input
            type="datetime-local"
            name="activeDurationEnd"
            value={formData.activeDurationEnd}
            onChange={(e) =>
              setFormaData({ ...formData, activeDurationEnd: e.target.value })
            }
            className="form-control"
          />
          <label htmlFor="initialAmount" className="form-label mt-1">
            Initial Amount<sup style={{ color: "red" }}>*</sup>:
          </label>
          <input
            type="number"
            name="initialAmount"
            value={formData.initialAmount}
            onChange={(e) =>
              setFormaData({
                ...formData,
                initialAmount: parseInt(e.target.value),
              })
            }
            className="form-control"
          />
          <label htmlFor="revisions" className="form-label mt-1">
            Revisions for Bidding<sup style={{ color: "red" }}>*</sup>:
          </label>
          <input
            type="number"
            name="revisions"
            value={formData.revisions}
            onChange={(e) =>
              setFormaData({ ...formData, revisions: e.target.value })
            }
            className="form-control"
          />
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              onClick={() => handleSubmit()}
              className="btn btn-primary my-3"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.reducerHome.userDetails,
  };
};

export default connect(mapStateToProps, null)(CreateBid);
