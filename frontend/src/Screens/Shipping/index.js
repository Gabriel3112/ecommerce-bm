import React, { useState } from "react";
import axios from "axios";
import PaymentFlowComponent from "../../Components/PaymentFlow";
import "../../global.css";

export default function ShippingScreen() {
  return (
    <div className="flex center collum">
      <div className="width-100">
        <PaymentFlowComponent first />
      </div>
      <div className="margin-top-100">
        <span>Selecione o endereço de entrega:</span>
      </div>
    </div>
  );
}
