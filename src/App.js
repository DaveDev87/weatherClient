import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Tabla from "./Datos";
import { Bar } from "react-chartjs-2";
import { Grid, Card, CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001",
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", (data) =>
      this.setState({
        response: new Tabla(
          data.main.temp,
          data.main.feels_like,
          data.main.temp_max,
          data.main.temp_min,
          data.main.pressure,
          data.main.humidity,
          data.wind.speed,
          data.clouds.all
        ),
      })
    );
  }

  render() {
    const { response } = this.state;
    const estilo = {
      width: "170px",
      height: "170px",
      fontFamily: "Baloo",
      margin: "7px",
    };
    const valor = {
      fontSize: "33px",
    };
    return (
      <div style={{ textAlign: "center" }}>
        <Typography variant="h1" style={{ fontFamily: "Baloo" }}>
          Real-time weather monitor
        </Typography>
        {response ? (
          <Grid container alignItems="center" direction="row" justify="center">
            <Grid item xs={6}>
              <Bar
                data={response}
                options={{
                  title: {
                    display: true,
                    text: "Temperatura en Durango",
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: "top",
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Grid
                container
                alignItems="center"
                direction="row"
                justify="center"
              >
                <Grid item>
                  <Card style={estilo}>
                    <CardContent>
                      <Typography variant="h6" style={{ fontFamily: "Baloo" }}>
                        Presión atmosferica:
                      </Typography>
                      <p style={valor}> {response.pressure}</p>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item>
                  <Card style={estilo}>
                    <CardContent>
                      <Typography variant="h6" style={{ fontFamily: "Baloo" }}>
                        Humedad del aire:
                      </Typography>
                      <p style={valor}> {response.humidity}</p>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item>
                  <Card style={estilo}>
                    <CardContent>
                      <Typography variant="h6" style={{ fontFamily: "Baloo" }}>
                        {" "}
                        Velocidad del viento:{" "}
                      </Typography>
                      <p style={valor}> {response.wind}</p>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item>
                  <Card style={estilo}>
                    <CardContent>
                      <Typography variant="h6" style={{ fontFamily: "Baloo" }}>
                        Cantidad de Nubes:
                      </Typography>
                      <p style={valor}> {response.clouds}</p>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}
