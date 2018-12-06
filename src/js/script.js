// Get all the Elements from the DOM.
const secretsBar = document.getElementById('secretsBar');
const secretsBtn = document.getElementById('secretsBtn');
const retrieveSecrets = document.getElementById('retrieveSecrets');
const secretList = document.getElementById('secretList');

// Array where secrets are going to live.
const secretAnswArray = [];

// Btn will add secrets to list.
secretsBtn.addEventListener('click', function () {
  if (secretsBar.value !== '') {
    localStorage.setItem('newSecret', secretsBar.value);
    const secretAnsw = localStorage.getItem('newSecret');
    secretAnswArray.push(secretAnsw);
    localStorage.setItem('newSecretArray', JSON.stringify(secretAnswArray));
    const secretAnswArrayResp = JSON.parse(localStorage.getItem('newSecretArray'));
    console.log(secretAnswArrayResp);
    secretsBar.value = '';
  }
});

// This counter works as Index for elements.
let indexCounter = 0;

// Function will Get and Create elements from Array.
retrieveSecrets.addEventListener('click', function () {

  // Get the Array and convert it as Json.
  const secretAnswArrayResp = JSON.parse(localStorage.getItem('newSecretArray'));
  if (secretAnswArrayResp.length !== '') {

    // For Each element from the Array Do.
    secretAnswArrayResp.forEach(function(e) {

      // Create elements where information will be store.
      const secretListItem = document.createElement('li');
      const secretListBtn = document.createElement('input');
      const secretListWrapper = document.createElement('div');
      secretListBtn.setAttribute('type', 'submit')

      // Attribute Data, to create Index Numbers to regular elements.
      secretListBtn.setAttribute('data-indexOf', indexCounter);

      // Counter will increase Index Number.
      indexCounter += 1;

      // Add information into de Containers.
      secretListItem.innerHTML = e;
      secretListWrapper.appendChild(secretListItem);
      secretListWrapper.appendChild(secretListBtn);
      secretList.appendChild(secretListWrapper);

      // Function will live in every Btn.
      secretListBtn.addEventListener('click', function(e) {

        // Save the Index Number where the Function it´s been triggered.
        const elementIndexNumb = e.target.getAttribute('data-indexOf', indexCounter);

        // Remove Element from Array using Index Number.
        // From 'IndexNumb' to 1.
        secretAnswArray.splice(elementIndexNumb, 1);

        // Convert response to Json.
        localStorage.setItem('newSecretArray', JSON.stringify(secretAnswArray));
        const secretAnswArrayResp = JSON.parse(localStorage.getItem('newSecretArray'));
      });
    });
  }
});
