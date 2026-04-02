# Mesh Current Method

## Theoretical Background

In this section you can consult the theoretical reference. You can review all details about the Mesh Current Method. For this solution, use it mainly to understand the steps to follow, determine the number of meshes required for the system of equations, and distinguish between auxiliary meshes (Ma) and principal meshes (Mp).

<details>
<summary>Theoretical reference (from lcm_theory_en.md)</summary>

### Mesh Current Method

The **Mesh Current Method (MCM)** is based on **Kirchhoff’s Voltage Law (KVL)**, in which the unknowns are the currents associated with the linearly independent meshes of the circuit. These currents are **fictitious**, meaning they do not directly represent physical quantities in the circuit; instead, they serve as intermediate unknowns that reduce the number of equations required to solve the system.

The actual **branch currents** are obtained at a later stage through the algebraic sum of the mesh currents that flow through each branch. The number of independent mesh equations is given by

$$
M = B - (N - 1),
$$

where ( B ) represents the number of branches and ( N ) the number of nodes.

When the circuit contains **ideal current sources** or branches with known currents, the system is adjusted to

$$
M = B - (N - 1) - C,
$$

where ( C ) is the number of current sources (or number of known currents). Each current source must belong to a single **auxiliary mesh**, and the remaining meshes-called **principal meshes**-must cover all branches that do not contain ideal current sources.

For the systematic application of the method, the following algorithm is used:

1. Count and identify the ( B ) branches and the ( N ) nodes of the circuit, and compute the number of principal meshes using the equation

   $$
   M = B - (N - 1) - C.
   $$

2. Select and mark ( C ) auxiliary meshes, each passing through a single current source (or a branch whose current is already known), assigning the mesh current the value of the source current and, preferably, the same direction (if the direction is opposite, the mesh current is considered negative).

3. Identify and graphically indicate the remaining ( M ) meshes, arbitrarily assigning a direction to each fictitious mesh current

   $$
   \left( I_{M_1}, I_{M_2}, \dots, I_{M_M} \right),
   $$

   such that all meshes cover the circuit branches, except those containing current sources.

4. Formulate the ( M ) mesh equations using Kirchhoff’s Voltage Law, taking into account the effect of the mesh currents on each circuit element.

5. Solve the system of ( M ) equations to determine the values of the mesh currents

   $$
   \left( I_{M_1}, I_{M_2}, \dots, I_{M_M} \right).
   $$

6. Assign an arbitrary reference direction to the branch currents

   $$
   \left( I_1, I_2, \dots, I_B \right).
   $$

7. Compute the actual branch currents by taking the algebraic sum of the mesh currents flowing through each branch, adding those that have the same direction as the assumed branch current and subtracting those with opposite direction.

</details>

# Given Circuit

## Schematic

![Circuit Schematic](circuit-png/00-combined.png)

<details>
<summary> Schematic Layers</summary>

### Wires

![Wires](circuit-png/01-wires.png)

### Interconnection Points

![Interconnection Points](circuit-png/02-nodes.png)

### Electrical Components

![Electrical Components](circuit-png/03-components.png)

### Labels

![Labels](circuit-png/04-labels.png)

</details>

Download schematic layers as <strong><a href="circuit-layers.pdf" target="_blank">PDF</a></strong>.

## Netlist

```text
# U=RIsolve circuit Editor

R:R1 node_a node_b R="355 Ohm" Temp="20" 
R:R2 node_a node_c R="540 Ohm" Temp="20" 
R:R3 node_b node_a R="795 Ohm" Temp="20" 
Idc:I1 node_b node_c I="13 A"  node_b node_c 
Vdc:V1 node_c node_b E="19 V"  node_c node_b
```
## Elements

### Component Table

| Type | Reference | Nominal Value |
|---|---|---|
| Current source (DC) | $I_{1}$ | $13\~\mathrm{A}$ |
| Voltage source (DC) | $V_{1}$ | $19\~\mathrm{V}$ |
| Resistor | $R_{1}$ | $355\~\mathrm{\Omega}$ |
| Resistor | $R_{2}$ | $540\~\mathrm{\Omega}$ |
| Resistor | $R_{3}$ | $795\~\mathrm{\Omega}$ |

---

# Simulation info

**Simulation Type:** DC

---

# Topological Information

Here we list the nodes, branches, and cycles (meshes) available in the circuit to support the systematic selection of Ma and Mp.

## Nodes

Useful separation for the method: real nodes (where 3 or more branches or components connect). These are the electrical nodes to consider in circuit analysis.

In this circuit we have the following nodes:

| Ref | $I_{Converging}$ | $I_{Diverging}$ |
|---|---|---|
| node\_a | - | $I_{2}$, $I_{3}$, $I_{4}$ |
| node\_b | $I_{1}$, $I_{2}$, $I_{4}$ | $I_{5}$ |
| node\_c | $I_{3}$, $I_{5}$ | $I_{1}$ |

<details>
<summary> Node Visualization </summary>

### Individual Visualization

#### Node node_a
![Node node_a](node-exports/03-with-circuit-combined/node_a.png)

#### Node node_b
![Node node_b](node-exports/03-with-circuit-combined/node_b.png)

#### Node node_c
![Node node_c](node-exports/03-with-circuit-combined/node_c.png)

### Overall Visualization
![Nodes (overlay)](node-exports/nodes-combined.png)

</details>

Download as <strong><a href="nodes-layers.pdf" target="_blank">PDF</a></strong>.

> Tip (procedure): An electrical node corresponds to a set of points that share the same electrical potential. In a schematic, there may be several connection points (represented by a filled circle where different branches or components meet). However, even if there are several such points connected to each other, they only constitute distinct electrical nodes if there is an electrical component between them (for example, a resistor). Otherwise, they all belong to the same node, since they are at the same potential.

> Tip: The netlist also presents virtual nodes (where only 2 or more components connect). These nodes appear as _netN, where N is a numerical index value (e.g., _net1, _net2, etc.).
> We can also classify the nodes as essential nodes and internal nodes, as follows:
>
> - Essential nodes (N): node_a, node_b, node_c
> - Internal nodes: -

## Branches

Each branch is defined by (noP, noN) and by the components it contains.

| Branch | noP | noN | Components |
|---|---|---|---|
| B1 | node_a | node_b | $R1=355\~\mathrm{\Omega}$ |
| B2 | node_a | node_c | $R2=540\~\mathrm{\Omega}$ |
| B3 | node_a | node_b | $R3=795\~\mathrm{\Omega}$ |
| B4 | node_b | node_c | $V1=19\~\mathrm{V}$ |
| B5 | node_c | node_b | $I1=13\~\mathrm{A}$ |

<details>
<summary> Branch Visualization </summary>

### Individual Visualization

#### Branch B1
![Branch B1](branch-exports/03-with-circuit-combined/B1.png)

#### Branch B2
![Branch B2](branch-exports/03-with-circuit-combined/B2.png)

#### Branch B3
![Branch B3](branch-exports/03-with-circuit-combined/B3.png)

#### Branch B4
![Branch B4](branch-exports/03-with-circuit-combined/B4.png)

#### Branch B5
![Branch B5](branch-exports/03-with-circuit-combined/B5.png)

### Overall Visualization
![Branches (overlay)](branch-exports/branches-combined.png)

</details>

Download as <strong><a href="branches-layers.pdf" target="_blank">PDF</a></strong>.

## Meshes

The solver exports the complete list of cycles (totalMeshes). It then chooses a subset for solving (chosenMeshes), classified into Ma and Mp.

### Mesh Visualization

This section presents graphical data about the meshes used in this solution and all meshes existing in the circuit under analysis.

<details>
<summary> Solution Mesh Drawings </summary>

#### Auxiliary Meshes (Ma)

##### Mesh Ma1
![Mesh Ma1](mesh-exports/02-auxiliary/Ma1.png)

#### Principal Meshes (Mp)

##### Mesh Mp1
![Mesh Mp1](mesh-exports/03-principal/Mp1.png)

##### Mesh Mp2
![Mesh Mp2](mesh-exports/03-principal/Mp2.png)

#### Mesh Overlay

![Mesh Overlay](mesh-exports/04-selected-combined/selected-meshes.png)

</details>

<details>
<summary> All Mesh Drawings </summary>

#### All Meshes

##### Mesh M1
![Mesh M1](mesh-exports/01-all-meshes/M1.png)

##### Mesh M2
![Mesh M2](mesh-exports/01-all-meshes/M2.png)

##### Mesh M3
![Mesh M3](mesh-exports/01-all-meshes/M3.png)

##### Mesh M4
![Mesh M4](mesh-exports/01-all-meshes/M4.png)

##### Mesh M5
![Mesh M5](mesh-exports/01-all-meshes/M5.png)

##### Mesh M6
![Mesh M6](mesh-exports/01-all-meshes/M6.png)

</details>

Download as <strong><a href="meshes-layers.pdf" target="_blank">PDF</a></strong>.

## Mesh Catalog (All Available Cycles)

The constitution of each mesh is presented in tabular form.

Format: Ref | noP | noN | Components. The vertical sequence corresponds to the sequence of branches when traversing the mesh.

### Mesh M1

| Ref | noP | noN | Components |
|---|---|---|---|
| B1 | node_a | node_b | R1=355 Ohm |
| B3 | node_a | node_b | R3=795 Ohm |

### Mesh M2

| Ref | noP | noN | Components |
|---|---|---|---|
| B4 | node_b | node_c | V1=19 V |
| B5 | node_c | node_b | I1=13 A |

### Mesh M3

| Ref | noP | noN | Components |
|---|---|---|---|
| B1 | node_a | node_b | R1=355 Ohm |
| B4 | node_b | node_c | V1=19 V |
| B2 | node_a | node_c | R2=540 Ohm |

### Mesh M4

| Ref | noP | noN | Components |
|---|---|---|---|
| B1 | node_a | node_b | R1=355 Ohm |
| B5 | node_c | node_b | I1=13 A |
| B2 | node_a | node_c | R2=540 Ohm |

### Mesh M5

| Ref | noP | noN | Components |
|---|---|---|---|
| B3 | node_a | node_b | R3=795 Ohm |
| B4 | node_b | node_c | V1=19 V |
| B2 | node_a | node_c | R2=540 Ohm |

### Mesh M6

| Ref | noP | noN | Components |
|---|---|---|---|
| B3 | node_a | node_b | R3=795 Ohm |
| B5 | node_c | node_b | I1=13 A |
| B2 | node_a | node_c | R2=540 Ohm |

# Step-by-Step Solution

**Objective:** compute the branch currents of the circuit. To do this, we follow a fixed and organized sequence:

1. **Identify the circuit structure**
2. **Define the auxiliary meshes (C)**
3. **Define the principal meshes (M)**
4. **Apply Kirchhoff’s Voltage Law (KVL)**
5. **Solve the system**
6. **Define reference directions for branch currents**
7. **Determine the actual branch currents**

## Step 1 - Circuit Variable Analysis

First, we identify the number of branches (B), the number of essential nodes (N), and the number of ideal current sources (C).

### Branch and Node Count

$$
\begin{aligned}
B &= 5 \\
N &= 3 \\
C &= 1
\end{aligned}
$$

### Number of Principal and Auxiliary Meshes

$$
\begin{aligned}
Mp &= B - (N - 1) - C = 5 - (3 - 1) - 1 = 2 \\
Ma &= C = 1
\end{aligned}
$$

> Tip (theory): the number of auxiliary meshes equals the number of current sources. Each auxiliary mesh must cross exactly one current source.

> Consistency check: the solver selected Mp = 2 and Ma = 1.

## Step 2 - Selection of Auxiliary Meshes (Ma)

Each current source must belong to exactly one auxiliary mesh. The auxiliary mesh current is known (it equals the source current, with sign according to the assumed direction).

### Chosen Meshes

### Meshes Chosen for Solving

#### Ma - Auxiliary Meshes (Known Currents)

- Ma1 (mesh id=1): branches [4, 5]
- Known mesh current: $13\~\mathrm{A}$

#### Mp - Principal Meshes (Unknown Fictitious Currents)

- Mp1 (mesh id=2): branches [1, 3] / a
- Traversal signs in branches: [1, -1]
- Obtained mesh current: $-7.468\~\mathrm{mA}$

- Mp2 (mesh id=3): branches [1, 4, 2] / b
- Traversal signs in branches: [1, 1, -1]
- Obtained mesh current: $24.19\~\mathrm{mA}$

> Tip: the table for each Mp shows the traversal (sequence of branches). That exact order is what you use when writing KVL.

##### Traversal details of Mp1

| Ref | noP | noN | Components |
|---|---|---|---|
| B1 | node_a | node_b | R1=355 Ohm |
| B3 | node_a | node_b | R3=795 Ohm |

##### Traversal details of Mp2

| Ref | noP | noN | Components |
|---|---|---|---|
| B1 | node_a | node_b | R1=355 Ohm |
| B4 | node_b | node_c | V1=19 V |
| B2 | node_a | node_c | R2=540 Ohm |

> Tip (practice): it does not make sense to write KVL directly in a mesh that contains an ideal current source. Use Ma to inject the known value into the system.

## Step 3 - Selection of Principal Meshes (Mp)

Principal meshes are fictitious unknowns (they do not correspond to physical currents present in the circuit) and will be the variables of the system. They must cover all branches that do not have ideal current sources.

### Chosen Meshes

### Meshes Chosen for Solving

#### Ma - Auxiliary Meshes (Known Currents)

- Ma1 (mesh id=1): branches [4, 5]
- Known mesh current: $13\~\mathrm{A}$

#### Mp - Principal Meshes (Unknown Fictitious Currents)

- Mp1 (mesh id=2): branches [1, 3] / a
- Traversal signs in branches: [1, -1]
- Obtained mesh current: $-7.468\~\mathrm{mA}$

- Mp2 (mesh id=3): branches [1, 4, 2] / b
- Traversal signs in branches: [1, 1, -1]
- Obtained mesh current: $24.19\~\mathrm{mA}$

> Tip: the table for each Mp shows the traversal (sequence of branches). That exact order is what you use when writing KVL.

##### Traversal details of Mp1

| Ref | noP | noN | Components |
|---|---|---|---|
| B1 | node_a | node_b | R1=355 Ohm |
| B3 | node_a | node_b | R3=795 Ohm |

##### Traversal details of Mp2

| Ref | noP | noN | Components |
|---|---|---|---|
| B1 | node_a | node_b | R1=355 Ohm |
| B4 | node_b | node_c | V1=19 V |
| B2 | node_a | node_c | R2=540 Ohm |

> Tip: small meshes with 2 branches often correspond to parallel branches between the same nodes and generate short KVL equations - good candidates to include among Mp.

## Step 4 - Writing Mesh Equations (KVL)

 In this step, we write the equations corresponding to each principal mesh (Mp) using Kirchhoff’s Voltage Law (KVL). The equations are written in symbolic form, with unknowns referring to the principal mesh currents (Mp). Then we substitute the values of the auxiliary meshes (Ma) and the values of the electrical components to obtain a system of equations ready for solving.

## Mesh Equations (KVL)

Below is the construction of the equation for each principal mesh.

### Mp1 (a)

**Symbolic form (unknowns):**

$$
\begin{aligned}
0=R1\cdot(I_{Mp1}+I_{Mp2})+R3\cdot(I_{Mp1})
\end{aligned}
$$

**After substituting Auxiliary Mesh (Ma) values:**

$$
\begin{aligned}
0=R1\cdot(I_{Mp1}+I_{Mp2})+R3\cdot(I_{Mp1})
\end{aligned}
$$

**After substituting component values:**

$$
\begin{aligned}
0=355\cdot(I_{Mp1}+I_{Mp2})+795\cdot(I_{Mp1})
\end{aligned}
$$

**Solver-ready form:**

```text
355(a+b)+795(a)
```
> Tip (process): if you have difficulties, always write in layers. First the symbolic form, then substitute Ma, then substitute numerical values.

### Mp2 (b)

**Symbolic form (unknowns):**

$$
\begin{aligned}
V1=R1\cdot(I_{Mp1}+I_{Mp2})+R2\cdot(I_{Mp2})
\end{aligned}
$$

**After substituting Auxiliary Mesh (Ma) values:**

$$
\begin{aligned}
V1=R1\cdot(I_{Mp1}+I_{Mp2})+R2\cdot(I_{Mp2})
\end{aligned}
$$

**After substituting component values:**

$$
\begin{aligned}
19=355\cdot(I_{Mp1}+I_{Mp2})+540\cdot(I_{Mp2})
\end{aligned}
$$

**Solver-ready form:**

```text
-19+355(a+b)+540(b)
```
> Tip (process): if you have difficulties, always write in layers. First the symbolic form, then substitute Ma, then substitute numerical values.

## Step 5 - Determination of Mesh Currents (Mp)

Solve the system to obtain the principal mesh currents.

### Mesh Currents (Result)

$$
\begin{aligned}
Mp_{1} &= -7.468 mA \\
Mp_{2} &= 24.19 mA
\end{aligned}
$$

> Tip (theory): Mp are unknowns referring to fictitious mesh currents (i.e., a mathematical artifice to reduce the number of equations - they do not correspond to real, physical currents. However, they must be treated with the same logic as real currents. A negative value means the real direction is opposite to the assumed mesh direction.

### Solver

The system of equations is shown below, properly structured for processing in Python (NumPy). These data are intended for external verification of the obtained results.

#### Equations System

```text
0 = 355*(a + b) + 795*(a)
0 =  - 19 + 355*(a + b) + 540*(b)
```
#### Solver Code

```python
import numpy as np

A = np.array([
    [1150, 355],
    [355, 895],
], dtype=complex)

b = np.array([
    0,
    19,
], dtype=complex)

# received from the external application
var_names = ["a", "b"]

# solve Ax = b
x = np.linalg.solve(A, b)

# map names -> values
result = dict(zip(var_names, x))

# preserve external order
for name in var_names:
    val = result[name]
    if isinstance(val, complex) and abs(val.imag) > 1e-12:
        print(f"{name} = {val.real:.6f} {val.imag:+.6f}j")
    else:
        print(f"{name} = {float(val.real):.6f}")
```
## Step 6 - Definition of Reference Directions for Branch Currents

Define a reference direction for each branch current using noP -> noN, where noP is the node assumed to have higher potential and noN the node assumed to have lower potential.

After the currents are determined, a negative value means the actual current flows opposite to the chosen direction.

> Tip: the reference direction is arbitrary, but it must be consistent with the final table (noP -> noN).

### Current Visualization

This section presents graphical data about the branch currents used in this solution.

<details>
<summary> Current Drawings </summary>

#### Independent Visualization

##### Current I1

![Current I1](current-exports/03-with-circuit-combined/I1.png)

##### Current I2

![Current I2](current-exports/03-with-circuit-combined/I2.png)

##### Current I3

![Current I3](current-exports/03-with-circuit-combined/I3.png)

##### Current I4

![Current I4](current-exports/03-with-circuit-combined/I4.png)

##### Current I5

![Current I5](current-exports/03-with-circuit-combined/I5.png)

#### Visualization of All Currents

![Currents Overlay](current-exports/currents-combined.png)

</details>

Download as <strong><a href="currents-layers.pdf" target="_blank">PDF</a></strong>.

> Tip (procedure): the reference is arbitrary, but once defined, the entire analysis must be done based on the chosen directions.

> Tip (procedure): to avoid confusion with mesh currents, mark branch currents on the schematic only after obtaining the mesh currents.

## Step 7 - Determination of Branch Currents

Each branch current is calculated as the algebraic sum of the mesh currents that cross that branch, respecting the signs (congruent vs. opposite).

Theoretical note: each branch current is obtained as the algebraic sum of the mesh currents that cross the branch (see the Mesh Relation column).

Reference note: the branch current reference direction is noP -> noN.

| Branch | noP -> noN | Mesh Relation | Value (phasor, 4 sig. fig.) | Friendly |
|---|---|---|---:|---:|
| I1 | node_c -> node_b | $I1=I\_{Ma1}$ | $13\~\mathrm{A}$ | $13\~\mathrm{A}$ |
| I2 | node_a -> node_b | $I2=I\_{Mp1}+I\_{Mp2}$ | $16.72 mA$ | $16.7 mA$ |
| I3 | node_a -> node_c | $I3=-I\_{Mp2}$ | $-24.19 mA$ | $-24.2 mA$ |
| I4 | node_a -> node_b | $I4=-I\_{Mp1}$ | $7.468 mA$ | $7.47 mA$ |
| I5 | node_b -> node_c | $I5=I\_{Ma1}+I\_{Mp2}$ | $13.02\~\mathrm{A}$ | $13\~\mathrm{A}$ |

> Tip: confirm the sign by checking the congruence between the branch current direction (noP -> noN) and the direction of each mesh current that crosses the branch.

# Quick Interpretation Notes

Final summary to consolidate the physical meaning vs. mathematical variables.

- Mesh currents (Mp) are fictitious unknowns (they do not correspond to physical currents present in the circuit) used to reduce the number of equations.
- Branch currents are physical results obtained from algebraic sums of mesh currents.
- Negative signs reflect direction relative to the chosen references.

## Notation Used in This Solution

- Ma: Auxiliary mesh current(s). An auxiliary mesh crosses exactly one current source; therefore its mesh current is known.
- Mp: Principal mesh current(s). Principal mesh currents are fictitious unknowns to be determined.
- noP: node assumed to have higher potential in the branch voltage reference.
- noN: node assumed to have lower potential in the branch voltage reference.
- In the branch current tables, the reference direction is noP -> noN. A negative value means the actual current flows in the opposite direction.

---

