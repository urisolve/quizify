# Fundamentals of Electric Circuits

## 1 - Systems of Units

### 1.1 - SI Units

The International System of Units (SI) is the global standard used for measurements, ensuring precision and consistency across science, technology, engineering, and mathematics (STEM). The SI is composed of 7 base units, which are currently defined in terms of universal constants and can dimensionally represent any other unit. The 7 base units are:

1. **Time**, represented by the **second**, symbol $s$, defined by the frequency of the unperturbed ground-state hyperfine transition of the caesium-133 atom, $\Delta \nu_{Cs}$, fixed at 9 192 631 770 when expressed in the unit $Hz$, which is equal to $s^{-1}$;
2. **Length**, represented by the **metre**, symbol $m$, defined by the fixed numerical value of the speed of light in vacuum, $c$, equal to 299 792 458 when expressed in the unit $m s^{-1}$, where the second is defined in terms of the caesium frequency, $\Delta \nu_{Cs}$;
3. **Mass**, represented by the **kilogram**, symbol $kg$, defined by the fixed numerical value of the Planck constant, equal to $6.62607015 \times 10^{-34}$ when expressed in the unit $J s$, which is equal to $kg m^2 s^{-1}$, where the metre and the second are defined in terms of $c$ and $\Delta \nu_{Cs}$.
4. **Electric current**, represented by the **ampere**, symbol $A$, defined by the fixed numerical value of the elementary charge, $e$, equal to $1.602176634 \times 10^{-19}$ when expressed in the unit $C$, which is equal to $A s$, where the second is defined in terms of $\Delta \nu_{Cs}$.
5. **Thermodynamic temperature**, represented by the **kelvin**, symbol $K$, defined by the fixed numerical value of the Boltzmann constant, $k$, equal to $1.380649 \times 10^{-23}$ when expressed in the unit $J K^{-1}$, which is equal to $kg m^2 s^{-2} K^{-1}$, where the kilogram, metre, and second are defined in terms of $h$, $c$, and $\Delta \nu_{Cs}$.
6. **Amount of substance**, represented by the **mole**, symbol $mol$, defined by the fixed numerical value of the Avogadro constant, $N_A$, equal to $6.02214076 \times 10^{23}$ elementary entities. The amount of substance, symbol $n$, of a system is a measure of the number of specified elementary entities. An elementary entity may be an atom, a molecule, an ion, an electron, any other particle, or a specified group of particles.
7. **Luminous intensity**, represented by the **candela**, symbol $cd$, defined by the fixed numerical value of the luminous efficacy of monochromatic radiation of frequency $540 \times 10^{12},Hz$, fixed at $683$ when expressed in the unit $lm,W^{-1}$, which is equal to $cd , sr , W^{-1}$, or $cd , sr , kg^{-1} m^{-2} s^3$, where the kilogram, metre, and second are defined in terms of $h$, $c$, and $\Delta \nu_{Cs}$.

##### Metadata

**Source**:

* Bureau International des Poids et Mesures; (December 2022); *SI Brochure - English version*; (127 - 140);
* Department of Electrical Engineering; (October 2020); *FEELE Guide 1* (11);
* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 1*; (20 - 21, 25 - 27, 30).

**Validation**: João Ferreira

**Version**: 1.1

**Last update**: 06/03/2025

### 1.2 - Multiples and Submultiples

Decimal multiples and submultiples of SI units make it possible to express values on scales appropriate for different scientific, technological, and everyday contexts. These multiples and submultiples are represented by standardised prefixes ranging from $10^{-30}$ to $10^{30}$, ensuring clarity and consistency in measurements:

**Multiples:**

* deka, symbol $da$, factor $10^1$;
* hecto, symbol $h$, factor $10^2$;
* kilo, symbol $k$, factor $10^3$;
* mega, symbol $M$, factor $10^6$;
* giga, symbol $G$, factor $10^{9}$;
* tera, symbol $T$, factor $10^{12}$;
* peta, symbol $P$, factor $10^{15}$;
* exa, symbol $E$, factor $10^{18}$;
* zetta, symbol $Z$, factor $10^{21}$;
* yotta, symbol $Y$, factor $10^{24}$;
* ronna, symbol $R$, factor $10^{27}$;
* quetta, symbol $Q$, factor $10^{30}$.

**Submultiples:**

* deci, symbol $d$, factor $10^{-1}$;
* centi, symbol $c$, factor $10^{-2}$;
* milli, symbol $m$, factor $10^{-3}$;
* micro, symbol $\mu$, factor $10^{-6}$;
* nano, symbol $n$, factor $10^{-9}$;
* pico, symbol $p$, factor $10^{-12}$;
* femto, symbol $f$, factor $10^{-15}$;
* atto, symbol $a$, factor $10^{-18}$;
* zepto, symbol $z$, factor $10^{-21}$;
* yocto, symbol $y$, factor $10^{-24}$;
* ronto, symbol $r$, factor $10^{-27}$;
* quecto, symbol $q$, factor $10^{-30}$.

Each prefix is represented by a name and a symbol, which are attached directly to the unit symbol, with no spaces. The notation follows a standard pattern:

* Prefixes for multiples, with factor $10^1$ or greater, are represented by uppercase symbols, except for deka, with symbol $da$, hecto, with symbol $h$, and kilo, with symbol $k$;
* Prefixes for submultiples, with factor $10^{-1}$ or smaller, are represented by lowercase symbols.
* Prefix names are written in lowercase letters, except at the beginning of sentences.

Prefixes are inseparable from the units to which they are attached, forming new symbols and names that may be combined to express derived quantities. Examples include millimetre, with symbol $mm$; megawatt, with symbol $MW$; and gigabyte, with symbol $GB$. However, combining two prefixes in the same unit is not permitted; for example, "micromillimetre" is not a valid designation.

One exception within the SI is the kilogram, symbol $kg$, which already contains the prefix "kilo" in its name. To form its multiples and submultiples, the prefix is added to the gram, symbol $g$, and not to the kilogram, resulting for example in milligram, symbol $mg$, instead of “microkilogram” ($\mu kg$).

In addition, SI prefixes refer strictly to powers of 10 and should not be used to represent powers of 2. For applications involving computing and digital storage, specific binary prefixes exist:

* kibi, symbol Ki, factor $2^{10}$;
* mebi, symbol Mi, factor $2^{20}$;
* gibi, symbol Gi, factor $2^{30}$;
* tebi, symbol Ti, factor $2^{40}$;
* pebi, symbol Pi, factor $2^{50}$;
* exbi, symbol Ei, factor $2^{60}$;
* zebi, symbol Zi, factor $2^{70}$;
* yobi, symbol Yi, factor $2^{80}$.

##### Metadata

**Source**:

* Bureau International des Poids et Mesures; (December 2022); *SI Brochure - English version*; (143 - 144);
* Department of Electrical Engineering; (October 2020); *FEELE Guide 1* (12);
* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 1*; (23 - 24).

**Validation**: João Ferreira

**Version**: 1.2

**Last update**: 06/03/2025

### 1.3 - Significant Figures

Significant Figures are the relevant digits in measurements and in calculations based on measurements; they represent the correct and meaningful values, excluding leading zeros. When a number is written in scientific notation, the number of significant figures remains the same, since this form only changes its representation and does not modify its actual precision.

When dealing with measurements, it is essential to determine which digits should be retained in the final result, because excessive digits may suggest a precision that does not exist, while too few digits may compromise the reliability of the information.

Rounding is used to ensure that results of calculations based on measurements are consistent with the precision of the values used. When rounding a number, it should be approximated to the nearest value within the scale being used, ensuring that the final result reflects the uncertainty associated with the original measurement.

A particular case occurs when the last digit to be discarded is exactly 5. In such cases, it is common to adopt a criterion in which the final number is rounded to the nearest even digit.

In a measurement or calculation, the digits to the right of the least significant digit are unknown, and in some cases a number may be assigned an insufficient number of significant figures; this number may be influenced by the type of instrument used to perform the measurement. In digital instruments, the number of displayed digits directly determines the number of significant figures in the presented value. In analogue instruments, precision depends on the instrument scale and on the observer’s ability to interpret the indicated values correctly.

In some situations, certain numbers are considered to have an infinite number of significant figures, since they are exact values with no associated uncertainty. This occurs, for example, when a number represents a defined count, with no margin of error, or when it is an exact value within a known mathematical relation.

When presenting results based on measurements, it is recommended to use the approximation symbol to indicate that the value has associated uncertainty. This is especially important in scientific and engineering contexts, where all measurements and calculations are, in essence, approximations of reality.

When performing calculations involving measured values, it is necessary to apply rules that ensure the precision of the result is compatible with that of the numbers involved in the operation.

In addition and subtraction, the number of decimal places in the result must be limited by the least precise value used. In other words, the final result cannot have more decimal places than the least precise number present in the operation.

In multiplication and division, the number of significant figures in the result must be equal to that of the least precise number involved in the operation. This means that, regardless of the number of digits that appear in intermediate calculations, the final value must be adjusted to maintain consistency with the original precision of the data used.

##### Metadata

**Source**:

* Mário Alves, Ana Viana and Francisco Pereira; (October 2023); *FEELE Slides Chapter 4* (68 - 74).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

## 2 - Electric Circuit Terminology

### 2.1 - Electric charge

The origin of electrical phenomena is associated with the existence of electric forces between electric charges. These forces, observed experimentally, show that certain objects may attract or repel each other due to the presence of electric charge, leading to the identification of two fundamental types of charge: positive electric charge and negative electric charge.

The interaction between these charges follows a simple principle: charges with opposite signs attract each other, exerting a mutual attractive force, whereas charges with the same sign repel each other, exerting a repulsive force.

The SI unit of electric charge is the coulomb $(C)$, which represents the amount of charge transported by an electric current of one ampere in one second.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 1* (4).

**Validation**: João Ferreira

**Version**: 1.1

**Last update**: 07/03/2025

### 2.2 - Electric voltage

Electric voltage $(U)$, also known as potential difference (p.d.), voltage drop, or voltage difference, is the quantity that quantifies the exchange of electrical energy between a component and the rest of the circuit. Electric voltage represents the amount of electrical energy transferred per unit charge when passing through a circuit element. Mathematically, electric voltage is given by:

$$
U=\frac{W}{Q}
$$

where $W$ is the electrical energy exchanged, in joules, symbol $J$, and $Q$ is the electric charge involved, in coulombs, symbol $C$.

In the International System of Units (SI), the unit of electric voltage is the volt $(V)$. One volt corresponds to the voltage required for a charge of 1 coulomb to transfer 1 joule of electrical energy:

$$
1V = 1J/1C
$$

Voltage is always established between two points in a circuit, following the direction from higher potential to lower potential. Depending on the component under analysis:

* In electrical loads (such as resistors), current flows in the same direction as the voltage.
* In voltage sources (such as cells and batteries), current and voltage have opposite directions, since the source delivers energy to the circuit.

Note: A voltage source may operate under load while receiving energy, for example, a battery during charging.

A voltage source is essentially characterised by its electromotive force (e.m.f.), which is the ratio between the electrical energy supplied and the charge transported. In addition, all sources have an internal resistance or impedance that may influence the voltage distribution in the circuit.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 2* (17 - 20).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 15/02/2025

### 2.3 - Electric current

Free electrons in a conductor move randomly. However, when subjected to an electric field, this disordered motion becomes directed, giving rise to electric current intensity, or electric current.

By convention, the direction of electric current (positive direction) is opposite to the motion of electrons, that is, from the positive terminal $(+)$ to the negative terminal $(-)$. This direction corresponds to the movement of positive charges and follows the direction of decreasing electric potential.

Electric current intensity, symbol $I$, is defined as the amount of electric charge, symbol $Q$, that crosses the cross-sectional area of a conductor per unit time, symbol $t$, and is expressed mathematically by:

$$
I=\frac{dQ}{dt}
$$

In the International System of Units (SI), the unit of electric current is the ampere, symbol $A$, where 1 ampere corresponds to the passage of 1 coulomb of electric charge per second:

$$
1A=1C/1s
$$

Assuming that a number $n$ of electrons cross the cross-sectional area $S$ of a conductor during a time interval $t$, and that the elementary charge of the electron is $q_0=-1.602\times10^{-19},C$, the total transported charge may be calculated by:

$$
Q=n\cdot q_0
$$

Thus, the electric current intensity may be expressed as $I=Q/t$.

##### Metadata

**Source:**

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 1* (9 - 11).

**Validation:** João Ferreira

**Version:** 1.1

**Last edition:** 07/03/2025

### 2.4 - Electrical resistance and resistivity

During the motion of electrons in a conductor, even when ordered, collisions occur between the electrons and the particles of the material. These collisions hinder the flow of electric current, thereby characterising the electrical resistance of the conductor. As a consequence, part of the electrical energy is converted into heat, increasing the temperature of the material, a phenomenon known as the Joule effect.

The increase in temperature intensifies the thermal agitation of the electrons, causing a greater number of collisions and, consequently, an increase in the electrical resistance of the conductor. This property depends on several factors, such as the type of material, the length of the conductor, and its cross-sectional area.

The electrical resistance $(R)$ of a conductor of length $l$ $(m)$, cross-sectional area $S$ $(m^2)$, and resistivity $\rho$ $(\Omega \cdot m)$ is given by:

$$
R=\rho\frac{l}{S}
$$

where $\rho$, whose value may be found in tables, is characteristic of each material and is related to the resistance of a conductor segment of length $l$ and cross-sectional area $S$.

Resistivity varies with temperature and is expressed by the relation:

$$
\rho = \rho_0 [1 + \alpha (T - T_0)]
$$

where:

* $\rho_0$ is the resistivity at the reference temperature $T_0$;
* $\alpha$ is the temperature coefficient of resistivity;
* $T$ is the material temperature.

In the International System of Units (SI), electrical resistance is measured in ohms $(\Omega)$. One ohm is defined as the resistance of a conductor when a potential difference of 1 volt applied across its terminals produces a current of 1 ampere:

$$
1\Omega = \frac{1V}{1A}
$$

Ohm’s Law establishes the relation between the potential difference $(U)$ applied to a conductor and the electric current $(I)$ flowing through it:

$$
R = \frac{U}{I}
$$

Electrical resistance may be fixed or variable. Devices that use variable resistances include:

* Rheostats and potentiometers, which allow manual adjustment of the resistance value;
* Resistive transducers, whose resistance varies in response to physical quantities, such as:

  * Resistance temperature detectors and thermistors (variation with temperature);
  * Photoresistors (light-dependent resistance);
  * Piezoresistors (resistance varies with applied pressure or force).

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 1* (13 - 16);
* Department of Electrical Engineering; (October 2020); *FEELE Guide 1* (1 - 2).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 15/02/2025

### 2.5 - Types of conductive materials

Electrical materials may be classified as conductors, insulators, semiconductors, and superconductors, depending on their ability to allow the flow of electric current.

Electrical resistivity $(\rho)$, expressed in ohm metre $(\Omega \cdot m)$, is the quantity that characterises this opposition to conduction.

Conductive materials have free electrons that move easily under the action of an electric field, thus exhibiting low resistivity. Examples include copper, aluminium, silver, gold, mercury, and some ionic solutions.

Insulating materials have electrons strongly bound to the nucleus, which hinders the flow of electric current. Insulating materials include wood, rubber, and glass.

Semiconductors, such as silicon and germanium, have intermediate resistivity and, in the pure state, behave as insulators. However, they may be doped (P-type, N-type) to build electronic components (diodes, transistors) and control their conduction capability.

Superconductors, in turn, reduce their resistivity with temperature and, below a certain critical value close to absolute zero $(0,K)$, become perfect conductors, allowing current to flow without losses.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 1* (8 and 18);
* Department of Electrical Engineering; (October 2020); *FEELE Guide 2* (1).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 16/02/2025

### 2.6 - Electric power

Electric power $(P)$ represents the amount of electrical energy transferred or dissipated by a circuit component per unit time. In direct current (DC), where voltage and current remain constant over time, power is calculated as:

$$
P = U \cdot I
$$

where:

* $P$ is the electric power (in watts, $W$),
* $U$ is the electric voltage (in volts, $V$),
* $I$ is the electric current (in amperes, $A$).

When current flows through a resistor, part of the electrical energy is converted into heat due to the resistance of the material. Applying Ohm’s Law $(U = R \cdot I)$, the dissipated power may also be expressed as:

$$
P = I^2 \cdot R
$$

$$
P = \frac{U^2}{R}
$$

where $R$ is the electrical resistance of the component, measured in ohms $(\Omega)$.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 2* (25).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 16/02/2025

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

## 4 - Test and Measurement Equipment

### 4.1 - Classification of measuring instruments

Measuring instruments may be classified according to the way they present the indication of the measured values.

In analogue instruments, the indication is a continuous function of the value of the measured quantity. This means that the value may vary smoothly and continuously, without discrete jumps, and is generally represented by a pointer over a graduated scale.

Digital instruments, on the other hand, provide the measurement in numerical form, displaying the value directly on a display. As a consequence, the indication occurs in discrete steps, depending on the resolution of the device.

According to the *International Vocabulary of Metrology* (VIM 2012), a measuring instrument is understood as: “Device used for making measurements, alone or in conjunction with one or more supplementary devices”, and indication as: “Value provided by a measuring instrument”.

There is a wide variety of instruments intended for measuring electrical quantities, including:

* **Voltmeter** – measures electric voltage
* **Ammeter** – measures electric current
* **Ohmmeter** – measures electrical resistance
* **Wattmeter** – measures electric power
* **Electric energy meter** – measures energy consumption
* **Frequency meter** – measures the frequency of electrical signals
* **Phase meter** – measures the phase angle between signals
* **Capacitance meter** – measures capacitance
* **RLC bridge / RLC meter** – measures resistance, inductance, and capacitance
* **Oscilloscope** – displays electrical waveforms over time
* **Spectrum analyser** – analyses electrical signals at different frequencies
* **Logic analyser** – used to visualise digital signals
* **Voltage tester** – simple device used to identify the presence of voltage
* **Multimeter** – combines several functions in a single device

##### Metadata

**Source**:

* Mário Alves, Ana Viana and Francisco Pereira; (October 2023); *FEELE Slides Chapter 4* (24 - 28).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 18/02/2025

### 4.2 - Measurement by comparison - Wheatstone bridge

The comparison measurement method is a particular case of direct measurement methods, in which the quantity to be measured is compared with another quantity of the same type but with a known value. This method may be divided into two main types: the substitution method and the null method.

In the substitution method, the unknown quantity is replaced by another quantity of the same type whose value is known. The substitution is carried out in such a way that the effect on the indicating device remains unchanged.

In the null method, the value of the quantity to be measured is determined by balance, by adjusting one or more known quantities associated with the quantity being measured through a known balance relation.

A classic example of this method is a two-pan balance, where known weights are added or removed until equilibrium is reached, thus determining the weight of the object.

In the electrical context, the Wheatstone bridge is a device that follows this principle, adjusting resistances until the current in a galvanometer is zero, thereby allowing the value of an unknown resistance to be determined with high accuracy.

Measurement bridges are circuits widely used for measuring electrical quantities such as resistance, capacitance, and inductance. Some of the best known are:

* **Wheatstone bridge** – used for resistance measurements
* **De Sauty and Schering bridges** – for capacitance measurements
* **Maxwell and Owen bridges** – for inductance measurements

In addition, these bridges are often used as signal-conditioning circuits in electrical sensors and transducers.

The Wheatstone bridge, in particular, is a highly accurate method for measuring resistance, with very small uncertainties, generally in the range of 0.01% to 0.5%. Commercial models of this instrument are capable of measuring a wide range of resistances, from very low values $(m\Omega)$ to high values $(M\Omega)$.

The Wheatstone bridge operates based on the principle of electrical balance. The circuit contains four resistors arranged in a bridge configuration and a galvanometer that measures the potential difference between two points.

* When the current in the galvanometer is zero, the bridge is balanced, and the unknown resistance may then be determined through a mathematical relation between the resistances in the circuit.
* In commercial bridges, some resistances are adjustable to facilitate achieving balance, allowing highly accurate measurement.
* In general, three resistances in the circuit are known and adjustable, while the fourth resistance, which is unknown, is determined when balance is achieved.

To obtain the value of the unknown resistance, a multiplying factor and a decade box are used, the latter containing adjustable selectors to define a precise value. The number of decades available in the box corresponds to the number of significant figures in the final measurement.

##### Metadata

**Source**:

* Mário Alves, Ana Viana and Francisco Pereira; (October 2023); *FEELE Slides Chapter 4* (90 - 97).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 4.3 - Ohmmeter

The ohmmeter is a measuring instrument that allows the direct measurement of electrical resistance.
Due to its operating principle, the ohmmeter should only be connected across the terminals of a component (whose electrical resistance is to be measured) after that component has been disconnected from the circuit of which it forms part.

##### Metadata

**Source**:

* Department of Electrical Engineering; (October 2020); *FEELE Guide 1* (8).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 4.4 - Voltmeter

A voltmeter is a measuring instrument used to determine the electric potential difference (voltage) between two points in a circuit. It must always be connected in parallel to the points where the voltage is to be measured.

Voltmeters are designed to have high internal resistance, generally on the order of hundreds of k$\Omega$ or even tens of M$\Omega$, in order to minimise the current diverted from the circuit and reduce the so-called “loading effect”.

The internal resistance of a voltmeter may be determined in different ways:

* In analogue voltmeters, the internal resistance is obtained from the sensitivity (resistance per volt – $\Omega/V$).
* In digital voltmeters, the internal resistance is specified in the manufacturer’s manual.

If necessary, in both cases, the internal resistance of a voltmeter may be measured directly with an ohmmeter.

The measurement range of a voltmeter defines the interval of voltage values that it can measure. Typically, common voltmeters allow measurements from a few millivolts $(mV)$ up to hundreds of volts $(V)$, with 600–750 V being a common maximum limit.

Range selection may be performed:

* Manually, by means of a rotary switch.
* Automatically, in models with the “auto-range” function, which may be set to manual mode if required.

Typical ranges for general-purpose voltmeters are: 200 mV, 2 V, 20 V, 200 V, 750 V.

Voltmeters use a current-measuring movement (CMM), such as a microammeter, milliammeter, or galvanometer, to measure voltage indirectly. The measurement is made by controlling the current that passes through the CMM using series resistances.

To extend the measurement range of a voltmeter, it is necessary to add a resistor in series with the CMM. In this way, the total voltmeter voltage $(U)$ may be obtained from the expression:

$$
U = I \cdot (R + R_{AMC})
$$

where:

* $U$ is the measured voltage,
* $I$ is the current passing through the CMM,
* $R$ is the additional resistance,
* $R_{AMC}$ is the internal resistance of the CMM.

From this equation, the value of the additional resistance required to achieve a given measurement range may be determined by:

$$
R = \frac{U}{I} - R_{AMC}
$$

To allow multiple measurement ranges in the same instrument, selectable series resistances may be used. In a voltmeter with several ranges, different additional resistances are combined to adjust the measurement as needed.

The relation between the total voltmeter voltage and the voltage across the CMM may be described by the voltage divider:

$$
U_{AMC} = U \cdot \frac{R_{AMC}}{R + R_{AMC}}
$$

The multiplication factor of the additional resistance is given by:

$$
n = \frac{U}{U_{AMC}} = \frac{R_{AMC} + R}{R_{AMC}}
$$

##### Metadata

**Source**:

* Mário Alves, Ana Viana and Francisco Pereira; (October 2023); *FEELE Slides Chapter 4* (4 - 6, 17 - 20);
* Department of Electrical Engineering; (October 2020); *FEELE Guide 1* (7).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 19/02/2025

### 4.5 - Ammeter

An ammeter is a measuring instrument used to determine the magnitude of the electric current in a circuit. To perform the measurement correctly, it must always be connected in series in the branch where the current is to be measured.

To minimise interference with the circuit, ammeters are designed with low internal resistance (a few ohms), in order to avoid significant voltage drops and reduce the so-called “loading effect”.

The measurement range of an ammeter defines the interval of current values that it can measure. Common ammeters operate over ranges from milliamperes $(mA)$ up to tens of amperes $(A)$, with typical limits of 10–20 A.

Range selection may be performed:

* Manually, by means of a rotary switch.
* Automatically, in models with the “auto-range” function.

Typical ranges for general-purpose ammeters are: 2 mA, 20 mA, 200 mA, 2 A, 20 A.

Ammeters use a current-measuring movement (CMM), which may be a microammeter, milliammeter, or galvanometer, to detect small currents. To allow the measurement of higher currents, it is necessary to use shunt resistors in parallel with the CMM, in order to divide the current correctly.

The total measured current $(I_T)$ is related to the current through the CMM $(I_{AMC})$ and the shunt resistance $(R_S)$ by the current-divider equation:

$$
I_{AMC} = I_T \cdot \frac{R_S}{R_S + R_{AMC}}
$$

The shunt multiplication factor $(m)$ is given by:

$$
m = \frac{R_S + R_{AMC}}{R_S}
$$

To size the shunt resistance, the following relation is used:

$$
R_S = \frac{R_{AMC}}{m - 1}
$$

where:

* $R_S$ is the shunt resistance,
* $R_{AMC}$ is the internal resistance of the CMM,
* $m$ is the multiplication factor required for the desired measurement range.

Shunt resistors are made from low-resistance materials with a low temperature coefficient, such as manganin (a copper-manganese-nickel alloy), ensuring stable measurements.

Shunts may be:

* **Internal**, when integrated into the ammeter.
* **External**, when connected directly in the circuit and linked to the CMM.

For ammeters with multiple measurement ranges, different shunt resistances are associated with a switch, allowing the appropriate resistance to be selected for each current range. The shunts must be designed together, ensuring that each resistance meets the requirements of its corresponding measurement range.

##### Metadata

**Source**:

* Mário Alves, Ana Viana and Francisco Pereira; (October 2023); *FEELE Slides Chapter 4* (4 - 15);
* Department of Electrical Engineering; (October 2020); *FEELE Guide 1* (7 - 8).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 19/02/2025

### 4.6 - Wattmeter

A wattmeter is a measuring instrument intended to measure electric power. It may be analogue or digital, and internally, what either of them does is measure the voltage across the terminals and the current passing through a load and multiply them to obtain the power:

$$
P = U \cdot I
$$

##### Metadata

**Source**:

* Department of Electrical Engineering; (October 2020); *FEELE Guide 1* (8).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 4.7 - Multimeter

The multimeter is a measuring instrument that allows different electrical quantities to be measured, namely: electric current, electric voltage, and electrical resistance. It allows current and voltage measurements to be performed in sinusoidal alternating current and in direct current.

##### Metadata

**Source**:

* Department of Electrical Engineering; (October 2020); *FEELE Guide 1* (7).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 16/02/2025

### 4.8 - Signal generator

Function generators, or signal generators, are instruments that generate electrical signals (normally periodic) with the desired waveform, frequency, and amplitude. There is a great variety of signal generators on the market. The simplest are the so-called oscillators, which generate only sinusoidal signals.

##### Metadata

**Source**:

* Department of Electrical Engineering; (October 2020); *FEELE Guide 1* (5).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 4.9 - Oscilloscope

The oscilloscope is a measuring instrument used to visualise and analyse the evolution of electrical signals over time.

With an oscilloscope, it is possible to measure various signal characteristics, such as peak values, peak-to-peak values, RMS values, DC and AC components; temporal characteristics such as period, frequency, rise time, and duty cycle; and, when two signals are analysed simultaneously, differences between them such as phase shift and gain may also be determined. Depending on the oscilloscope model and manufacturer, more advanced analyses may be performed, such as noise filtering, spectral analysis, and mathematical transforms such as the FFT, which makes it easier to visualise the frequency components of the signal.

Oscilloscopes may be classified as analogue or digital. Analogue models, now obsolete, used cathode-ray tubes (CRT) and analogue electronics to generate the image of the signal on the screen. Digital models, more correctly called sampling oscilloscopes, convert the input signal into discrete values, allowing storage, digital processing, and a series of advanced functionalities. Since both types of oscilloscopes show the evolution of the input signal over time (analogue indication), both are therefore analogue measuring instruments.

For a signal to be displayed correctly on the oscilloscope, it is essential that the synchronisation system, known as the trigger, is properly adjusted. The trigger stabilises the waveform displayed on the screen, ensuring that the same repetition of the signal is shown continuously. If the sweep is not triggered at the same instant every time, the resulting image will be unstable and difficult to interpret. The trigger is configured by defining a trigger level and a slope, which determine at what point and in which direction of the signal (rising or falling) the oscilloscope will start the sweep. In digital models, advanced trigger modes exist that allow the identification of specific events, such as spikes, signal faults, and anomalous behaviours, and also allow single-shot sweep mode, which “freezes” the signal on the screen, facilitating the analysis of events that occur only once, such as the charging of a capacitor.

Among the technical specifications of an oscilloscope, some characteristics are common to all models, such as bandwidth $(MHz-GHz)$, the number of input channels (1, 2, 4, 6), vertical sensitivity (min. 1–2 mV/div, max. 2–100 V/div), and measurement uncertainties (between 0.1% and 3%).
In digital models, factors such as sampling frequency (MS/s–GS/s), vertical resolution (8–12 bits), and record length (kB–MB) are decisive for signal analysis quality. In addition, characteristics such as the presence of a colour display, USB, Wi-Fi, and Ethernet connectivity interfaces, and software-based processing resources are other factors that differentiate the cost of more modern models.

In conventional bench oscilloscopes, the internal circuit ground is connected to the third terminal of the power outlet, ensuring that it remains at the same potential as the installation earth. However, in portable oscilloscopes, the ground may be “floating”, that is, not directly connected to earth, which allows measurements in locations where there are potential differences between the circuit ground and earth. There are also models in which each channel has an independent ground, enabling differential measurements without interference.

For voltage measurements, passive probes are common; they act as voltage dividers and are available with different attenuation factors, such as 1X, 10X, 100X, and 1000X. For measurements of very weak signals, active probes with pre-amplification are used, since they present higher input impedance and reduce the loading effect on the circuit under test. For current measurements, probes may be of the current-transformer type, which operate only with alternating signals, or of the Hall-effect type, which allow measurements of both direct and alternating current.

There are several types of oscilloscopes on the market, the most common being digital bench models, ranging from low-cost options to high-end instruments used in specialised laboratories. Portable oscilloscopes are a practical option for field measurements and generally provide integration with computer and mobile-device applications. PC-based oscilloscopes use internal data-acquisition boards or external modules connected to a computer, allowing all processing and waveform analysis to be carried out by software.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *TCIRC Slides Chapter 2* (3 - 30).
* Department of Electrical Engineering; (October 2020); *FEELE Guide 1* (6).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 18/02/2025

## 5 - Fundamental Concepts of Electric Circuits

### 5.1 - Electric circuit

An electric circuit is a closed interconnected system comprising power sources (voltage or current sources), loads (such as resistors, lamps, and motors), and electrical conductors. It may also contain other devices, such as switches and fuses.

When one refers to a linear circuit, this means that all the components present in the circuit are linear. In other words, the relationships between voltage and current follow predictable behaviours, such as those described by Ohm’s law. If even one element is non-linear, the circuit is classified as non-linear.

In a direct current (DC) circuit, current flows in one direction and remains constant over time. Both current and voltage are kept at steady values, which characterises the typical behaviour of a DC circuit.

For the analytical study of an electric circuit, it is common to use a schematic representation, that is, a drawing showing all the circuit components and the way they are electrically interconnected. For this purpose, it is essential to define a standardised set of symbols that allows energy sources, conductors, loads, and other devices to be represented clearly, thus facilitating circuit analysis and understanding.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 2* (4 - 5).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 18/02/2025

### 5.2 - Branches

A branch is a set of one or more electrical components connected in series, bounded by two nodes. In electric circuits, each branch represents a unique and continuous path for the flow of electric current.

In the particular case of a circuit composed of a single branch (or mesh), there are no nodes, since all components are connected sequentially without any branching.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 2* (10).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 17/02/2025

### 5.3 - Meshes

A mesh in an electric circuit is a closed path formed by a set of components and branches, along which current may circulate without crossing the same point more than once.

Each mesh represents an independent path for current flow, which is fundamental for the application of Kirchhoff’s laws.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 2* (12).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 16/02/2025

### 5.4 - Nodes

A node in an electric circuit is a point where three or more branches are interconnected.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 2* (11).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 16/02/2025

### 5.5 - Component associations

The association of components in electric circuits may occur in two main ways: in series and in parallel.

In a series association, the components are connected sequentially, forming a single path for the electric current. Thus, all components belong to the same branch and are traversed by the same current. The equivalent resistance $(R_{eq})$ of a series association is given by the sum of the individual resistances:

$$
R_{eq} = R_1 + R_2 + R_3 + ... + R_n
$$

The total applied voltage is the sum of the individual voltages across each component, according to Ohm’s law. As a consequence, the equivalent resistance in series is always greater than any of the individual resistances.

In a parallel association, the components share the same input and output points for current, that is, the same electric voltage. However, the current divides among the different branches according to the resistance of each. The equivalent resistance is determined by the sum of the inverses of the individual resistances:

$$
\frac{1}{R_{eq}} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3} + ... + \frac{1}{R_n}
$$

As a result, the equivalent resistance in parallel is always less than any of the individual resistances.

Particular cases include:

* Two resistors in parallel:

$$
R_{eq} = \frac{R_1 R_2}{R_1 + R_2}
$$

* Several resistors of equal value in parallel:

$$
R_{eq} = \frac{R}{n}
$$

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 2* (8 - 9, 34 - 37);
* Department of Electrical Engineering; (October 2020); *FEELE Guide 3* (2 - 4).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 17/02/2025

### 5.6 - Delta-star and star-delta associations

The conversion between star $(Y)$ and delta $(\Delta)$ associations is a fundamental method in electric circuit analysis, allowing the simplification of complex circuits whose equivalent resistance cannot be determined using only series or parallel associations.

The equivalence between the two configurations is based on the fact that, for any external connection applied to the circuit nodes, the voltages and currents must remain the same in both forms. This means that the equivalent resistance between any two nodes of the star association must be the same as that between the same two nodes of the delta association.

Following this reasoning, the following expressions are derived to convert a star $(Y)$ connection into a delta $(\Delta)$ connection:

$$
R_A = \frac{R_1 R_2 + R_2 R_3 + R_3 R_1}{R_1}
$$

$$
R_B = \frac{R_1 R_2 + R_2 R_3 + R_3 R_1}{R_2}
$$

$$
R_C = \frac{R_1 R_2 + R_2 R_3 + R_3 R_1}{R_3}
$$

Using the same reasoning, to convert a delta $(\Delta)$ connection into a star $(Y)$ connection:

$$
R_1 = \frac{R_A R_B}{R_A + R_B + R_C}
$$

$$
R_2 = \frac{R_B R_C}{R_A + R_B + R_C}
$$

$$
R_3 = \frac{R_C R_A}{R_A + R_B + R_C}
$$

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 2* (41 - 47).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 18/02/2025

## 6 - Fundamental Laws of Electric Circuits

### 6.1 - Ohm’s law

Ohm’s law states that, for a metallic conductor, the electric voltage applied across its terminals is directly proportional to the electric current flowing through it. The proportionality constant in this relationship is the electrical resistance of the conductor, expressed by:

$$
R = \frac{U}{I}
$$

where:

* $R$ is the electrical resistance (in ohms, $\Omega$),
* $U$ is the electric voltage (in volts, $V$),
* $I$ is the electric current (in amperes, $A$).

A useful quantity in circuit analysis is the inverse of the resistance, $R$, known as conductance, $G$:

$$
G = \frac{1}{R}
$$

The SI unit of conductance is the siemens $(S)$ and represents the ability of an element to conduct electric current.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 2* (23 - 24).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 16/02/2025

### 6.2 - Kirchhoff’s current law

Kirchhoff’s Current Law (KCL) establishes the conservation of electric charge in a circuit, stating that:

“The algebraic sum of the currents meeting at a node is zero”, that is,

$$
\sum I = 0
$$

Consequently, it may also be stated that “The sum of the currents entering a node is equal to the sum of the currents leaving that same node”, that is,

$$
\sum I_{\text{in}} = \sum I_{\text{out}}
$$

where the currents entering the node are taken as positive and those leaving as negative (or vice versa, depending on the chosen convention).

This law is based on the conservation of electric charge, ensuring that no charge accumulates at a node.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 2* (26 - 27);
* Department of Electrical Engineering; (October 2020); *FEELE Guide 4* (2).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 17/02/2025

### 6.3 - Kirchhoff’s voltage law

Kirchhoff’s Voltage Law (KVL) is based on the principle of energy conservation in electric circuits: “Along any closed path (mesh) of an electric circuit, the algebraic sum of the electromotive forces (e.m.f.s) is equal to the algebraic sum of the voltage drops across resistances and other components.”

Mathematically:

$$
\sum E = \sum R \cdot I + \sum U
$$

Or, equivalently, “The algebraic sum of the voltages around a closed mesh is always zero”:

$$
\sum U = 0
$$

To apply the law, one first defines a direction of traversal for the mesh, which may be clockwise or counterclockwise. This choice is arbitrary, but it must be maintained throughout the analysis.

While traversing the mesh, voltages must be added algebraically, taking their signs into account. If the current crosses a resistance in the conventional direction (from higher potential to lower potential), this is considered a voltage drop and is recorded with a negative sign. Otherwise, the voltage is positive.

The mesh equation is obtained by summing all the e.m.f.s and subtracting the voltage drops across the resistors. As a result, the sum of the voltages must be equal to zero, ensuring that energy conservation is respected within the circuit. If, when solving the system of equations, any current results in a negative value, this indicates that the actual current direction is opposite to the initially assumed one.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 2* (26, 29 - 30);
* Department of Electrical Engineering; (October 2020); *FEELE Guide 4* (2).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 17/02/2025

### 6.4 - Tellegen’s theorem

Tellegen’s theorem states that, in any circuit that satisfies Kirchhoff’s Current Law and Kirchhoff’s Voltage Law, the sum of the powers of all the components in the circuit is equal to zero.

$$
\sum\limits_{k=1}^{n} P_k = \sum\limits_{k=1}^{n} U_k \cdot I_k=0
$$

In other words, it means that the total power delivered to the circuit (by voltage and current sources) is equal to the total power absorbed by the passive elements (resistors, inductors, capacitors, etc.).

$$
\sum P_{\text{delivered}} = \sum P_{\text{absorbed}}
$$

This theorem is particularly useful for validating calculations, because if, when analysing a circuit, the sum of the powers is not zero, then there is an error in the calculations.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 2* (32).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 18/02/2025

### 6.5 - Voltage dividers

In an electric circuit composed of resistors connected in series, the electric current flowing through each of them is the same, and the sum of the individual voltage drops is equal to the total voltage applied to the circuit. This behaviour follows directly from Kirchhoff’s Voltage Law.

The concept of a voltage divider arises from this property. In a set of resistors in series, the voltage drop across any one of them is equal to the product of its resistance value and the voltage applied to the set, divided by the sum of the resistance values that make up the circuit. This means that the voltage $U_i$ across a resistor $R_i$ may be calculated as a fraction of the total voltage $U$, given by the expression:

$$
U_i = U \times \frac{R_i}{R_{eq}}
$$

where $R_{eq}$ is the sum of all the series resistances:

$$
R_{eq} = R_1 + R_2 + R_3 + ... + R_n
$$

Thus, each series resistor acts as a voltage divider, establishing a fixed proportion of the total voltage applied to the circuit.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 2* (49);
* Department of Electrical Engineering; (October 2020); *FEELE Guide 3* (5).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 17/02/2025

### 6.6 - Current dividers

In a circuit composed of resistors connected in parallel, the voltage across each resistor is the same and the sum of the electric currents flowing through each resistor is equal to the total electric current, according to Kirchhoff’s Current Law. The current through each resistor is inversely proportional to its resistance value relative to the equivalent resistance of the circuit. Thus, the current $I_i$ flowing through a resistor $R_i$ may be calculated as a function of the total current $I_T$ by the expression:

$$
I_i = I_T \times \frac{R_{eq}}{R_i}
$$

where $R_{eq}$ is the equivalent resistance of the set, given by:

$$
\frac{1}{R_{eq}} = \sum_{j=1}^{n} \frac{1}{R_j}
$$

This means that resistors connected in parallel act as current dividers, distributing the total current among the branches of the circuit. The smaller the resistance of a branch, the greater the current flowing through it, and vice versa.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 2* (50);
* Department of Electrical Engineering; (October 2020); *FEELE Guide 3* (6).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 17/02/2025

## 7 - Electric Circuit Analysis Methods

### 7.1 - Equivalent resistance method

The Equivalent Resistance Method (ERM) is a circuit analysis method used to simplify resistive circuits and determine current and voltage at various points in the circuit. It is especially useful in circuits containing only one voltage or current source, since it reduces the complexity of the analysis by replacing groups of resistors with a single equivalent value.

The Equivalent Resistance Method allows one to:

* Simplify complex circuits, making it easier to calculate voltages and currents.
* Use voltage and current dividers, which help determine specific values within the circuit.
* Determine the power dissipated in each resistor and the power supplied by the source.

The procedure for simplifying circuits through the Equivalent Resistance Method may be described by the following algorithm:

1. Identify resistors in series, calculate their equivalent resistance, and replace them with that equivalent resistance;
2. Identify resistors in parallel, calculate their equivalent resistance, and replace them with that equivalent resistance;
3. Repeat the previous two steps until no more series or parallel resistor associations remain.
4. When no more series or parallel resistor associations remain, if the circuit has not yet been simplified to a single equivalent resistance, check whether there are delta $(\Delta)$ or star $(Y)$ groupings and convert one into the other to facilitate the simplification.
5. Continue the process iteratively until the circuit is reduced to a single equivalent resistance.

However, this method has limitations. When the circuit contains multiple sources or a large number of nodes and branches, the ERM becomes impractical. In such cases, more advanced analysis methods are used, such as the superposition theorem, the branch current method, the nodal voltage method, or the mesh current method.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 2* (54 - 56);
* Nuno Rodrigues, André Rocha, Mário Alves, Lino Sousa and Francisco Pereira; (July 2023); *U=RIsolve APP Equivalent Impedance Determination Module*.

**Validation**: João Ferreira

**Version**: 1.1

**Last update**: 11/03/2025

### 7.2 - Superposition theorem

The Superposition Theorem makes it possible to determine voltages and currents at any point in a circuit containing multiple voltage and/or current sources. This theorem is based on the linearity property of circuits, which ensures that the total effect on any circuit element may be obtained by summing the individual effects of each source considered separately.

Applying the Superposition Theorem consists of analysing separately the influence of each source in the circuit, replacing the others by their internal impedances. In the case of ideal sources, ideal voltage sources, which have zero internal resistance, are replaced by a short circuit, while ideal current sources, whose internal resistance is infinite, are replaced by an open circuit.

The Superposition Theorem is useful when one wishes to evaluate the impact of the variation of a single source on the circuit behaviour without having to repeat the entire system analysis. This method facilitates the interpretation of complex circuits and aids in the study of circuits containing multiple sources with different frequencies under alternating current (AC) conditions. For AC circuits, applying the theorem requires that all sources have the same frequency; otherwise, the contributions would lie in different complex planes (phasors rotating with different angular velocities), and the reactances/impedances would also be different because they depend on frequency. In this sense, this method may be very useful for studying circuits containing AC sources (voltage and/or current) with different frequencies, since it allows the individual contribution of each source to be analysed using the Steinmetz transform in each partial circuit, which would be impossible in the original circuit.

To apply the Superposition Theorem, the following steps must be followed:

1. Create partial circuits, where each partial circuit contains only one active source, replacing the remaining sources by their internal impedance.
2. Analyse each partial circuit by applying appropriate methods, such as Kirchhoff’s laws, Ohm’s law, or other circuit analysis methods, in order to determine the partial voltages and currents.
3. Sum the partial contributions, considering that the partial currents in a given branch are added to obtain the actual current, and the partial voltages at a given node or component are added to determine the actual voltage.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 3* (4 - 5);
* Department of Electrical Engineering; (November 2021); *FEELE Guide 8* (2 - 3);
* André Rocha; *Planned Individual Study - Electric Circuit Analysis* (9 - 10).

**Validation**: João Ferreira

**Version**: 1.1

**Last update**: 12/03/2025

### 7.3 - Branch current method

The Branch Current Method (BCM) is based on the direct application of Kirchhoff’s Voltage Law and Kirchhoff’s Current Law, according to a well-defined algorithm, in order to systematise its application to any circuit. The unknowns to be determined are the currents $(I_1, I_2, \dots, I_R)$ flowing through all the branches of the circuit. From these currents, the voltage drops across any circuit element may be calculated.

If there are known currents $(C$ — the variable corresponding to the number of branches containing ideal current sources and/or known currents$)$, the number of unknowns is reduced accordingly (also by $C$). When ideal current sources are present, it becomes necessary to choose meshes that do not pass through the branches containing those sources. It should be noted that, although the branch current is known, the voltage drop across the source is unknown, thus introducing an additional unknown. In this situation, the total number of equations (and unknowns) becomes $R - C$.

The algorithm must be carried out according to the following steps:

1. Count and identify the $R$ branches, $N$ nodes, and $C$ ideal current sources in the circuit and, from these, calculate the number of required meshes $M$ using $M=R-C-(N-1)$;
2. Mark the branch currents $(I_1, I_2, \dots, I_R)$ with arbitrarily chosen directions;
3. Based on the assumed directions in the previous step, construct $N-1$ linearly independent equations (one for each node, leaving one node out), according to Kirchhoff’s Current Law;
4. Select, identify, and draw the linearly independent meshes in the circuit diagram (if there are current sources, the selection must follow the rule stated above), assigning a traversal direction so as to cover all branches/components of the circuit except the branches containing current sources (if any);
5. Based on the assumed directions from the previous step, construct the $M$ linearly independent equations according to Kirchhoff’s Voltage Law;
6. Solve the system of equations, that is, determine the current in each branch. If the calculated current for a given branch is negative, this means that the actual current direction in that branch is opposite to the initially assumed one. If necessary, the voltage across each component/node may be determined through Ohm’s law and/or Kirchhoff’s Voltage Law.

The BCM allows any circuit to be analysed. However, if the number of branches $(R)$ is large, it requires solving a system with many $M_{\text{equations}}$, and in some cases it may be less laborious to solve the circuit using other analysis methods.

##### Metadata

**Sources**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 3* (8 - 13);
* *Preparation FEELE Guide 5* (3);
* André Rocha, Mário Alves, Lino Sousa, Franscisco Pereira; (10 November 2022, v1.4); *General Methods for Electric Circuit Analysis* (7).

**Validation**: João Ferreira

**Version**: 1.1

**Last update**: 24/02/2025

### 7.4 - Mesh current method

The Mesh Current Method (MCM) is based on Kirchhoff’s Voltage Law, where the unknowns are the currents associated with the linearly independent meshes of the circuit. These currents are fictitious, that is, they do not directly represent physical quantities present in the circuit, but instead serve as intermediate unknowns that reduce the number of equations required to solve the system.

The actual branch currents are obtained at a later stage by taking the algebraic sum of the mesh currents flowing through each branch. The basic system equation is given by $M=R-(N-1)$, where $R$ represents the number of branches and $N$ the number of nodes. When the circuit contains ideal current sources or branches with already known currents, the system is adjusted to $M=R-(N-1)-C$, where $C$ is the number of current sources, and each source must belong to a single auxiliary mesh, while the remaining meshes, called principal meshes, must cover all branches without ideal current sources. For the systematic application of the method, the following algorithm is used:

1. Count and identify the $R$ branches and the $N$ nodes of the circuit, calculating the number of principal meshes using the equation $M=R-(N-1)-C$;
2. Select and mark $C$ auxiliary meshes, each of them passing through a single current source (or a branch whose current is previously known), assigning to the mesh current the value of that source current and, preferably, its direction (if the direction is opposite, the mesh current becomes negative);
3. Identify and mark graphically the remaining $M$ meshes, assigning an arbitrary direction to each fictitious mesh current $(I_{M_1},I_{M_2}, \dots, I_{M_M})$, so that all meshes cover the circuit branches, excluding those containing current sources;
4. Construct the $M$ mesh equations using Kirchhoff’s Voltage Law, taking into account the influence of the mesh currents on each load;
5. Solve the system of $M$ equations to determine the mesh currents $(I_{M_1},I_{M_2}, \dots, I_{M_M})$;
6. Assign an arbitrary direction to the branch currents $(I_1, I_2, \dots, I_R)$;
7. Calculate the actual branch currents by taking the algebraic sum of the mesh currents that pass through them, adding those that have the same direction as the assumed branch current and subtracting those with the opposite direction.

In this way, the mesh current method makes it possible to obtain a complete solution of the circuit by transforming the problem into a system with fewer equations and unknowns, making the analysis especially efficient for complex circuits.

When the circuit contains only ideal voltage sources, the method may be applied without modifications; however, the presence of current sources requires the application of the adaptations described above, resulting in a more simplified approach directed toward obtaining the values of the branch currents.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 3* (15 - 22).
* André Rocha, Mário Alves, Lino Sousa, Franscisco Pereira; (10 November 2022, v1.4); *General Methods for Electric Circuit Analysis* (10 - 12).

**Validation**: João Ferreira

**Version**: 1.1

**Last update**: 12/03/2025

### 7.5 - Nodal voltage method

The Nodal Voltage Method (NVM) is a circuit analysis technique based on Kirchhoff’s Current Law (KCL), in which the unknowns of the system are the node voltages relative to a reference node, normally called “ground”, whose potential is assumed to be $0,V$. The potential values at the remaining $N-1$ nodes (or $N-1-T$, if there are $T$ branches composed exclusively of voltage sources) are obtained by solving a system of linearly independent algebraic equations.

This method is useful for circuits that do not contain “isolated voltage sources”; if such sources exist, they define known voltage relationships between the nodes involved.

To apply the nodal voltage method, the following algorithm must be followed:

1. Identify the fundamental variables:
   1.1. For each branch of the circuit:

   * Identify the current and assign it a symbol $(I_1, I_2, I_3, \dots)$;
   * Assign an arbitrary direction to each current;
   * Mark each current in the circuit (with its identifier and direction).
     1.2. For each node of the circuit:
   * Identify the node voltage and assign it a symbol $(U_A, U_B, U_C, \dots)$;
   * Mark each voltage in the circuit (with its identifier).
     1.3. Identify and record the number of isolated voltage sources $(T)$:
   * **Notes:**

     * If there is more than one ideal voltage source connected in series in the same branch, they must be grouped and treated as a single equivalent isolated voltage source;
     * The isolated voltage sources $(IVS)$ should be recorded as a set, $IVS={E_X, E_Y}$
   * If $T=0$ (no isolated voltage source):

     * Select one of the nodes as the reference (ground), defining its voltage as $0,V$;
     * Mark this node in the circuit with the ground symbol;
     * After completing procedure 1, proceed directly to procedure 3 (skip procedure 2 — “Identify the supernodes”, since none exist).
   * If $T=1$:

     * Fix the reference node at one of the two nodes connected to the isolated voltage source.
   * If $T \ge 2$:

     * Check whether there are branches with isolated voltage sources connected among themselves, and in that case group them and select the largest group (if more than one exists) as the grounded supernode.
       1.4. Calculate and record the number of Kirchhoff’s Current Law equations that will be required to construct the system of equations, given by $(N-1-T)$.

2. Identify the supernodes and the voltage relationships between the nodes:
   2.1. Identify and record the grounded supernode $(SN_G)$ (the only supernode connected to ground) and the voltages of its nodes:

   * The nodes (2 or more) that form the supernode may be presented as a set, for example, $SN_G={U_A,U_B}$.
   * Write the equations relating the voltages between each pair of nodes in this supernode (the voltage equations of the grounded supernode are not part of the system, since the node voltages may be determined a priori).
     2.2. Identify and record all floating supernodes $(SN_F)$ and their corresponding voltage-relation equations:
   * For each floating supernode:

     * Identify the nodes that compose it (2 or more) and assign an index $(SN_{F1} = {U_A, U_B}, SN_{F2} = {U_E, U_F, U_G})$
     * Choose a reference node within each floating supernode.
     * Write the equations relating the voltages between the nodes, using the chosen reference node.

3. Write the Kirchhoff’s Current Law equations $(N-1-T)$ in terms of the node voltages:
   3.1. Write the $(N-1-T)$ KCL equations using the branch currents $(I_1, I_2, I_3, \dots)$;
   3.2. For each circuit branch $(I_x)$:

   * If the branch contains more than one impedance connected in series (including the internal impedance of one or more voltage sources), combine all impedances into a single equivalent impedance, $Z_{xeq}$.
   * If the branch contains more than one voltage source connected in series, combine them into a single equivalent voltage source, $E_{xeq}$.
   * Write the branch current as the ratio between the branch voltage (obtained from the difference between the potential before and after the equivalent impedance) and the equivalent impedance (according to Ohm’s law).

     * **Note:** it is important to take into account the current direction assumed in procedure 1;
     * **Note:** if the current belongs to a branch of a supernode (the branch has no impedance), Ohm’s law cannot be used and that current will not have its own equation. Instead, it will be determined at the end from the remaining currents;
     * **Note:** if the current belongs to a branch containing a current source, its value is automatically known and Ohm’s law may be discarded.
       3.3. Rewrite the $(N-1-T)$ KCL equations (as in the first step of procedure 3), replacing the currents by their own equations.

4. Calculate the voltages at each node:
   4.1. Substitute the voltages of each floating supernode by the corresponding expression in terms of its reference voltage and rewrite the $(N-1-T)$ KCL equations;
   4.2. Solve the system of equations and obtain the numerical values of the node voltages $(U_A=\dots, U_B=\dots, U_C=\dots)$.

5. **(Optional)** Calculate the branch currents:
   5.1. Use the equations written in procedure 3 to calculate the numerical values of the currents in each branch of the circuit.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 3* (25 - 33);
* Department of Electrical Engineering; (November 2021); *FEELE Guide 8* (3 - 4);
* Lino Sousa, André Rocha, Mário Alves and Francisco Pereira; (March 2021); *Revisiting the nodal voltage method for both human comprehension and software implementation: Towards a teaching/self-learning simulation tool* (1647 - 1648).

**Validation**: João Ferreira

**Version**: 1.1

**Last update**: 13/03/2025

## 8 - Electric Circuit Simplification Theorems

### 8.1 - Thévenin’s theorem

Thévenin’s theorem states that any linear two-terminal circuit may be represented by an equivalent circuit consisting of an ideal voltage source $(U_{Th})$ in series with an equivalent resistance $(R_{Th})$. This simplifies circuit analysis, allowing the behaviour of loads connected to the circuit to be studied without considering its internal complexity.

Determining the Thévenin equivalent circuit involves two main steps:

1. **Calculation of the Thévenin voltage** $(U_{Th})$: this is the open-circuit voltage measured across the terminals of the two-terminal network.
2. **Calculation of the Thévenin resistance** $(R_{Th})$: obtained by replacing all independent sources in the circuit by their equivalents:

   * Independent voltage sources $\rightarrow$ short circuit.
   * Independent current sources $\rightarrow$ open circuit.
   * Then, the total resistance seen from the terminals is calculated.

A Wheatstone bridge may be balanced or unbalanced, depending on the relationship between its resistances. In the unbalanced case, current flows through the galvanometer $(I_G)$, which requires the simplification of the circuit using Thévenin’s theorem.

The simplification procedure involves:

* Determining the equivalent resistance $(R_{Th})$ seen from the branch where the galvanometer is connected.
* Calculating the equivalent voltage $(U_{Th})$ across the galvanometer terminals.
* Using the relation:

$$
I_G = \frac{U_{Th}}{R_{Th} + R_G}
$$

where $R_G$ is the internal resistance of the galvanometer.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 3* (38 - 42).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 19/02/2025

### 8.2 - Norton’s theorem

Norton’s theorem states that any linear two-terminal circuit may be represented by an equivalent circuit consisting of an ideal current source $(I_{N})$ in parallel with an equivalent resistance $(R_{N})$.

Determining the Norton equivalent circuit involves two main steps:

1. **Calculation of the Norton current** $(I_{N})$: this is the short-circuit current between the terminals of the two-terminal network.
2. **Calculation of the Norton resistance** $(R_N)$: obtained by suppressing all independent sources and determining the total resistance seen from the terminals.

Norton’s theorem and Thévenin’s theorem are equivalent, and one may be converted into the other through the relations:

$$
U_{Th} = I_N \cdot R_N
$$

$$
R_N = R_{Th}
$$

This equivalence facilitates the analysis and simplification of electric circuits.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 3* (43).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 19/02/2025

### 8.3 - Maximum power transfer theorem

In many practical situations, a circuit is designed to deliver power to a load, and it is desirable to maximise the power delivered to that load. The Maximum Power Transfer Theorem makes it possible to determine the ideal conditions for this to occur by using the Thévenin equivalent.

For a given circuit represented by its Thévenin equivalent, with a Thévenin voltage $(U_{Th})$ and an internal resistance $(R_{Th})$, the power delivered to the load $(R_L)$ is given by:

$$
P_L=R_L \cdot I^2 = R_L\left(\frac{U_{Th}}{R_{Th}+R_L}\right)^2
$$

To determine the load that maximises the received power, it is necessary to differentiate the power equation with respect to $R_L$ and find its maximum value. After carrying out this calculation, one arrives at the conclusion that:

$$
R_L = R_{Th}
$$

That is, the power transferred to the load is maximum when the load resistance is equal to the Thévenin resistance seen at the load terminals $(R_L = R_{Th})$.

When this condition is satisfied, the maximum power transferred to the load is given by:

$$
P_{Lmax} = \frac{U_{Th}^2}{4 R_{Th}}
$$

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 3* (46 - 49).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 8.4 - Millman’s theorem

Millman’s theorem states that a circuit containing multiple voltage sources in parallel may be simplified into a single equivalent voltage source associated with an equivalent resistance, where:

$$
E_{eq} = \frac{G_1 E_1 + G_2 E_2 + ... + G_k E_k}{G_1 + G_2 + ... + G_k}
$$

where $G$ represents conductance, which is the inverse of the resistance, given by:

$$
G=\frac{1}{R}
$$

The equivalent conductance of the circuit is obtained by summing the individual conductances:

$$
G_{eq} = G_1 + G_2 + ... + G_k
$$

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 3* (51).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 8.5 - Substitution theorem

If the voltage or current of any branch in a circuit is known, that branch may be replaced by any combination of elements, provided that the voltage and current remain the same in the branch.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 3* (53).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 8.6 - Reciprocity theorem

In a circuit, if a voltage source in branch $A$ produces a current in any other branch $B$, then the same voltage source acting in branch $B$ would produce the same current in branch $A$.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *FEELE Slides Chapter 3* (55).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

## 9 - Fundamental Concepts of Sinusoidal Alternating Quantities

### 9.1 - Sinusoidal alternating current

Physical quantities may be classified according to their behaviour over time as either constant or variable.

* **Constant or steady quantities** are those that do not vary over time; this implies that the signal is constant and is obtained from cells, batteries, dynamos, voltage sources, rectification of alternating current, etc.
* **Variable quantities** are quantities whose electron flow occurs in both directions and varies over time. These variations may be:

  * **Non-periodic**, when the signal does not repeat over time, such as radio and television signals, (electromagnetic) noise, sensor signals, etc.
  * **Periodic**, when the signal varies in the same way and repeats over time, and may be subdivided into:

    * **Pulsating**, which contain a non-zero average value.
    * **Pure alternating**, which contain a zero average value, as in the case of sinusoidal alternating current (AC), obtained from alternators, power electronic converters, and signal generators.

Alternating current presents some advantages over direct current:

* Voltage transformation is easier, since transformers are used both to step up and step down voltage, whereas direct current requires electronic converters with relatively limited power;
* Alternators (AC generators) are simpler, require less maintenance, and have better efficiency than dynamos (DC generators);
* AC motors are better than DC motors, particularly induction motors (three-phase), which are simpler, more efficient, and require less maintenance.
* It increases the efficiency of power transmission, because when higher voltages are used, the current decreases, thereby reducing thermal losses (due to the Joule effect).

Sinusoidal alternating current is a waveform with smooth and continuous variation, following a sine function, expressed by:

$$
i(t) = I_m \cdot \sin(\omega t + \theta)
$$

where:

* $i(t)$ is the instantaneous value of the current;
* $I_m$ is the maximum (or peak, $I_p$) current value;
* $\omega$ is the angular frequency, measured in rad/s;
* $\theta$ is the initial phase angle (angle at $t=0$).

In addition:

* The **period** $(T)$ is the time required to complete one cycle of the waveform, measured in seconds.
* The **frequency** $(f)$ is the number of cycles per second, expressed in hertz (Hz), and is the inverse of the period.
* The **angular frequency** $(\omega)$ is given by:

  $$
  \omega = 2 \pi f = \frac{2 \pi}{T}
  $$

##### Metadata

**Source**:

* Francisco Pereira, Mário Alves and Ana Viana; (March 2022); *TCIRC Slides Chapter 1* (4 - 9).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 9.2 - Average value

The average value of a quantity $x(t)$ that varies over time is the constant value representing the amount of energy or charge transferred during one complete cycle of the quantity, and it is calculated by integrating over one period of the cycle and dividing by that same period.

This average value is commonly used in voltage and current measurements, and the same reasoning applies to both.

For a periodic quantity $x(t)$, the average value $X_{avg}$ is given by:

$$
X_{avg} = \frac{1}{T} \int_0^T x(t) , dt
$$

where:

* $x(t)$ is the quantity being analysed (voltage, current, etc.);
* $T$ is the period (the time required to complete one cycle, in seconds);
* The integral $\int_0^T x(t),dt$ calculates the sum of the values of $x(t)$ over one complete cycle.

For an alternating quantity, in the case of a sinusoidal waveform, the average value over a complete cycle is zero due to the positive and negative symmetry of the waveform.

For a direct (constant) quantity, the average value is equal to the constant value itself, since it does not vary over time.

For another non-sinusoidal alternating quantity (such as square, triangular, or other waveforms), the average value depends on the exact shape of the signal and may be positive, negative, or zero depending on the distribution of values during the cycle.

##### Metadata

**Source**:

* Francisco Pereira, Mário Alves and Ana Viana; (March 2022); *TCIRC Slides Chapter 1* (10).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 9.3 - RMS value

The RMS value of a quantity is a measure that describes the value an alternating quantity would have if it were replaced by a direct quantity dissipating the same amount of energy. In simple terms, the RMS value is a more direct way of comparing an alternating quantity with a constant quantity that would have the same thermal or energetic effect.

The RMS value of a quantity $x(t)$ is given by:

$$
X_{\text{rms}} = \sqrt{\frac{1}{T} \int_0^T x^2(t) , dt}
$$

where:

* $T$ is the period of the quantity;
* $x(t)$ may be a current or voltage function.

For a direct quantity, the RMS value is equal to the value of the quantity itself, since it is constant over time.

For a sinusoidal alternating quantity $x(t)$, the RMS value may be simplified as:

$$
X_{\text{rms}} = \frac{X_{\text{max}}}{\sqrt{2}}
$$

where $X_{\text{max}}$ is the maximum value of the alternating quantity.

For non-sinusoidal waveforms (such as square, triangular, etc.), the RMS value is calculated using the general formula, and the waveform shape influences the result.

When measurements are performed in alternating current, the value indicated by voltmeters and ammeters (and sampling oscilloscopes) is the RMS value, unless another value is explicitly selected or stated.

When the signals being measured are not purely sinusoidal, True RMS (TRMS) instruments must be used.

When a voltage or current value is stated in alternating current, it is always understood to be the RMS value unless another value is explicitly mentioned (e.g. maximum/peak value or peak-to-peak value).

##### Metadata

**Source**:

* Francisco Pereira, Mário Alves and Ana Viana; (March 2022); *TCIRC Slides Chapter 1* (11 - 13).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 9.4 - Complex numbers

Complex numbers are essential in AC circuit analysis because they make it possible to represent quantities such as voltage and current that vary sinusoidally with time. The use of complex numbers facilitates the treatment of differential equations, simplifying operations such as multiplication, division, and exponentiation.

In electrical engineering, the symbol “j” is used instead of “i”, to avoid confusion with the symbol for electric current. The “j” may appear before or after the numerical value $(4j=j4)$. The conjugate of a complex number may be represented by an overbar $(\bar{\ })$ or by an asterisk $(^*)$. In TCIRC, the asterisk $(^*)$ is always used.

There are three ways to represent a complex number:

1. **Rectangular or Cartesian form**, given by:

   $$
   z = x+yj
   $$

   where:

   * $x$ is the real part,
   * $y$ is the imaginary part,
   * $j$ is the imaginary unit $(j=\sqrt{-1})$.
2. **Polar form**, which represents the complex number in terms of its modulus and angle, expressed by:

   $$
   z=r \angle \theta
   $$

   where:

   * $r$ is the modulus,
   * $\theta$ is the angle (normally expressed in degrees).
3. **Exponential form**, which uses Euler’s formula and is expressed by:

   $$
   z=re^{j \theta}
   $$

   where:

   * $r$ is the modulus,
   * $\theta$ is the angle (normally expressed in radians).

It is possible to convert from rectangular form to polar/exponential form and vice versa; converting between polar and exponential form only requires changing the way the angle is expressed.

* **From rectangular to polar/exponential**, the angle is obtained by:

  $$
  \theta = \arctg \left (\frac{y}{x} \right )
  $$

  and the modulus by:

  $$
  r = \sqrt{x^2 + y^2}
  $$

* **From polar/exponential to rectangular**, the real part is obtained by:

  $$
  x=r \cos (\theta)
  $$

  and the imaginary part by:

  $$
  y=r \sin (\theta)
  $$

It is also possible to perform mathematical operations with complex numbers. Addition and subtraction are easier in rectangular form, whereas multiplication and division are easier in polar/exponential form.

**Addition and subtraction** (easier in rectangular form):

Addition:

$$
z_1 + z_2 = (x_1 + x_2) + (y_1 + y_2)j
$$

Subtraction:

$$
z_1 - z_2 = (x_1 - x_2) + (y_1 - y_2)j
$$

**Multiplication** (easier in polar/exponential form):

$$
z_1 \cdot z_2 = r_1 \cdot r_2 \angle (\theta_1 + \theta_2)
$$

**Division** (easier in polar/exponential form):

$$
\frac{z_1}{z_2} = \frac{r_1}{r_2} \angle (\theta_1 - \theta_2)
$$

Other operations may also be performed with complex numbers, such as:

**Conjugate**:

$$
z^*_1 = x_1-y_1j=r_1 \angle -\theta_1
$$

**Square root**:

$$
\sqrt{z_1} = \sqrt{r_1} \angle (\theta_1/2)
$$

**Exponentiation**:

$$
z_1^n = r_1^n \angle n\theta_1
$$

**Multiplication by $j$**:

$$
j \cdot z_1 = 1 \angle 90^\circ \cdot r_1 \angle \theta_1 = r_1 \angle(\theta_1 + 90^\circ)
$$

**Division by $j$**:

$$
\frac{z_1}{j} = \frac{r_1 \angle{\theta_1}}{1 \angle{90^\circ}}=r_1 \angle{(\theta_1 - 90^\circ)}
$$

##### Metadata

**Source**:

* Francisco Pereira, Mário Alves and Ana Viana; (March 2022); *TCIRC Slides Chapter 1* (14 - 16).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 9.5 - Steinmetz transform

The Steinmetz transform, or symbolic representation, allows a time-varying quantity in the time domain to be represented by an invariant complex number, which is extremely useful in AC circuit analysis.

It makes it possible to define a one-to-one correspondence between sinusoidal alternating quantities:

$$
i(t) = \sqrt{2} I \sin{(\omega t + \theta)}
$$

and vectors in the complex plane:

$$
\underline{I} = Ie^{j \theta} = I \angle{\theta}
$$

The Steinmetz transform may only be used for quantities with the same angular frequency.

The transform of a sum is equal to the sum of the transforms.

Differentiation with respect to time of sinusoidal alternating quantities, in symbolic notation (multiplication by $j$):

$$
\underline{I}'=j \omega \underline{I}
$$

Integration with respect to time of sinusoidal alternating quantities, in symbolic notation (division by $j$):

$$
\underline{I}^P=\frac{1}{j \omega} \underline{I}
$$

##### Metadata

**Source**:

* Francisco Pereira, Mário Alves and Ana Viana; (March 2022); *TCIRC Slides Chapter 1* (17 - 22).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

## 10 - Single-Phase Alternating Current Circuits

### 10.1 - Laws and methods for alternating current circuits

In alternating current (AC) circuits, the laws and analysis/simplification methods are basically the same as those used in direct current (DC), with the fundamental difference that the quantities (voltage, current, etc.) are treated in the complex domain.

Ohm’s law in AC retains the same form as in DC, but with the introduction of the concept of impedance $(\underline{Z})$, which represents opposition to the flow of AC and has a real part (resistance, $R$) and an imaginary part (reactance, $X$, which may be inductive or capacitive). The relationship between voltage $(\underline{U})$ and current $(\underline{I})$ is expressed as:

$$
\underline{Z} = \frac{\underline{U}}{\underline{I}}
$$

This concept of impedance does not exist in DC and is fundamental for the analysis of AC circuits.

Kirchhoff’s laws (Current Law and Voltage Law) may also be applied in AC, but in vector or complex form, since the quantities in the AC domain are complex numbers.

* In Kirchhoff’s Current Law (KCL), the sum of the currents (transformed quantities) entering and leaving a node is zero.
* In Kirchhoff’s Voltage Law (KVL), the sum of the voltages around a closed mesh is equal to zero. That is, the sum of the e.m.f.s (electromotive forces) is equal to the sum of the voltage drops across all the elements in the mesh.

In DC circuits, voltage and current are constant, do not vary with time, and the concept of “phase” (phase shift) does not exist.

In AC circuits, voltage and current vary continuously with time, and the inductive and capacitive characteristics of the loads lead to a phase shift between voltage and current — the concept of “phase” — which implies that voltages/currents are not synchronised, that is, positive/negative maxima and zero crossings occur at different instants.

In series, the equivalent impedance is given by the vector sum of the impedances $(\underline{Z})$, and in parallel it is given by the vector sum of the admittances $(\underline{Y})$, where admittance is the inverse of impedance.

It is worth noting that, unlike DC, in AC the equivalent impedance of a series association is not necessarily greater than any of the associated impedances, and the equivalent impedance of a parallel association is not necessarily smaller than any of the associated impedances, since the associated impedances may have reactances of opposite signs.

All the remaining theorems, rules, and methods may be generalised to AC.

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (3 - 5).
* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (98 - 101).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 10.2 - Components in alternating current

In alternating current (AC) circuits, the behaviour of components such as resistors, coils, and capacitors changes, mainly due to the concepts of phase, impedance, reactance, and interaction with the signal frequency.

In a purely resistive circuit, the current $i(t)$ may be calculated from the voltage $u(t)$ using Ohm’s law, and vice versa, or by using the Steinmetz transform. In such circuits, current and voltage are in phase.

The average power in a resistor is given by $P=U \cdot I$, where $U$ and $I$ are the RMS values of voltage and current, respectively.

The frequency of the power is twice the frequency of the current and voltage.

In a purely inductive circuit, the voltage is in leading quadrature with respect to the current, that is, the voltage leads the current by 90 degrees, or, in the time domain, the voltage reaches its maximum value one quarter of a period before the current.

$$
\underline{U}=j \omega L\underline{I} = jX_L \underline{I} = \underline{X_LI}
$$

At zero frequency (DC), $X_L = 0$ (short circuit). As the frequency tends to infinity, $X_L \to \infty$ (open circuit).

The RMS value of the voltage is equal to the product of the RMS current value and the inductive reactance $X_L$.

The average power in an ideal coil is zero. An ideal coil does not consume energy: in the time intervals when the power is positive $(u(t)$ and $i(t)$ with the same sign$)$, the coil receives/stores energy; when the power is negative $(u(t)$ and $i(t)$ with opposite signs$)$, the coil releases energy, operating alternately as a load or as a source.

The frequency of the power is twice the frequency of the current and voltage.

In a purely capacitive circuit, the voltage is in lagging quadrature with respect to the current, that is, the voltage lags the current by 90 degrees, or, in the time domain, the voltage reaches its maximum value one quarter of a period after the current.

$$
\underline{U}= \frac {\underline{I}}{j \omega C} = -jX_C \underline{I} = \underline{X_CI}
$$

At zero frequency (DC), $X_C \to \infty$ (open circuit). As the frequency tends to infinity, $X_C = 0$ (short circuit).

The RMS value of the voltage is equal to the product of the RMS current value and the capacitive reactance $X_C$.

The average power in an ideal capacitor is zero. An ideal capacitor does not consume energy: in the intervals when the power is positive $(u(t)$ and $i(t)$ with the same sign$)$, the capacitor receives/stores energy; when the power is negative $(u(t)$ and $i(t)$ with opposite signs$)$, the capacitor supplies energy, operating alternately as a load or as a source.

The frequency of the power is twice the frequency of the current and voltage.

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (6 - 17).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 10.3 - Magnetisation and demagnetisation of a coil

The magnetisation of a coil consists of causing the coil to store energy by creating a magnetic field inside it.

After steady-state conditions are reached, the circuit current attains its maximum value and the voltage across the coil terminals becomes zero.

It is possible to analyse the magnetisation and demagnetisation of the coil by means of a series RL circuit and a switch that either connects the voltage source to the components or isolates it, leaving the components connected only to each other.

To magnetise the coil, the resistor and the coil must be connected in series with the power source. In this way, the voltage across the coil terminals and the current flowing in the circuit vary with time: the voltage across the coil decreases from a maximum value to 0, and the current increases from 0 to a maximum value. At that moment (when it reaches the maximum value), the coil behaves as a short circuit (under DC conditions).

Applying Kirchhoff’s Voltage Law to the circuit gives:

$$
E=u_R(t) + u_L(t)=R \cdot i(t) + u_L(t)
$$

where $i(t)$ is given by:

$$
i(t) = \frac{E}{R}(1-e^{-t/\tau})
$$

where $\tau$ is the time constant $(s)$ and is defined as:

$$
\tau= \frac{L}{R}
$$

and the value of $u_L(t)$ may be calculated as:

$$
u_L(t) = E \cdot e^{-t/\tau}
$$

The time constant may be interpreted as the time after which the current has reached 63.2% of its final value and the voltage across the coil has dropped to 36.8% of its initial value.

In practice, coil magnetisation is considered complete after $5 \tau$ (error $< 1%$).

If the initial current is different from zero, the general expressions for current and voltage are:

$$
i(t) = I_i + (I_f - I_i)(1-e^{-t/\tau})= I_f - (I_f - I_i) e^{-t/\tau}
$$

and:

$$
u_L(t) = R(I_f - I_i) e^{-t/\tau}
$$

The energy stored in a coil after magnetisation results from the magnetic field inside the coil and is given by:

$$
W=\frac{1}{2}LI_f^2
$$

To demagnetise the coil, the coil and the resistor must be isolated from the power source (by actuating the switch). In this way, during demagnetisation the current decreases to 0 and the energy stored in the coil is dissipated in the resistor (by the Joule effect).

Applying Kirchhoff’s Voltage Law to the circuit gives:

$$
u_L(t) + u_R(t)= u_L(t) + R \cdot i(t) = 0
$$

where $i(t)$ is given by:

$$
i(t)=I_i e ^{-t/\tau}
$$

and the value of $u_L(t)$ may be calculated as:

$$
u_L(t)=-U_{Li} e^{-t/\tau}
$$

The current and voltage have opposite signs because the coil is supplying energy (behaving as an active element), and, as a rule, demagnetisation is considered complete after $5 \tau$.

The same expressions used for magnetisation are also used to calculate $i(t)$ and $u_L(t)$; however, it is important to note that the initial and final current values differ in each case.

##### Metadata

**Source**:

* Mário Alves and Francisco Pereira; (March 2024); *TCIRC Slides Chapter 4* (18 - 31).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 10/03/2025

### 10.4 - Charging and discharging of a capacitor

Charging a capacitor consists of storing electric charge and energy, thereby creating a potential difference between its plates.

Once fully charged, the capacitor will retain the stored charge as long as there is no closed path through which it can discharge. To discharge the capacitor, it is sufficient to connect its plates through a resistive circuit.

The charging and discharging of a capacitor may be analysed by means of a series RC circuit with a switch that either connects the voltage source to the circuit or isolates it, allowing interaction only between the components.

When the circuit is closed, the voltage across the capacitor terminals and the current flowing in the circuit vary with time. The capacitor voltage increases from 0 to the maximum value $E$, while the current starts at a maximum value and decays to zero. At that point, the capacitor behaves as an open circuit under direct current (DC) conditions.

Applying Kirchhoff’s Voltage Law to the circuit gives:

$$
E = u_R(t) + u_C(t) = R \cdot i(t) + u_C(t)
$$

where $u_C(t)$ is given by:

$$
u_C(t) = E(1-e^{-t/\tau})
$$

where $\tau$ is the time constant $(s)$ and is defined as:

$$
\tau= RC
$$

and the value of $i(t)$ may be calculated as:

$$
i(t) = \frac{E}{R} \cdot e^{-t/\tau}
$$

The time constant may be interpreted as the time after which the voltage has reached 63.2% of its final value and the current has decreased to 36.8% of its initial value.

In practice, the capacitor is considered fully charged after $5 \tau$ (error $< 1%$).

If the capacitor has an initial charge different from zero, the general expressions for voltage and current are:

$$
u_C(t) = U_{Ci} + (U_{Cf} - U_{Ci}) \left(1 - e^{-t/\tau} \right)
$$

and:

$$
i(t) = \frac{U_{Cf} - U_{Ci}}{R} e^{-t/\tau}
$$

The energy stored in the capacitor after charging is given by:

$$
W = \frac{1}{2} C U_{Cf}^2
$$

To discharge the capacitor, it is sufficient to isolate the power source, allowing the capacitor and resistor to remain connected to each other. During discharge, current flows through the circuit and the energy stored in the capacitor is dissipated in the resistor by the Joule effect.

Applying Kirchhoff’s Voltage Law gives:

$$
u_C(t) + u_R(t) = u_C(t) + R \cdot i(t) = 0
$$

where $u_C(t)$ is given by:

$$
u_C(t)=U_{Ci} e ^{-t/\tau}
$$

and the value of $i(t)$ may be calculated as:

$$
i(t)=-\frac{U_{Ci}}{R} e^{-t/\tau}
$$

The current is negative because its direction is opposite to that during charging.

In practice, capacitor discharge is considered complete after $5 \tau$, at which point both voltage and current are practically zero.

The expressions for capacitor charging may be used in general for both charging and discharging, provided that the appropriate values of $U_{Ci}$ and $U_{Cf}$ are used.

##### Metadata

**Source**:

* Mário Alves and Francisco Pereira; (March 2024); *TCIRC Slides Chapter 3* (19 - 32).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 10/03/2025

### 10.5 - Series RLC circuits

A series RLC circuit is a single-mesh circuit containing all types of passive elements (resistor, coil, and capacitor) connected in series. In such a circuit, the current is the same through all components.

$$
i(t)= \sqrt{2} I \sin(\omega t + \theta)
$$

From this, it is possible to determine the voltage across each passive component. Through Kirchhoff’s Voltage Law and the properties of the Steinmetz transform, it is known that the total voltage is given by:

$$
\underline{U} = \underline{U_R} + \underline{U_L} + \underline{U_C}
$$

with $\underline{U_R}=R \underline{I}$, $\underline{U_L} = j \omega L \underline{I}$, and $\underline{U_C} = \underline{I}/(j \omega C)$, yielding:

$$
\underline{U}=(R+j \omega L - \frac{j}{\omega C}) \times \underline{I}
$$

According to Ohm’s law, it may also be deduced that the equivalent impedance of the series circuit is:

$$
\underline{Z} = R + j (\omega L - \frac{1}{\omega C})
$$

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (19 - 22).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 10.6 - Parallel RLC circuits

A parallel RLC circuit is a circuit containing all types of passive elements (resistor, coil, and capacitor) connected in parallel. In such a circuit, the voltage is the same across all components.

In this case, it is possible to determine the current in each passive component. The total current is given by:

$$
\underline{I} = \underline{I_R} + \underline{I_L} + \underline{I_C}
$$

with $\underline{I_R}=\underline{U} / R$, $\underline{I_L} = \underline{U} / j \omega L$, and $\underline{I_C} = j \omega C \underline{U}$, yielding:

$$
\frac{\underline{I}}{\underline{U}}=\frac{1}{R}+j (\omega C - \frac{1}{\omega L})
$$

and in this case it may be easier to work with admittance rather than impedance:

$$
\underline{Y} = \frac{1}{R} + j (\omega C - \frac{1}{\omega L})
$$

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (30).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 10.7 - Inductive and capacitive predominance

A circuit may be predominantly inductive or predominantly capacitive depending on the phase shift between the circuit voltage and current or, equivalently, by analysing the phase of the circuit’s equivalent impedance from the perspective of the power source.

The phase $(\varphi)$ of the equivalent impedance $(\underline{Z})$ represents the phase shift between voltage and current, with $\varphi$ calculated from:

$$
\varphi = \arctg(\frac{X}{R})
$$

with:

$$
X =\omega L - \frac{1}{\omega C} = X_L - X_C
$$

If $\varphi > 0^\circ$, the voltage leads the current and the circuit is predominantly inductive, and therefore:

$$
\omega L > \frac{1}{\omega C}
$$

If $\varphi < 0^\circ$, the voltage lags behind the current and the circuit is predominantly capacitive, so that:

$$
\omega L < \frac{1}{\omega C}
$$

This expression allows one to conclude that $\varphi$ lies within the range:

$$
-90^\circ < \varphi < 90^\circ
$$

If $\varphi = 90^\circ$, the load is an ideal coil.

If $\varphi = -90^\circ$, the load is an ideal capacitor.

If $\varphi = 0^\circ$, the circuit is purely resistive, i.e. it has no reactance, either because the load is purely resistive or because the circuit is at resonance, that is:

$$
\omega L = \frac{1}{\omega C}
$$

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (23 - 27).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 10.8 - Resonance

When an AC power source is connected to a passive two-terminal network containing at least one capacitor and one coil, a phenomenon known as resonance may occur. At resonance, the circuit downstream of the two-terminal network becomes purely resistive and the source current is in phase with the voltage across its terminals. For this phenomenon to occur, the equivalent impedance seen at the terminals of the two-terminal network must be real, that is, the equivalent reactance must be zero $(X_L = X_C)$. The resonance phenomenon may be harmful, but it may also be usefully applied in various areas of science and engineering, for example in passive band-pass/band-stop filters.

The simplest case for studying resonance is in series and parallel RLC circuits.

In series resonance, the equivalent impedance is given by:

$$
\underline{Z}=R+jX=R+j(\omega L - \frac{1}{\omega C})
$$

then, for resonance to occur, it is necessary that:

$$
X = 0 \rightarrow X_L = X_C \leftrightarrow \omega L = \frac{1}{\omega C}
$$

The frequency for which the inductive reactance is equal to the capacitive reactance is called the resonance frequency, $f_0$:

$$
f_0= \frac{1}{2 \pi \sqrt{LC}}
$$

At this frequency, the circuit behaves as a purely resistive circuit (from the source perspective):

The impedance reaches its minimum value at the resonance frequency, and the voltage across the resistor is equal to the total voltage applied to the impedance.

At resonance, the voltages across the coil and capacitor are always equal and opposite and consequently cancel each other out. The voltage across the series association of the capacitor and coil is therefore zero, and between these two points there is a short circuit. This case of resonance is also called **voltage resonance**.

The voltages across the capacitor and the coil may reach values greater than the circuit supply voltage, attaining their maximum values at the resonance frequency. Thus, connecting an AC source to an RLC circuit may be dangerous if the source frequency is close to the resonance frequency of the circuit. The danger is even greater if the resistance $(R)$ is small, since in that case the current may be very large and damage the RLC circuit or the source. In the particular case where the resistance is zero, the RLC circuit becomes equivalent to a short circuit. In that case, the current is limited only by the internal impedance of the source feeding the RLC circuit.

In summary, in a series-resonant RLC circuit, the following holds:

* The source voltage and current are in phase.
* The inductive reactance is equal to the capacitive reactance.
* The impedance takes its minimum value and is equal to $R$.
* The RMS current takes its maximum value $(E/R)$.
* The voltage across the resistor is equal to the applied (source) voltage.
* The voltages across the capacitor and coil are equal and opposite, cancelling each other out.
* The voltage across the capacitor-coil series association is zero (short circuit).
* The voltages across the capacitor and coil may reach values greater than the voltage applied to the circuit.

In the case of parallel resonance, it is simpler to work with admittances rather than impedances, the equivalent admittance being given by:

$$
\underline{Y} = \frac{1}{\underline{Z}} = \frac{1}{R}+j(\omega C - \frac{1}{\omega L})
$$

Under resonance conditions, the circuit impedance must be real and therefore the admittance must also be real. Hence,

$$
B=0 \rightarrow \omega C = \frac{1}{\omega L}
$$

and the resonance frequency, $f_0$, is given by:

$$
f_0=\frac{1}{2 \pi \sqrt{LC}}
$$

At this frequency, the circuit behaves as a purely resistive circuit.

The admittance reaches its minimum value at the resonance frequency, i.e. the impedance reaches its maximum value. It is also found that the currents in the capacitor and the coil are symmetrical (and of equal magnitude) and consequently cancel each other out.

The total current is minimum and equal to:

$$
\underline{I} = \frac{\underline{U}}{R}
$$

The current through the resistor is equal to the total current feeding the parallel RLC circuit. It may be said that at the resonance frequency it is as if the resistor were in parallel with an open circuit. This case of resonance is also called **current resonance**.

Parallel resonance only presents some danger if the value of the resistance is very high and the circuit is fed by an ideal current source. In that case, the voltage across the resistor may reach high values. However, the probability of this situation occurring is low because the sources generally used approximate ideal voltage sources rather than ideal current sources. In the particular case where the resistance is infinite (i.e. absent), the RLC circuit becomes equivalent to an open circuit. Whatever the voltage applied to the circuit, the total current is zero.

In summary, in a parallel-resonant RLC circuit, the following holds:

* The source voltage and current are in phase.
* The inductive reactance is equal to the capacitive reactance.
* The impedance takes its maximum value and is equal to $R$.
* The RMS current takes its minimum value $(E/R)$.
* The current through the resistor is equal to the total current feeding the parallel RLC circuit.
* The currents in the capacitor and the coil are equal and opposite, cancelling each other out.
* The capacitor and the coil behave as if they were in open circuit.
* The voltage across the resistor may reach high values if the parallel RLC circuit is fed by an ideal current source and if the resistance $(R)$ is high.

In order to analyse the phenomena of series and parallel resonance in energetic terms, it is necessary to calculate and relate the energy stored in the capacitor and the coil under resonance conditions. The energy of the coil is given by:

$$
W_L = \frac{1}{2} LI^2_L
$$

and the energy of the capacitor is given by:

$$
W_C= \frac{1}{2} C U^2_C
$$

The ideal cases of series and parallel resonance (circuits without resistance) correspond to the same condition:

$$
\omega L = \frac{1}{\omega C}
$$

Under resonance conditions, the energies consumed/produced by the capacitor and the coil are equal.

Resonance translates into energetic independence with respect to the source (assuming that the capacitor and the coil are ideal — there are no Joule-effect losses).

Only during the initial instants of operation (transient regime), before steady-state conditions are reached, does the source supply energy to the circuit. From that moment onwards (in steady state), the coil and the capacitor become energetically independent of the source, with only energy exchanges between them — hence the term “reactive power/energy”. In cases where there is resistance $(R)$ in the circuit, there is still energetic independence with respect to the capacitor and the coil, and the source supplies only the energy consumed by the resistance.

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (32 - 50).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 10.9 - First-order passive filters

A filter is a circuit designed to “let through” a given range of frequencies and “filter” (reject or attenuate) other frequencies from upstream to downstream of a given two-terminal network.

Filters are used, for example, to tune a given radio or television station, or to alter the treble and bass of an amplifier.

A filter is said to be a **passive filter** if it contains only passive components $(R, L,$ and $C)$.

A filter is said to be an **active filter** if it contains active components (such as transistors or operational amplifiers).

The gain/amplification of a circuit is often measured in decibels $(dB)$ and is calculated by the following formula for power:

$$
A_P = 10 \cdot \log_{10} \left( \frac{P_{\text{out}}}{P_{\text{in}}} \right)
$$

and by the following formula for voltage (or current):

$$
A_U = 10 \cdot \log_{10} \left( \frac{U_{\text{out}}}{U_{\text{in}}} \right)
$$

where $P_{out}$ and $U_{out}$ are the output power and voltage respectively, and $P_{in}$ and $U_{in}$ are the input power and voltage respectively.

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (51 - 68).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 28/02/2025

#### 10.9.1 - Low-pass filters

A low-pass filter allows lower frequencies to pass and rejects higher frequencies.

This filter may be obtained from an RC circuit in which the output is taken across the capacitor, or from an RL circuit in which the output is taken across the resistor (there are other alternatives).

The ratio between the output and input voltages is called the transfer function, $H(\omega)$, and in this case, $\underline{H}(0) = 1$ and $\underline{H}(\infty) = 0$.

At low frequencies, the capacitor behaviour (in the RC circuit) approaches that of an open circuit, and the output voltage approaches the input voltage; at high frequencies, the capacitor approaches a short circuit, and the output voltage approaches zero.

The behaviour of the RL circuit may be explained analogously, remembering that at low frequencies the coil approaches a short circuit and at high frequencies an open circuit.

The cut-off frequency $(\omega_c$ or $f_c)$ is also defined as the frequency at which the magnitude of the transfer function decreases to 70.7% of its maximum value and is calculated by dividing the maximum value of the transfer function by $\sqrt{2}$. In the case of the RC circuit:

$$
\omega_c = \frac{1}{RC}
$$

A low-pass filter filters frequencies above the cut-off frequency.

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (52 - 55).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 28/02/2025

#### 10.9.2 - High-pass filters

A high-pass filter allows all frequencies above the cut-off frequency to pass.

This filter may be obtained from an RC circuit in which the output is taken across the resistor, or from an RL circuit in which the output is taken across the coil (there are other alternatives).

For a high-pass filter, the transfer ratio $H(\omega)$ is such that $\underline{H}(0) = 0$ and $\underline{H}(\infty) = 1$.

At low frequencies, the capacitor behaviour (in the RC circuit) approaches that of an open circuit and the output voltage approaches zero; at high frequencies, the capacitor approaches a short circuit and the output voltage approaches the input voltage.

The behaviour of the RL circuit may be explained analogously, remembering that at low frequencies the coil approaches a short circuit and at high frequencies an open circuit.

The cut-off frequency is again defined by:

$$
\omega_c = \frac{1}{RC}
$$

A high-pass filter filters frequencies below the cut-off frequency.

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (56 - 59).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 28/02/2025

#### 10.9.3 - Band-pass filters

A band-pass filter allows all frequencies between two frequency limits $(\omega_{c1} < \omega < \omega_{c2})$ to pass, where $\omega_{c1}$ is the lower cut-off frequency and $\omega_{c2}$ is the upper cut-off frequency.

This filter may be obtained from a series RLC circuit in which the output is taken across the resistor.

The transfer function $H(\omega)$ of this circuit is given by:

$$
\underline{H}(\omega) = \frac{1}{1+j[\omega L - 1/(\omega C)]/R}
$$

with $\underline{H}(0) = 0$ and $\underline{H}(\infty) = 0$.

The lower cut-off frequency $(\omega_{c1})$ is given by:

$$
\omega_{c1} = \frac{-RC+\sqrt{(RC)^2+4LC}}{2LC}
$$

and the upper cut-off frequency $(\omega_{c2})$ is given by:

$$
\omega_{c2} = \frac{RC+\sqrt{(RC)^2+4LC}}{2LC}
$$

The band defined by the cut-off frequencies is centred on the resonance frequency of the series RLC circuit and is given by:

$$
\omega_0=\frac{1}{\sqrt{LC}} \Leftrightarrow f_0=\frac{1}{2 \pi \sqrt{LC}}
$$

A band-pass filter filters frequencies below the lower cut-off frequency and above the upper cut-off frequency.

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (60 - 63).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 28/02/2025

#### 10.9.4 - Band-stop filters

A band-stop filter rejects all frequencies lying between two frequency limits $(\omega_{c1} < \omega < \omega_{c2})$, where $\omega_{c1}$ is the lower cut-off frequency and $\omega_{c2}$ is the upper cut-off frequency.

This filter may be obtained from a series RLC circuit in which the output is taken across the series association of the coil and the capacitor (there are other alternatives).

The transfer function $H(\omega)$ of this circuit is given by:

$$
\underline{H}(\omega) = \frac{1}{1-jR/[\omega L - 1/(\omega C)]}
$$

with $\underline{H}(0) = 1$ and $\underline{H}(\infty) = 1$.

The lower cut-off frequency $(\omega_{c1})$ is given by:

$$
\omega_{c1} = \frac{-RC+\sqrt{(RC)^2+4LC}}{2LC}
$$

and the upper cut-off frequency $(\omega_{c2})$ is given by:

$$
\omega_{c2} = \frac{RC+\sqrt{(RC)^2+4LC}}{2LC}
$$

The band defined by the cut-off frequencies is centred on the resonance frequency of the series RLC circuit and is given by:

$$
\omega_0=\frac{1}{\sqrt{LC}} \Leftrightarrow f_0=\frac{1}{2 \pi \sqrt{LC}}
$$

A band-stop filter rejects frequencies that are simultaneously above the lower cut-off frequency and below the upper cut-off frequency.

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (64 - 67).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 28/02/2025

### 10.10 - Power in alternating current

Instantaneous electric power results from the sum of two terms: one is constant and depends on the phase shift, $\phi$, between voltage and current; the other is sinusoidally alternating, with zero average value and a frequency twice that of the current or voltage. Thus, the expression is given by:

$$
P_{avg}=UI\cos\phi
$$

It may be concluded that the instantaneous electric power received by any load is pulsating, oscillating around the value $UI\cos\phi$ at a frequency double that of the current/voltage.

The expression obtained for instantaneous electric power encompasses the three particular cases:

If the passive branch is a resistor, $\phi = 0$:

$$
p(t)=UI-UI\cos(2(\omega t+\theta))
$$

If the passive branch is an ideal coil, $\phi=\pi/2$:

$$
p(t)=UI\sin(2(\omega t+\theta))
$$

If the passive branch is an ideal capacitor, $\phi=-\pi/2$:

$$
p(t)=-UI\sin(2(\omega t+\theta))
$$

The average power varies between $U\cdot I$, when the circuit is purely resistive, and $0$, when it is purely inductive or capacitive.

The instantaneous power in a passive RLC branch contains a sinusoidal waveform, and when $p(t)$ is negative, the branch is receiving energy from the source; when $p(t)$ is positive, the branch is supplying energy to the source.

If, instead of a load (the passive RLC branch under study), there were a source, the graph of the instantaneous electric power would in that case be symmetric (with respect to the time axis) to the graph of the instantaneous electric power of the load.

In this case, if the two-terminal network is a load, the area of $p(t)$ above the time axis is greater than the area below the time axis during one period, and:

$$
P_{avg}=UI\cos\phi \ge 0
$$

If the two-terminal network is a source, the area of $p(t)$ below the time axis is greater than the area above the time axis during one period, and:

$$
P_{avg}=UI\cos\phi \le 0
$$

Part of the energy supplied by a source to an impedance is dissipated (in its resistance), while the other part is stored (in its reactance), and later returned to the source.

The distinction between these types of energy leads to the definition of three types of power for any electrical element: **Active Power**, represented by the symbol $P$; **Reactive Power**, represented by the symbol $Q$; and **Apparent Power**, represented by the symbol $S$.

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (70 - 75).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 28/02/2025

#### 10.10.1 - Active power

Active power, or average power, or simply power, represented by the symbol $P$, corresponds to the average value of the instantaneous power over time. It is the portion of the received power that is dissipated as heat in the resistance of the impedance. Thus:

$$
P=U_RI
$$

The impedance and the voltage across the impedance may be written as:

$$
\underline{Z}=Z \angle \phi =Z \cos \phi + jZ \sin \phi = R + jX
$$

$$
\underline{U}=U \angle \phi = U \cos \phi + jU \sin \phi = U_R + jU_X = \underline{U}_R + \underline{U}_X
$$

Active power is measured in watts, $W$, and is defined by:

$$
P = U I \cos \phi
$$

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (76).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 28/02/2025

#### 10.10.2 - Reactive power

Reactive power is associated with the energy stored and exchanged between the inductive and capacitive elements of an electric circuit; it arises from the difference between the magnetic energy accumulated in coils and the electrical energy stored in capacitors.

In an RLC circuit, the energy stored in the coil and in the capacitor is in phase opposition. When these energies are equal, as in the case of resonance, there is only an exchange of energy between the components without intervention from the source.

In the general case, when there is inductive predominance and the coil is magnetising, the capacitor is discharging and supplying its stored energy to the coil, and the missing energy $(W_{L,\max} - W_{C,\max})$ is supplied to the coil by the source.

When there is capacitive predominance and the capacitor is charging, the coil is demagnetising and supplying its energy to the capacitor, and, since there is now excess energy in the coil, the surplus is returned to the source.

Thus, there is a certain amount of energy (equal to the magnitude of the difference between $W_{L,\max}$ and $W_{C,\max}$) that is periodically supplied by the source to the reactance (twice per period of the current or voltage) and returned by the reactance to the source (also twice per period).

Reactive power, represented by the symbol $Q$, is measured in volt-ampere reactive $(VAr)$, and is defined by:

$$
Q = UI \sin\phi
$$

where $U$ and $I$ are the RMS values of voltage and current, and $\phi$ is the phase-shift angle between voltage and current. This power may be positive or negative, depending on whether the impedance is predominantly inductive $(\phi > 0)$ or capacitive $(\phi < 0)$.

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (77 - 79).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 28/02/2025

#### 10.10.3 - Apparent power

Complex power (or “apparent” power), represented by $S$, has no direct physical meaning and is not the symbolic representation of any sinusoidal alternating quantity; however, the concept of complex power facilitates the analysis and calculation of active and reactive power, since its real part is equal to active power and its imaginary part is equal to reactive power:

$$
\underline{S} = \underline{U} , \underline{I}^* = P+jQ
$$

The conjugate $(^*)$ of the current is used so that the angle of $S$ corresponds to the difference between the voltage and current angles (which is what is intended when calculating $P$ and $Q$) and not to their sum.

The magnitude of complex power is called **apparent power** $(S)$ and is measured in volt-amperes $(VA)$:

$$
S=UI
$$

The vector representation of complex power is usually called the **power triangle**, which, according to the Pythagorean theorem, has active power $(P)$ and reactive power $(Q)$ as its legs and complex power as its hypotenuse:

$$
S^2=P^2+Q^2
$$

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (80 - 81).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 28/02/2025

#### 10.10.4 - Power factor

Power factor is defined as the cosine of the phase shift $(\phi)$ between voltage and current (or the cosine of the angle of the load impedance) and is equal to the ratio between active and apparent power:

$$
\cos \phi = \frac{P}{S}
$$

The power factor can only vary between 0 and 1, since $\phi$ can only belong to the first or fourth quadrant, and it is important because it makes it possible to determine the amount of useful (active) power transferred to the load.

Useful power is the power dissipated in the resistances of the load, since it is the power that flows in only one direction, from the source to the load, performing work. The reactive power transferred to/from a reactive load (capacitors and coils) is not useful, since it moves back and forth between the source and the load without performing work.

The highest value of the power factor is 1 and corresponds to the case of a purely resistive load.

If the power factor moves away from 1 and approaches 0, the load becomes increasingly reactive (which may lead to energy losses in the conductors between the source and the load). On the other hand, as the power factor approaches 1, the smaller the current required to supply the same load, and the smaller the cross-sectional area of the transmission-line conductors needs to be (which is more economical). In other words, a high power factor allows more efficient power delivery to a load.

**Power factor correction** is the process of obtaining a higher power factor (ideally 1). To do so, transmission losses must be minimised so that the voltage at the load is as close as possible to the source voltage. Therefore, the voltage drop in the line must be as small as possible, which is achieved with minimum line current.

The aim is thus to make the RMS current in the line minimum while maintaining the RMS value of the voltage supplying the load and keeping the power transferred to the load unchanged. This also brings two further advantages:

1. The power losses assume a minimum value given by:

   $$
   P_{losses} = (R_i + R_{line}) \times I^2
   $$

2. A greater number of consumers may be supplied by the same source.

To achieve the proposed objectives, it is necessary to approach a condition of parallel resonance of the load, that is, to place a passive element in parallel with the load: in practice, capacitors in parallel when $\phi > 0$ (inductive load), and coils in parallel when $\phi < 0$ (capacitive load).

Under the condition of parallel resonance, the impedance is purely resistive and reaches its maximum value, the current reaches its minimum value, and the power factor attains its maximum value (equal to 1).

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (89 - 97).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 28/02/2025

## 11 - Three-Phase Alternating Current Circuits

A three-phase alternating current circuit consists of three sinusoidal quantities (voltages or currents) with the same frequency and waveform, but phase-shifted by 120° with respect to each other. This type of circuit is used in the generation, transmission, and utilisation of electrical energy due to its advantages over single-phase systems.

In the case of electric power generation, three-phase alternators exhibit higher efficiency and better energy performance. For this reason, even in smaller-scale applications, such as automobiles, three-phase alternators are used, together with rectification and voltage regulation systems.

In the transmission and distribution of electrical energy, three-phase systems make it possible to transmit the same power with a smaller number of conductors. In particular, three conductors in a three-phase system can transmit the same power as six conductors in an equivalent single-phase system, which results in a significant reduction in cable and support-structure costs. In addition, three-phase transformers offer higher efficiency and smaller حجم for the same rated power.

With regard to the utilisation of electrical energy, many industrial devices operate under three-phase conditions, especially three-phase induction motors. Other examples include industrial furnaces, boilers, welding equipment, foundry equipment, and lighting systems. In domestic environments and in buildings, three-phase systems are used in lifts, electric cookers and ovens, boilers, heat pumps, and water pumps.

A three-phase system of sinusoidal quantities may be described, in the time domain, by the expressions:

$$
\begin{aligned}
u_A(t) &= U_m \sin(\omega t + \psi_A) \
u_B(t) &= U_m \sin(\omega t + \psi_B) \
u_C(t) &= U_m \sin(\omega t + \psi_C)
\end{aligned}
$$

In a symmetrical three-phase system, the RMS value of the three quantities is equal and the phase shift between them is constant and equal to 120°, that is:

$$
U_A = U_B = U_C
$$

and

$$
\psi_B = \psi_A - 120^\circ \qquad \psi_C = \psi_A + 120^\circ
$$

If these conditions are not satisfied, the three-phase system is considered asymmetrical.

As regards the loads, three-phase systems may be classified as balanced-load systems or unbalanced-load systems. In a balanced system, the impedances connected to the three phases are equal, that is:

$$
Z_A = Z_B = Z_C
$$

In an unbalanced-load system, at least one of the impedances differs from the others. The presence of single-phase loads connected to a three-phase system generally leads to system unbalance, except in the case where the sum of the loads connected to each phase is equal.

The analysis of symmetrical three-phase systems is particularly important, since it allows significant simplifications in the study of the voltages, currents, and powers involved, and forms the basis for understanding the operation of most industrial electrical systems.

---

##### Metadata

**Source**:

* Ana Viana and Mário Alves; (June 2023); *TCIRC Slides Chapter 6* (3 - 9).

**Validation**: João Ferreira

**Version**: 1.1

**Last update**: 07/01/2026
