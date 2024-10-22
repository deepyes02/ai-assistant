const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;
const aiEndpoint = "http://127.0.0.1:11434/api/generate";

app.use(express.json());

// Serve the index.html file on the root route
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle the /ask-ai POST request
app.post('/ask-ai', async (req, res) => {
	if (!req.body) {
		return res.status(400).json({ message: 0, error: "Sorry, empty request" });
	}

	if (req.body.model && req.body.prompt) {
		try {
			// Make the POST request to the AI endpoint
			await makePostRequestToAI(req.body, res);
			// no need to return response as it is streamed
		} catch (error) {
			res.status(500).json({
				error: "Error parsing request to AI"
			});
		}
	} else {
		res.status(400).json({ error: "Model and prompt are required." });
	}
});

// Function to make the POST request to the AI endpoint
async function makePostRequestToAI(userRequest, clientRes) {
	const { model, prompt } = userRequest;

	const requestData = {
		model: model,
		prompt: prompt,
	};

	const aiResponse = await fetch(aiEndpoint, {
		method: 'POST',
		body: JSON.stringify(requestData)
	})

	if (!aiResponse.ok) { throw new Error('Failed to get response from AI') }

	const reader = aiResponse.body.getReader();
	const decoder = new TextDecoder('utf-8');

	clientRes.setHeader('Content-Type', 'application/x-ndjson');


	while (true) {
		const { done, value } = await reader.read();
		if (done) break;

		const chunk = decoder.decode(value, { stream: true })
		clientRes.write(chunk)
	}

	clientRes.end();
}

// Start the server
app.listen(PORT, () => {
	console.log(`AI Server running at http://localhost:${PORT}`);
});