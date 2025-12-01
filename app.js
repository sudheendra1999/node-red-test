// generate-3mb-node-red-flow.js
// Creates a 3MB flows.json, a ZIP, and a Base64 string of the ZIP.

const fs = require("fs");
const zlib = require("zlib");

// --- 1. Generate a large JSON flow (≈3 MB) ---
let items = [];
const COUNT = 45000; // adjust if you need slightly larger/smaller than 3MB

for (let i = 0; i < COUNT; i++) {
  items.push({
    id: "node_" + i,
    type: "debug",
    z: "flowTab",
    name: "Debug Node " + i,
    active: true,
    tosidebar: true,
    wires: []
  });
}

const flow = [
  { id: "flowTab", type: "tab", label: "Test Flow 3MB" },
  ...items
];

const json = JSON.stringify(flow, null, 2);
fs.writeFileSync("flows.json", json);
console.log("✔ flows.json created (" + (json.length / 1024 / 1024).toFixed(2) + " MB )");

// --- 2. ZIP the file ---
const zipData = zlib.gzipSync(json);
fs.writeFileSync("flows.zip", zipData);
console.log("✔ flows.zip created (" + zipData.length + " bytes compressed )");

// --- 3. Create Base64 version of the ZIP ---
const base64 = zipData.toString("base64");
fs.writeFileSync("flows.zip.b64", base64);
console.log("✔ flows.zip.b64 created");
console.log("\nYour Base64 ZIP is ready in flows.zip.b64");