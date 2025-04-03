// Select all elements that have the "data-bgcolor" attribute
document.querySelectorAll('[data-bgcolor]').forEach(el => {
  // Set the background color of each element based on its attribute value
  el.style.backgroundColor = el.getAttribute('data-bgcolor');
});
