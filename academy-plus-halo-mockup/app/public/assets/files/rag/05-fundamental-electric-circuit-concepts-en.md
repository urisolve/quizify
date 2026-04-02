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
