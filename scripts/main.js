const d = document;

// ========================================================================
// XMLHTTPREQUEST
// ========================================================================
(() => {
  const xhr = new XMLHttpRequest(); // Instanciacion
  const $xhrList = d.querySelector('.xhr');
  const $fragment = d.createDocumentFragment();

  // Cuando detecta algun cambio de estado
  xhr.addEventListener('readystatechange', (e) => {
    // Validacion : para que el codigo solo se ejecute cuando el readystate = 4
    if (xhr.readyState !== 4) return;

    // Validacion: Respuesta correcta e invalida
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log('Success Connection :D');

      let json = JSON.parse(xhr.responseText); // Convertir a json js

      json.forEach((el) => {
        const $li = d.createElement('li');
        $li.innerHTML = `${el.name}, ${el.email}, ${el.phone}`;
        $fragment.appendChild($li);
      });

      $xhrList.appendChild($fragment);
    } else {
      console.log('Failed Connection :(');
      let message = xhr.statusText || 'Ocurrio un error';
      $xhrList.innerHTML = `Error: ${xhr.status}: ${message}`;
    }
  });

  // Abrir la peticion
  // @ Metodo en el que vamos a comunicarnos
  // @ Url a consumir
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');

  // Enviar la peticion
  xhr.send();
})();

// ========================================================================
// FETCH
// ========================================================================
(() => {
  const $fetchList = d.querySelector('.fetch');
  const $fragment = d.createDocumentFragment();

  // fetch por defecto es GET
  fetch('https://jsonplaceholder.typicode.com/users')
    // Validar un error
    // Si la respuesta es ok, lo convierte a json
    // Si no, entonces aborta los procesos y va al catch
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      // console.log(json);

      json.forEach((el) => {
        const $li = d.createElement('li');
        $li.innerHTML = `${el.name}, ${el.email}, ${el.phone}`;
        $fragment.appendChild($li);
      });

      $fetchList.appendChild($fragment);
    })
    .catch((err) => {
      console.log('Failed Connection :(');
      let message = err.statusText || 'Ocurrio un error';
      $fetchList.innerHTML = `Error: ${err.status}: ${message}`;
    })
    .finally(() => {
      console.log('fetch finally...');
    });
})();

// ========================================================================
// FETCH + ASYNC
// ========================================================================
(() => {
  const $fetchAsyncList = d.querySelector('.fetch-async');
  const $fragment = d.createDocumentFragment();

  async function getData() {
    try {
      let res = await fetch('https://jsonplaceholder.typicode.com/users');
      let json = await (res.ok ? res.json() : Promise.reject(res));

      json.forEach((el) => {
        const $li = d.createElement('li');
        $li.innerHTML = `${el.name}, ${el.email}, ${el.phone}`;
        $fragment.appendChild($li);
      });

      $fetchAsyncList.appendChild($fragment);
    } catch (err) {
      console.log('Failed Connection :(');
      let message = err.statusText || 'Ocurrio un error';
      $fetchAsyncList.innerHTML = `Error: ${err.status}: ${message}`;
    } finally {
      console.log('fetch async finally...');
    }
  }

  getData();
})();

// ========================================================================
// AXIOS
// ========================================================================
// * Basada en promesas
(() => {
  const $axiosList = d.querySelector('.axios');
  const $fragment = d.createDocumentFragment();

  axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then((res) => {
      let json = res.data;
      json.forEach((el) => {
        const $li = d.createElement('li');
        $li.innerHTML = `${el.name}, ${el.email}, ${el.phone}`;
        $fragment.appendChild($li);
      });

      $axiosList.appendChild($fragment);
    })
    .catch((err) => {
      console.log('Failed Connection :(');
      let message = err.response.statusText || 'Ocurrio un error';
      $axiosList.innerHTML = `Error: ${err.response.status}: ${message}`;
    })
    .finally(() => {
      console.log('axios finally...');
    });
})();

// ========================================================================
// AXIOS - ASYNC
// ========================================================================
(() => {
  const $axiosAsyncList = d.querySelector('.axios-async');
  const $fragment = d.createDocumentFragment();

  async function getData() {
    try {
      let res = await axios.get('https://jsonplaceholder.typicode.com/users');
      let json = await res.data;

      json.forEach((el) => {
        const $li = d.createElement('li');
        $li.innerHTML = `${el.name}, ${el.email}, ${el.phone}`;
        $fragment.appendChild($li);
      });

      $axiosAsyncList.appendChild($fragment);
    } catch (err) {
      console.log('Failed Connection :(');
      let message = err.response.statusText || 'Ocurrio un error';
      $axiosAsyncList.innerHTML = `Error: ${err.response.status}: ${message}`;
    } finally {
      console.log('axios async finally...');
    }
  }

  getData();
})();
