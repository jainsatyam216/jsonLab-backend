import axios from "axios";

export const proxyRequest = async (req, res) => {
  try {
    const { url, method, headers, body, params } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const start = Date.now();

    const response = await axios({
      url,
      method: method || "GET",
      headers: headers || {},
      params: params || {},
      data: body || {},
      validateStatus: () => true   // so we return even 4xx / 5xx
    });

    const timeTaken = Date.now() - start;

    return res.json({
      status: response.status,
      statusText: response.statusText,
      time: timeTaken,
      headers: response.headers,
      data: response.data
    });

  } catch (error) {
    console.error("Proxy error:", error.message);

    return res.status(500).json({
      error: error.message,
      details: error.response?.data || null
    });
  }
};
