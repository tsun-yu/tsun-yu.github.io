slr = (id) => document.querySelector(id);

document.querySelector("#skills").addEventListener("click", () => {
  window.scrollTo(slr("#skillArea").offsetLeft, slr("#skillArea").offsetTop);
});
document.querySelector("#experience").addEventListener("click", () => {
  window.scrollTo(slr("#expArea").offsetLeft, slr("#expArea").offsetTop);
});
document.querySelector("#works").addEventListener("click", () => {
  window.scrollTo(slr("#worksArea").offsetLeft, slr("#worksArea").offsetTop);
});
