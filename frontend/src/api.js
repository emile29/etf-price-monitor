const BASE_URI = "http://localhost:3001/api";

export async function uploadEtfFile(formData) {
  const res = await fetch(`${BASE_URI}/uploadEtfFile`, {
    method: 'POST',
    body: formData,
  });
  return res.json();
}

export async function getEtfPriceByTime(formData) {
  const res = await fetch(`${BASE_URI}/getEtfPriceByTime`, {
    method: 'GET',
  });
  return res.json();
}

export async function getLatestTop5Holdings(formData) {
  const res = await fetch(`${BASE_URI}/getLatestTop5Holdings`, {
    method: 'GET',
  });
  return res.json();
}