const PaymentForm = () => {
  return (
    <form>
      <h1 align="center" style={{ fontSize: "1.5rem" }}>
        Pay with a card
      </h1>
      <div class="mb-3">
        <label for="Card" class="form-label">
          Card number
        </label>
        <input
          type="Card"
          class="form-control"
          id="Card"
          aria-describedby="Card"
        />
      </div>
      <div class="mb-3">
        <label for="Expiration" class="form-label">
          Expiration date
        </label>
        <input
          type="date"
          class="form-control"
          id="Expiration"
        />
      </div>
      <button type="submit" class="btn w-100 btn-primary">
        Complete purchase
      </button>
    </form>
  );
};

export default PaymentForm;
