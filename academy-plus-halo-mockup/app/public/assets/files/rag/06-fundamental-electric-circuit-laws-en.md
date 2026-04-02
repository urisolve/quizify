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
