export default async function handler(req, res) {
  try {
    const response = await fetch("https://airnav.com/airport/TJBQ/COPECA");
    const html = await response.text();

    // Better pattern based on table structure
    const match = html.match(/Jet A Full service[\s\S]*?\$([0-9]+\.[0-9]+)/i);

    const price = match ? match[1] : "N/A";

    res.status(200).json({
      jetA: price
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch fuel data" });
  }
}
