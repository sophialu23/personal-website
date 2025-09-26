// Example: dark mode toggle
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.createElement("button");
  btn.innerText = "Toggle Dark Mode";
  document.body.prepend(btn);

  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
});
