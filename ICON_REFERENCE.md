# Calculator Icon Reference Guide

This document defines the standard emoji icons to use for calculators based on their category and function. **Always follow this theme when adding new calculators.**

## Icon Theme by Category

### 📐 Geometry & Shapes
- 📐 – Perimeter Calculator
- ⬛ – Area Calculator
- ⭕ – Circumference Calculator
- 🎯 – Radius of a Circle
- 💬 – Area of a Circle
- 📏 – Distance Formula, Line Segments, Length measurements
- ↗️ – Diagonal of a Rectangle, Direction of Vector, Angles
- 🔷 – Polygon Calculator
- 📦 – Rectangular Prism (Volume/Surface Area)
- 🔈 – Hypotenuse (Pythagorean Theorem), Force-related
- 🔢 – Triangle Angle Calculator, Triangle-related, Mathematical calculations
- 📍 – Midpoint Calculator
- ⚪ – Sphere Volume Calculator, Volume-related
- 💠 – Heron's Formula Calculator, Triangle Height

### ⚙️ Mechanics & Physics
- 🔧 – Friction Calculator, Engineering/Mechanical tools
- ⬆️ – Normal Force Calculator, Upward forces
- ⚖️ – Kilogram to Newtons (Mass to Weight), Balance/Weight
- 🌌 – Acceleration due to Gravity, Weight on Other Planets, Space-related
- ⚙️ – Pneumatic Cylinder Force, Mechanical systems, Gears
- ⚡ – Pressure Calculator (P = F/A), Energy, Power, Electrical
- 🧮 – Density, Mass, and Volume, Calculation/Measurement tools
- 🖤 – Torque Calculator, Force-related (dark)
- 🔉 – Force Calculator (F = m × a), Sound/Wave-related
- 🆔 – Centrifugal Force
- 🆕 – Wind Load Calculator

### 📈 Algebra & Math Basics
- ↔️ – Standard Form to Slope Intercept
- 🌊 – Parabola Properties, Fluid dynamics
- 🔺 – Vertex Form Calculator
- 📈 – Slope (Gradient) Calculator, Growth/Increase
- ⛰️ – Slope Percentage
- 💎 – Diamond Problem Solver
- ✖️ – Cross Multiplication
- ➗ – Quotient and Remainder
- ² – Square of a Binomial
- ☄️ – Fraction Calculator (Add/Subtract/Simplify)
- 🧩 – Common Denominator Calculator
- ⏱️ – Time & Decimal to Time conversion

### 💸 Finance & Pay
- 💛 – Overtime Calculator
- 🕒 – Time and a Half Calculator
- 💸 – Pay Raise Calculator
- 📈 – Markup Calculator (Note: same as Slope)
- 🏠 – Price Per Square Foot
- 🧾 – Real Estate Commission
- 💳 – Cash Back Calculator

### 🌡️ Thermodynamics & Fluids
- 💨 – SCFM (Standard Cubic Feet per minute)
- ✈️ – Mach Number Calculator
- ⭐ – Luminosity Calculator, Stars, Energy
- 🌡️ – Wien's Law Calculator, Gay-Lussac's Law Calculator, Temperature-related
- 🔥 – Heat Transfer Calculator, Specific Heat, Enthalpy
- 🚀 – Dew Point Calculator
- 🚢 – Calorimetry Calculator
- 🅾️ – Absolute Humidity
- 💧 – Evaporation Rate Calculator
- ❄️ – Newton's Law of Cooling Calculator

### 🏃 Kinematics & Motion
- 🤍 – Velocity Calculator
- 📢 – Acceleration Calculator
- 🌀 – Free Fall Calculator, Drag, Circular motion
- 🔤 – Projectile Motion, Horizontal Projectile Motion
- 🔔 – Horizontal Projectile Motion
- 🏹 – Arrow Speed Calculator
- 📣 – Stopping Distance (Vehicle Safety)

### 📡 Electronics & Optics
- 📊 – dB (Decibel) Gain Calculator
- 🔭 – Watt Calculator (Electrical Power)
- ⚗️ – Power Factor Calculator, Chemistry/Electronics
- 📺 – Wire Size (AWG) Calculator, Wire Resistance
- 💡 – Contact Lens Vertex Calculator
- 📡 – Speed of Light Calculator, Wavelength, Frequency

## Rules for Assigning Icons

1. **Follow the category mappings above** - Use the appropriate icon based on the calculator's primary function
2. **If multiple categories apply**, choose based on the primary use case
3. **For new categories not listed**, use a semantically appropriate emoji that fits the theme
4. **Keep icons unique** - Each calculator should have a distinct icon when possible
5. **Use appropriate symbols** - The icon should visually represent what the calculator does

## Implementation Notes

- All icons are stored in `app/_components/data/calculators.ts`
- File must be saved with UTF-8 encoding (no BOM) for proper emoji display
- Icons are displayed in the `CalculatorGrid` component
- When adding new calculators, reference this file to select the appropriate icon

