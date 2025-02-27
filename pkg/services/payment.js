const axios = require('axios');

exports.makePayment = async (amount, currency, method) => {
    try {
        const url = process.env.MOCK_URL
        if(!url) {
            throw new Error("Missing env info: MOCK_URL is not set");
        }

        const response = await axios.post(`${url}/init-transaction`, { amount, currency, method});
        return { paymentId: response.data.id, status: response.data.status };
    } catch (error) {
        console.error('Initialize payment error:', error.message, error.stack);

        if (error.response) {
            throw new Error(`Gateway error: ${error.response.data?.message || 'failure in transaction'}`);
        }

        if (error.request) {
            throw new Error('Fail to connect to the Gateway');
        }

        throw new Error(`Internal Server Error: ${error.message}`);
    }
};