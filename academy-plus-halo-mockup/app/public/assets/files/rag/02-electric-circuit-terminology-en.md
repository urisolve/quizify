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
