import React from "react";

function RightSection({
  imageURL,
  productName,
  productDescription,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-5 border-top right-section-wrap">
      <div className="row align-items-center product-section-row right-section-row">
        <div
          className="col-lg-6 col-12 mt-4 mt-lg-0 order-2 order-lg-1 right-section-content"
          style={{ padding: "50px" , paddingTop:"150px", paddingLeft: "50px" }}
        >
          <h1 className="fs-3 mb-3">{productName}</h1>
          <p className="text-muted">{productDescription}</p>
          <div className="product-link-row">
            <a href={learnMore}>
              Learn More  <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>

          <div className="mt-3 product-badge-row">
            <a href={googlePlay}>
              <img src="media/images/googlePlayBadge.svg" />
            </a>
            <a href={appStore}>
              <img src="media/images/appStoreBadge.svg" />
            </a>
          </div>
        </div>
        <div className="col-lg-6 col-12 order-1 order-lg-2 text-center right-section-media">
          <img
            src={imageURL}
            style={
              imageURL?.includes("kiteconnect.png")
                ? { marginTop: "120px", marginBottom: "100px" }
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
