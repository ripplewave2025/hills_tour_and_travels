// Compass — flow wrappers (one mini state-machine per artboard).
// Each flow renders one of the screens we've built, with internal state so
// the user can click forward inside the phone. The artboard label tells
// you which "entry state" it starts on.

// ─── ONBOARDING ────────────────────────────────────────────────────
function OnboardFlow({ start = 'welcome' }) {
  const [step, setStep] = React.useState(start);
  if (step === 'welcome') return <ScreenWelcome onNext={() => setStep('pitch')} onSkip={() => setStep('discover')} />;
  if (step === 'pitch') return <ScreenPitch onNext={() => setStep('phone')} onBack={() => setStep('welcome')} onSkip={() => setStep('discover')} />;
  if (step === 'phone') return <ScreenOTP mode="phone" onNext={() => setStep('otp')} onBack={() => setStep('pitch')} />;
  if (step === 'otp') return <ScreenOTP mode="otp" onNext={() => setStep('discover')} onBack={() => setStep('phone')} />;
  if (step === 'discover') return <ScreenDiscover />;
  return null;
}

// ─── DISCOVERY ─────────────────────────────────────────────────────
function DiscoverFlow({ start = 'map', initialPin = 'tigerhill', initialSheet = 'mid' }) {
  const [step, setStep] = React.useState(start);
  const [activePin, setActivePin] = React.useState(initialPin);
  const [pkg, setPkg] = React.useState(C_PACKAGES[0]);

  const openPkg = (p) => { setPkg(p); setStep('pkg'); };

  if (step === 'map') return (
    <ScreenDiscover
      initialPin={activePin}
      initialSheet={initialSheet}
      onOpenSearch={() => setStep('search')}
      onOpenBuild={() => setStep('build')}
      onTapPackage={openPkg}
    />
  );
  if (step === 'search') return <ScreenSearch onClose={() => setStep('map')} onPick={(id) => { setActivePin(id); setStep('map'); }} />;
  if (step === 'build') return <RouteFlow start="build" onFinish={() => setStep('map')} />;
  if (step === 'pkg') return <BookFlow start="pkg" pkg={pkg} onClose={() => setStep('map')} />;
  return null;
}

// ─── ROUTE BUILDER ─────────────────────────────────────────────────
function RouteFlow({ start = 'build', onFinish }) {
  const [step, setStep] = React.useState(start);
  const [stops, setStops] = React.useState(['mall', 'happy', 'hmi', 'peace']);

  if (step === 'build') return (
    <ScreenRouteBuilder
      initialStops={stops}
      onBack={() => onFinish && onFinish()}
      onQuote={(s) => { setStops(s); setStep('quote'); }}
    />
  );
  if (step === 'quote') return (
    <ScreenRouteQuote
      stops={stops}
      onBack={() => setStep('build')}
      onBook={() => setStep('book')}
    />
  );
  if (step === 'book') {
    // Synthesize a "custom" package from stops
    const customPkg = {
      id: 'custom', title: 'Custom Route', shortTitle: 'Custom · ' + stops.length + ' stops',
      duration: 'Full day · custom', days: 1, price: 4500, stops, perPerson: false, badge: 'Your route',
      pitch: 'Built by you, driven by Nima.',
      includes: ['Innova Crysta full day', 'Driver-guide', 'Toll & parking'],
      excludes: ['Meals', 'Entries you choose to skip'],
    };
    return <BookFlow start="book" pkg={customPkg} onClose={() => setStep('build')} />;
  }
  return null;
}

// ─── BOOKING ───────────────────────────────────────────────────────
function BookFlow({ start = 'pkg', pkg = C_PACKAGES[0], onClose }) {
  const [step, setStep] = React.useState(start);
  const [booking, setBooking] = React.useState({});

  if (step === 'pkg') return <ScreenPkgDetail pkg={pkg} onBack={() => onClose && onClose()} onBook={() => setStep('book')} />;
  if (step === 'book') return <ScreenBook pkg={pkg} onBack={() => setStep('pkg')} onPay={(b) => { setBooking(b); setStep('pay'); }} />;
  if (step === 'pay') return <ScreenPay pkg={pkg} total={pkg.price} onBack={() => setStep('book')} onConfirm={() => setStep('confirmed')} />;
  if (step === 'confirmed') return <ScreenConfirmed pkg={pkg} booking={booking} onTrack={() => setStep('arriving')} onHome={() => onClose && onClose()} />;
  if (step === 'arriving') return <ScreenArriving pkg={pkg} onCancel={() => setStep('confirmed')} />;
  return null;
}

// ─── TRIP ──────────────────────────────────────────────────────────
function TripFlow({ start = 'arriving', pkg = C_PACKAGES[0], initialIdx = 1 }) {
  const [step, setStep] = React.useState(start);
  if (step === 'arriving') return <ScreenArriving pkg={pkg} onCancel={() => setStep('arriving')} />;
  if (step === 'ontrip')   return <ScreenOnTrip pkg={pkg} currentIdx={initialIdx} />;
  if (step === 'done')     return <ScreenCompleted pkg={pkg} onHome={() => setStep('done')} />;
  return null;
}

Object.assign(window, { OnboardFlow, DiscoverFlow, RouteFlow, BookFlow, TripFlow });
