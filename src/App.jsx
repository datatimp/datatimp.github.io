import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { CaseStudy } from './pages/CaseStudy';

// Reset scroll on route change — but honor a #hash target (e.g. "/#work" from the
// nav). Without this, navigating to /#work from a case study lands at the top of
// home instead of the work grid, because this ran unconditionally.
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }

    let cancelled = false;
    let raf;
    let timer;
    let frames = 0;

    const align = (behavior) => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior, block: 'start' });
    };

    const tryScroll = () => {
      if (cancelled) return;
      if (document.querySelector(hash)) {
        // Snap immediately, then realign once: lazy-loaded images above the
        // target finish decoding after first paint and shift it out from under
        // us, which is what made this overshoot.
        align('auto');
        timer = setTimeout(() => { if (!cancelled) align('auto'); }, 350);
        return;
      }
      frames += 1;
      // The target isn't mounted on the first frame after a route change.
      if (frames < 60) raf = requestAnimationFrame(tryScroll);
    };

    raf = requestAnimationFrame(tryScroll);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<CaseStudy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
