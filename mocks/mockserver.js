const Docker = require('dockerode');
const axios = require('axios');
const mocks = require('./mocks.config.js');

let docker;
let mockServerContainer;
let mockServerPort;
let mockClient;

const startMockServer = async () => {
    console.log("init mockserver with dockerode");

    docker = new Docker();
    mockServerContainer = await docker.createContainer({
        Image: "mockserver/mockserver:5.15.0",
        ExposedPorts: {
            "1080/tcp": {},
        },
        HostConfig: {
            PortBindings: {
                "1080/tcp": [{ HostPort: "0" }],
            },
        },
    });

    await mockServerContainer.start();

    const portInfo = await mockServerContainer.inspect();
    mockServerPort = portInfo.NetworkSettings.Ports["1080/tcp"][0].HostPort;

    console.log(`running mockserver on port: ${mockServerPort}`);

    await setupInitMockServer();

    await waitForMockServer(mockServerPort);

    mockClient = axios.create({
        baseURL: `http://localhost:${mockServerPort}`,
        timeout: 5000,
    });

    console.log(`mockserver running in: http://localhost:${mockServerPort}`);

    return { mockServerContainer, mockServerPort, mockClient };
};

const setupInitMockServer = async () => {
    try {
        for (const mock of mocks) {
            const { statusCode, body } = await getMockResponse(mock);

            const expectationData = {
                httpRequest: {
                    method: mock.method.toUpperCase(),
                    path: mock.url
                },
                httpResponse: {
                    statusCode: statusCode || 200,
                    body: body,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            };

            const response = await axios.put(
                `http://localhost:${mockServerPort}/mockserver/expectation`,
                expectationData,
                { headers: { "Content-Type": "application/json" } }
            );

            console.log(`config setup to endpoint -> ${mock.url}:`, response.data);
        }
    } catch (error) {
        console.error("error config setup mockserver:", error.message);
    }
};

const waitForMockServer = async (port, retries = 30, delay = 1000) => {
    let attempts = 0;
    while (attempts < retries) {
        try {
            const response = await axios.get(`http://localhost:${port}/mockserver/status`);
            if (response.status === 200) {
                console.log("mockserver is ready to use!");
                return;
            }
        } catch (error) {
            console.log(`waiting mockserver (${attempts + 1}/${retries})...`);
        }
        attempts++;
        await new Promise((resolve) => setTimeout(resolve, delay));
    }
    throw new Error("timeout: mockserver is not ready!");
};

const getMockResponse = async (mock) => {
    return new Promise((resolve, reject) => {
        const req = {
            params: {}
        };
        const res = {
            status: (statusCode) => {
                return {
                    json: (data) => {
                        resolve({ statusCode, body: data });
                    }
                };
            }
        };

        if (mock.id === "get-payment-status") {
            req.params.paymentId = "some-payment-id";
        }

        try {
            mock.response(req, res);
        } catch (err) {
            reject(err);
        }
    });
};

const stopMockServer = async () => {
    if (mockServerContainer) {
        await mockServerContainer.stop();
        await mockServerContainer.remove();
        console.log("mockserver stopped and container removed");
    }
};

module.exports = { startMockServer, stopMockServer };
