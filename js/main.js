
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link'); // Selecteer alle navigatielinks
  
    navLinks.forEach(navLink => {
      navLink.addEventListener('mouseenter', function() {
        
        navLink.classList.add('hovered'); // Voeg de klasse 'hovered' toe aan de navigatielink
      });
  
      navLink.addEventListener('mouseleave', function() {
        
        navLink.classList.remove('hovered'); // Verwijder de klasse 'hovered' van de navigatielink
      });
    });
  });



