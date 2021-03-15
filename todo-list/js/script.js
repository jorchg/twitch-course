function insertListItem(task) {
  const newItem = document.createElement('div');
  newItem.classList.add('list__item-container');
  newItem.innerHTML = `<li class="list__item">${task}</li><span>X</span>`;

  const list = document.querySelector('ul');
  list.appendChild(newItem);
  markItemAsCompletedListener(newItem);
  deleteItemListener(newItem.querySelector('span'));
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
  const deleteElements = document.querySelectorAll('.list__item-container span');

  listItems.forEach(function(element) {
    markItemAsCompletedListener(element);
  });
 
  deleteElements.forEach(function(element) {
    deleteItemListener(element);
  });

  form.addEventListener('submit', function() {
    insertListItem(textInput.value);
    textInput.value = '';
  });
});
