export default async function handler(req, res) {
  try {
    const response = await fetch("https://airnav.com/airport/TJBQ/COPECA");
    const html = await response.text();

    let price = "N/A";

    const priceMatches = [...html.matchAll(/\$([0-9]+\.[0-9]+)/g)];

    if (priceMatches.length > 0) {
      price = priceMatches[0][1];
    }

    // ✅ THIS IS THE FIX
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(200).json({
      jetA: price
    });

  } catch (error) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(500).json({ error: "Failed to fetch fuel data" });
  }
}
