import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-5 pt-5 border-top">
      <div className="row align-items-center product-section-row">
        <div className="col-lg-6 col-12 p-3 text-center">
          <img src={imageURL} />
        </div>
        <div
          className="col-lg-6 col-12 mt-5 mt-lg-0"
          style={{ padding: "60px", paddingLeft: "110px" }}
        >
          <h1 className="fs-3 mb-3">{productName}</h1>
          <p className="text-muted">{productDescription}</p>
          <div className="product-link-row">
            <a href={tryDemo} className="product-link">
              Try Demo <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
            <a href={learnMore} className="product-link">
              Learn More{" "}
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
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
      </div>
    </div>
  );
}

export default LeftSection;
