document.addEventListener('DOMContentLoaded', () => {
const apiUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2025-10-03&end_date=2025-10-5&api_key=0P69ju98lhjAyBg1C2p29ZOrJ0BRz2w0aqtefjfg';
const outputIds = ['popup-MA', 'popup-MB', 'popup-MC'];
const titleIds = ['title-MA', 'title-MB', 'title-MC'];

  
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        console.error("API response not OK");
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const neos = data.near_earth_objects;
      const allNeos = [];

      for (const date in neos) {
        neos[date].forEach(neo => {
          const approachData = neo.close_approach_data[0];
          if (
            approachData &&
            approachData.close_approach_date_full &&
            approachData.miss_distance &&
            approachData.miss_distance.kilometers
          ) {
            allNeos.push({
              ...neo,
              missDistance: parseFloat(approachData.miss_distance.kilometers),
              approachDate: new Date(approachData.close_approach_date_full)
            });
          }
        });
      }

      const closestNeos = allNeos.sort((a, b) => a.missDistance - b.missDistance);
      const topThree = closestNeos.slice(0, 3);

       topThree.forEach((neo, index) => {
        const popupId = outputIds[index];
        const titleId = titleIds[index];

        const popupElement = document.getElementById(popupId);
        const titleElement = document.getElementById(titleId);
        const approachData = neo.close_approach_data[0];

        if (!popupElement) {
          console.warn(`Element #${elementId} not found`);
          return;
        }

        const name = neo.name;
        const missDistance = parseFloat(approachData.miss_distance.kilometers).toLocaleString();
        const approachDate = approachData.close_approach_date_full;
        const diameterMin = neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2);
        const diameterMax = neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2);
        const relativeSpeed = parseFloat(approachData.relative_velocity.kilometers_per_hour).toFixed(2);

        
        popupElement.innerHTML = `
          <strong>Name:</strong> ${name} <br>
          <strong>Estimated Diameter:</strong> ${diameterMin} km - ${diameterMax} km <br>
          <strong>Approach Date:</strong> ${approachDate} <br>
          <strong>Miss Distance:</strong> ${missDistance} km <br>
          <strong>Relative Speed:</strong> ${relativeSpeed} km/h
        `;

        if (titleElement) {
          titleElement.innerText = name;
        }

        const step6 = stepTexts.find(step => step.id === 6);
        if (step6 && step6.options.length >= 2) {
        const titleMA = document.getElementById("title-MA")?.innerText || "Meteor A";
        const titleMB = document.getElementById("title-MB")?.innerText || "Meteor B";
        const titleMC = document.getElementById("title-MC")?.innerText || "Meteor C";

        step6.options[0].text = titleMA;
        step6.options[1].text = titleMB;
        step6.options[2].text = titleMC;
        }
        
      });
    })
    .catch(error => {
      console.error('Failed to load data', error);
    })
    
});
