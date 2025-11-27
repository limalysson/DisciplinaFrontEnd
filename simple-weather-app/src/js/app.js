const apiKey = 'f0bb2246525cdfa3709e7ab97b192db0'; // Substitua com sua chave de API da OpenWeatherMap

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('searchForm');
  const cityInput = document.getElementById('cityInput');
  const statusEl = document.getElementById('status');
  const resultSection = document.getElementById('result');
  const tempEl = document.getElementById('temp');
  const tempMinEl = document.getElementById('tempMin'); // Campo para temperatura mínima
  const tempMaxEl = document.getElementById('tempMax'); // Campo para temperatura máxima
  const feelsEl = document.getElementById('feels');
  const humidityEl = document.getElementById('humidity');
  const conditionEl = document.getElementById('condition');
  const resultCity = document.getElementById('resultCity');
  const loadingEl = document.createElement('div'); // Elemento para o spinner de loading

  // Adicionar spinner de loading
  loadingEl.className = 'loading hidden';
  loadingEl.innerHTML = '<div class="spinner"></div>';
  document.body.appendChild(loadingEl);

  // Função para mapear códigos de clima para ícones (emoji)
  function weatherIconForCode(code) {
    const c = Number(code);
    if (c === 0) return '☀️';
    if (c === 1 || c === 2) return '🌤️';
    if (c === 3) return '☁️';
    if (c >= 45 && c <= 48) return '🌫️';
    if ((c >= 51 && c <= 57) || (c >= 61 && c <= 67) || (c >= 80 && c <= 82)) return '🌧️';
    if ((c >= 71 && c <= 77) || (c >= 85 && c <= 86)) return '❄️';
    if (c >= 95) return '⛈️';
    return '🌈';
  }

  // Função para alterar o fundo da página com base no clima
  function changeBackground(code) {
    const c = Number(code);
    let bgColor = '--bg'; // Default background
    if (c === 0) bgColor = '#f9d71c'; // Sol
    else if (c >= 1 && c <= 3) bgColor = '#87ceeb'; // Nublado
    else if (c >= 45 && c <= 48) bgColor = '#d3d3d3'; // Neblina
    else if ((c >= 51 && c <= 57) || (c >= 61 && c <= 67) || (c >= 80 && c <= 82)) bgColor = '#4a90e2'; // Chuva
    else if ((c >= 71 && c <= 77) || (c >= 85 && c <= 86)) bgColor = '#b0e0e6'; // Neve
    else if (c >= 95) bgColor = '#800080'; // Trovoada
    document.body.style.backgroundColor = bgColor;
  }

  function setStatus(message, isError = false) {
    statusEl.textContent = message;
    statusEl.style.color = isError ? 'red' : 'black';
  }

  function showResult() {
    resultSection.classList.remove('hidden');
  }

  function hideResult() {
    resultSection.classList.add('hidden');
  }

  function showLoading(show) {
    if (show) {
      loadingEl.classList.remove('hidden'); // Exibe o spinner
    } else {
      loadingEl.classList.add('hidden'); // Oculta o spinner
    }
  }

  async function fetchWeather(city) {
    try {
      showLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Erro ao buscar dados de clima');
      const data = await response.json();

      // Extrair dados da resposta
      const { main, weather, name } = data;
      const temperature = main.temp;
      const feelsLike = main.feels_like;
      const humidity = main.humidity;
      const tempMin = main.temp_min; // Temperatura mínima
      const tempMax = main.temp_max; // Temperatura máxima
      const condition = weather[0].description;
      const weatherCode = weather[0].id; // Código do clima (OpenWeatherMap)

      // Atualizar UI
      resultCity.textContent = `${weatherIconForCode(weatherCode)} ${name}`;
      tempEl.textContent = `${temperature.toFixed(1)} °C`;
      tempMinEl.textContent = `${tempMin.toFixed(1)} °C`;
      tempMaxEl.textContent = `${tempMax.toFixed(1)} °C`;
      feelsEl.textContent = `${feelsLike.toFixed(1)} °C`;
      humidityEl.textContent = `${humidity} %`;
      conditionEl.textContent = condition.charAt(0).toUpperCase() + condition.slice(1);

      // Alterar fundo com base no clima
      changeBackground(weatherCode);

      showResult();
      setStatus('Dados carregados com sucesso!');
    } catch (error) {
      console.error(error);
      setStatus(error.message, true);
      hideResult();
    } finally {
      showLoading(false);
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (!city) {
      setStatus('Por favor, insira o nome de uma cidade.', true);
      return;
    }
    setStatus('Carregando...');
    fetchWeather(city);
  });
});