/* ==========================================
   HILLS TOUR & TRAVELS — WHATSAPP FAB COMPONENT
   ========================================== */

export const WhatsAppFab = {
  render() {
    return `
      <div class="whatsapp-fab" id="whatsapp-fab-btn" aria-label="Chat on WhatsApp">
        <i class="fa-brands fa-whatsapp"></i>
      </div>
    `;
  },

  init() {
    const fab = document.getElementById("whatsapp-fab-btn");
    
    if (fab) {
      fab.addEventListener("click", () => {
        const hash = window.location.hash || "#/";
        let message = "Hi! I am planning a tour in the Eastern Himalayas and would like to inquire about your premium taxi and tour services.";
        
        // Contextual messaging based on route
        if (hash.startsWith("#/destinations/")) {
          const destId = hash.split("/").pop();
          const capitalized = destId.charAt(0).toUpperCase() + destId.slice(1);
          message = `Hi! I am viewing your sightseeing packages for *${capitalized}* and would like to make an inquiry.`;
        } else if (hash.startsWith("#/booking")) {
          message = "Hi! I am using your online booking engine and would like to finalize an instant taxi quote.";
        }

        const phone = "919907219843"; // Match footer contact
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        
        window.open(url, "_blank");
      });
    }
  },

  destroy() {
    // Cleanup if any
  }
};
