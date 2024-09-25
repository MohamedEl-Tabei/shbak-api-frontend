import Components from "../components";
const Payment = () => {
  return (
    <div className="d-flex flex-column align-items-center h-100vh ">
      <Components.StatusBar status={false} />
      <div className="shadow p-5 w-50">
        <Components.PaymentForm />
      </div>
    </div>
  );
};

export default Payment;
