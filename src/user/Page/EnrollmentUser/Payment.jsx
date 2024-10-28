import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

const Sewa = () => {
  const amount = 100;
  const taxAmount = 0;
  const productServiceCharge = 0;
  const productDeliveryCharge = 0;
  const successURL = "https://esewa.com.np"; // Change this to your actual success URL
  const failureURL = "https://google.com"; // Change this to your actual failure URL
  const secret = "8gBm/:&EnhH.1/q"; // Replace with your actual secret key

  const [paymentUrl, setPaymentUrl] = useState("");
  const [uuid] = useState(Date.now().toString()); // Generate UUID once

  useEffect(() => {
    // Construct the message and signature
    const message = `total_amount=${amount},transaction_uuid=${uuid},product_code=EPAYTEST`;
    const signature = CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA256(message, secret)
    );

    const formData = new URLSearchParams({
      amount: amount.toString(),
      tax_amount: taxAmount.toString(),
      total_amount: amount.toString(),
      transaction_uuid: uuid,
      product_code: "EPAYTEST",
      product_service_charge: productServiceCharge.toString(),
      product_delivery_charge: productDeliveryCharge.toString(),
      success_url: successURL,
      failure_url: failureURL,
      signature,
      signed_field_names: "total_amount,transaction_uuid,product_code",
    });

    const submitPayment = async () => {
      try {
        const response = await fetch(
          "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
          }
        );

        if (response.ok) {
          const responseUrl = response.url; // eSewa may return a URL to redirect to
          setPaymentUrl(responseUrl);
        } else {
          alert("Payment Error: Failed to initiate payment with eSewa.");
        }
      } catch (error) {
        alert("Payment Error: An error occurred while connecting to eSewa.");
      }
    };

    submitPayment();
  }, [
    amount,
    taxAmount,
    productServiceCharge,
    productDeliveryCharge,
    uuid,
    successURL,
    failureURL,
    secret,
  ]);

  const handlePaymentResponse = () => {
    // Here, implement a mechanism to handle the response when user is redirected back
    window.location.href.includes("success")
      ? alert("Payment Success: Your payment has been successfully processed.")
      : alert("Payment Failed: Your payment could not be processed.");
  };

  return (
    <div>
      {paymentUrl ? (
        <iframe
          src={paymentUrl}
          width="100%"
          height="600px"
          onLoad={handlePaymentResponse}
          style={{ border: "none" }}
        />
      ) : (
        <button onClick={() => {}} className="btn">
          Load Payment Form
        </button>
      )}
    </div>
  );
};

export default Sewa;
