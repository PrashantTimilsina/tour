"use client";
import CryptoJS from "crypto-js";
import { useParams, useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

function Payment() {
  const searchParams = useSearchParams();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const amountParam = searchParams.get("amount");
  const amount = amountParam ? Number(amountParam) : 0;

  const tax_amount = 10;
  const product_service_charge = 0;
  const product_delivery_charge = 0;

  const total_amount =
    amount + tax_amount + product_service_charge + product_delivery_charge;

  const transaction_uuid = uuidv4();
  const product_code = "EPAYTEST";

  const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
  const secretKey = "8gBm/:&EnhH.1/q";
  const hash = CryptoJS.HmacSHA256(message, secretKey);
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
        className="w-full max-w-md p-8 md:p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          eSewa Payment
        </h2>

        {/* Inputs */}
        <label>Amount</label>
        <input
          type="text"
          name="amount"
          value={amount}
          readOnly
          required
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <label>Tax amount</label>
        <input
          type="text"
          name="tax_amount"
          value={tax_amount}
          readOnly
          required
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <label>Total amount</label>
        <input
          type="text"
          name="total_amount"
          value={total_amount}
          readOnly
          required
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="transaction_uuid"
          value={transaction_uuid}
          readOnly
          required
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="product_code"
          value={product_code}
          readOnly
          required
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Hidden Fields */}
        <input
          type="hidden"
          name="product_service_charge"
          value={product_service_charge}
        />
        <input
          type="hidden"
          name="product_delivery_charge"
          value={product_delivery_charge}
        />
        <input
          type="hidden"
          name="success_url"
          value={`http://localhost:3000/success/${id}`}
        />
        <input
          type="hidden"
          name="failure_url"
          value="http://localhost:3000/failure"
        />
        <input
          type="hidden"
          name="signed_field_names"
          value="total_amount,transaction_uuid,product_code"
        />
        <input type="hidden" name="signature" value={hashInBase64} />

        <button
          type="submit"
          className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Payment;
