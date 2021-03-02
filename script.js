const toggleSwitch = document.querySelector('input[type="checkbox"]'); 
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon'); 
const image1 = document.getElementById('image1'); 
const image2 = document.getElementById('image2'); 
const image3 = document.getElementById('image3'); 
const textBox = document.getElementById('text-box'); 
const DARK_THEME = 'dark'
const LIGHT_THEME = 'light'


// Dark or Light Images
function imageMode(color) {
    image1.src = `assets/undraw_Code_thinking_re_gka2${color}.svg`;
    image2.src = `assets/undraw_Hiking_re_k0bc${color}.svg`;
    image3.src = `assets/undraw_All_the_data_re_hh4w${color}.svg`;
}

function toggleDarkLightMode(isDark) {
    nav.style.backgroundColor = isDark ? 'rgb(0 0 0 / 50%)': 'rgb(255 255 255 / 50%)';
    textBox.style.backgroundColor = isDark ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
    // console.log(toggleIcon.children); 
    toggleIcon.children[0].textContent = isDark ? 'Dark Mode' : 'Light Mode'; 
    isDark ? toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon') :
        toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun'); 
    isDark ? imageMode(DARK_THEME) : imageMode(LIGHT_THEME)
}


//Dark Mode Styles
// function darkMode() {
//     nav.style.backgroundColor = 'rgb(0 0 0 / 50%)'; 
//     textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)'; 
//     // console.log(toggleIcon.children); 
//     toggleIcon.children[0].textContent = 'Dark Mode';
//     toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon'); 
//     imageMode('DARK'); 
// }

// // Light Mode Styles
// function lightMode() {
//     nav.style.backgroundColor = 'rgb(255 255 255 / 50%)'; 
//     textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)'; 
//     // console.log(toggleIcon.children); 
//     toggleIcon.children[0].textContent = 'Light Mode';
//     toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun'); 
//     imageMode('light')
// }


// Switch Theme Dynamically
function switchTheme(event) {
    // console.log(event.target.checked) --> this is tracking the boolean that returns true when the input is checked 
    if (event.target.checked) {
        // document.documentElement returns the element that is the root element of the document 
        document.documentElement.setAttribute('data-theme', DARK_THEME); 
        localStorage.setItem('theme', DARK_THEME); 
        toggleDarkLightMode(true); 
    } else {
        document.documentElement.setAttribute('data-theme', LIGHT_THEME);
        localStorage.setItem('theme', LIGHT_THEME); 
        toggleDarkLightMode(false); 
    }
}

// Event Listener
toggleSwitch.addEventListener('change', switchTheme); 

// Check Local Storage for Theme 
const currentTheme = localStorage.getItem('theme'); 
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme); 

    if (currentTheme === DARK_THEME) {
        toggleSwitch.checked = true; 
        toggleDarkLightMode('dark'); 
    }
}

