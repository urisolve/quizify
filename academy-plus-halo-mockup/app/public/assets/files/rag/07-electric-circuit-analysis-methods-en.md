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
