function insertListItem(task) {
  const newItem = document.createElement('li');
  const newItemDeleteButton = document.createElement('span');

  newItemDeleteButton.textContent = 'X';  
  newItem.classList.add('list__item');
  newItem.innerHTML = `${task}`;

  const list = document.querySelector('ul');
  list.appendChild(newItem);
  markItemAsCompletedListener(newItem);

  newItem.appendChild(newItemDeleteButton);
  deleteItemListener(newItemDeleteButton);
}

function markItemAsCompletedListener(element) {
  element.addEventListener('click', function(event) {
    const element = event.target;
    element.classList.toggle('list__item--completed');
  });
}

function deleteItemListener(element) {
  element.addEventListener('click', function(event) {
    const item = event.target;
    item.parentElement.remove();
  });
}

window.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#todo__form');
  const textInput = document.querySelector('input[type="text"]');
  const listItems = document.querySelectorAll('.list__item');
  const deleteElements = document.querySelectorAll('.list__item');

  listItems.forEach(function(element) {
    markItemAsCompletedListener(element);
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
