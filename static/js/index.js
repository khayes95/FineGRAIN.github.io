window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})



// Interactive table

// FineGRAIN Failure Modes Interactive Table
document.addEventListener('DOMContentLoaded', function() {
  // Only run if the failure mode table exists on this page
  if (!document.getElementById('failureModeTable')) return;

  const failureModes = [
      {
          name: "Anatomical limb and torso accuracy",
          rate: 96.7,
          description: "The model generates human or animal figures with anatomically incorrect limbs or torsos.",
          prompt: "A drawn close-up of a human hand holding a small object. The hand should be in a three-quarter view, with fingers slightly spread. Show detailed skin textures, including knuckle creases, fingernails, and subtle veins on the back of the hand."
      },
      {
          name: "Physics",
          rate: 96.7,
          description: "The model fails to generate or follow the innate physical laws in the scene.",
          prompt: "A ball with a very low elastic modulus hitting a solid brick wall at 1000 miles per hour."
      },
      {
          name: "Counts or Multiple Objects",
          rate: 95.9,
          description: "The model struggles with generating a precise number of distinct objects in a scene.",
          prompt: "An arrangement of exactly two red apples and precisely three yellow bananas on a circular plate. Blur background, product photography."
      },
      {
          name: "Scaling",
          rate: 91.3,
          description: "The model produces objects with incorrect scale.",
          prompt: "An enormous ant, carrying a miniature skyscraper on its back. The ant stands next to a regular-sized wooden pencil for scale. By DreamWorks."
      },
      {
          name: "Visual Reasoning Cause-and-effect Relations",
          rate: 82.8,
          description: "The model fails to correctly depict cause-and-effect relationships.",
          prompt: "In vibrant pulp art style à la Robert McGinnis: A glamorous scientist in a 1950s-style lab coat recoils as colorful chemicals spill and mix on a cluttered lab bench. Show the immediate consequences."
      },
      {
          name: "Long text specific",
          rate: 77.6,
          description: "The model inaccurately renders long specific text, affecting its readability.",
          prompt: "A wooden signpost in a peaceful meadow, with the following inscription: 'Welcome to the Land of Tranquility. Here, every step you take leads you closer to inner peace. Take a moment to breathe, relax, and let go of all your worries. Remember, in this world, you are free to be yourself and to follow the path that brings you joy.'"
      },
      {
          name: "Action and motion representation",
          rate: 75.2,
          description: "The model struggles to accurately depict dynamic actions and movement.",
          prompt: "A sequence of three images showing a person performing a cartwheel, from left to right. The first image shows the person sideways, arms raised, about to begin. The middle image captures them mid-cartwheel, legs spread wide in the air, hands planted on the ground. The final image shows them landing, other side up."
      },
      {
          name: "Negation",
          rate: 67.1,
          description: "The model generates elements that negate specified details usually present in the scene.",
          prompt: "A bustling city park with people enjoying a sunny day, but there are no trees, grass, children, or animals. Instead, the ground is covered in colorful geometric shapes and the sky is filled with floating musical instruments. Hyperrealistic and dynamic lighting."
      },
      {
          name: "Short Text Specific",
          rate: 57.9,
          description: "The model inaccurately renders short text, affecting its readability.",
          prompt: "A neon sign in a bustling city alley at night, glowing with the words 'Welcome to the City of Dreams, Open 24/7 for all your desires.'"
      },
      {
          name: "Shape attribute binding",
          rate: 43.3,
          description: "The model confuses or incorrectly generates shapes for objects.",
          prompt: "A surreal landscape featuring a large, pyramid-shaped cloud floating in the sky. Below it, a circular lake reflects the cloud and sky. The scene has soft, pastel colors. Hyperrealistic rendering, 8k resolution."
      },
      {
          name: "Tense and aspect variation",
          rate: 41.5,
          description: "The model struggles to represent different tense or aspect variations.",
          prompt: "A Himalayan village where climbers are preparing their gear, while a guide who has been leading expeditions for decades shares stories. In the distance, a temple that was built centuries ago glows in the morning light. Watercolor painting."
      },
      {
          name: "Perspective",
          rate: 40.0,
          description: "The model inaccurately represents perspective in the scene.",
          prompt: "Cinematic close-up of an inverted birthday party hat on a wooden table, vibrant colors, soft studio lighting, 4K resolution."
      },
      {
          name: "Tense+Text Rendering + Style",
          rate: 32.0,
          description: "The model fails with complex text rendering combined with style requirements.",
          prompt: "A vintage poster from the 1940s advertising 'Victory Gardens: Plant for Peace!' with period-appropriate typography and war-time imagery."
      },
      {
          name: "Background and Foreground Mismatch",
          rate: 27.7,
          description: "The model has difficulty distinguishing or correctly relating foreground and background elements.",
          prompt: "A poster about a hairpin peeking out from a discarded popcorn box. The background has a vibrant, chaotic carnival scene at night. Dazzling neon lights illuminate a bustling midway filled with towering rides, colorful game booths, and crowds of excited people."
      },
      {
          name: "Human Anatomy Moving",
          rate: 27.6,
          description: "The model struggles with anatomical accuracy in moving human figures.",
          prompt: "A dancer mid-leap in a contemporary dance studio, capturing the precise moment of suspension in air with anatomically correct limb positioning."
      },
      {
          name: "Emotional conveyance",
          rate: 27.3,
          description: "The model fails to accurately depict emotions through facial expressions or gestures.",
          prompt: "A person standing at a podium, accepting an award with tears of joy streaming down their face, while simultaneously receiving news via an earpiece that a loved one has fallen seriously ill. Their expression should convey both elation and heartbreak. Natural light photo, photo realism, 4k, ultra realistic."
      },
      {
          name: "Text-based",
          rate: 26.2,
          description: "The model inaccurately generates or positions text elements in the image.",
          prompt: "Design a logo centered around the letter S for a social network platform that connects fortunetellers with pet lovers. The S should be stylized to evoke mystical and fortune-telling themes. The overall shape should maintain the recognizability of the letter S while feeling magical and interconnected while employing animal motifs."
      },
      {
          name: "Spatial Relation",
          rate: 24.7,
          description: "The model struggles with accurately placing objects in relation to each other.",
          prompt: "A puppy balanced precariously on the head of a patient dog, studio lighting, high detail, 4K resolution."
      },
      {
          name: "Blending Different Styles",
          rate: 23.4,
          description: "The model has difficulty combining different artistic styles in one image.",
          prompt: "A portrait that seamlessly blends photorealistic rendering with impressionist painting techniques, showing half the face in crystal-clear detail and half in loose, expressive brushstrokes."
      },
      {
          name: "Depicting abstract concepts",
          rate: 16.9,
          description: "The model struggles to visualize abstract or conceptual ideas.",
          prompt: "A visual representation of 'the weight of responsibility' showing abstract forms that convey burden, duty, and moral obligation without using literal imagery."
      },
      {
          name: "Colour attribute binding",
          rate: 15.3,
          description: "The model has difficulty correctly associating colors with specific objects in a scene.",
          prompt: "A miniature red sheep driving a white car, Pixar-style 3D rendering, highly detailed."
      },
      {
          name: "FG-BG relations",
          rate: 14.5,
          description: "The model has difficulty distinguishing or correctly relating foreground and background elements.",
          prompt: "A transparent glass of water in sharp focus in the foreground, with a blurred cityscape visible through and behind it, creating complex depth relationships."
      },
      {
          name: "Social Relations",
          rate: 13.8,
          description: "The model fails to accurately depict social interactions.",
          prompt: "An oil painting depicting an event in ancient Rome. A long table shows clear social hierarchy. The painting should capture the subtle interplay of emotions, social status, and unspoken tensions typical of the era."
      },
      {
          name: "Opposite of Normal Relation",
          rate: 10.0,
          description: "The model struggles with inverted or opposite relationships between objects.",
          prompt: "A scene where fish are flying through the air while birds swim underwater, maintaining realistic anatomy for both but reversing their natural environments."
      },
      {
          name: "Human Action",
          rate: 7.6,
          description: "The model fails to accurately depict human actions and activities.",
          prompt: "A person performing a complex origami fold, showing precise finger positioning and the partially completed paper sculpture with accurate spatial relationships."
      },
      {
          name: "Surreal",
          rate: 7.2,
          description: "The model produces fantastical or bizarre elements when not specified.",
          prompt: "A comical scene of a tarantula sitting at a school desk, taking an exam. The tarantula wears thick, round glasses and has a determined expression. It's staring intently at a test paper. Surrounding the tarantula are other empty desks. Bright, cartoon-style colors, bold outlines, and exaggerated expressions. Include some humorous details like a hidden cheat sheet."
      },
      {
          name: "Texture attribute binding",
          rate: 6.0,
          description: "The model incorrectly applies textures to objects.",
          prompt: "An award-winning photo of a cute marble boat with visible veining, floating on a rough sea made entirely of sandpaper."
      }
  ];

  let currentSort = { field: 'rate', direction: 'desc' };
  let filteredData = [...failureModes];

  function getFailureRateClass(rate) {
      if (rate >= 70) return 'high-failure';
      if (rate >= 30) return 'medium-failure';
      return 'low-failure';
  }

  function renderTable() {
      const tbody = document.getElementById('failureModeTable');
      if (!tbody) return;
      
      tbody.innerHTML = '';

      filteredData.forEach(mode => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td><span class="failure-mode-name">${mode.name}</span></td>
              <td><span class="failure-rate ${getFailureRateClass(mode.rate)}">${mode.rate}%</span></td>
              <td><div class="description">${mode.description}</div></td>
              <td><div class="sample-prompt">"${mode.prompt}"</div></td>
          `;
          tbody.appendChild(row);
      });
  }

  function sortData(field) {
      const direction = currentSort.field === field && currentSort.direction === 'asc' ? 'desc' : 'asc';
      currentSort = { field, direction };

      // Update sort icons
      document.querySelectorAll('.sort-icon').forEach(icon => {
          icon.className = 'fas fa-sort sort-icon';
      });
      
      const activeIcon = document.getElementById(`sort-${field}`);
      if (activeIcon) {
          activeIcon.className = `fas fa-sort-${direction === 'asc' ? 'up' : 'down'} sort-icon active`;
      }

      filteredData.sort((a, b) => {
          let aVal = field === 'rate' ? a.rate : a.name.toLowerCase();
          let bVal = field === 'rate' ? b.rate : b.name.toLowerCase();
          
          if (direction === 'asc') {
              return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
          } else {
              return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
          }
      });

      renderTable();
  }

  function filterData() {
      const searchInput = document.getElementById('searchInput');
      const difficultyFilter = document.getElementById('difficultyFilter');
      
      if (!searchInput || !difficultyFilter) return;
      
      const searchTerm = searchInput.value.toLowerCase();
      const difficultyValue = difficultyFilter.value;

      filteredData = failureModes.filter(mode => {
          const matchesSearch = 
              mode.name.toLowerCase().includes(searchTerm) ||
              mode.description.toLowerCase().includes(searchTerm) ||
              mode.prompt.toLowerCase().includes(searchTerm);

          let matchesDifficulty = true;
          if (difficultyValue === 'high') {
              matchesDifficulty = mode.rate >= 70;
          } else if (difficultyValue === 'medium') {
              matchesDifficulty = mode.rate >= 30 && mode.rate < 70;
          } else if (difficultyValue === 'low') {
              matchesDifficulty = mode.rate < 30;
          }

          return matchesSearch && matchesDifficulty;
      });

      // Re-apply current sort
      sortData(currentSort.field);
  }

  // Initial render (sorted by failure rate, descending)
  sortData('rate');

  // Sort event listeners
  document.querySelectorAll('.sortable').forEach(header => {
      header.addEventListener('click', () => {
          sortData(header.dataset.sort);
      });
  });

  // Filter event listeners
  const searchInput = document.getElementById('searchInput');
  const difficultyFilter = document.getElementById('difficultyFilter');
  
  if (searchInput) {
      searchInput.addEventListener('input', filterData);
  }
  if (difficultyFilter) {
      difficultyFilter.addEventListener('change', filterData);
  }
});