export const barChartData = [
  {
    name: "Sales",
    data: [120000, 67000],
  },
];

export const barChartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
    style: {
      fontSize: "12px",
      fontFamily: "Inter, sans-serif",
    },
  },
  xaxis: {
    categories: ["Money IN", "Money OUT"],
    show: false,
    labels: {
      show: true,
      style: {
        colors: "#fff",
        fontSize: "12px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    color: "#fff",
    labels: {
      show: true,
      style: {
        colors: "#fff",
        fontSize: "14px",
      },
    },
  },
  grid: {
    borderColor: "rgba(255, 255, 255, 0.05)",
    strokeDashArray: 5,
  },
  colors: ["#6C63FF", "#00D4AA"],
  fill: {
    colors: ["#6C63FF", "#00D4AA"],
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: "40px",
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 2,
          },
        },
      },
    },
  ],
};

export const lineChartData = [
  {
    name: "Income",
    data: [12250, 134540, 111300, 99000, 115500, 122250],
  },
  {
    name: "Expenditure",
    data: [67730, 129290, 99940, 113440, 75290, 40334],
  },
];

export const lineChartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  xaxis: {
    type: "datetime",
    categories: [
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
    ],
    labels: {
      style: {
        colors: "#c8cfca",
        fontSize: "12px",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#c8cfca",
        fontSize: "12px",
      },
    },
  },
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "right",
    labels: {
      colors: "#c8cfca",
    },
  },
  grid: {
    borderColor: "rgba(255, 255, 255, 0.05)",
    strokeDashArray: 5,
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      shadeIntensity: 0.5,
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0.1,
      stops: [0, 100],
    },
    colors: ["#6C63FF", "#00D4AA"],
  },
  colors: ["#6C63FF", "#00D4AA"],
};
