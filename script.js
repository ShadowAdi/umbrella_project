const swatches = document.querySelectorAll('.swatch');
const umbrellaImage = document.getElementById('umbrellaImage');
const logoUpload = document.getElementById('logoUpload');
const logoPreview = document.getElementById('logoPreview');
const body = document.body;

swatches.forEach(swatch => {
  swatch.addEventListener('click', () => {
    document.querySelector('.swatch.active').classList.remove('active');
    swatch.classList.add('active');

    const color = swatch.dataset.color;
    umbrellaImage.src = `assets/umbrella-${color}.png`;

    body.className = `theme-${color}`;
  });
});

logoUpload.addEventListener('change', event => {
  const file = event.target.files[0];
  if (file && file.size <= 5 * 1024 * 1024) {
    const reader = new FileReader();
    reader.onload = e => {
      logoPreview.src = e.target.result;
      logoPreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  } else {
    alert('File is too large or invalid!');
  }
});
