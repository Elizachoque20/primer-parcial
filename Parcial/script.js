const formulario = document.getElementById('formulario');
const tipoDoc = document.getElementById('tipoDoc');
const campoPais = document.getElementById('campoPais');
const resultado = document.getElementById('resultado');

tipoDoc.addEventListener('change', () => {
  const esPasaporte = tipoDoc.value === 'pasaporte';
  campoPais.style.display = esPasaporte ? 'block' : 'none';
  if (!esPasaporte) document.getElementById('pais').value = '';
});

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  const datos = Object.fromEntries(new FormData(formulario));
  const errores = [];

  if (datos.nombre.trim().length < 3)
    errores.push('El nombre debe tener al menos 3 caracteres.');
  if (!datos.tipoDoc)
    errores.push('Selecciona un tipo de documento.');
  if (datos.tipoDoc && datos.tipoDoc !== 'pasaporte' && !/^\d{6,10}$/.test(datos.numeroDoc))
    errores.push('El número debe tener entre 6 y 10 dígitos.');
  if (datos.tipoDoc === 'pasaporte') {
    if (datos.numeroDoc.trim().length < 6)
      errores.push('El pasaporte debe tener al menos 6 caracteres.');
    if (!datos.pais.trim())
      errores.push('Indica el país de expedición.');
  }

  if (errores.length) {
    resultado.innerHTML = errores.join('<br>');
  } else {
    const pais = datos.pais ? ` (${datos.pais})` : '';
    resultado.textContent = `¡Listo, ${datos.nombre}! Documento ${datos.tipoDoc.toUpperCase()} ${datos.numeroDoc}${pais} registrado.`;
  }
});