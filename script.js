const swatches = document.querySelectorAll(".swatch");
const umbrellaImage = document.getElementById("umbrellaImage");
const logoUpload = document.getElementById("logoUpload");
const logoPreview = document.getElementById("logoPreview");
const loader = document.getElementById("loader");
const body = document.body;

swatches.forEach((swatch) => {
  swatch.addEventListener("click", () => {
    document.querySelector(".swatch.active").classList.remove("active");
    swatch.classList.add("active");

    const color = swatch.dataset.color;

    umbrellaImage.style.opacity = "0";
    loader.querySelector('img').src = `assets/loader_${color}.svg`; // set loader svg
    loader.style.display = "block";
    loader.style.opacity = "1";

    setTimeout(() => {
      umbrellaImage.src = `assets/umbrella-${color}.png`;
      umbrellaImage.onload = () => {
        loader.style.opacity = "0";
        loader.style.display = "none";
        umbrellaImage.style.opacity = "1";
      };
    }, 800);

    body.className = `theme-${color}`;
  });
});


logoUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file && file.size <= 5 * 1024 * 1024) {
    const uploadIcon = document.getElementById("uploadIcon");

    const activeColor = document.querySelector(".swatch.active").dataset.color;

    loader.querySelector('img').src = `assets/loader_${activeColor}.svg`;
    loader.style.display = "block";
    loader.style.opacity = "1";

    umbrellaImage.style.opacity = "0";

    uploadIcon.src = "assets/loader_white.svg";
    uploadIcon.classList.add("spin");

    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = (e) => {
        logoPreview.src = e.target.result;
        logoPreview.style.display = "block";
      };
      reader.readAsDataURL(file);

      loader.style.opacity = "0";
      loader.style.display = "none";
      umbrellaImage.style.opacity = "1";

      uploadIcon.src = "assets/upload_icon.svg";
      uploadIcon.classList.remove("spin");
    }, 1500);

  } else {
    alert("File is too large or invalid!");
  }
});
