import "./style.css";

let isDown = false;
let startX: number;
let moveX: number;
let scrollLeft: number;
const slider: HTMLElement | null = document.querySelector(".items");

type EventSlider = MouseEvent | TouchEvent;

const start = (e: EventSlider) => {
  isDown = true;

  if (slider instanceof HTMLElement) {
    if (e instanceof MouseEvent) startX = e.pageX;
    if (e instanceof TouchEvent) e.touches[0].pageX - slider?.offsetLeft;

    scrollLeft = slider.scrollLeft;
    slider.style.cursor = "grabbing";
    slider.style.scrollSnapType = "none";
  }
};

const move = (e: EventSlider) => {
  if (!isDown) return;

  e.preventDefault();

  if (slider instanceof HTMLElement) {
    if (e instanceof MouseEvent) moveX = e.pageX;
    if (e instanceof TouchEvent) e.touches[0].pageX - slider?.offsetLeft;

    const dist = moveX - startX;
    slider.scrollLeft = scrollLeft - dist;
  }
};

const end = () => {
  isDown = false;

  if (slider instanceof HTMLElement) {
    slider.style.cursor = "grab";
    slider.style.scrollSnapType = "x mandatory";
  }
};

(() => {
  slider?.addEventListener("mousedown", start);
  slider?.addEventListener("touchstart", start);

  slider?.addEventListener("mousemove", move);
  slider?.addEventListener("touchmove", move);

  slider?.addEventListener("mouseleave", end);
  slider?.addEventListener("mouseup", end);
  slider?.addEventListener("touchend", end);
})();

const items = document.querySelectorAll(".item");

function callback(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry) => {
    if (entry.target instanceof HTMLElement) {
      if (entry.isIntersecting) {
        entry.target.style.transform = "scale(1)";
      } else {
        entry.target.style.transform = "scale(0.8)";
      }
    }
  });
}

const options = {
  root: document.querySelector(".wrapper"),
  threshold: 0.6,
};

const observer = new IntersectionObserver(callback, options);

items.forEach((item) => observer.observe(item));
