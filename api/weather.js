export default async function handler(req, res) {
  try {
    const lat = 18.4949;
    const lon = -67.1294;

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(200).json({
      temp: Math.round(data.current_weather.temperature),
      wind: Math.round(data.current_weather.windspeed)
    });

  } catch (error) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).json({ error: "Weather fetch failed" });
  }
}
