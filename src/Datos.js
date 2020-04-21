export default class Tabla {
  constructor(temp, feel_like, max, min, pressure, humidity, wind, clouds) {
    this.labels = ["Actual", "Sensación", "Maxima", "Minima"];
    this.datasets = [
      {
        label: "Temperatura",
        backgroundColor: "rgba(252, 246, 177,1)",
        borderColor: "rgba(252, 246, 177,1)",
        borderWidth: 2,
        data: [temp, feel_like, max, min],
      },
    ];
    this.pressure = pressure;
    this.humidity = humidity;
    this.wind = wind;
    this.clouds = clouds;
  }
}
