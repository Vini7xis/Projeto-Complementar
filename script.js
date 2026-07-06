// URL completa do Worker que roda o backend (troque pelo seu endereço).
const WORKER_URL = 'https://projeto-complementar.cauavinicius140206.workers.dev';

const form = document.getElementById('form');
const btn = document.getElementById('btn');
const resultado = document.getElementById('resultado');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const termo = document.getElementById('termoInput').value;

  btn.disabled = true;
  btn.textContent = 'Explicando...';
  resultado.className = 'carregando';
  resultado.innerHTML = '<span class="spinner"></span>Gerando explicação...';
  resultado.style.display = 'block';

  try {
    const resp = await fetch(WORKER_URL + '/api/explicar', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ termo })
    });
    const data = await resp.json();

    if (!resp.ok) {
      throw new Error(data.error || 'Erro ao gerar explicação.');
    }

    resultado.className = '';
    resultado.textContent = data.explicacao;
  } catch (err) {
    resultado.className = 'erro';
    resultado.textContent = err.message;
  } finally {
    btn.disabled = false;
    btn.textContent = 'Explicar';
  }
});