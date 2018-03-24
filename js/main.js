let incidents,
  neighborhoods,
  crimes
var map
var markers = []


/**
 * Service Worker Setup
 */
 if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('js/sw.js')
     .then((reg) => {
       console.log('SW Registration successful. Scope is ' + reg.scope);
     }).catch((error) => {
       console.log('SW Registration failed with ' + error);
     });
 }

/**
 * Fetch neighborhoods and crimes as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  fetchNeighborhoods();
  fetchcrimes();
});

/**
 * Fetch all neighborhoods and set their HTML.
 */
fetchNeighborhoods = () => {
  DBHelper.fetchNeighborhoods((error, neighborhoods) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.neighborhoods = neighborhoods;
      fillNeighborhoodsHTML();
    }
  });
}

/**
 * Set neighborhoods HTML.
 */
fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
  const select = document.getElementById('neighborhoods-select');
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
}

/**
 * Fetch all crimes and set their HTML.
 */
fetchcrimes = () => {
  DBHelper.fetchcrimes((error, crimes) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.crimes = crimes;
      fillcrimesHTML();
    }
  });
}

/**
 * Set crimes HTML.
 */
fillcrimesHTML = (crimes = self.crimes) => {
  const select = document.getElementById('crimes-select');

  crimes.forEach(crime => {
    const option = document.createElement('option');
    option.innerHTML = crime;
    option.value = crime;
    select.append(option);
  });
}

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
  let loc = {
    lat: 37.7749,
    lng: -122.4194
  };
  self.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: loc,
    scrollwheel: false
  });
  updateincidents();
}

/**
 * Update page and map for current incidents.
 */
updateincidents = () => {
  const cSelect = document.getElementById('crimes-select');
  const nSelect = document.getElementById('neighborhoods-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const crime = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;

  DBHelper.fetchincidentBycrimeAndNeighborhood(crime, neighborhood, (error, incidents) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      resetincidents(incidents);
      fillincidentsHTML();
    }
  })
}

/**
 * Clear current incidents, their HTML and remove their map markers.
 */
resetincidents = (incidents) => {
  // Remove all incidents
  self.incidents = [];
  const ul = document.getElementById('incidents-list');
  ul.innerHTML = '';

  // Remove all map markers
  self.markers.forEach(m => m.setMap(null));
  self.markers = [];
  self.incidents = incidents;
}

/**
 * Create all incidents HTML and add them to the webpage.
 */
fillincidentsHTML = (incidents = self.incidents) => {
  const ul = document.getElementById('incidents-list');
  incidents.forEach(incident => {
    ul.append(createincidentHTML(incident));
  });
  addMarkersToMap();
}

/**
 * Create incident HTML.
 */
createincidentHTML = (incident) => {
  const li = document.createElement('li');

  const image = document.createElement('img');
  image.className = 'incident-img';
  image.alt = `${incident.name} incident`;
  image.src = DBHelper.imageUrlForincident(incident);
  li.append(image);

  const name = document.createElement('h3');
  name.innerHTML = incident.name;
  li.append(name);

  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = incident.neighborhood;
  li.append(neighborhood);

  const address = document.createElement('p');
  address.innerHTML = incident.address;
  li.append(address);

  const more = document.createElement('a');
  more.innerHTML = 'View Details';
  more.href = DBHelper.urlForincident(incident);
  more.setAttribute('aria-label', incident.name + 'details');
  li.append(more)

  return li
}

/**
 * Add markers for current incidents to the map.
 */
addMarkersToMap = (incidents = self.incidents) => {
  incidents.forEach(incident => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForincident(incident, self.map);
    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url
    });
    self.markers.push(marker);
  });
}
