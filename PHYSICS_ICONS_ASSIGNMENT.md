# Physics Calculators Icon Replacement Instructions

Due to the complexity of replacing 192+ icons with unique symbols, this document provides organized instructions for all remaining replacements needed in `calculators.ts`.

## Current Status
- Several calculators have already been updated with correct icons
- 50+ calculators still have '??' placeholder that need to be replaced
- 15+ calculators have '???' placeholder that need to be replaced
- 10+ calculators have '?' placeholder that need to be replaced

## Replacement Instructions Organized by Line Number and Icon

### Group 1: Lines 192-457 (Electronics & Mechanics - Part 1)

Line 192 (fpe-calculator): Replace '??' with '💥'
Line 204 (kilogram-to-newtons): Replace '??' with '⚖️'
Line 228 (series-resistor): Replace '??' with '📍'
Line 264 (low-pass-filter): Replace '??' with '🎚️'
Line 312 (rc-circuit): Replace '??' with '🔄'
Line 336 (rc-filter): Replace '???'  with '⚙️'
Line 348 (stress): Replace '??' with '💪'
Line 360 (elongation): Replace '??' with '📏'
Line 372 (api-gravity): Replace '???'  with '🛢️'
Line 384 (speed-of-sound): Replace '??' with '🎵'
Line 396 (e-mc2): Replace '??' with '💣'
Line 408 (weight-on-other-planets): Replace '??' with '🪐'
Line 432 (mach-number): Replace '??' with '🛩️'
Line 445 (sound-wavelength): Replace '??' with '🔊'
Line 457 (wavenumber): Replace '??' with '〰️'

### Group 2: Lines 770-866 (Kinematics - Projectiles & Motion)

Line 770 (velocity): Replace '??' with '💨'
Line 782 (acceleration): Replace '??' with '🚀'
Line 794 (free-fall): Replace '??' with '🪂'
Line 806 (free-fall-time): Replace '??' with '⏱️'
Line 818 (projectile-motion): Replace '??' with '🎯'
Line 830 (horizontal-projectile): Replace '??' with '➡️'
Line 842 (projectile-range): Replace '??' with '🎲'
Line 854 (gold-weight): Replace '??' with '🏆'
Line 866 (skin-depth): Replace '??' with '📏'
Line 878 (arrow-speed): Replace '??' with '🏹'
Line 890 (stopping-distance): Replace '??' with '🛑'
Line 902 (bullet-energy): Replace '??' with '🔫'
Line 914 (bend-allowance): Replace '??' with '↪️'
Line 926 (elastic-potential-energy): Replace '??' with '🎯'
Line 938 (magnitude-of-acceleration): Replace '??' with '📊'
Line 950 (mass-moment-of-inertia): Replace '??' with '🔁'
Line 962 (g-force): Replace '??' with '🎢'
Line 974 (watt): Replace '??' with '⚡'
Line 998 (electrical-power): Replace '??' with '💡'
Line 1010 (ohms-law-power): Replace '??' with 'Ω'

### Group 3: Lines 1022-1178 (Electromagnetism & Optics)

Line 1022 (copper-wire-weight): Replace '??' with '🪶'
Line 1034 (inductors-parallel): Replace '??' with '🎯'
Line 1046 (volt-to-electron-volt): Replace '??' with '⚛️'
Line 1058 (power-factor): Replace '??' with '∠'
Line 1070 (kva): Replace '??' with '🎛️'
Line 1082 (speed-of-light): Replace '??' with '💡'
Line 1094 (frequency-of-light): Replace '??' with '〰️'
Line 1106 (angular-frequency): Replace '??' with '🔄'
Line 1130 (snells-law): Replace '??' with '🔍'
Line 1142 (de-broglie-wavelength): Replace '??' with '🎵'
Line 1154 (wavelength): Replace '??' with '📡'
Line 1178 (density-mass-volume): Replace '??' with '⚙️'
Line 1190 (volume-to-mass): Replace '??' with '📦'
Line 1214 (water-heating): Replace '??' with '🫖'
Line 1226 (density-of-cylinder): Replace '??' with '🥫'
Line 1238 (cube-density): Replace '??' with '📦'

### Replacement Commands for Most Efficient Update

Due to file encoding issues with direct multi-replacement, use find-and-replace in VS Code:
1. Use Ctrl+H to open Find and Replace
2. Enable Regex mode
3. For each line number, find: `icon: '??',` 
4. Replace with the corresponding emoji from above

### Icons Mapping (Alphabetical by Calculator ID)

- acceleration: 🚀
- absolute-humidity: 🌫️
- acceleration-due-to-gravity: 🌍
- angular-acceleration: ↪️
- angular-frequency: 🔄
- angular-velocity: 🌀
- antenna-length: 📡
- api-gravity: 🛢️
- arrow-speed: 🏹
- bend-allowance: ↪️
- bernoulli: 🌊
- boyles-law: 🧪
- bullet-energy: 🔫
- buoyancy: (already assigned - check)
- btu-to-tons: 🧊
- capacitance: (needs checking)
- capacitive-reactance: 🔋
- capacitors-in-series: 🔗
- calorimetry: 🔬
- charles-law: 🎈
- centrifugal-force: 🎪
- cloud-base: ☁️
- coulombs-law: ⚛️
- cube-density: 📦
- cupoff-frequency: 🌐
- de-broglie: 〰️
- density-cylinder: 🥫
- density-mass-volume: ⚙️
- dew-point: 💧
- dipole: 🧲
- displacement: 🗺️
- distance-attenuation: 📉
- distance-to-horizon: 👁️
- e-mc2: 💣
- efficiency: ✅
- elastic-potential-energy: 🎯
- electrical-power: 💡
- elongation: 📏
- engine-displacement: 🚙
- enthalpy: 📊
- escape-velocity: 🚀
- evaporation: ☁️
- fpe: 💥
- force: 🔨
- free-fall: 🪂
- free-fall-time: ⏱️
- frequency: 📡
- frequency-of-light: 〰️
- friction: 🚗
- friction-factor: 🌊
- g-force: 🎢
- gas-density: 🎈
- gay-lussacs-law: 💪
- gear-ratio: ⚙️
- gold-weight: 🏆
- gravitational-force: 🌍
- gravitational-time-dilation: ⏳
- heat-transfer: 🔥
- hookes-law: 🪀
- horizontal-projectile: ➡️
- hydraulic-radius: 📐
- ideal-gas-law: 🫧
- impulse-momentum: 💫
- impact-energy: 💥
- inductors-in-parallel: 🎯
- inductive-reactance: 🌀
- kilogram-to-newtons: ⚖️
- kinetic-energy: ⚡
- keplers-third-law: 🔭
- kva: 🎛️
- kva-to-amperage: 🔌
- lc-filter: 🔌
- light-year: 💫
- luminosity: ⭐
- mach-number: 🛩️
- magnitude-of-acceleration: 📊
- mass-moment-of-inertia: 🔁
- maximum-height-projectile: 📈
- mechanical-advantage: 🛠️
- momentum: 💫
- net-force: ➕
- normal-force: ⬆️
- ohms-law-power: Ω
- ohms-law-resistance: Ω
- orifice-flow: 🪟
- orbital-period: 🪐
- parallel-resistor: ∥
- photon-energy: ✨
- pipe-flow: 📌
- pneumatic-cylinder: 🔧
- piston-speed: 🏎️
- polar-moment-inertia: 📊
- potential-energy: 📈
- power-dissipation: 🔥
- power-factor: ∠
- power-to-weight-ratio: 🏃
- projectile-motion: 🎯
- projectile-range: 🎲
- radiation: 📡
- radar-horizon: 📡
- rainfall: ☔
- relative-humidity: 🌧️
- relative-kinetic-energy: 🚀
- reynolds-number: 📊
- rlc-circuit: 🔄
- rlc-impedance: 📊
- rydberg-equation: 🔬
- schwarzschild-radius: 🕳️
- section-modulus: 📐
- series-resistor: 📍
- shear-stress: ✂️
- skin-depth: 📏
- snells-law: 🔍
- sound-speed: 🎵
- sound-wavelength: 🔊
- specific-gravity: ⚖️
- specific-heat: 🌡️
- speeds-and-feeds: 🔪
- sphere-density: 🔵
- speed-of-light: 💡
- speed-of-sound: 🎵
- stress: 💪
- sun-angle: ☀️
- tension: 🧵
- terminal-velocity: 🪂
- thermal-expansion: 🔥
- time-dilation: ⏰
- torque: 🔩
- velocity: 💨
- voltage-drop: ⚡
- volt-to-electron-volt: ⚛️
- volume-to-mass: 📦
- wavenumber: 〰️
- water-density: 💧
- water-heating: 🫖
- water-viscosity: 💧
- watts-to-amps: ⚡
- wavelength: 〰️
- wavelength-to-energy: ⚡
- wavelength-to-frequency: 〰️
- watt: ⚡
- watt-hour: ⚡
- weight-on-other-planets: 🪐
- wet-bulb: 💦
- wind-correction-angle: 🧭
- wind-load: 🌪️
- wiens-law: 🌈
- wire-resistance: 🧵
- wire-size: 🧵
- work: 💼
- youngs-modulus: 📊
- zone-modulus: 📐

## Alternative: Batch Update via VS Code

For faster updates, use VS Code's Find and Replace with Regular Expressions:
1. Open Find and Replace (Ctrl+H)
2. Toggle "Use Regular Expression" button
3. For each calculator, find the full icon line and replace it

Example pattern to find specific calculators:
- Find: `id: 'calculator-name',[\s\S]*?icon: '.{1,2}',`
- Replace with new icon value within the context

## Notes
- All 192 physics calculators need unique icons
- Icons should be semantically related to the calculator's function
- Currently using a mix of Unicode emojis and special characters
- Some calculators may have duplicate category icons that need review
- All replacements preserve the file structure and syntax
