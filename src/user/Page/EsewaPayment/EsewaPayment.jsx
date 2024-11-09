import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const EsewaPayment = () => {
  const [amount, setAmount] = useState(100);
  const [taxAmount, setTaxAmount] = useState(10);
  const [totalAmount, setTotalAmount] = useState(110);
  const [transactionUuid, setTransactionUuid] = useState("241028");
  const productCode = "EPAYTEST";
  const successUrl = "https://dineshpaudel1.com.np/success";
  const failureUrl = "https://dineshpaudel1.com.np/failure";
  const secretKey = "8gBm/:&EnhH.1/q(";

  useEffect(() => {
    setTotalAmount(amount + taxAmount);
  }, [amount, taxAmount]);

  const generateSignature = () => {
    const signatureBaseString = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
    console.log("Signature Base String:", signatureBaseString); // Debugging line
    const hash = CryptoJS.HmacSHA256(signatureBaseString, secretKey);
    return CryptoJS.enc.Base64.stringify(hash);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const signature = generateSignature();
    console.log("Generated Signature:", signature); // Debugging line

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    const params = {
      amount: String(amount),
      tax_amount: String(taxAmount),
      total_amount: String(totalAmount),
      transaction_uuid: transactionUuid,
      product_code: productCode,
      product_service_charge: "0",
      product_delivery_charge: "0",
      success_url: successUrl,
      failure_url: failureUrl,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      signature,
    };

    console.log("Parameters Sent to eSewa:", params); // Debugging line

    for (const key in params) {
      const hiddenField = document.createElement("input");
      hiddenField.type = "hidden";
      hiddenField.name = key;
      hiddenField.value = params[key];
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Pay with eSewa
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700 font-semibold">Amount:</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">Tax Amount:</span>
            <input
              type="number"
              value={taxAmount}
              onChange={(e) => setTaxAmount(Number(e.target.value))}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">Total Amount:</span>
            <input
              type="number"
              value={totalAmount}
              readOnly
              className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-100"
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">
              Transaction UUID:
            </span>
            <input
              type="text"
              value={transactionUuid}
              onChange={(e) => setTransactionUuid(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md transition duration-300 mt-4"
          >
            Pay with eSewa
          </button>
        </form>
      </div>
    </div>
  );
};

export default EsewaPayment;
