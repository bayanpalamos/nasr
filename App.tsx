import PrayerCard from "./PrayerCard";
import QuranSection from "./QuranSection";
import LocationPicker from "./LocationPicker";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>🕌 Mon application islamique</h1>

      <LocationPicker />
      <PrayerCard />
      <QuranSection />
    </div>
  );
}

export default App;
