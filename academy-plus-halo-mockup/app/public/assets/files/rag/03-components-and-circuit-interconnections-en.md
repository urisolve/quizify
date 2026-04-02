## 3 - Components and Interconnection of Electric Circuits

### 3.1 - Resistors

Carbon resistors are fixed components whose resistance value is determined during manufacture. They are made from a mixture of carbon and insulating material, and their value is indicated by a colour code standardised by IEC 60062. This code is formed by coloured bands representing the significant digits, the multiplier factor, and the resistance tolerance.

* Black (0) – Multiplier ×1
* Brown (1) – Multiplier ×10, Tolerance ±1%
* Red (2) – Multiplier ×100, Tolerance ±2%
* Orange (3) – Multiplier ×1,000
* Yellow (4) – Multiplier ×10,000
* Green (5) – Multiplier ×100,000, Tolerance ±0.5%
* Blue (6) – Multiplier ×1,000,000, Tolerance ±0.25%
* Violet (7) – Multiplier ×10,000,000, Tolerance ±0.1%
* Grey (8) – Multiplier ×100,000,000, Tolerance ±0.05%
* White (9) – Multiplier ×1,000,000,000
* Gold – Multiplier ×0.1, Tolerance ±5%
* Silver – Multiplier ×0.01, Tolerance ±10%
* No colour – Tolerance ±20%

This code may consist of 4, 5, or 6 colour bands, and most resistors used in laboratory experiments have 4 colour bands, according to the following code (from left to right):

1. The 1st band represents the first significant digit of the resistance value.
2. The 2nd band represents the second significant digit of the resistance value.
3. The 3rd band indicates the multiplier factor, that is, the power of 10 to be applied.
4. The 4th band indicates the tolerance, that is, the percentage variation of the nominal value.

When the colour code consists of 5 bands, the reading follows the same principle as for 4-band resistors, but includes a third significant digit, providing greater precision in determining the resistance value.

Resistors with 6 bands follow the same structure as 5-band resistors, but include an additional band representing the temperature coefficient of resistance (TCR), expressed in ppm/°C. This coefficient indicates how the resistance varies with temperature and is relevant in applications requiring high thermal stability.

Potentiometers and trimmers are variable resistors, allowing the resistance value to be adjusted as needed. Potentiometers have a rotating shaft that can be manually adjusted to vary the resistance in real time. Trimmers are usually smaller versions intended for fine adjustment during circuit calibration and are not frequently adjusted after installation.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 2* (38 - 39);
* Department of Electrical Engineering; (October 2020); *FEELE Guide 2* (3);
* Department of Electrical Engineering; (October 2020); *FEELE Guide 1* (1 - 4).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 16/02/2025

### 3.2 - Coils (inductors)

A coil is a conducting wire wound so as to form a set of $N$ circular turns, all with the same radius, centred on the same axis, and located in parallel planes.

A single turn of a coil is a conductor bent into a loop which, when traversed by an electric current, produces an electromagnetic field with circular and concentric lines of force, thereby creating two magnetic poles $(N \text{ and } S)$. The strength of this magnetic field is proportional to the electric current flowing through the conductor.

When the coil is traversed by an electric current, it creates a uniform and intense magnetic field inside it, whose strength is proportional to the number of turns in the coil.

The coil stores energy in the form of a magnetic field, similarly to the capacitor, which stores energy in the form of an electric field.

Coils are used in electromagnets, control relays, first-order passive filters, electromechanical measuring instruments, position, displacement, and RPM sensors, loudspeakers, motors (DC, AC, etc.), generators (DC, AC), transformers (AC), linear and switched-mode power supplies, among other applications.

The self-inductance coefficient, or inductance, represented by $L$, is the main characteristic of a coil and represents its capacity to store/generate electrical energy. The greater the value of $L$, the greater the ability to accumulate/generate energy.

The inductance of a coil depends on several characteristics, such as the coil geometry (length, turn diameter, number of turns, etc.) and the magnetic properties of its core, and is given by the following expression:

$$
L=\mu A \frac{N^2}{l}
$$

where:

* $\mu = \mu_0 \times \mu_r$ corresponds to the core permeability, which may be determined by the product of the permeability of free space and the relative permeability of the material;
* $A$ corresponds to the area of the turns;
* $N$ corresponds to the number of turns;
* $l$ corresponds to the length of the coil (the length of the coil is different from the length of the conductor; the coil length is measured from the beginning of the first turn to the last turn).

The unit of inductance is the henry (symbol $H$).

When a current $i(t)$ flowing through the coil varies, a counter-electromotive force $e(t)$ is induced in the coil, also called the self-induced electromotive force, and is given by Lenz’s law:

$$
e(t) = -L \frac{\partial i(t)}{\partial t}
$$

Thus, the voltage $u(t)$, which is the opposite of the electromotive force, may be determined by:

$$
u(t) = -e(t) = L \frac{\partial i(t)}{\partial t}
$$

A real coil exhibits resistance due to the Joule effect in the conductor and also has parasitic capacitances between adjacent turns, which may have an impact at high frequencies.

The quality factor $Q$ of a coil is related to its losses and is given by:

$$
Q = \frac{\omega L}{R} = 2\pi f \frac{L}{R}
$$

where a higher quality factor indicates lower losses.

The core type may vary, and air cores, iron cores, powdered metal cores, ferrite cores, among others, may be used. The symbols used to represent coils may indicate whether they have an air core or a ferromagnetic core; they may also distinguish between fixed and variable inductors.

The nominal inductance may have tolerances, and the nominal/maximum allowable current is an important characteristic of the coil.

Regarding the association of coils:

* In series, voltages add up and the equivalent inductance of a series association of coils is equal to the sum of the individual inductances:

  $$
  L_{eq} = L_1 + L_2 + \dots + L_N
  $$

* In parallel, currents add up and the inverse of the equivalent inductance of a parallel association of coils is equal to the sum of the inverses of the individual inductances:

  $$
  \frac{1}{L_{eq}} = \frac{1}{L_1} + \frac{1}{L_2} + \dots + \frac{1}{L_N}
  $$

The relation between the voltage $u(t)$ and the current $i(t)$ in an ideal coil (without resistance) is given by:

$$
u(t) = L \frac{\partial i(t)}{\partial t}
$$

A current constant in time does not induce voltage across the coil terminals. On the other hand, a rapid variation of current may cause voltage spikes across the coil terminals, which may lead to problems such as electric arcs and damage to components.

To prevent these problems, capacitors in parallel (to filter spikes) or freewheeling diodes (to divert voltage spikes) may be used.

##### Metadata

**Source**:

* Mário Alves and Francisco Pereira; (March 2024); *TCIRC Slides Chapter 4* (3 - 17).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 10/03/2025

### 3.3 - Capacitors (capacitances)

A capacitor is a device capable of storing electric charge, consisting of two conductive plates (or electrodes) separated by an insulating material, also called the dielectric.

The capacitance of a capacitor, represented by $C$, is its main characteristic and determines the amount of electric charge that the capacitor can store for a given voltage.

When a capacitor is subjected to a potential difference, electric charges accumulate on its plates, with one plate positively charged and the other negatively charged, both with the same absolute value. This stored charge creates an electric field in the dielectric of the capacitor.

The capacitor stores energy in the form of an electric field, similarly to the coil, which stores energy in the form of a magnetic field.

Capacitors are used in various applications, such as coupling circuits, protection of components sensitive to voltage spikes, power factor correction, timers, digital memories, energy storage, among others.

The capacitance of a capacitor depends on several characteristics, such as the geometry of the plates and the properties of the dielectric, and is given by the expression:

$$
C=\varepsilon \frac{A}{d}
$$

where:

* $\varepsilon = \varepsilon_0 \times \varepsilon_r$ corresponds to the permittivity of the dielectric, given by the product of the permittivity of free space and the relative permittivity of the material;
* $A$ corresponds to the plate area;
* $d$ corresponds to the distance between the plates.

The unit of capacitance is the farad (symbol $F$), with the most common submultiples being microfarad $(\mu F)$, nanofarad $(nF)$, and picofarad $(pF)$.

In practice, capacitors exhibit leakage resistances and dielectric losses, and also possess parasitic capacitances between nearby conductors.

Capacitors may be built using different types of dielectrics, such as paper, mica, plastic, ceramic, among others. The symbols used in electrical schematics may indicate whether a capacitor is polarised or non-polarised, as well as whether it has fixed or variable capacitance.

The nominal capacitance of a capacitor may have tolerances, and its nominal/maximum allowable voltage is an important characteristic for its selection and application.

Regarding the association of capacitors:

* In series, the stored charges are equal, voltages add up, and the inverse of the equivalent capacitance of a series association of capacitors is equal to the sum of the inverses of the individual capacitances (it is identical to the parallel association of resistors):

$$
\frac{1}{C_{eq}}=\frac{1}{C_1} + \frac{1}{C_2}+ \dots + \frac{1}{C_N} = \sum^N_{n=1}{1/C_n}
$$

* In parallel, the voltage is the same across all capacitors, and the equivalent capacitance of a set of capacitors connected in parallel is equal to the sum of the individual capacitances (it is identical to the series association of resistors):

$$
C_{eq}=C_1 +C_2 + \dots + C_N = \sum^N_{n=1}{C_n}
$$

The relation between the voltage $u(t)$ and the current $i(t)$ in an ideal capacitor (without losses) is given by:

$$
u(t)=\frac{1}{C} \int{i(t),\partial t}
$$

A constant current over time does not alter the charge of the capacitor, and it therefore behaves as an open circuit. On the other hand, a rapid variation in voltage may cause current spikes, which may lead to problems such as excessive heating and damage to components.

To prevent these problems, coils in series (to limit the rate of change of current) or resistors in parallel (to discharge the capacitor in a controlled manner) may be used.

##### Metadata

**Source**:

* Mário Alves and Francisco Pereira; (March 2023); *TCIRC Slides Chapter 3* (3 - 18).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 10/03/2025

### 3.4 - Direct current power supplies

A linear voltage supply is a device that converts alternating current (AC) from the electrical mains into direct current (DC), providing voltage and current appropriate for a given application, while respecting the maximum power limits of the supply. Power supplies may operate as voltage sources or current sources.

An ideal voltage source maintains a constant voltage across its terminals, regardless of the current supplied. In an ideal model, there are no internal losses, that is, all the electrical power generated is transferred to the load with 100% efficiency. However, under short-circuit conditions, this characteristic would result in an infinite current, which is physically impossible.

A short circuit occurs when the terminals of a two-terminal element are connected by zero resistance. In this case, the voltage between the terminals is zero, but the current may be different from zero if there are internal sources. Even so, the electrical power exchanged with the exterior is zero.

An ideal current source supplies a constant current, regardless of the voltage across its terminals. To maintain this characteristic under any condition, the internal resistance and internal voltage of the source would have to be infinite, which is not feasible in practice. Under open-circuit conditions, this would result in an infinite voltage, which is equally impossible.

An open circuit occurs when a two-terminal element is not connected to any external load, that is, when its equivalent resistance is infinite. In this case, the current at the terminals is zero, but the voltage may be different from zero if there are internal sources in the two-terminal element. However, the electrical power exchanged with the exterior is always zero.

A real voltage source may be modelled as an ideal voltage source $E$ in series with an internal resistance. The source output voltage decreases as the current increases, being equal to $E$ only when there is no current (open circuit). The smaller the internal resistance, the closer the source approaches ideal behaviour.

A real current source may be modelled as an ideal current source in parallel with an internal resistance. The output current is not perfectly constant, since it varies according to the voltage applied across the terminals. The greater the value of the internal resistance, the closer the source approaches ideal behaviour.

A real voltage source may be converted into an equivalent real current source $I_{cc}$ and vice versa. For them to be equivalent, they must provide the same voltage and current to a connected load. Thus, a voltage source with $E$ and $R_i$ in series may be represented by a current source with $I_{cc} = E / R_i$ in parallel with $R_i$.

Voltage sources may be connected in series or in parallel to increase their capability:

* In series, the total e.m.f. of the system increases, since the source voltages add up. The polarities must be respected so that the voltages add correctly. The equivalent internal resistance will be the sum of the internal resistances of the sources.
* In parallel, the maximum available current may be increased. For this, the e.m.f.s of the sources must be equal and their polarities must be respected. The equivalent resistance will be the parallel association of the internal resistances of the sources.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 2* (16, 58 - 75);
* Department of Electrical Engineering; (October 2020); *FEELE Guide 1* (4 - 5).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 18/02/2025

### 3.5 - Batteries

Batteries are devices that produce a DC voltage through chemical reactions. These devices are easy to use and have the advantage of being electrically isolated from the power supplies of other equipment. However, they have two significant disadvantages: each battery provides only one voltage value, which decreases with use, and the electrical energy supplied by batteries, especially non-rechargeable ones, is more expensive than the energy that may be supplied by other power sources.

The capacity of a battery defines its energy capability, where the battery capacity $(A \cdot h$, ampere-hour$)$ is equal to the discharge current $(I)$ multiplied by the discharge time $(t)$.

In theory, a battery of $x,A \cdot h$ can deliver approximately:

* $x,A$ for 1 hour;
* $x/10,A$ for 10 hours.

However, there are practical aspects that alter this behaviour.

Given the electromotive force of a battery and knowing its capacity, its energy may be determined (in joules, $J$):

$$
P=U \cdot I = W =U \cdot I \cdot t = U \times C_{bat}
$$

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *TCIRC Slides Chapter 2* (76 - 77).
* Department of Electrical Engineering; (October 2020); *FEELE Guide 1* (10).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 3.6 - Breadboard

Breadboards allow connections to be made between components such as resistors, capacitors, inductors, diodes, etc., with relative ease. They are normally used during the design and testing stages of electronic circuits, before the printed circuit board is produced.
All terminals (holes) contain an internal spring mechanism that facilitates electrical contact with the connecting wire. The terminals are electrically connected in groups (columns or rows).

It is very common to find markings (blue/red lines) on the board representing the longitudinal rails that are recommended for interconnecting the terminals of the power supply and the various components (e.g. red rail for positive and blue rail for negative/ground), making it easier to understand the breadboard wiring arrangement.

The longitudinal rails are also suitable for connecting other types of signals (periodic or non-periodic) to be applied to the circuit.

##### Metadata

**Source**:

* Department of Electrical Engineering; (October 2020); *FEELE Guide 1* (8 - 9).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 3.7 - Connection accessories

There is a very wide variety of accessory equipment, particularly regarding cabling used to electrically interconnect the components of electric circuits, as well as to connect them to power supplies and measuring instruments.

The main types of connection accessories are:

1. **Banana leads** – Used mainly for connections to power supplies and multimeters, ensuring easy handling.
2. **Alligator clip leads** – Ideal for temporary connections, since they allow components and wires to be attached without the need for soldering.
3. **Multimeter test probes** – They have a fine tip, which makes it easier to measure components in a circuit.
4. **BNC connection cables** – Used with measuring equipment such as oscilloscopes and signal generators.
5. **Oscilloscope probes** – Used to measure electrical quantities in a circuit with an oscilloscope; each probe normally includes a hook-shaped tip for attachment to the circuit and also an alligator clip lead for ground.

##### Metadata

**Source**:

* Department of Electrical Engineering; (October 2020); *FEELE Guide 1* (11).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025
