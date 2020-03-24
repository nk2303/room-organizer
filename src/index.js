document.addEventListener('DOMContentLoaded', () => {
    alert('LOADED');
    const endPoint = '';
    fetch(endPoint)
      .then(res => res.json())
      .then(json => console.log(json));
  });


