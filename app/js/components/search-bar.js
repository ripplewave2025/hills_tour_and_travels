/* ==========================================
   HILLS TOUR & TRAVELS — SEARCH BAR AUTOCOMPLETE
   ========================================== */

import { routes } from '../data/routes.js';

export class SearchBar {
  constructor(inputId, dropdownId, type = "from") {
    this.inputId = inputId;
    this.dropdownId = dropdownId;
    this.type = type; // "from" or "to"
    this.input = null;
    this.dropdown = null;
    this.onSelectCallback = null;
    this.selectedIndex = -1;
  }

  render() {
    return `
      <div class="search-input-wrapper">
        <i class="fa-solid ${this.type === 'from' ? 'fa-location-dot' : 'fa-location-crosshairs'} search-icon"></i>
        <input 
          type="text" 
          id="${this.inputId}" 
          class="input-glass search-input" 
          placeholder="${this.type === 'from' ? 'Pick-up Location (e.g., Bagdogra, NJP)' : 'Drop-off Location (e.g., Gangtok, Darjeeling)'}"
          autocomplete="off"
        />
        <div id="${this.dropdownId}" class="search-dropdown glass-panel"></div>
      </div>
    `;
  }

  init(onSelectCallback = null) {
    this.input = document.getElementById(this.inputId);
    this.dropdown = document.getElementById(this.dropdownId);
    this.onSelectCallback = onSelectCallback;

    if (!this.input || !this.dropdown) return;

    // Open/Search on focus
    this.input.addEventListener("focus", () => this.search(""));
    
    // Close on click outside
    document.addEventListener("click", (e) => {
      if (!this.input.contains(e.target) && !this.dropdown.contains(e.target)) {
        this.closeDropdown();
      }
    });

    // Handle inputs
    this.input.addEventListener("input", (e) => this.search(e.target.value));

    // Handle keyboard navigation (Arrow keys and Enter)
    this.input.addEventListener("keydown", (e) => this.handleKeydown(e));
  }

  getLocations() {
    // Collect ALL unique location nodes from routes (union of both from and to)
    // This enables users to select any terminal as either pick-up or drop-off,
    // supporting return drops (e.g., Darjeeling → Bagdogra Airport)
    const locations = new Map();
    
    for (const route of routes) {
      if (!locations.has(route.from)) {
        locations.set(route.from, route.fromName);
      }
      if (!locations.has(route.to)) {
        locations.set(route.to, route.toName);
      }
    }

    return Array.from(locations.entries()).map(([id, name]) => ({ id, name }));
  }

  search(query) {
    const locations = this.getLocations();
    const cleanQuery = query.toLowerCase().trim();
    
    // Filter matching locations
    const results = locations.filter(loc => {
      // Direct substring matching
      const matchesName = loc.name.toLowerCase().includes(cleanQuery);
      // Low friction character matches (e.g. 'S' -> Siliguri, Sikkim, Sittong)
      const matchesInitials = loc.name.toLowerCase().split(" ").some(word => word.startsWith(cleanQuery));
      return matchesName || matchesInitials;
    });

    this.renderDropdown(results);
  }

  renderDropdown(items) {
    this.selectedIndex = -1;
    
    if (items.length === 0) {
      this.dropdown.innerHTML = `<div class="search-no-results">No locations mapped. Select another terminal.</div>`;
      this.dropdown.classList.add("dropdown-visible");
      return;
    }

    // Display list
    this.dropdown.innerHTML = items.map((item, idx) => `
      <div class="search-item" data-id="${item.id}" data-name="${item.name}" data-index="${idx}">
        <i class="fa-solid fa-map-pin"></i>
        <span>${item.name}</span>
      </div>
    `).join("");

    this.dropdown.classList.add("dropdown-visible");

    // Click selection binding
    this.dropdown.querySelectorAll(".search-item").forEach(el => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-id");
        const name = el.getAttribute("data-name");
        this.selectItem(id, name);
      });
    });
  }

  selectItem(id, name) {
    this.input.value = name;
    this.input.setAttribute("data-selected-id", id);
    this.closeDropdown();
    
    if (this.onSelectCallback) {
      this.onSelectCallback({ id, name });
    }
  }

  handleKeydown(e) {
    const items = this.dropdown.querySelectorAll(".search-item");
    if (!this.dropdown.classList.contains("dropdown-visible") || items.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % items.length;
      this.highlightItem(items);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + items.length) % items.length;
      this.highlightItem(items);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (this.selectedIndex >= 0 && this.selectedIndex < items.length) {
        const selected = items[this.selectedIndex];
        const id = selected.getAttribute("data-id");
        const name = selected.getAttribute("data-name");
        this.selectItem(id, name);
      }
    } else if (e.key === "Escape") {
      this.closeDropdown();
    }
  }

  highlightItem(items) {
    items.forEach((item, idx) => {
      item.classList.toggle("highlighted", idx === this.selectedIndex);
      if (idx === this.selectedIndex) {
        item.scrollIntoView({ block: "nearest" });
      }
    });
  }

  closeDropdown() {
    this.dropdown.classList.remove("dropdown-visible");
    this.selectedIndex = -1;
  }

  setValue(id, name) {
    if (this.input) {
      this.input.value = name;
      this.input.setAttribute("data-selected-id", id);
    }
  }

  resolveInput() {
    if (!this.input) {
      console.warn(`⚠️ [SearchBar resolveInput] input element is not bound for type="${this.type}"`);
      return null;
    }
    let currentId = this.input.getAttribute("data-selected-id");
    if (currentId) {
      console.log(`🔍 [SearchBar resolveInput] type="${this.type}" found data-selected-id: "${currentId}"`);
      return currentId;
    }

    const val = this.input.value.toLowerCase().trim();
    console.log(`🔍 [SearchBar resolveInput] type="${this.type}" raw val: "${this.input.value}", trimmed lower: "${val}"`);
    if (!val) return null;

    const locations = this.getLocations();

    // 1. Try to find exact match
    const exact = locations.find(loc => loc.name.toLowerCase() === val || loc.id.toLowerCase() === val);
    if (exact) {
      console.log(`🔍 [SearchBar resolveInput] type="${this.type}" found exact match:`, exact);
      this.selectItem(exact.id, exact.name);
      return exact.id;
    }

    // 2. Try to find substring match (e.g. "bagdogra" in "Bagdogra Airport (IXB)")
    const fuzzy = locations.find(loc => loc.name.toLowerCase().includes(val) || loc.id.toLowerCase().includes(val));
    if (fuzzy) {
      console.log(`🔍 [SearchBar resolveInput] type="${this.type}" found substring fuzzy match:`, fuzzy);
      this.selectItem(fuzzy.id, fuzzy.name);
      return fuzzy.id;
    }

    // 3. Try to find word-based multi-keyword intersection (e.g. "bagdogra ixb" -> "Bagdogra Airport (IXB)")
    const words = val.split(/\s+/).filter(Boolean);
    if (words.length > 1) {
      const intersectionMatch = locations.find(loc => {
        const nameLower = loc.name.toLowerCase();
        const idLower = loc.id.toLowerCase();
        return words.every(word => nameLower.includes(word) || idLower.includes(word));
      });
      if (intersectionMatch) {
        console.log(`🔍 [SearchBar resolveInput] type="${this.type}" found multi-word intersection match:`, intersectionMatch);
        this.selectItem(intersectionMatch.id, intersectionMatch.name);
        return intersectionMatch.id;
      }
    }

    console.warn(`⚠️ [SearchBar resolveInput] type="${this.type}" could not resolve value: "${val}"`);
    return null;
  }
}
