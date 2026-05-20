// Hills T&T — Compass canvas: one direction, all screens side-by-side.

// ─── Tweaks panel (language toggle + density) ─────────────────────────────
function CompassTweaks({ lang, setLang }) {
  // Cycle handler for the button used in the panel
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Language">
        <TweakRadio
          label="Show all copy in"
          options={[
            { value: 'en', label: 'English' },
            { value: 'hi', label: 'हिन्दी' },
            { value: 'bn', label: 'বাংলা' },
            { value: 'ne', label: 'नेपाली' },
          ]}
          value={lang}
          onChange={setLang}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────
function App() {
  // Language state — also persisted via the host tweak file
  const [{ lang }, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{
    "lang": "en"
  }/*EDITMODE-END*/);

  // Phone artboard dimensions
  const PHONE_W = 380;
  const PHONE_H = 820;

  // Helper to wrap a flow in the iPhone frame
  const Phone = ({ children }) => (
    <IOSDevice width={PHONE_W} height={PHONE_H} dark={true} title="hillstours.in">
      {children}
    </IOSDevice>
  );

  return (
    <LangCtx.Provider value={lang}>
      <DesignCanvas>
        {/* ── Onboarding ── */}
        <DCSection id="onboarding" title="01 · Onboarding" subtitle="First-launch sequence. Sells the pitch, then collects phone & OTP via WhatsApp.">
          <DCArtboard id="ob-welcome" label="Welcome" width={PHONE_W} height={PHONE_H}>
            <Phone><OnboardFlow start="welcome" /></Phone>
          </DCArtboard>
          <DCArtboard id="ob-pitch" label='"Build your route" pitch' width={PHONE_W} height={PHONE_H}>
            <Phone><OnboardFlow start="pitch" /></Phone>
          </DCArtboard>
          <DCArtboard id="ob-phone" label="Phone number" width={PHONE_W} height={PHONE_H}>
            <Phone><OnboardFlow start="phone" /></Phone>
          </DCArtboard>
          <DCArtboard id="ob-otp" label="WhatsApp OTP" width={PHONE_W} height={PHONE_H}>
            <Phone><OnboardFlow start="otp" /></Phone>
          </DCArtboard>
        </DCSection>

        {/* ── Discover ── */}
        <DCSection id="discover" title="02 · Discover" subtitle="Map-first home. Tap any pin → see details, packages through it. Search overlay for typed-text exploration.">
          <DCArtboard id="dx-default" label="Map · default" width={PHONE_W} height={PHONE_H}>
            <Phone><DiscoverFlow start="map" initialPin="tigerhill" initialSheet="mid" /></Phone>
          </DCArtboard>
          <DCArtboard id="dx-pin" label="Pin tapped · Happy Valley Tea" width={PHONE_W} height={PHONE_H}>
            <Phone><DiscoverFlow start="map" initialPin="happy" initialSheet="high" /></Phone>
          </DCArtboard>
          <DCArtboard id="dx-search" label="Search overlay" width={PHONE_W} height={PHONE_H}>
            <Phone><DiscoverFlow start="search" /></Phone>
          </DCArtboard>
        </DCSection>

        {/* ── Route builder ── */}
        <DCSection id="route" title="03 · Build your route" subtitle="The killer feature. Pick pins on the map, drag-reorder the itinerary, get a live price quote.">
          <DCArtboard id="rt-build" label="Route builder" width={PHONE_W} height={PHONE_H}>
            <Phone><RouteFlow start="build" /></Phone>
          </DCArtboard>
          <DCArtboard id="rt-quote" label="Route quote" width={PHONE_W} height={PHONE_H}>
            <Phone><RouteFlow start="quote" /></Phone>
          </DCArtboard>
        </DCSection>

        {/* ── Booking ── */}
        <DCSection id="booking" title="04 · Booking" subtitle="Animated route on package detail, date+time+cab+hotel selection, then split-pay (UPI / card / cash / netbanking).">
          <DCArtboard id="bk-pkg" label="Package · animated route" width={PHONE_W} height={PHONE_H}>
            <Phone><BookFlow start="pkg" /></Phone>
          </DCArtboard>
          <DCArtboard id="bk-book" label="Reserve · date, cab, hotel" width={PHONE_W} height={PHONE_H}>
            <Phone><BookFlow start="book" /></Phone>
          </DCArtboard>
          <DCArtboard id="bk-pay" label="Payment · UPI / card / cash" width={PHONE_W} height={PHONE_H}>
            <Phone><BookFlow start="pay" /></Phone>
          </DCArtboard>
        </DCSection>

        {/* ── Live trip ── */}
        <DCSection id="trip" title="05 · Live trip" subtitle="Confirmed → driver arriving (live dot on the map) → on trip (stop-by-stop progress) → completed (rate + tip).">
          <DCArtboard id="tr-confirm" label="Confirmed" width={PHONE_W} height={PHONE_H}>
            <Phone><BookFlow start="confirmed" /></Phone>
          </DCArtboard>
          <DCArtboard id="tr-arriving" label="Driver arriving · live" width={PHONE_W} height={PHONE_H}>
            <Phone><TripFlow start="arriving" /></Phone>
          </DCArtboard>
          <DCArtboard id="tr-ontrip" label="On trip · stop 2 of 3" width={PHONE_W} height={PHONE_H}>
            <Phone><TripFlow start="ontrip" initialIdx={1} /></Phone>
          </DCArtboard>
          <DCArtboard id="tr-done" label="Completed · rate + tip" width={PHONE_W} height={PHONE_H}>
            <Phone><TripFlow start="done" /></Phone>
          </DCArtboard>
        </DCSection>

        <DCPostIt x={40} y={-40} color="amber">
          {`Compass — map-first booking, deep dive.

15 screens across 5 phases. Every phone is live: tap pins, drag the bottom sheet, run the booking flow end-to-end.

Try the route builder (section 03). Tap pins on the map to build a custom itinerary; price updates as you add stops.

Toggle the Tweaks panel to switch languages (EN / HI / BN / NE).`}
        </DCPostIt>
      </DesignCanvas>

      <CompassTweaks lang={lang} setLang={(v) => setTweak('lang', v)} />
    </LangCtx.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
