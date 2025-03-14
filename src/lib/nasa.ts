const NASA_API_KEY = 'Wc6cFIUfwhoqK7jaBJ1ctNW86lMhzSeE72dpNchi';
const NASA_BASE_URL = 'https://api.nasa.gov';

export async function getNasaData(endpoint: string, params: Record<string, string> = {}) {
  const queryParams = new URLSearchParams({
    ...params,
    api_key: NASA_API_KEY
  });

  const response = await fetch(`${NASA_BASE_URL}${endpoint}?${queryParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch NASA data');
  }
  return response.json();
}

export async function getAPOD() {
  return getNasaData('/planetary/apod');
}

export async function getMarsPhotos() {
  return getNasaData('/mars-photos/api/v1/rovers/curiosity/photos', {
    sol: '1000'
  });
}

export async function getNeoFeed() {
  const today = new Date().toISOString().split('T')[0];
  return getNasaData('/neo/rest/v1/feed', {
    start_date: today,
    end_date: today
  });
}