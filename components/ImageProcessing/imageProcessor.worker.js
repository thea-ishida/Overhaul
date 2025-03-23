// imageProcessor.worker.js
importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js");

let model = null;
let classNames = [];

// Load the model and metadata
async function loadModel(modelPath, metadataPath) {
  try {
    // Load metadata
    const metadataResponse = await fetch(metadataPath);
    const metadata = await metadataResponse.json();
    classNames = metadata.labels;

    // Load the TensorFlow model
    model = await tf.loadLayersModel(modelPath);
    console.log("Model and metadata loaded successfully.");
  } catch (error) {
    console.error("Error loading model or metadata:", error);
    self.postMessage({ error: "Failed to load model or metadata." });
  }
}

// Process the image and detect items
async function detectItem(imageSrc) {
  if (!model) {
    return { error: "Model not loaded." };
  }

  try {
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => {
      image.onload = resolve;
    });

    // Preprocess the image
    const tensor = tf.browser
      .fromPixels(image)
      .resizeNearestNeighbor([224, 224]) // Resize to model's expected input size
      .toFloat() // Convert to float
      .div(tf.scalar(255)) // Normalize pixel values to [0, 1]
      .expandDims();

    // Make predictions
    const predictions = await model.predict(tensor);
    const predictedClass = tf.argMax(predictions, 1).dataSync()[0];
    const detectedItem = classNames[predictedClass];
    const confidence = predictions.dataSync()[predictedClass] * 100;

    return {
      detectedItem: confidence > 60 ? detectedItem : "Cannot Detect Item",
    };
  } catch (error) {
    console.error("Error detecting item:", error);
    return { error: "Failed to detect item." };
  }
}

// Listen for messages from the main thread
self.onmessage = async (event) => {
  const { action, payload } = event.data;

  if (action === "loadModel") {
    await loadModel(payload.modelPath, payload.metadataPath);
    self.postMessage({ status: "Model loaded." });
  } else if (action === "detectItem") {
    const result = await detectItem(payload.imageSrc);
    self.postMessage({ result });
  }
};