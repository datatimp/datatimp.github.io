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
    // The target may not be mounted on the first frame after a route change,
    // so retry briefly before giving up.
    let frames = 0;
    let raf;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tryScroll = () => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        return;
      }
      if (frames += 1, frames < 30) raf = requestAnimationFrame(tryScroll);
    };
    raf = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(raf);
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
