const themeSwitch = document.getElementById("themeSwitch");

function setTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark", isDark);
  localStorage.setItem("cs-dashboard-theme", theme);
  if (themeSwitch) themeSwitch.checked = isDark;
}

const savedTheme = localStorage.getItem("cs-dashboard-theme") || "light";
setTheme(savedTheme);

if (themeSwitch) {
  themeSwitch.addEventListener("change", () => {
    const newTheme = themeSwitch.checked ? "dark" : "light";
    setTheme(newTheme);
    applyChartThemeIfNeeded(newTheme === "dark");
  });
}

const navItems = document.querySelectorAll(".nav-item[data-target]");
const sectionTargets = {
  overview: "sec-overview",
  education: "card-escolaridade",
  work: "card-desemprego",
  map: "sec-map",
};

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");

    const targetKey = item.getAttribute("data-target");
    const sectionId = sectionTargets[targetKey];
    const el =
      document.getElementById(sectionId) ||
      document.getElementById("top-dashboard");

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const charts = [];

function applyChartThemeIfNeeded(isDark) {
  if (!charts.length) return; // página da equipe, por exemplo

  charts.forEach((chart) => {
    if (chart.options.plugins) {
      if (
        chart.options.plugins.legend &&
        chart.options.plugins.legend.labels
      ) {
        chart.options.plugins.legend.labels.color = isDark
          ? "#e5e7eb"
          : "#4b5563";
      }
      if (chart.options.plugins.tooltip) {
        chart.options.plugins.tooltip.backgroundColor = isDark
          ? "#020617"
          : "#111827";
      }
    }

    if (chart.options.scales) {
      const sc = chart.options.scales;
      if (sc.x) {
        if (sc.x.ticks) sc.x.ticks.color = isDark ? "#d1d5db" : "#6b7280";
        if (sc.x.grid)
          sc.x.grid.color = isDark
            ? "rgba(31,41,55,0.7)"
            : "rgba(209,213,219,0.4)";
      }
      if (sc.y) {
        if (sc.y.ticks) sc.y.ticks.color = isDark ? "#d1d5db" : "#6b7280";
        if (sc.y.grid)
          sc.y.grid.color = isDark
            ? "rgba(31,41,55,0.7)"
            : "rgba(209,213,219,0.4)";
      }
    }

    chart.update();
  });
}

if (document.getElementById("chartFaixaEtaria")) {
  const accent = "#2563eb";
  const accentSoft = "#bfdbfe";
  const accentMid = "#60a5fa";
  const accentDark = "#1d4ed8";

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: 10 },
    plugins: {
      legend: {
        labels: {
          font: { size: 11 },
          color: "#4b5563",
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "#111827",
        titleFont: { size: 12 },
        bodyFont: { size: 11 },
        padding: 8,
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(209,213,219,0.4)" },
        ticks: { font: { size: 10 }, color: "#6b7280" },
      },
      y: {
        grid: { color: "rgba(209,213,219,0.4)" },
        ticks: { font: { size: 10 }, color: "#6b7280" },
      },
    },
  };

  const chartFaixaEtaria = new Chart(
    document.getElementById("chartFaixaEtaria"),
    {
      type: "bar",
      data: {
        labels: [
          "0 a 4 anos",
          "5 a 9 anos",
          "11 a 14 anos",
          "15 a 19 anos",
          "20 a 24 anos",
          "25 a 29 anos",
          "30 a 34 anos",
          "35 a 39 anos",
          "40 a 44 anos",
          "45 a 49 anos",
          "50 a 54 anos",
          "55 a 59 anos",
          "60 a 64 anos",
          "65 a 69 anos",
          "70+",
        ],
        datasets: [
          {
            label: "% de pessoas com TEA",
            data: [
              2.1, 2.6, 1.9, 1.3, 1.0, 0.9, 0.9, 0.9, 0.8, 0.9, 0.9, 0.9, 0.9,
              1.0, 1.0,
            ],
            backgroundColor: accentSoft,
            borderColor: accentDark,
            borderWidth: 1.2,
            borderRadius: 5,
          },
        ],
      },
      options: {
        ...baseOptions,
        plugins: { ...baseOptions.plugins, legend: { display: false } },
        scales: {
          ...baseOptions.scales,
          y: { ...baseOptions.scales.y, beginAtZero: true, max: 3 },
        },
      },
    }
  );
  charts.push(chartFaixaEtaria);

  const chartEscolaridade = new Chart(
    document.getElementById("chartEscolaridade"),
    {
      type: "bar",
      data: {
        labels: [
          ["Sem instr.", "fund. incompleto"],
          ["Fundamental", "completo"],
          ["Médio", "completo"],
          ["Superior", "completo"],
        ],
        datasets: [
          {
            label: "Pessoas com TEA (%)",
            data: [46.1, 12.9, 25.4, 15.7],
            backgroundColor: accent,
            barThickness: 30,
            borderRadius: 6,
          },
          {
            label: "População geral (%)",
            data: [35.2, 14.0, 32.3, 18.4],
            backgroundColor: accentSoft,
            barThickness: 30,
            borderRadius: 6,
          },
        ],
      },

      options: {
        ...baseOptions,

        layout: {
          padding: {
            bottom: 25,
          },
        },

        scales: {
          x: {
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
              align: "center",
              font: { size: 11 },
            },
            grid: { display: false },
          },

          y: {
            beginAtZero: true,
            max: 50,
            title: {
              display: true,
              text: "%",
              font: { size: 11 },
            },
            grid: { color: "rgba(209,213,219,0.4)" },
            ticks: { font: { size: 10 }, color: "#6b7280" },
          },
        },

        plugins: {
          legend: {
            labels: {
              font: { size: 12 },
              usePointStyle: true,
              padding: 12,
            },
          },
          tooltip: baseOptions.plugins.tooltip,
        },
      },
    }
  );
  charts.push(chartEscolaridade);

  const chartDesemprego = new Chart(
    document.getElementById("chartDesemprego"),
    {
      type: "doughnut",
      data: {
        labels: ["Fora do mercado", "Empregados"],
        datasets: [
          {
            data: [85, 15],
            backgroundColor: [accent, accentSoft],
            borderColor: "#fff",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "58%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#4b5563",
              font: { size: 11 },
              usePointStyle: true,
            },
          },
          tooltip: {
            backgroundColor: "#111827",
            titleFont: { size: 12 },
            bodyFont: { size: 11 },
            padding: 8,
            cornerRadius: 6,
            callbacks: {
              label: (ctx) => ctx.label + ": " + ctx.parsed + "%",
            },
          },
        },
      },
    }
  );
  charts.push(chartDesemprego);

  const chartUFPercent = new Chart(
    document.getElementById("chartUFPercent"),
    {
      type: "bar",
      data: {
        labels: [
          "Acre",
          "Amapá",
          "Ceará",
          "Rio de Janeiro",
          "Espírito Santo",
          "Rondônia",
          "São Paulo",
          "Paraná",
          "Pernambuco",
          "Santa Catarina",
        ],
        datasets: [
          {
            label: "% TEA",
            data: [1.6, 1.5, 1.4, 1.3, 1.3, 1.3, 1.2, 1.2, 1.2, 1.2],
            backgroundColor: accentSoft,
            borderColor: accentMid,
            borderWidth: 1.4,
            borderRadius: 5,
          },
        ],
      },
      options: {
        ...baseOptions,
        plugins: { ...baseOptions.plugins, legend: { display: false } },
        scales: {
          ...baseOptions.scales,
          y: { ...baseOptions.scales.y, beginAtZero: true, max: 1.8 },
        },
      },
    }
  );
  charts.push(chartUFPercent);

  const chartUFAbsoluto = new Chart(
    document.getElementById("chartUFAbsoluto"),
    {
      type: "line",
      data: {
        labels: [
          "Acre",
          "Amapá",
          "Ceará",
          "Rio de Janeiro",
          "Espírito Santo",
          "Rondônia",
          "São Paulo",
          "Paraná",
          "Pernambuco",
          "Santa Catarina",
          "Paraíba",
          "Piauí",
          "DF",
          "Sergipe",
          "Roraima",
          "Minas Gerais",
          "RS",
          "Goiás",
          "Maranhão",
          "Amazonas",
          "MT",
          "RN",
          "Alagoas",
          "MS",
          "Pará",
          "Bahia",
          "Tocantins",
        ],
        datasets: [
          {
            label: "Mil pessoas",
            data: [
              1.3, 11, 127, 215, 51, 20, 548, 133, 106, 92, 47, 38, 34, 26, 7,
              229, 124, 75, 75, 44, 41, 38, 33, 29, 21, 145, 15,
            ],
            borderColor: accent,
            backgroundColor: accentSoft,
            tension: 0.35,
            pointRadius: 3,
            fill: true,
          },
        ],
      },
      options: {
        ...baseOptions,
        scales: {
          ...baseOptions.scales,
          y: {
            ...baseOptions.scales.y,
            beginAtZero: true,
          },
        },
      },
    }
  );
  charts.push(chartUFAbsoluto);

  applyChartThemeIfNeeded(savedTheme === "dark");
}
