import React from "react";

const AvailableSlotCard = () => {
  return (
    <div className="card mx-2 mt-3">
      <div className="card-body">
        <h5 className="card-title">Available coaches and time slot:</h5>
        <p className="card-text d-flex flex-column">
          <div>
            <div className="form-check align-self-start">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                checked
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Yihan Wang - 13:00-14:00
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Yihan Wang - 15:00-16:00
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Sipeng He - 13:00-14:00
              </label>
            </div>
          </div>
        </p>
      </div>
    </div>
  );
};

export default AvailableSlotCard;