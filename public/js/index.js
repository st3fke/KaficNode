// Pie Chart Data
let labels = [];
let datas = [];
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const distinctColors = n =>
  {
    let colors = [];
    let usedHues = new Set();
    const minHueDifference = 30; // Minimum difference between hues to ensure distinct colors

    for (let i = 0; i < n; i++) {
        let hue;
        do {
            hue = getRandomInt(0, 360);
        } while (Array.from(usedHues).some(usedHue => Math.abs(usedHue - hue) < minHueDifference));

        usedHues.add(hue);
        let saturation = getRandomInt(50, 100); // Random saturation between 50% and 100%
        let lightness = getRandomInt(40, 70); // Random lightness between 40% and 70%

        let color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        colors.push(color);
    }

    return colors;
  }
fetch("/categories")
.then(res => res.json())
.then(data => {
  data.forEach((jedan_red) => {
    labels.push(jedan_red.name);
  });
  fetch("/categories/data")
.then(res => res.json())
.then(data => {
  data.forEach((jedan_red) => {
    datas.push(jedan_red.number);
  });
  var data = {
    labels: labels,
    datasets: [{
      data: datas,
      backgroundColor: distinctColors(labels.length)
    }]
  };
  
  // Pie Chart Options
  var options = {
    responsive: true
  };
  
  // Get the pie chart canvas
  var ctx = document.getElementById("myChart").getContext("2d");
  
  // Create the pie chart
  var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: options
  });
});
  
});

let testimonial = document.querySelector(".add");
fetch("/testimonials")
.then(res => res.json())
.then(data => {
  data.forEach((jedan_red) => {
    testimonial.innerHTML += `
    <div class="col-md-4">
         <div class="card">
            <div class="card-body">
              <p class="card-text"> ${jedan_red.message} </p>
              <p class="text-muted">- ${jedan_red.user_name}</p>
            </div>
        </div>
    </div>`
  });
});
let products = document.querySelector(".prod");
fetch("/products/featured")
.then(res => res.json())
.then(data => {
  data.forEach((jedan_red) => {
    products.innerHTML += `
    <div class="col-md-4">
        <div class="card">
            <img src="./products_img/${jedan_red.image_url}" class="card-img-top" alt="Product 1" height="300">
            <div class="card-body">
              <h5 class="card-title">${jedan_red.name}</h5>
              <p class="card-text">$${jedan_red.price}</p>
              <a href="/nesto" class="btn btn-primary">Buy Now</a>
            </div>
        </div>
    </div>`
  });
});
fetch('/news')
.then(response => response.json())
.then(newsItems => {
    const carouselInner = document.querySelector('#newsCarousel .carousel-inner');
    newsItems.forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item' + (index === 0 ? ' active' : '');
        carouselItem.innerHTML = `
            <img src="../news_img/${item.image_url}" class="d-block w-100" alt="${item.title}">
            <div class="carousel-caption d-none d-md-block">
                <h5>${item.title}</h5>
                <p>${item.content}</p>
            </div>
        `;
        carouselInner.appendChild(carouselItem);
    });
})
.catch(error => console.error('Error fetching news:', error));