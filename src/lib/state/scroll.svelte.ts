export type ScrollContext = {
  position: { x: number; y: number; pct: number };
  syncScroll: (node: HTMLElement) => { destroy: () => void };
  followScroll: (node: HTMLElement) => void;
};
export const createScrollSync = (): ScrollContext => {
  const scrollPosition = $state({ x: 0, y: 0, pct: 0 });

  function syncScroll(node: HTMLElement) {
    function onScroll() {
      const maxY = node.scrollHeight - node.clientHeight;
      scrollPosition.y = node.scrollTop;
      scrollPosition.pct = maxY > 0 ? node.scrollTop / maxY : 0;
    }

    node.addEventListener("scroll", onScroll, { passive: true });
    return { destroy: () => node.removeEventListener("scroll", onScroll) };
  }
  function followScroll(node: HTMLElement) {
    $effect(() => {
      const maxY = node.scrollHeight - node.clientHeight;
      const targetY = scrollPosition.pct * maxY;
      node.scrollTop = targetY;
    });
  }

  return { position: scrollPosition, syncScroll, followScroll };
};
