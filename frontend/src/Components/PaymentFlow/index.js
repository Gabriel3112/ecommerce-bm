import React from "react";

import "../../global.css";

export default function PaymentFlowComponent({ first, second, third }) {
  return (
    <div className="payment-flow flex center row">
      <div className={`flex center ${first ? "show" : " "}`}>
        <span className="margin-top-30">Endereço</span>
      </div>
      <div className={`flex center ${second ? "show" : " "}`}>
        <span className="margin-top-30">Pagamento</span>
      </div>
      <div className={`flex center ${third ? "show" : " "}`}>
        <span className="margin-top-30">Confirmação</span>
      </div>
    </div>
  );
}
