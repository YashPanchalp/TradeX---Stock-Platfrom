import React from "react";

function Brokerage() {
  return (
  
    <div className="container mt-5 border-top">
    <table class="table m-5" style={{paddingTop:"50px"}}>
      <thead>
        <tr>
          <th scope="col" style={{color:"#387ed1"}}>Type of Account</th>
          <th scope="col" style={{color:"#387ed1"}}>Charges</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td scope="row">Individual account</td>
          <td>FREE</td>
        </tr>
        <tr>
          <td scope="row">Minor account</td>
          <td>FREE</td>
        </tr>
        <tr>
          <td scope="row">NRI account</td>
          <td>₹ 500</td>
        </tr>
        <tr>
          <td scope="row">HUF account</td>
          <td>₹ 500</td>
        </tr>
        <tr>
          <td>Partnership</td>
          <td>₹ 500</td>
        </tr>
      </tbody>
    </table>
    </div>
  );
}

export default Brokerage;
