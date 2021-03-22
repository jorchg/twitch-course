function insertListItem(task) {
  const newItem = document.createElement('li');
  const newItemDeleteButton = document.createElement('span');
  const newItemCheckbox = document.createElement('input');

  newItemDeleteButton.textContent = '❌';  
  newItem.classList.add('list__item');
  newItem.innerHTML = `${task}`;

  newItemCheckbox.type = 'checkbox';

  const list = document.querySelector('ul');
  list.appendChild(newItem);

  newItem.prepend(newItemCheckbox);
  newItem.appendChild(newItemDeleteButton);
  deleteItemListener(newItemDeleteButton);
  markItemAsCompletedListener(newItemCheckbox);
}

function markItemAsCompletedListener(element) {
  element.addEventListener('click', function() {
    toggleElementAsCompleted(element.parentElement);
  });
}

function deleteItemListener(element) {
  element.addEventListener('click', function(event) {
    const item = event.target;
    item.parentElement.remove();
  });
}

function toggleElementAsCompleted(element) {
 const checkbox = element.querySelector('input[type="checkbox"]');
 element.classList.toggle('list__item--completed');
}

window.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#todo__form');
  const textInput = document.querySelector('input[type="text"]');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const deleteElements = document.querySelectorAll('.list__item');

  checkboxes.forEach(function(element) {
    element.addEventListener('change', function() {
      toggleElementAsCompleted(element.parentElement);
    });
  });
 
  deleteElements.forEach(function(element) {
    const deleteItemButton = element.querySelector('span');
    deleteItemListener(deleteItemButton);
  });

  form.addEventListener('submit', function(event) {
    insertListItem(textInput.value);
    textInput.value = '';
    event.preventDefault();
  });
});
