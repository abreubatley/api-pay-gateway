  const paymentsDB = {};

  const mocks = [
    {
      id: "mock-test",
      url: "/mockserver/status",
      method: "GET",
      response: (req, res) => {
        res.status(200).json({ message: "mock up and ready to use" });
      },
    },
    {
      id: "init-transaction",
      url: "/init-transaction",
      method: "POST",
      response: (req, res) => {
        const paymentId = Math.random().toString(36).slice(2, 9);
        paymentsDB[paymentId] = { status: "pending" }

        res.status(200).json({ id: paymentId, status: "pending" });
      },
    },
    {
      id: "get-payment-status",
      url: "/payment-status/:paymentId",
      method: "GET",
      response: (req, res) => {
        const paymentId = req.params.paymentId;

        if (!paymentId) {
          return res.status(400).json({ error: "Payment ID is required" });
        }

        if (!paymentsDB[paymentId]) {
          return res.status(404).json({ error: "Payment not found" });
        }

        if (paymentsDB[paymentId].status === "pending") {
          const statuses = ["success", "failure"];
          paymentsDB[paymentId].status = statuses[Math.floor(Math.random() * statuses.length)];
        }

        res.status(200).json({ paymentId, status: paymentsDB[paymentId].status });
      },
    },
  ];

  module.exports = mocks;
