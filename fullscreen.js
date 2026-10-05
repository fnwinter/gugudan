// 모든 페이지 공통 전체 화면 버튼.
// #fullscreenBtn 이 있으면 그것을 쓰고, 없으면 "처음으로" 버튼 옆에 같은 모양으로 만들어 붙인다.
(function () {
  const root = document.documentElement;
  if (!root.requestFullscreen) return;

  let btn = document.getElementById("fullscreenBtn");
  if (!btn) {
    const home = document.querySelector(".home, .home-btn");
    if (!home) return;

    const style = document.createElement("style");
    style.textContent =
      ".fs-group { display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap; }" +
      ".fs-group button { border: none; font-family: inherit; cursor: pointer; }";
    document.head.appendChild(style);

    const group = document.createElement("span");
    group.className = "fs-group";
    home.replaceWith(group);
    group.appendChild(home);

    btn = document.createElement("button");
    btn.type = "button";
    btn.id = "fullscreenBtn";
    btn.className = home.className;
    group.appendChild(btn);
  }

  function update() {
    btn.textContent = document.fullscreenElement ? "↙ 전체 화면 끄기" : "⛶ 전체 화면";
  }

  btn.addEventListener("click", () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      root.requestFullscreen().catch(() => {});
    }
    btn.blur();
  });

  document.addEventListener("fullscreenchange", update);
  update();
})();
