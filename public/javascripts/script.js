// import axios from 'axios';


const userToken = () => {
  const value = document.cookie.split(';').find(x => x.trim().startsWith('token'));
  token = value ? value.split('=')[1] : null;
  return token;
};


const signin = async (e) => {
  e.preventDefault();


  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  fetch(
    `api/users/signin`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }
  ).then(response => response.json())
    .then(data => {
      console.log('sas');
      if (data.message) {
        const variant = document.querySelector('.variant');
        variant.style.display = 'flex';
        variant.textContent = data.message;
        return;
      }
      window.location.replace('/todos');
    })
    .catch(err =>
      console.log(err)
    );
};

const registration = async (e) => {
  e.preventDefault();

  console.log('dre');
  const name = document.querySelector('#name1').value;
  const email = document.querySelector('#email1').value;
  const password = document.querySelector('#password1').value;
  const password1 = document.querySelector('#confirmPassword1').value;
  if (password !== password1) {
    const error = document.querySelector('#regerror');
    error.style.display = 'block';
    error.value = "password isn't a match";
    return;
  }

  fetch(
    `api/users/registration`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    }
  ).then(response => response.json())
    .then(data => {

      if (data.message) {
        const variant = document.querySelector('.variant');
        variant.style.display = 'flex';
        variant.textContent = data.message;
        return;
      }
      window.location.replace('/todos');
    })
    .catch(err =>
      console.log(err)
    );
};


const todoAdd = (e) => {
  e.preventDefault();
  const input = document.querySelector('.todoinput');
  input.style.display = 'flex';
};

const todoSubmit = async (e) => {
  e.preventDefault();
  const todo = document.querySelector('#todoInput').value;
  const token = userToken();
  fetch(
    `/api/todos/mine`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ todo })
    }
  ).then(response => response.json())
    .then(data => {
      window.location.reload();
    })
    .catch(err =>
      console.log(err)
    );
  const input = document.querySelector('.todoinput');
  input.style.display = 'none';
};

const editTodo = (e, id) => {
  e.preventDefault();
  const content = document.querySelector(`.content${id}`);
  const butn = document.querySelector(`.button${id}`);
  content.style.display = "none";
  butn.style.display = "none";
  const updateinput = document.querySelector(`#update${id}`);
  updateinput.style.display = "flex";
};

const updateTodo = async (e, id) => {
  e.preventDefault();
  const input = document.querySelector(`.input${id}`).value;

  let status = false;
  const done = document.querySelector(`#done${id} input[type="radio"]:checked`);
  if (done) {

    if (done.value === "done") {
      status = true;
    }
  }
  const token = userToken();


  fetch(
    `/api/todos/mine/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ input, status })
    }
  ).then(response => response.json())
    .then(data => {

      window.location.reload();
    })
    .catch(err =>
      console.log(err)
    );

};

const deleteTodo = async (e, id) => {
  e.preventDefault();
  const token = userToken();
  fetch(
    `/api/todos/mine/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then(response => response.json())
    .then(data => {

      window.location.reload();
    })
    .catch(err =>
      console.log(err)
    );



};
