export default async function handler(req, res) {
  try {
    const lat = 18.4949;
    const lon = -67.1294;

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
    );

    const data = await response.json();

    const tempF = Math.round((data.current_weather.temperature * 9/5) + 32);
    const windMPH = Math.round(data.current_weather.windspeed * 0.621371);

    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(200).json({
      temp: tempF,
      wind: windMPH,
      code: data.current_weather.weathercode,
      daily: data.daily
    });

  } catch (error) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).json({ error: "Weather fetch failed" });
  }
}
