function insertListItem(task, completed = false, isSavedItem = false) {
  const newItem = document.createElement('li');
  const newItemDeleteButton = document.createElement('span');
  const newItemCheckbox = document.createElement('input');

  newItem.dataset.completed = completed;
  newItem.dataset.text = task;

  newItemDeleteButton.textContent = '❌';  
  newItem.classList.add('list__item');
  newItem.innerHTML = `${task}`;

  newItemCheckbox.type = 'checkbox';
  newItemCheckbox.checked = completed;

  const list = document.querySelector('ul');
  list.appendChild(newItem);

  newItem.prepend(newItemCheckbox);
  newItem.appendChild(newItemDeleteButton);
  deleteItemListener(newItemDeleteButton);

  if (!isSavedItem) {
    saveElement({
      'text': task,
      'completed': false,
    });
  }
}

function deleteItemListener(element) {
  element.addEventListener('click', function(event) {
    const item = event.target;
    item.parentElement.remove();
    deleteElement(element);
  });
}

function toggleElementAsCompleted(element) {
 const checkbox = element.querySelector('input[type="checkbox"]');
 const isCompleted = element.dataset.completed;
 element.classList.toggle('list__item--completed');
 element.dataset.completed = (isCompleted === 'true') ? 'false' : 'true';
}

function saveElement(newElement) {
  const elements = getElements();
  elements.items.push(newElement);
  saveElements(elements);
}

function saveElements(elements) {
  localStorage.setItem('items', JSON.stringify(elements));
}

function deleteElement(element) {
  const elements = getElements();
  const item = element.closest('li');
  const text = item.dataset.text;
  const completed = item.dataset.completed;

  const filteredItems = elements.items.filter(savedItem => savedItem.text !== text && savedItem.completed !== completed);
  saveElements({
    items: filteredItems
  });
}

function getElements() {
  return JSON.parse(localStorage.getItem('items'));
}

window.addEventListener('DOMContentLoaded', function() {
  const savedItems = getElements();
  if (!savedItems) saveElements({
    "items": []
  });

  savedItems.items.forEach(function(item) {
    insertListItem(item.text, item.completed, true);
  });

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
