/* ==========================================
   HILLS TOUR & TRAVELS — WHATSAPP FAB COMPONENT
   ========================================== */

export const WhatsAppFab = {
  render() {
    return `
      <a
        class="whatsapp-fab"
        id="whatsapp-fab-btn"
        href="https://wa.me/919907219843"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Hills Tour and Travels on WhatsApp"
        title="Chat on WhatsApp"
      >
        <i class="fa-brands fa-whatsapp"></i>
      </a>
    `;
  },

  init() {
    const fab = document.getElementById("whatsapp-fab-btn");
    
    if (fab) {
      const updateWhatsAppLink = () => {
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
        fab.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      };

      updateWhatsAppLink();
      window.addEventListener("hashchange", updateWhatsAppLink);
      this.removeHashChangeListener = () => window.removeEventListener("hashchange", updateWhatsAppLink);
    }
  },

  destroy() {
    if (this.removeHashChangeListener) {
      this.removeHashChangeListener();
      this.removeHashChangeListener = null;
    }
  }
};
