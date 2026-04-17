export default async function handler(req, res) {
  try {
    const response = await fetch("https://airnav.com/airport/TJBQ/COPECA");
    const html = await response.text();

    let price = "N/A";

    // Find all price values like $6.35
    const priceMatches = [...html.matchAll(/\$([0-9]+\.[0-9]+)/g)];

    if (priceMatches.length > 0) {
      // First fuel price on page is Jet A
      price = priceMatches[0][1];
    }

    res.status(200).json({
      jetA: price
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch fuel data" });
  }
}
