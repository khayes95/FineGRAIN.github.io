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
// FineGRAIN Failure Modes Interactive Table
document.addEventListener('DOMContentLoaded', function() {
    // Only run if the failure mode table exists on this page
    if (!document.getElementById('failureModeTable')) return;

    // Failure Modes Data with Categories - ALL 27 modes
    const failureModes = [
        { name: "Anatomical limb and torso accuracy", rate: 96.7, category: "human", description: "The model generates human or animal figures with anatomically incorrect limbs or torsos.", prompt: "A drawn close-up of a human hand holding a small object. The hand should be in a three-quarter view, with fingers slightly spread.", image: "./static/images/examples/anatomical_example.jpg" },
        { name: "Physics", rate: 96.7, category: "spatial", description: "The model fails to generate or follow the innate physical laws in the scene.", prompt: "A ball with a very low elastic modulus hitting a solid brick wall at 1000 miles per hour.", image: "./static/images/examples/physics_example.jpg" },
        { name: "Counts or Multiple Objects", rate: 95.9, category: "count", description: "The model struggles with generating a precise number of distinct objects in a scene.", prompt: "An arrangement of exactly two red apples and precisely three yellow bananas on a circular plate.", image: "./static/images/examples/counting_example.jpg" },
        { name: "Scaling", rate: 91.3, category: "spatial", description: "The model produces objects with incorrect scale.", prompt: "An enormous ant, carrying a miniature skyscraper on its back. The ant stands next to a regular-sized wooden pencil for scale.", image: "./static/images/examples/scaling_example.jpg" },
        { name: "Visual Reasoning Cause-and-effect Relations", rate: 82.8, category: "spatial", description: "The model fails to correctly depict cause-and-effect relationships.", prompt: "A glamorous scientist in a 1950s-style lab coat recoils as colorful chemicals spill and mix on a cluttered lab bench.", image: "./static/images/examples/causeffect_example.jpg" },
        { name: "Long text specific", rate: 77.6, category: "text", description: "The model inaccurately renders long specific text, affecting its readability.", prompt: "A wooden signpost with inscription: 'Welcome to the Land of Tranquility. Here, every step you take leads you closer to inner peace.'", image: "./static/images/long_text_specific_0.png" },
        { name: "Action and motion representation", rate: 75.2, category: "human", description: "The model struggles to accurately depict dynamic actions and movement.", prompt: "A sequence showing a person performing a cartwheel, from left to right, capturing the motion progression.", image: "./static/images/examples/human_action_0.png" },
        { name: "Negation", rate: 67.1, category: "other", description: "The model generates elements that negate specified details usually present in the scene.", prompt: "A bustling city park with people enjoying a sunny day, but there are no trees, grass, children, or animals.", image: "./static/images/examples/negation_example.jpg" },
        { name: "Short Text Specific", rate: 57.9, category: "text", description: "The model inaccurately renders short text, affecting its readability.", prompt: "A neon sign in a bustling city alley at night, glowing with the words 'Welcome to the City of Dreams, Open 24/7'.", image: "./static/images/examples/shorttext_example.jpg" },
        { name: "Shape attribute binding", rate: 43.3, category: "attribute", description: "The model confuses or incorrectly generates shapes for objects.", prompt: "A surreal landscape featuring a large, pyramid-shaped cloud floating in the sky.", image: "./static/images/examples/shape_example.jpg" },
        { name: "Tense and aspect variation", rate: 41.5, category: "other", description: "The model struggles to represent different tense or aspect variations.", prompt: "A Himalayan village where climbers are preparing their gear, while a guide shares stories.", image: "./static/images/examples/tense_example.jpg" },
        { name: "Perspective", rate: 40.0, category: "spatial", description: "The model inaccurately represents perspective in the scene.", prompt: "Cinematic close-up of an inverted birthday party hat on a wooden table, vibrant colors.", image: "./static/images/examples/perspective_example.jpg" },
        { name: "Tense+Text Rendering + Style", rate: 32.0, category: "text", description: "The model fails with complex text rendering combined with style requirements.", prompt: "A vintage poster from the 1940s advertising 'Victory Gardens: Plant for Peace!' with period-appropriate typography.", image: "./static/images/examples/textrendering_example.jpg" },
        { name: "Background and Foreground Mismatch", rate: 27.7, category: "spatial", description: "The model has difficulty distinguishing or correctly relating foreground and background elements.", prompt: "A poster about a hairpin peeking out from a discarded popcorn box with a vibrant carnival scene background.", image: "./static/images/examples/bgfg_example.jpg" },
        { name: "Human Anatomy Moving", rate: 27.6, category: "human", description: "The model struggles with anatomical accuracy in moving human figures.", prompt: "A dancer mid-leap in a contemporary dance studio, capturing anatomically correct limb positioning.", image: "./static/images/examples/anatomy_moving_example.jpg" },
        { name: "Emotional conveyance", rate: 27.3, category: "human", description: "The model fails to accurately depict emotions through facial expressions or gestures.", prompt: "A person accepting an award with tears of joy while simultaneously receiving heartbreaking news via earpiece.", image: "./static/images/examples/emotion_example.jpg" },
        { name: "Text-based", rate: 26.2, category: "text", description: "The model inaccurately generates or positions text elements in the image.", prompt: "Design a logo centered around the letter S for a social network platform that connects fortunetellers with pet lovers.", image: "./static/images/examples/textbased_example.jpg" },
        { name: "Spatial Relation", rate: 24.7, category: "spatial", description: "The model struggles with accurately placing objects in relation to each other.", prompt: "A puppy balanced precariously on the head of a patient dog, studio lighting, high detail.", image: "./static/images/examples/spatial_example.jpg" },
        { name: "Blending Different Styles", rate: 23.4, category: "other", description: "The model has difficulty combining different artistic styles in one image.", prompt: "A portrait blending photorealistic rendering with impressionist painting techniques.", image: "./static/images/examples/blending_example.jpg" },
        { name: "Depicting abstract concepts", rate: 16.9, category: "other", description: "The model struggles to visualize abstract or conceptual ideas.", prompt: "A visual representation of 'the weight of responsibility' showing abstract forms that convey burden and duty.", image: "./static/images/examples/abstract_example.jpg" },
        { name: "Colour attribute binding", rate: 15.3, category: "attribute", description: "The model has difficulty correctly associating colors with specific objects in a scene.", prompt: "A miniature red sheep driving a white car, Pixar-style 3D rendering, highly detailed.", image: "./static/images/examples/color_example.jpg" },
        { name: "FG-BG relations", rate: 14.5, category: "spatial", description: "The model has difficulty distinguishing or correctly relating foreground and background elements.", prompt: "A transparent glass of water in sharp focus with a blurred cityscape visible through it.", image: "./static/images/examples/fgbg_example.jpg" },
        { name: "Social Relations", rate: 13.8, category: "human", description: "The model fails to accurately depict social interactions.", prompt: "An oil painting depicting an event in ancient Rome showing clear social hierarchy and unspoken tensions.", image: "./static/images/examples/social_example.jpg" },
        { name: "Opposite of Normal Relation", rate: 10.0, category: "other", description: "The model struggles with inverted or opposite relationships between objects.", prompt: "A scene where fish are flying through the air while birds swim underwater.", image: "./static/images/examples/opposite_example.jpg" },
        { name: "Human Action", rate: 7.6, category: "human", description: "The model fails to accurately depict human actions and activities.", prompt: "A person performing a complex origami fold, showing precise finger positioning.", image: "./static/images/examples/humanaction_example.jpg" },
        { name: "Surreal", rate: 7.2, category: "other", description: "The model produces fantastical or bizarre elements when not specified.", prompt: "A tarantula sitting at a school desk, taking an exam, wearing thick glasses.", image: "./static/images/examples/surreal_example.jpg" },
        { name: "Texture attribute binding", rate: 6.0, category: "attribute", description: "The model incorrectly applies textures to objects.", prompt: "A cute marble boat with visible veining, floating on a rough sea made entirely of sandpaper.", image: "./static/images/examples/texture_example.jpg" }
    ];

    

    // Model Performance Data - ALL 27 failure modes
    const modelPerformanceData = [
        { failureMode: "Cause-and-effect Relations", flux: 44.83, sd35: 36.84, sd35m: 31.58, sd3m: 27.59, sd3xl: 21.05 },
        { failureMode: "Action and Motion", flux: 52.00, sd35: 20.00, sd35m: 16.00, sd3m: 0.00, sd3xl: 12.00 },
        { failureMode: "Anatomical Accuracy", flux: 53.33, sd35: 33.33, sd35m: 26.67, sd3m: 6.67, sd3xl: 26.67 },
        { failureMode: "BG-FG Mismatch", flux: 76.00, sd35: 69.23, sd35m: 73.08, sd3m: 53.85, sd3xl: 53.85 },
        { failureMode: "Blending Styles", flux: 5.00, sd35: 10.34, sd35m: 3.45, sd3m: 13.79, sd3xl: 3.45 },
        { failureMode: "Color Binding", flux: 93.33, sd35: 96.67, sd35m: 93.33, sd3m: 96.67, sd3xl: 40.00 },
        { failureMode: "Counts or Multiple Objects", flux: 0.00, sd35: 0.00, sd35m: 0.00, sd3m: 0.00, sd3xl: 0.00 },
        { failureMode: "Abstract Concepts", flux: 92.31, sd35: 84.62, sd35m: 88.46, sd3m: 73.08, sd3xl: 69.23 },
        { failureMode: "Emotional Conveyance", flux: 76.67, sd35: 46.67, sd35m: 36.67, sd3m: 16.67, sd3xl: 33.33 },
        { failureMode: "FG-BG Relations", flux: 86.21, sd35: 37.93, sd35m: 34.48, sd3m: 51.72, sd3xl: 37.93 },
        { failureMode: "Human Action", flux: 72.41, sd35: 68.97, sd35m: 27.59, sd3m: 13.79, sd3xl: 44.83 },
        { failureMode: "Human Anatomy Moving", flux: 79.31, sd35: 48.28, sd35m: 17.24, sd3m: 0.00, sd3xl: 24.14 },
        { failureMode: "Long Text Specific", flux: 0.00, sd35: 0.00, sd35m: 0.00, sd3m: 0.00, sd3xl: 0.00 },
        { failureMode: "Negation", flux: 25.00, sd35: 46.43, sd35m: 46.43, sd3m: 17.86, sd3xl: 46.43 },
        { failureMode: "Opposite Relation", flux: 6.67, sd35: 6.67, sd35m: 3.33, sd3m: 0.00, sd3xl: 0.00 },
        { failureMode: "Perspective", flux: 33.33, sd35: 23.33, sd35m: 20.00, sd3m: 10.00, sd3xl: 6.67 },
        { failureMode: "Physics", flux: 43.33, sd35: 16.67, sd35m: 23.33, sd3m: 26.67, sd3xl: 16.67 },
        { failureMode: "Scaling", flux: 43.33, sd35: 33.33, sd35m: 26.67, sd3m: 23.33, sd3xl: 23.33 },
        { failureMode: "Shape Binding", flux: 60.00, sd35: 50.00, sd35m: 30.00, sd3m: 30.00, sd3xl: 3.33 },
        { failureMode: "Short Text Specific", flux: 64.00, sd35: 48.00, sd35m: 24.00, sd3m: 20.00, sd3xl: 0.00 },
        { failureMode: "Social Relations", flux: 84.62, sd35: 65.38, sd35m: 30.77, sd3m: 7.69, sd3xl: 34.62 },
        { failureMode: "Spatial Relations", flux: 50.00, sd35: 23.33, sd35m: 16.67, sd3m: 23.33, sd3xl: 10.00 },
        { failureMode: "Surreal", flux: 28.00, sd35: 44.00, sd35m: 36.00, sd3m: 36.00, sd3xl: 12.00 },
        { failureMode: "Tense and Aspect", flux: 57.69, sd35: 42.31, sd35m: 38.46, sd3m: 42.31, sd3xl: 23.08 },
        { failureMode: "Text Rendering Style", flux: 28.00, sd35: 4.00, sd35m: 0.00, sd3m: 0.00, sd3xl: 0.00 },
        { failureMode: "Text-Based", flux: 79.31, sd35: 62.07, sd35m: 27.59, sd3m: 27.59, sd3xl: 3.45 },
        { failureMode: "Texture Binding", flux: 43.33, sd35: 63.33, sd35m: 53.33, sd3m: 36.67, sd3xl: 23.33 }
    ];

    let filteredFailureModes = [...failureModes];

    function getFailureRateClass(rate) {
        if (rate >= 70) return 'high-failure';
        if (rate >= 30) return 'medium-failure';
        return 'low-failure';
    }

    function getScoreColor(score) {
        if (score >= 80) return '#23d160'; // Green
        if (score >= 60) return '#ffdd57'; // Yellow  
        if (score >= 40) return '#ff9f43'; // Orange
        if (score >= 20) return '#ff6b6b'; // Light red
        return '#ff3860'; // Red
    }

    function renderFailureModesTable() {
        const tbody = document.getElementById('failureModeTable');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        filteredFailureModes.forEach(mode => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><span style="font-weight: bold; color: #3273dc;">${mode.name}</span></td>
                <td><span class="failure-rate ${getFailureRateClass(mode.rate)}" style="font-weight: bold; padding: 4px 8px; border-radius: 4px; color: white; background-color: ${getScoreColor(mode.rate)};">${mode.rate}%</span></td>
                <td><div style="font-size: 0.95em; line-height: 1.4;">${mode.description}</div></td>
                <td><div style="font-style: italic; font-size: 0.9em; line-height: 1.3; color: #666;">"${mode.prompt}"</div></td>
            `;
            tbody.appendChild(row);
        });
    }

    function renderModelComparisonTable() {
        const tbody = document.getElementById('modelComparisonBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        // Add average row first
        const avgRow = document.createElement('tr');
        avgRow.style.fontWeight = 'bold';
        avgRow.style.backgroundColor = '#f8f9fa';
        avgRow.innerHTML = `
            <td style="position: sticky; left: 0; background-color: #f8f9fa; z-index: 5;"><strong>Average</strong></td>
            <td class="has-text-centered" style="background-color: ${getScoreColor(51.04)}; color: white; font-weight: bold;">51.04</td>
            <td class="has-text-centered" style="background-color: ${getScoreColor(40.06)}; color: white; font-weight: bold;">40.06</td>
            <td class="has-text-centered" style="background-color: ${getScoreColor(30.56)}; color: white; font-weight: bold;">30.56</td>
            <td class="has-text-centered" style="background-color: ${getScoreColor(24.27)}; color: white; font-weight: bold;">24.27</td>
            <td class="has-text-centered" style="background-color: ${getScoreColor(21.09)}; color: white; font-weight: bold;">21.09</td>
        `;
        tbody.appendChild(avgRow);

        modelPerformanceData.forEach(row => {
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `
                <td style="position: sticky; left: 0; background-color: white; z-index: 5; border-right: 1px solid #ddd;">
                    <strong>${row.failureMode}</strong>
                </td>
                <td class="has-text-centered" style="background-color: ${getScoreColor(row.flux)}; color: white; font-weight: bold;">${row.flux}</td>
                <td class="has-text-centered" style="background-color: ${getScoreColor(row.sd35)}; color: white; font-weight: bold;">${row.sd35}</td>
                <td class="has-text-centered" style="background-color: ${getScoreColor(row.sd35m)}; color: white; font-weight: bold;">${row.sd35m}</td>
                <td class="has-text-centered" style="background-color: ${getScoreColor(row.sd3m)}; color: white; font-weight: bold;">${row.sd3m}</td>
                <td class="has-text-centered" style="background-color: ${getScoreColor(row.sd3xl)}; color: white; font-weight: bold;">${row.sd3xl}</td>
            `;
            tbody.appendChild(tableRow);
        });
    }

    function filterFailureModes() {
        const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
        const difficultyFilter = document.getElementById('difficultyFilter')?.value || 'all';

        filteredFailureModes = failureModes.filter(mode => {
            const matchesSearch = 
                mode.name.toLowerCase().includes(searchTerm) ||
                mode.description.toLowerCase().includes(searchTerm) ||
                mode.prompt.toLowerCase().includes(searchTerm);

            let matchesDifficulty = true;
            if (difficultyFilter === 'high') {
                matchesDifficulty = mode.rate >= 70;
            } else if (difficultyFilter === 'medium') {
                matchesDifficulty = mode.rate >= 30 && mode.rate < 70;
            } else if (difficultyFilter === 'low') {
                matchesDifficulty = mode.rate < 30;
            }

            return matchesSearch && matchesDifficulty;
        });

        renderFailureModesTable();
    }

    // Initialize tables
    if (document.getElementById('failureModeTable')) {
        renderFailureModesTable();
    }
    if (document.getElementById('modelComparisonBody')) {
        renderModelComparisonTable();
    }

    // Add event listeners
    const searchInput = document.getElementById('searchInput');
    const difficultyFilter = document.getElementById('difficultyFilter');

    if (searchInput) {
        searchInput.addEventListener('input', filterFailureModes);
    }
    if (difficultyFilter) {
        difficultyFilter.addEventListener('change', filterFailureModes);
    }
});