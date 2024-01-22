var addForm = document.querySelector('#add');
var userEmail = document.querySelectorAll('div.email')

if (userEmail) {
  userEmail.forEach(function(email) {
    email.addEventListener('click', function(e) {
      var temp = e.target;
      var input = document.createElement('input');

      input.setAttribute('name', 'email');
      input.setAttribute('type', 'email');
      input.classList.add('inputEmail');
      input.value = temp.innerText;
      e.target.replaceWith(input);
      input.focus();

      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') input.replaceWith(temp);
      });

      input.addEventListener('keydown', async function keyPress(event) {
        if (event.key === 'Enter') {
          if (input.value.toLowerCase() === temp.innerText.toLowerCase()) {
            input.replaceWith(temp);
            return;
          }

          input.classList.remove('wrongEmail');
          input.disabled = true;
          var name = Array.from(event.target.parentNode.children)
            .filter(x => x.classList.contains('name'))[0].innerText;
          var user = { name, email: input.value, oldEmail: temp.innerText };
          try {
            var res = await axios.post('/api/updateUser', user, {
              'Content-Type': 'application/json'
            });
            temp.innerText = res.data === 'OK'
              ? user.email
              : user.oldEmail;
            input.replaceWith(temp);
          } catch (e) {
            console.error(e.response);
            if (e.response.data === 'EMAIL') {
              console.log("DA")
              input.classList.add('wrongEmail');
            }
            input.disabled = false;
            input.focus();
          }
        }
      });
    });
  });
}


if (addForm) {
  addForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    addForm.submit.disabled = true;
    try {
      var resp = await axios.post('/api/addUser', addForm, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      location.reload();
    } catch (e) {
      console.error(e.response);
      console.log(e.response.data)
      if (e.response.data === 'EMAIL') {
        event.target.email.classList.add('wrongEmail');
      }
    }

    addForm.submit.disabled = false;
  });
}

