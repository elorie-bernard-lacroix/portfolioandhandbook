// intro

const track = document.getElementById("image-track");
// var scrollEventHandler = function()
// {
//   window.scroll(0, window.pageYOffset)
// }

// window.addEventListener("scroll", scrollEventHandler, false);

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);



const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');

// Display Mobile Menu
const mobileMenu = () => {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);


window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

//  Close mobile Menu when clicking on a menu item
const hideMobileMenu = () => {
  const menuBars = document.querySelector('.is-active');
  if (window.innerWidth <= 768 && menuBars) {
    menu.classList.toggle('is-active');
    menuLinks.classList.remove('active');
  }
};

menuLinks.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);


//code for tabs
function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tab-content" and hide them
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.remove("active");
  }

  // Get all elements with class="tab" and remove the class "active"
  tablinks = document.getElementsByClassName("tab");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}

// Show the first tab by default
document.getElementById("tab1").classList.add("show");
document.querySelector(".tab.active").classList.remove("active");
document.querySelector(".tab").classList.add("active");




// const tabButtons = document.querySelectorAll('.tab-button');
// const tabContents = document.querySelectorAll('.tab-content');

// // Set the default tab
// let currentTab = 0;
// showTab(currentTab);

// // Add click event listener to each tab button
// tabButtons.forEach((button, index) => {
//   button.addEventListener('click', () => {
//     // Hide the current tab content
//     tabContents[currentTab].classList.remove('active');
//     tabButtons[currentTab].classList.remove('active');

//     // Update current tab
//     currentTab = index;

//     // Show the new tab content
//     tabContents[currentTab].classList.add('active');
//     tabButtons[currentTab].classList.add('active');
//   });
// });

// // Function to show the selected tab
// function showTab(index) {
//   tabContents[index].classList.add('active');
//   tabButtons[index].classList.add('active');
// }

// function showTab(tabIndex) {
//   tabButtons.forEach((button, i) => {
//     if (i === tabIndex) {
//       button.classList.add('active');
//     } else {
//       button.classList.remove('active');
//     }
//   });

//   tabContents.forEach((content, i) => {
//     if (i === tabIndex) {
//       content.style.display = 'block';
//     } else {
//       content.style.display = 'none';
//     }
//   });
// }

//   showTab(0);

//   tabButtons.forEach((button, i) => {
//     button.addEventListener('click', () => {
//       showTab(i);
//     });
//   });

// code for charts
const chartColors = [
  '#d1c4e9',
  '#b39ddb',
  '#9575cd',
  '#7e57c2',
  '#673ab7',
  '#5e35b1',
  '#512da8',
  '#4527a0',
  '#311b92',
  '#1a237e',
];

function createChart(chartId, data, labels) {
  const ctx = document.getElementById(chartId).getContext('2d');
  const chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: data,
          backgroundColor: chartColors.slice(0, data.length),
        },
      ],
      labels: labels,
    },
    options: {
      cutoutPercentage: 70,
      responsive: true,
      legend: {
        display: false,
      },
    },
  });
}

// dummy chart data
const chartData = [12, 20, 10, 15, 8, 18, 9, 17];
const chartLabels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6', 'Label 7', 'Label 8'];

// create charts for all chart canvases
const chartCanvases = document.querySelectorAll('.chart');
chartCanvases.forEach((canvas, i) => {
  createChart(`chart${i+1}`, chartData, chartLabels);
});
