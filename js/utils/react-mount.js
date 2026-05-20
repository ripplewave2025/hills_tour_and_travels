/* ==========================================
   HILLS TOUR & TRAVELS — REACT MOUNT ADAPTER
   ==========================================
   Wraps a React component so it satisfies the vanilla SPA router's
   {render, init, destroy} contract. Lets us add React routes without
   touching router.js.

   Usage:
     import { reactRoute } from '../utils/react-mount.js';
     import { Discover } from './discover.jsx';
     export const DiscoverPage = reactRoute(Discover);
   ========================================== */

import { createRoot } from 'react-dom/client';
import { createElement } from 'react';

const MOUNT_ID = 'react-route-mount';

export function reactRoute(Component) {
  let root = null;

  return {
    render() {
      return `<div id="${MOUNT_ID}" style="min-height: 100vh;"></div>`;
    },

    init(params, query) {
      const el = document.getElementById(MOUNT_ID);
      if (!el) return;
      root = createRoot(el);
      root.render(createElement(Component, { params, query }));
    },

    destroy() {
      if (root) {
        root.unmount();
        root = null;
      }
    }
  };
}
