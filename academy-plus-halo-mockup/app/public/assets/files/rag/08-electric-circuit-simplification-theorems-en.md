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
