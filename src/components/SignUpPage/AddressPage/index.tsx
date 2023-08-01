import React from "react";

const AddressPage = ({ id }: { id: string }) => {
  return (
    <section>
      <div>
        <div className="header">
          {/* Display the relevant title for the current page */}
          {/* TODO: Make each page responsible for it's own title */}
          <h2>Sign Up - Guidance</h2>
        </div>
        <form action="" aria-labelledby="address-legend">
          <fieldset>
            <legend id="address-legend">Your home address</legend>
            <label
              className="help-label"
              htmlFor="house-num"
              id="house-num-label"
            >
              Please enter the number or name of your flat/house:
              <span className="required" aria-hidden="true">
                Required
              </span>
            </label>
            <input
              className="block-input"
              type="text"
              aria-aria-labelledby="house-num-label"
              aria-required="true"
              autoComplete="address-line1"
            />
          </fieldset>
        </form>
      </div>
    </section>
  );
};

export default AddressPage;
