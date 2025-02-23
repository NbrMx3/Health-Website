function searchDisease() {
  const input = document.getElementById('searchBar');
  const filter = input.value.toUpperCase();
  const diseases = document.getElementsByClassName('disease');
  
  for (let i = 0; i < diseases.length; i++) {
    const title = diseases[i].getElementsByTagName('h3')[0];
    if (title) {
      const txtValue = title.textContent || title.innerText;
      diseases[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-item');
  
    // Toggle menu open/close on hamburger icon click
    menuIcon.addEventListener('click', function () {
      menuIcon.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
  
    // Close the menu when any navigation link is clicked (mobile view)
    navItems.forEach(item => {
      item.addEventListener('click', function () {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          menuIcon.classList.remove('open');
        }
      });
    });
  
    // Ensure that if the window is resized to a larger viewport, any open classes are removed
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        navLinks.classList.remove('open');
        menuIcon.classList.remove('open');
      }
    });
  });
  document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-item');
  
    // Toggle menu open/close on hamburger icon click
    menuIcon.addEventListener('click', function () {
      menuIcon.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
  
    // Close the menu when any navigation link is clicked (mobile view)
    navItems.forEach(item => {
      item.addEventListener('click', function () {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          menuIcon.classList.remove('open');
        }
      });
    });
  
    // Ensure that if the window is resized to a larger viewport, any open classes are removed
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        navLinks.classList.remove('open');
        menuIcon.classList.remove('open');
      }
    });
  });

  const accordions = document.getElementsByClassName("accordion");
    for (let i = 0; i < accordions.length; i++) {
      accordions[i].addEventListener("click", function () {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
    function addEntry() {
      let glucose = document.getElementById('glucose').value;
      let meal = document.getElementById('meal').value;
      let exercise = document.getElementById('exercise').value;
      
      if (glucose === '' || meal === '' || exercise === '') {
          alert('Please fill in all fields');
          return;
      }
      
      let table = document.getElementById('log');
      let row = table.insertRow();
      row.innerHTML = `
          <td>${glucose}</td>
          <td>${meal}</td>
          <td>${exercise}</td>
          <td><button onclick="removeEntry(this)">Delete</button></td>
      `;
      
      document.getElementById('glucose').value = '';
      document.getElementById('meal').value = '';
      document.getElementById('exercise').value = '';
  }

  function removeEntry(btn) {
      let row = btn.parentNode.parentNode;
      row.parentNode.removeChild(row);
  }
  function addEntry() {
    let symptoms = document.getElementById('symptoms').value;
    let medication = document.getElementById('medication').value;
    let activities = document.getElementById('activities').value;
    
    if (symptoms === '' || medication === '' || activities === '') {
        alert('Please fill in all fields');
        return;
    }
    
    let table = document.getElementById('log');
    let row = table.insertRow();
    row.innerHTML = `
        <td>${symptoms}</td>
        <td>${medication}</td>
        <td>${activities}</td>
        <td><button onclick="removeEntry(this)">Delete</button></td>
    `;
    
    document.getElementById('symptoms').value = '';
    document.getElementById('medication').value = '';
    document.getElementById('activities').value = '';
}

function removeEntry(btn) {
    let row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function toggleMenu() {
  let navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}
    
  