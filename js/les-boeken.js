document.addEventListener('DOMContentLoaded', function () {
  const reservationForm = document.getElementById('reservationForm');
  const reservationDetails = document.getElementById('reservationDetails');
  
  // Array om geselecteerde lessen bij te houden
  const selectedLessons = [];

  reservationForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Voorkom standaard formulierverzending
      
      // Verkrijg ingevoerde waarden
      const name = document.getElementById('name').value;
      const customerNumber = document.getElementById('customernumber').value;
      const phone = document.getElementById('phone').value;
      const email = document.getElementById('email').value;
      const lesson = document.getElementById('lesson').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;

      // Controleer of er niet meer dan drie lessen zijn geselecteerd
      if (selectedLessons.length >= 3) {
          alert('U kunt maximaal drie lessen selecteren.');
          return;
      }
      
      // Controleer of er al een les is geboekt op hetzelfde tijdstip
      const isDuplicateLesson = selectedLessons.some(selectedLesson => selectedLesson.time === time);
      if (isDuplicateLesson) {
          alert('U heeft al een les geboekt op dit tijdstip.');
          return;
      }

      // Voeg geselecteerde les toe aan array
      selectedLessons.push({ lesson, date, time });

      // Toon melding dat de gegevens correct zijn ontvangen
      alert('Bedankt! Uw gegevens zijn correct ontvangen.');

      // Toon reserveringsdetails
      displayReservationDetails(name, customerNumber, phone, email);
  });

  function displayReservationDetails(name, customerNumber, phone, email) {
      // Verwijder eerst alle eerder weergegeven reserveringsdetails
      reservationDetails.innerHTML = '';

      // Toon klantgegevens
      const customerInfo = document.createElement('div');
      customerInfo.innerHTML = `
          <h4>Jouw gegevens:</h4>
          <p>Klantnummer: ${customerNumber}</p>
          <p>Naam: ${name}</p>
          <p>Telefoon: ${phone}</p>
          <p>Emailadres: ${email}</p>
      `;
      reservationDetails.appendChild(customerInfo);

      // Toon reserveringsdetails per les
      selectedLessons.forEach((selectedLesson, index) => {
          const lessonInfo = document.createElement('div');
          const lessonNumber = index + 1;
          const lessonCost = calculateLessonCost(selectedLesson.time);
          const formattedDate = new Date(selectedLesson.date).toLocaleDateString('nl-NL');
          const formattedTime = selectedLesson.time;

          lessonInfo.innerHTML = `
              <h4>Les${lessonNumber}:</h4>
              <p>Soort: ${selectedLesson.lesson}</p>
              <p>Kosten: €${lessonCost.toFixed(2)}</p>
              <p>Dag en tijd: ${formattedDate}, ${formattedTime}</p>
          `;
          reservationDetails.appendChild(lessonInfo);
      });

      // Als het aantal geselecteerde lessen gelijk is aan 2, bereken dan totale kosten
      if (selectedLessons.length >= 2) {
          // Bereken totale kosten
          const totalCost = selectedLessons.reduce((total, selectedLesson) => {
              return total + calculateLessonCost(selectedLesson.time);
          }, 0);

          // Toon totale kosten
          const totalCostElement = document.createElement('p');
          totalCostElement.innerHTML = `<strong>Totale kosten:</strong> €${totalCost.toFixed(2)}`;
          reservationDetails.appendChild(totalCostElement);
      }
  }

  // Functie om kosten van een les te berekenen
  function calculateLessonCost(time) {
      const standardCost = 10; // Standaardkosten per les
      const hour = parseInt(time.split(':')[0]); // Uur uit de tijd halen

      // Korting van 30% tussen 11:00u en 16:00u
      if (hour >= 11 && hour < 16) {
          return standardCost * 0.7;
      }

      return standardCost;
  }
});

