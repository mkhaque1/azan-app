---

## 📄 File/Folder Descriptions

### `assets/`
- Place for all static media.
- Subfolders can include:
  - `/audio/` – Azan sounds.
  - `/images/` – Icons or logos.
  - `/fonts/` – Custom fonts.

### `components/`
- Shared components like `PrayerCard`, `ToggleSwitch`, `AzanPlayer`.

### `config/`
- Static app settings such as:
  - Default calculation method (MWL, ISNA, etc).
  - Available themes or settings presets.

### `constants/`
- Tailwind color palette overrides, layout breakpoints, etc.

### `hooks/`
- Examples:
  - `useLocation.ts` – Gets and monitors user location.
  - `usePrayerTimes.ts` – Fetches prayer times for current day/location.

### `navigation/`
- Handles screen stacks using `@react-navigation/native`.

### `screens/`
- Top-level screens:
  - `HomeScreen.tsx`
  - `SettingsScreen.tsx`
  - `PrayerDetailsScreen.tsx`

### `services/`
- Handles all logic like:
  - API integration (e.g. Aladhan API).
  - Local notifications (Azan triggers).
  - Background services.
  - Location permissions.

### `utils/`
- General-purpose helper functions:
  - Time formatting.
  - Date conversions.
  - Azan file selection based on settings.

---

## 📚 Developer Notes

- ✅ Tailwind CSS is powered via `tailwindcss-react-native`.
- ✅ Project uses TypeScript (`.ts`, `.tsx`) for type safety.
- ✅ Expo manages builds and development server.
- ✅ Local notifications are handled via `expo-notifications`.
- ❗ Make sure `.env` is used to hide sensitive config (like API keys).

---

## 🛠 Future Suggestions

- Add a `tests/` directory for unit/integration tests.
- Include a CI/CD pipeline for automated builds.
- Support offline Azan schedule caching.

---

**Last updated:** 2025-04-07  
Maintained by: `@yourteam`
