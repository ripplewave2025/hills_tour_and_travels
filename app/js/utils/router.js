/* ==========================================
   HILLS TOUR & TRAVELS — SPA ROUTER UTILITY
   ========================================== */

export class Router {
  constructor(routes, contentMountId = "content-mount") {
    this.routes = routes;
    this.contentMount = document.getElementById(contentMountId);
    this.currentRoute = null;

    // Listen to hash change events
    window.addEventListener("hashchange", () => this.handleRouting());

    // First render: handle whichever phase of page load we're in.
    // If the document already finished loading (the common case — this
    // Router is constructed inside an existing DOMContentLoaded handler),
    // run routing immediately so the home page actually appears. Otherwise
    // wait for DOMContentLoaded.
    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", () => this.handleRouting());
    } else {
      this.handleRouting();
    }
  }

  handleRouting() {
    const rawPath = window.location.hash || "#/";
    const cleanPath = rawPath.replace(/^#/, "");
    
    // Parse path and query parameters
    const [pathWithParams, queryString] = cleanPath.split("?");
    const query = this.parseQuery(queryString);
    
    // Find matching route
    const match = this.matchRoute(pathWithParams);
    
    if (match) {
      this.executeRoute(match.route, match.params, query);
    } else {
      // Fallback 404 Route or redirect to home
      window.location.hash = "#/";
    }
  }

  parseQuery(queryString) {
    const query = {};
    if (!queryString) return query;
    const pairs = queryString.split("&");
    for (const pair of pairs) {
      const [key, val] = pair.split("=");
      query[decodeURIComponent(key)] = decodeURIComponent(val || "");
    }
    return query;
  }

  matchRoute(path) {
    // Split path into tokens
    const pathTokens = path.split("/").filter(Boolean);

    for (const route of this.routes) {
      const routeTokens = route.path.split("/").filter(Boolean);

      if (pathTokens.length !== routeTokens.length) continue;

      const params = {};
      let isMatch = true;

      for (let i = 0; i < routeTokens.length; i++) {
        if (routeTokens[i].startsWith(":")) {
          const paramName = routeTokens[i].slice(1);
          params[paramName] = pathTokens[i];
        } else if (routeTokens[i] !== pathTokens[i]) {
          isMatch = false;
          break;
        }
      }

      if (isMatch) {
        return { route, params };
      }
    }
    return null;
  }

  async executeRoute(route, params, query) {
    // Call cleanup on existing page. currentRoute is { route, params, query },
    // so the component lives at currentRoute.route.component (not .component).
    if (this.currentRoute && this.currentRoute.route.component && this.currentRoute.route.component.destroy) {
      this.currentRoute.route.component.destroy();
    }

    this.currentRoute = { route, params, query };

    // Scroll to top on page navigation
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Show loading skeleton if contentMount exists
    if (this.contentMount) {
      this.contentMount.innerHTML = `
        <div class="flex-center animate-fade-in" style="min-height: 50vh;">
          <div class="loader-ring"></div>
        </div>
      `;
    }

    try {
      // Initialize and render page
      const content = await route.component.render(params, query);
      
      if (this.contentMount) {
        this.contentMount.innerHTML = content;

        // Execute initialization actions (like event bindings, map loaders, observers)
        if (route.component.init) {
          route.component.init(params, query);
        }

        // Translate this freshly-rendered page into the current language.
        // Any element carrying a data-i18n key is swapped automatically.
        try {
          const { applyTranslations } = await import('./i18n.js');
          applyTranslations(this.contentMount);
        } catch (e) { /* i18n optional — never block rendering */ }
      }
    } catch (error) {
      console.error("Error executing route:", error);
      if (this.contentMount) {
        this.contentMount.innerHTML = `
          <div class="container text-center animate-fade-in" style="padding: 100px 0;">
            <i class="fa-solid fa-triangle-exclamation text-danger" style="font-size: 3rem; margin-bottom: 20px;"></i>
            <h2>Mountain Route Disrupted</h2>
            <p style="margin: 10px 0 20px 0;">We encountered an error loading this section. Please reload or head back home.</p>
            <a href="#/" class="btn btn-primary">Return to Base Camp</a>
          </div>
        `;
      }
    }
  }
}
