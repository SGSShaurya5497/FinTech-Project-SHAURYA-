import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class Donut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [1200, 11000, 45000, 12000, 4500, 5000],
      options: {
        theme: {
          monochrome: {
            enabled: false
          }
        },
        colors: ['#6C63FF', '#00D4AA', '#FFD166', '#FF4D6D', '#3182CE', '#805AD5'],
        labels: ['Travel', 'Restaurants', 'Shopping', 'Digital Payments', 'ATM', 'Other'],
        legend: {
          position: "bottom",
          labels: {
            colors: "#8B8FA8",
          },
          markers: {
            width: 10,
            height: 10,
            radius: 5,
          },
          itemMargin: {
            horizontal: 10,
            vertical: 5
          }
        },
        plotOptions: {
          pie: {
            startAngle: 0,
            endAngle: 360,
            expandOnClick: true,
            offsetX: 0,
            offsetY: 0,
            customScale: 1,
            dataLabels: {
              offset: -5,
              minAngleToShowLabel: 10
            }, 
            donut: {
              size: '60%',
              background: 'transparent',
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: '12px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  color: "#8B8FA8",
                  offsetY: -10,
                },
                value: {
                  show: true,
                  fontSize: '16px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 'bold',
                  color: "#FFFFFF",
                  offsetY: 5,
                  formatter: function (val) {
                    return '₹' + parseInt(val).toLocaleString('en-IN');
                  }
                },
                total: {
                  show: true,
                  label: 'Total spent',
                  color: '#8B8FA8',
                  fontSize: '11px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  formatter: function (w) {
                    return '₹' + w.globals.seriesTotals.reduce((a, b) => a + b, 0).toLocaleString('en-IN');
                  }
                }
              }
            },      
          }
        },
        tooltip: {
          theme: "dark",
          y: {
            formatter: function (val) {
              return '₹' + parseInt(val).toLocaleString('en-IN');
            }
          }
        },
        dataLabels: {
          enabled: true,
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            colors: ["#FFFFFF"]
          },
          dropShadow: {
            enabled: false
          }
        }
      }
    }
  }

  render() {
    return (
      <div className="donut" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Chart options={this.state.options} series={this.state.series} type="donut" width="380" />
      </div>
    );
  }
}

export default Donut;