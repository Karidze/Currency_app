# Currency Exchange App

Mobile app for a currency exchange office – view rates from NBP API, virtual wallet, currency exchange, and transaction history.

## Features

- **Registration and login** (Supabase Auth)
- **Home screen** – PLN balance and currency accounts, top-up, rates
- **Rates** – current and archival rates (date picker), search, favorites
- **Exchange** – choose From/To accounts, amount, NBP rate, save transaction
- **Transactions (History)** – list of your transactions
- **Profile** – user data, edit profile, settings, change password

## Tech stack

- **Expo** (React Native), **TypeScript**
- **Supabase** – Auth, database (PostgreSQL): `profiles`, `wallets`, `transactions`
- **NBP API** – currency rates (table A), current and archival

The app connects directly to Supabase and NBP API (no separate Web Service).

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure Supabase: in `lib/supabase.ts` set `supabaseUrl` and `supabaseKey` (or use environment variables).

3. Start the app:

   ```bash
   npx expo start
   ```

   Then: scan QR in Expo Go, or run on Android emulator / iOS simulator.

## Scripts

| Command | Description |
|--------|-------------|
| `npm start` | Start Expo |
| `npx expo start --android` | Android |
| `npx expo start --ios` | iOS |
| `npm run lint` | ESLint |

## Project structure

```
app/(tabs)/     – screens: home, rates, exchange, history, profile
lib/            – supabase.ts, nbpApi.ts, utils.ts
components/     – AuthForm, ProfileMenu, UI, AboutUsModal, AvatarWithCamera
constants/      – theme
hooks/          – useTheme, useAvatar
styles/         – styles for screens
```

## Sources

- [NBP API](https://api.nbp.pl/)
- [Supabase](https://supabase.com/docs)
- [Expo](https://docs.expo.dev/)
- [React Native](https://reactnative.dev/)
