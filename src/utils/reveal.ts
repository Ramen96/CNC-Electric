/**
 * Scroll-direction-aware reveal animations.
 *
 * Elements slide UP when scrolling down into view.
 * Elements slide DOWN when scrolling up into view.
 *
 * Usage:
 *   1. Add class="reveal" to any element you want to animate
 *   2. Optionally add style="transition-delay: 0.1s" for stagger
 *   3. Call initReveal("#your-section-id") in a <script> or useEffect
 *   4. Add the .reveal / .revealed CSS to global.css
 */

export function initReveal(sectionSelector: string, threshold = 0.15) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const enteringFromBottom = entry.boundingClientRect.top > window.innerHeight / 2;
          entry.target.setAttribute("data-reveal-dir", enteringFromBottom ? "up" : "down");

          // Double rAF: first frame applies the transform, second triggers the transition
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              entry.target.classList.add("revealed");
            });
          });
        } else {
          entry.target.classList.remove("revealed");
          entry.target.removeAttribute("data-reveal-dir");
          // Reset delay so elements snap out instantly when scrolling back
          (entry.target as HTMLElement).style.transitionDelay = "0s";
        }
      });
    },
    { threshold }
  );

  document
    .querySelectorAll(`${sectionSelector} .reveal`)
    .forEach((el) => observer.observe(el));
}
