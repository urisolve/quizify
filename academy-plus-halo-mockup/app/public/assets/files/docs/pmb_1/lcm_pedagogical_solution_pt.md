# Método das Correntes nas Malhas

## Informação Teórica

Nesta secção podes consultar a referência teórica. Podes consultar todos os detalhes sobre o Método das Correntes nas Malhas. Para esta resolução, usa-a sobretudo para entender os passos a seguir, calcular o número de malhas necessárias para o sistema de equações e a diferença entre malhas auxiliares (Ma) e principais (Mp).

<details>
<summary>Referência teórica (a partir de lcm_theory_pt.md)</summary>

### Método das Correntes de Malha

O **Método das Correntes de Malha (MCM)** baseia-se na **Lei das Tensões de Kirchhoff (LTK)**, em que as incógnitas são as correntes associadas às malhas linearmente independentes do circuito. Estas correntes são **fictícias**, ou seja, não representam diretamente grandezas físicas presentes no circuito; servem, em vez disso, como incógnitas intermédias que reduzem o número de equações necessário para resolver o sistema.

As **correntes de ramo** reais obtêm-se numa fase posterior através da soma algébrica das correntes de malha que atravessam cada ramo. O número de equações independentes de malha é dado por

$$
M = B - (N - 1),
$$

onde ( B ) representa o número de ramos e ( N ) o número de nós.

Quando o circuito contém **fontes ideais de corrente** ou ramos com correntes conhecidas, o sistema é ajustado para

$$
M = B - (N - 1) - C,
$$

onde ( C ) é o número de fontes de corrente (ou número de correntes conhecidas). Cada fonte de corrente deve pertencer a uma única **malha auxiliar**, e as restantes malhas - designadas **malhas principais** - devem cobrir todos os ramos que não contêm fontes ideais de corrente.

Para uma aplicação sistemática do método, utiliza-se o seguinte algoritmo:

1. Contar e identificar os ( B ) ramos e os ( N ) nós do circuito e calcular o número de malhas principais usando a expressão

   $$
   M = B - (N - 1) - C.
   $$

2. Selecionar e assinalar ( C ) malhas auxiliares, cada uma atravessando uma única fonte de corrente (ou um ramo cuja corrente já é conhecida), atribuindo à corrente de malha o valor da corrente da fonte e, preferencialmente, o mesmo sentido (se o sentido for oposto, considera-se a corrente de malha negativa).

3. Identificar e indicar graficamente as restantes ( M ) malhas, atribuindo arbitrariamente um sentido a cada corrente de malha fictícia

   $$
   \left( I_{M_1}, I_{M_2}, \dots, I_{M_M} \right),
   $$

   de forma a que todas as malhas cubram os ramos do circuito, exceto os que contêm fontes de corrente.

4. Formular as ( M ) equações de malha usando a Lei das Tensões de Kirchhoff, tendo em conta o efeito das correntes de malha em cada elemento do circuito.

5. Resolver o sistema de ( M ) equações para determinar os valores das correntes de malha

   $$
   \left( I_{M_1}, I_{M_2}, \dots, I_{M_M} \right).
   $$

6. Atribuir um sentido de referência arbitrário às correntes de ramo

   $$
   \left( I_1, I_2, \dots, I_B \right).
   $$

7. Calcular as correntes de ramo reais fazendo a soma algébrica das correntes de malha que atravessam cada ramo, somando as que têm o mesmo sentido da corrente de ramo assumida e subtraindo as que têm sentido oposto.

</details>

# Circuito dado

## Esquemático

![Esquemático do Circuito](circuit-png/00-combined.png)

<details>
<summary> Camadas do Esquemático</summary>

### Fios

![Fios](circuit-png/01-wires.png)

### Nós

![Nós](circuit-png/02-nodes.png)

### Componentes Elétricos

![Componentes Elétricos](circuit-png/03-components.png)

### Etiquetas

![Etiquetas](circuit-png/04-labels.png)

</details>

Transferir camadas do esquemático em <strong><a href="circuit-layers.pdf" target="_blank">PDF</a></strong>.

## Netlist

```text
# U=RIsolve circuit Editor

R:R1 node_a _net1 R="6 Ohm" Temp="20" 
R:R2 _net2 node_c R="4 Ohm" Temp="20" 
Vdc:E1 _net1 _net2 E="2 V"  _net1 _net2 
R:R3 node_a node_b R="8 Ohm" Temp="20" 
R:R4 node_b _net3 R="25 Ohm" Temp="20" 
R:R6 gnd node_d R="10 Ohm" Temp="20" 
Vdc:E2 _net3 node_c E="4 V"  _net3 node_c 
R:R7 node_d _net9 R="10 Ohm" Temp="20" 
R:R8 node_d _net10 R="15 Ohm" Temp="20" 
Idc:I1 node_c _net9 I="0.4 A"  node_c _net9 
Vdc:E3 node_c _net10 E="5 V"  node_c _net10 
Idc:I2 _net7 node_d I="90 mA"  _net7 node_d 
Idc:I3 node_b gnd I="0.1 A"  node_b gnd 
Vdc:E4 node_a gnd E="1 V"  node_a gnd 
R:R5 gnd _net7 R="20 Ohm" Temp="20"
```
## Elementos

### Tabela de Componentes

| Tipo | Referência | Valor Nominal | Resistência/Impedância |
|---|---|---|---|
| Fonte de corrente (CC) | $I_{1}$ | $400\~\mathrm{mA}$ | - |
| Fonte de corrente (CC) | $I_{2}$ | $90\~\mathrm{mA}$ | - |
| Fonte de corrente (CC) | $I_{3}$ | $100\~\mathrm{mA}$ | - |
| Fonte de tensão (CC) | $E_{1}$ | $2\~\mathrm{V}$ | - |
| Fonte de tensão (CC) | $E_{2}$ | $4\~\mathrm{V}$ | - |
| Fonte de tensão (CC) | $E_{3}$ | $5\~\mathrm{V}$ | - |
| Fonte de tensão (CC) | $E_{4}$ | $1\~\mathrm{V}$ | - |
| Resistência | $R_{1}$ | $6\~\mathrm{\Omega}$ | $6\~\mathrm{\Omega}$ |
| Resistência | $R_{2}$ | $4\~\mathrm{\Omega}$ | $4\~\mathrm{\Omega}$ |
| Resistência | $R_{3}$ | $8\~\mathrm{\Omega}$ | $8\~\mathrm{\Omega}$ |
| Resistência | $R_{4}$ | $25\~\mathrm{\Omega}$ | $25\~\mathrm{\Omega}$ |
| Resistência | $R_{5}$ | $20\~\mathrm{\Omega}$ | $20\~\mathrm{\Omega}$ |
| Resistência | $R_{6}$ | $10\~\mathrm{\Omega}$ | $10\~\mathrm{\Omega}$ |
| Resistência | $R_{7}$ | $10\~\mathrm{\Omega}$ | $10\~\mathrm{\Omega}$ |
| Resistência | $R_{8}$ | $15\~\mathrm{\Omega}$ | $15\~\mathrm{\Omega}$ |

---

# Informações Topológicas

Aqui listamos os nós, os ramos e os ciclos (malhas) disponíveis no circuito, para suportar a escolha sistemática de Ma e Mp.

## Nós

Separação útil para o método: nós reais (onde ligam 3 ou mais ramos, ou componentes). Estes são os nós elétricos a ter em conta na análise do circuito.

Neste circuito temos os seguintes nós:

| Ref | $I_{Convergentes}$ | $I_{Divergentes}$ |
|---|---|---|
| gnd | $I_{2}$ | $I_{3}$, $I_{4}$, $I_{5}$ |
| node\_a | $I_{5}$ | $I_{6}$, $I_{7}$ |
| node\_b | $I_{3}$, $I_{7}$ | $I_{8}$ |
| node\_c | $I_{1}$, $I_{6}$, $I_{8}$ | $I_{9}$ |
| node\_d | $I_{4}$, $I_{9}$ | $I_{1}$, $I_{2}$ |

<details>
<summary> Visualização dos Nós </summary>

### Visualização Individual

#### Nó gnd
![Nó gnd](node-exports/03-with-circuit-combined/gnd.png)

#### Nó node_a
![Nó node_a](node-exports/03-with-circuit-combined/node_a.png)

#### Nó node_b
![Nó node_b](node-exports/03-with-circuit-combined/node_b.png)

#### Nó node_c
![Nó node_c](node-exports/03-with-circuit-combined/node_c.png)

#### Nó node_d
![Nó node_d](node-exports/03-with-circuit-combined/node_d.png)

### Visualização Geral
![Nós (sobreposição)](node-exports/nodes-combined.png)

</details>

Transferir em <strong><a href="nodes-layers.pdf" target="_blank">PDF</a></strong>.

> Dica (procedimento): Um nó elétrico corresponde a um conjunto de pontos que partilham o mesmo potencial elétrico. Num esquema, podem existir vários pontos de interligação (representados por um círculo preenchido onde se unem diferentes ramos ou componentes). No entanto, mesmo que existam vários desses pontos ligados entre si, eles só constituem nós elétricos distintos se entre eles existir um componente elétrico (por exemplo, uma resistência). Caso contrário, todos pertencem ao mesmo nó, pois estão ao mesmo potencial.

> Dica: A netlist apresenta ainda nós virtuais (onde se ligam apenas 2 ou mais componentes). Estes nós aparecem como _netN, onde N é um valor de índice numérico (e.g. _net1, _net2, etc.).
> Podemos ainda classificar os nós como nós essenciais e nós internos, conforme:
>
> - Nós essenciais (N): gnd, node_a, node_b, node_c, node_d
> - Nós internos: _net1, _net10, _net2, _net3, _net7, _net9

## Ramos

Cada ramo é definido por (noP, noN) e pelos componentes que o compõem.

| Ramo | noP | noN | Componentes |
|---|---|---|---|
| B1 | gnd | node_d | $R6=10\~\mathrm{\Omega}$ |
| B2 | node_d | gnd | $I2=90\~\mathrm{mA}, R5=20\~\mathrm{\Omega}$ |
| B3 | gnd | node_a | $E4=1\~\mathrm{V}$ |
| B4 | gnd | node_b | $I3=100\~\mathrm{mA}$ |
| B5 | node_a | node_c | $E1=2\~\mathrm{V}, R1=6\~\mathrm{\Omega}, R2=4\~\mathrm{\Omega}$ |
| B6 | node_a | node_b | $R3=8\~\mathrm{\Omega}$ |
| B7 | node_b | node_c | $E2=4\~\mathrm{V}, R4=25\~\mathrm{\Omega}$ |
| B8 | node_c | node_d | $E3=5\~\mathrm{V}, R8=15\~\mathrm{\Omega}$ |
| B9 | node_d | node_c | $I1=400\~\mathrm{mA}, R7=10\~\mathrm{\Omega}$ |

<details>
<summary> Visualização dos Ramos </summary>

### Visualização Individual

#### Ramo B1
![Ramo B1](branch-exports/03-with-circuit-combined/B1.png)

#### Ramo B2
![Ramo B2](branch-exports/03-with-circuit-combined/B2.png)

#### Ramo B3
![Ramo B3](branch-exports/03-with-circuit-combined/B3.png)

#### Ramo B4
![Ramo B4](branch-exports/03-with-circuit-combined/B4.png)

#### Ramo B5
![Ramo B5](branch-exports/03-with-circuit-combined/B5.png)

#### Ramo B6
![Ramo B6](branch-exports/03-with-circuit-combined/B6.png)

#### Ramo B7
![Ramo B7](branch-exports/03-with-circuit-combined/B7.png)

#### Ramo B8
![Ramo B8](branch-exports/03-with-circuit-combined/B8.png)

#### Ramo B9
![Ramo B9](branch-exports/03-with-circuit-combined/B9.png)

### Visualização Global
![Ramos (sobreposição)](branch-exports/branches-combined.png)

</details>

Download em <strong><a href="branches-layers.pdf" target="_blank">PDF</a></strong>.

## Malhas

O solver exporta a lista total de ciclos (totalMeshes). Em seguida, escolhe um subconjunto para resolução (chosenMeshes), classificado em Ma e Mp.

### Visualização das Malhas

Esta secção apresenta dados gráficos sobre as malhas em uso nesta resolução e todas as malhas existentes no circuito em análise.

<details>
<summary> Desenho das Malhas da Resolução </summary>

#### Malhas Auxiliares (Ma)

##### Malha Ma1
![Malha Ma1](mesh-exports/02-auxiliary/Ma1.png)

##### Malha Ma2
![Malha Ma2](mesh-exports/02-auxiliary/Ma2.png)

##### Malha Ma3
![Malha Ma3](mesh-exports/02-auxiliary/Ma3.png)

#### Malhas Principais (Mp)

##### Malha Mp1
![Malha Mp1](mesh-exports/03-principal/Mp1.png)

##### Malha Mp2
![Malha Mp2](mesh-exports/03-principal/Mp2.png)

#### Sobreposição das Malhas

![Sobreposição das Malhas](mesh-exports/04-selected-combined/selected-meshes.png)

</details>

<details>
<summary> Desenho de Todas as Malhas </summary>

#### Todas as Malhas

##### Malha M1
![Malha M1](mesh-exports/01-all-meshes/M1.png)

##### Malha M2
![Malha M2](mesh-exports/01-all-meshes/M2.png)

##### Malha M3
![Malha M3](mesh-exports/01-all-meshes/M3.png)

##### Malha M4
![Malha M4](mesh-exports/01-all-meshes/M4.png)

##### Malha M5
![Malha M5](mesh-exports/01-all-meshes/M5.png)

##### Malha M6
![Malha M6](mesh-exports/01-all-meshes/M6.png)

##### Malha M7
![Malha M7](mesh-exports/01-all-meshes/M7.png)

##### Malha M8
![Malha M8](mesh-exports/01-all-meshes/M8.png)

##### Malha M9
![Malha M9](mesh-exports/01-all-meshes/M9.png)

##### Malha M10
![Malha M10](mesh-exports/01-all-meshes/M10.png)

##### Malha M11
![Malha M11](mesh-exports/01-all-meshes/M11.png)

##### Malha M12
![Malha M12](mesh-exports/01-all-meshes/M12.png)

##### Malha M13
![Malha M13](mesh-exports/01-all-meshes/M13.png)

##### Malha M14
![Malha M14](mesh-exports/01-all-meshes/M14.png)

##### Malha M15
![Malha M15](mesh-exports/01-all-meshes/M15.png)

##### Malha M16
![Malha M16](mesh-exports/01-all-meshes/M16.png)

##### Malha M17
![Malha M17](mesh-exports/01-all-meshes/M17.png)

##### Malha M18
![Malha M18](mesh-exports/01-all-meshes/M18.png)

##### Malha M19
![Malha M19](mesh-exports/01-all-meshes/M19.png)

##### Malha M20
![Malha M20](mesh-exports/01-all-meshes/M20.png)

##### Malha M21
![Malha M21](mesh-exports/01-all-meshes/M21.png)

</details>

Transferir em <strong><a href="meshes-layers.pdf" target="_blank">PDF</a></strong>.

## Catálogo de malhas (todos os ciclos disponíveis)

A constituição de cada malha é apresentada em forma tabular.

Formato: Ref | noP | noN | Componentes. A sequência vertical corresponde à sequência de ramos ao percorrer a malha.

### Malha M1

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B1 | gnd | node_d | R6=10 Ohm |
| B2 | node_d | gnd | I2=90 mA, R5=20 Ohm |

### Malha M2

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B8 | node_c | node_d | E3=5 V, R8=15 Ohm |
| B9 | node_d | node_c | I1=400 mA, R7=10 Ohm |

### Malha M3

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B4 | gnd | node_b | I3=100 mA |
| B6 | node_a | node_b | R3=8 Ohm |
| B3 | gnd | node_a | E4=1 V |

### Malha M4

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B6 | node_a | node_b | R3=8 Ohm |
| B7 | node_b | node_c | E2=4 V, R4=25 Ohm |
| B5 | node_a | node_c | E1=2 V, R1=6 Ohm, R2=4 Ohm |

### Malha M5

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B3 | gnd | node_a | E4=1 V |
| B5 | node_a | node_c | E1=2 V, R1=6 Ohm, R2=4 Ohm |
| B7 | node_b | node_c | E2=4 V, R4=25 Ohm |
| B4 | gnd | node_b | I3=100 mA |

### Malha M6

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B3 | gnd | node_a | E4=1 V |
| B5 | node_a | node_c | E1=2 V, R1=6 Ohm, R2=4 Ohm |
| B8 | node_c | node_d | E3=5 V, R8=15 Ohm |
| B1 | gnd | node_d | R6=10 Ohm |

### Malha M7

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B3 | gnd | node_a | E4=1 V |
| B5 | node_a | node_c | E1=2 V, R1=6 Ohm, R2=4 Ohm |
| B8 | node_c | node_d | E3=5 V, R8=15 Ohm |
| B2 | node_d | gnd | I2=90 mA, R5=20 Ohm |

### Malha M8

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B3 | gnd | node_a | E4=1 V |
| B5 | node_a | node_c | E1=2 V, R1=6 Ohm, R2=4 Ohm |
| B9 | node_d | node_c | I1=400 mA, R7=10 Ohm |
| B1 | gnd | node_d | R6=10 Ohm |

### Malha M9

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B3 | gnd | node_a | E4=1 V |
| B5 | node_a | node_c | E1=2 V, R1=6 Ohm, R2=4 Ohm |
| B9 | node_d | node_c | I1=400 mA, R7=10 Ohm |
| B2 | node_d | gnd | I2=90 mA, R5=20 Ohm |

### Malha M10

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B4 | gnd | node_b | I3=100 mA |
| B7 | node_b | node_c | E2=4 V, R4=25 Ohm |
| B8 | node_c | node_d | E3=5 V, R8=15 Ohm |
| B1 | gnd | node_d | R6=10 Ohm |

### Malha M11

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B4 | gnd | node_b | I3=100 mA |
| B7 | node_b | node_c | E2=4 V, R4=25 Ohm |
| B8 | node_c | node_d | E3=5 V, R8=15 Ohm |
| B2 | node_d | gnd | I2=90 mA, R5=20 Ohm |

### Malha M12

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B4 | gnd | node_b | I3=100 mA |
| B7 | node_b | node_c | E2=4 V, R4=25 Ohm |
| B9 | node_d | node_c | I1=400 mA, R7=10 Ohm |
| B1 | gnd | node_d | R6=10 Ohm |

### Malha M13

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B4 | gnd | node_b | I3=100 mA |
| B7 | node_b | node_c | E2=4 V, R4=25 Ohm |
| B9 | node_d | node_c | I1=400 mA, R7=10 Ohm |
| B2 | node_d | gnd | I2=90 mA, R5=20 Ohm |

### Malha M14

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B3 | gnd | node_a | E4=1 V |
| B6 | node_a | node_b | R3=8 Ohm |
| B7 | node_b | node_c | E2=4 V, R4=25 Ohm |
| B8 | node_c | node_d | E3=5 V, R8=15 Ohm |
| B1 | gnd | node_d | R6=10 Ohm |

### Malha M15

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B3 | gnd | node_a | E4=1 V |
| B6 | node_a | node_b | R3=8 Ohm |
| B7 | node_b | node_c | E2=4 V, R4=25 Ohm |
| B8 | node_c | node_d | E3=5 V, R8=15 Ohm |
| B2 | node_d | gnd | I2=90 mA, R5=20 Ohm |

### Malha M16

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B3 | gnd | node_a | E4=1 V |
| B6 | node_a | node_b | R3=8 Ohm |
| B7 | node_b | node_c | E2=4 V, R4=25 Ohm |
| B9 | node_d | node_c | I1=400 mA, R7=10 Ohm |
| B1 | gnd | node_d | R6=10 Ohm |

### Malha M17

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B3 | gnd | node_a | E4=1 V |
| B6 | node_a | node_b | R3=8 Ohm |
| B7 | node_b | node_c | E2=4 V, R4=25 Ohm |
| B9 | node_d | node_c | I1=400 mA, R7=10 Ohm |
| B2 | node_d | gnd | I2=90 mA, R5=20 Ohm |

### Malha M18

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B4 | gnd | node_b | I3=100 mA |
| B6 | node_a | node_b | R3=8 Ohm |
| B5 | node_a | node_c | E1=2 V, R1=6 Ohm, R2=4 Ohm |
| B8 | node_c | node_d | E3=5 V, R8=15 Ohm |
| B1 | gnd | node_d | R6=10 Ohm |

### Malha M19

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B4 | gnd | node_b | I3=100 mA |
| B6 | node_a | node_b | R3=8 Ohm |
| B5 | node_a | node_c | E1=2 V, R1=6 Ohm, R2=4 Ohm |
| B8 | node_c | node_d | E3=5 V, R8=15 Ohm |
| B2 | node_d | gnd | I2=90 mA, R5=20 Ohm |

### Malha M20

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B4 | gnd | node_b | I3=100 mA |
| B6 | node_a | node_b | R3=8 Ohm |
| B5 | node_a | node_c | E1=2 V, R1=6 Ohm, R2=4 Ohm |
| B9 | node_d | node_c | I1=400 mA, R7=10 Ohm |
| B1 | gnd | node_d | R6=10 Ohm |

### Malha M21

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B4 | gnd | node_b | I3=100 mA |
| B6 | node_a | node_b | R3=8 Ohm |
| B5 | node_a | node_c | E1=2 V, R1=6 Ohm, R2=4 Ohm |
| B9 | node_d | node_c | I1=400 mA, R7=10 Ohm |
| B2 | node_d | gnd | I2=90 mA, R5=20 Ohm |

# Resolução passo a passo

**Objetivo:** calcular as correntes de ramo do circuito. Para isso, seguimos uma sequência fixa e organizada:

1. **Identificar a estrutura do circuito**
2. **Definir as malhas auxiliares (C)**
3. **Definir as malhas principais (M)**
4. **Aplicar a Lei das Tensões de Kirchhoff (LTK)**
5. **Resolver o sistema**
6. **Definir sentidos das correntes de ramo**
7. **Determinar as correntes de ramo reais**

## Passo 1 - Análise das variáveis do circuito

Primeiro identificamos o número de ramos (B), o número de nós essenciais (N) e o número de fontes de corrente ideais (C).

### Contagem de ramos e nós

$$
\begin{aligned}
B &= 9 \\
N &= 5 \\
C &= 3
\end{aligned}
$$

### Número de malhas principais e auxiliares

$$
\begin{aligned}
Mp &= B - (N - 1) - C = 9 - (5 - 1) - 3 = 2 \\
Ma &= C = 3
\end{aligned}
$$

> Dica (teoria): o número de malhas auxiliares é igual ao número de fontes de corrente. Cada malha auxiliar deve atravessar exatamente uma fonte de corrente.

> Verificação de consistência: o solver selecionou Mp = 2 e Ma = 3.

## Passo 2 - Seleção de malhas auxiliares (Ma)

Cada fonte de corrente deve pertencer a uma única malha auxiliar. A corrente da malha auxiliar é conhecida (é a corrente da fonte, com sinal conforme o sentido).

### Malhas escolhidas

### Malhas escolhidas para a resolução

#### Ma - Malhas auxiliares (correntes conhecidas)

- Ma1 (id da malha=1): ramos [1, 2]
- Corrente de malha conhecida: $90\~\mathrm{mA}$

- Ma2 (id da malha=2): ramos [4, 6, 3]
- Corrente de malha conhecida: $100\~\mathrm{mA}$

- Ma3 (id da malha=3): ramos [8, 9]
- Corrente de malha conhecida: $400\~\mathrm{mA}$

#### Mp - Malhas principais (correntes fictícias desconhecidas)

- Mp1 (id da malha=4): ramos [6, 7, 5] / a
- Sinais de percurso nos ramos: [1, 1, -1]
- Corrente de malha obtida: $-108,9\~\mathrm{mA}$

- Mp2 (id da malha=5): ramos [3, 5, 8, 1] / b
- Sinais de percurso nos ramos: [1, 1, 1, -1]
- Corrente de malha obtida: $-348,3\~\mathrm{mA}$

> Dica: a tabela de cada Mp mostra o percurso (sequência de ramos). É exatamente essa ordem que se usa quando escreves KVL.

##### Detalhe do percurso de Mp1

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B6 | node_a | node_b | R3=8 Ohm |
| B7 | node_b | node_c | E2=4 V, R4=25 Ohm |
| B5 | node_a | node_c | E1=2 V, R1=6 Ohm, R2=4 Ohm |

##### Detalhe do percurso de Mp2

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B3 | gnd | node_a | E4=1 V |
| B5 | node_a | node_c | E1=2 V, R1=6 Ohm, R2=4 Ohm |
| B8 | node_c | node_d | E3=5 V, R8=15 Ohm |
| B1 | gnd | node_d | R6=10 Ohm |

> Dica (prática): não faz sentido escrever KVL diretamente numa malha que contenha uma fonte de corrente ideal. Usa Ma para injetar o valor conhecido no sistema.

## Passo 3 - Seleção de malhas principais (Mp)

As malhas principais são incógnitas fictícias (não correspondem a correntes físicas, presentes no circuito) e serão as variáveis do sistema. Devem cobrir todos os ramos que não têm fontes de corrente ideais.

### Malhas escolhidas

### Malhas escolhidas para a resolução

#### Ma - Malhas auxiliares (correntes conhecidas)

- Ma1 (id da malha=1): ramos [1, 2]
- Corrente de malha conhecida: $90\~\mathrm{mA}$

- Ma2 (id da malha=2): ramos [4, 6, 3]
- Corrente de malha conhecida: $100\~\mathrm{mA}$

- Ma3 (id da malha=3): ramos [8, 9]
- Corrente de malha conhecida: $400\~\mathrm{mA}$

#### Mp - Malhas principais (correntes fictícias desconhecidas)

- Mp1 (id da malha=4): ramos [6, 7, 5] / a
- Sinais de percurso nos ramos: [1, 1, -1]
- Corrente de malha obtida: $-108,9\~\mathrm{mA}$

- Mp2 (id da malha=5): ramos [3, 5, 8, 1] / b
- Sinais de percurso nos ramos: [1, 1, 1, -1]
- Corrente de malha obtida: $-348,3\~\mathrm{mA}$

> Dica: a tabela de cada Mp mostra o percurso (sequência de ramos). É exatamente essa ordem que se usa quando escreves KVL.

##### Detalhe do percurso de Mp1

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B6 | node_a | node_b | R3=8 Ohm |
| B7 | node_b | node_c | E2=4 V, R4=25 Ohm |
| B5 | node_a | node_c | E1=2 V, R1=6 Ohm, R2=4 Ohm |

##### Detalhe do percurso de Mp2

| Ref | noP | noN | Componentes |
|---|---|---|---|
| B3 | gnd | node_a | E4=1 V |
| B5 | node_a | node_c | E1=2 V, R1=6 Ohm, R2=4 Ohm |
| B8 | node_c | node_d | E3=5 V, R8=15 Ohm |
| B1 | gnd | node_d | R6=10 Ohm |

> Dica: malhas pequenas com 2 ramos costumam corresponder a ramos em paralelo entre os mesmos nós e geram equações KVL curtas - bons candidatos para incluir entre as Mp.

## Passo 4 - Escrita das equações de malha (KVL)

Agora escrevemos as equações de malha usando a Lei de Kirchhoff das Malhas (KVL) para cada Malha Principal (Mp).

Relembra a KVL:

$$
\sum V_{\text{fontes}} = \sum R \cdot I
$$

Para sistematizar e evitar erros, devemos seguir a seguinte ordem:

1. Escrever as equações na Forma Simbólica
2. Substituir nas equações o valor de cada Malha Auxiliar
3. Substituir nas equações o valor de cada componente elétrico

> Dica (processo): Para evitar esquecimento de componentes, inicia a construção da equação num nó e termina quando regressares ao mesmo nó.

> Dica (raciocínio): Podes escrever a equação com base em cada componente. Neste caso, terás uma Equação em que os componentes ficam em Evidência.
>
> Procedimento: Percorre a malha ramo a ramo, no sentido previamente definido para a corrente de malha em análise. Em cada componente, identifica se o ramo é exclusivo dessa malha ou comum a outras malhas.
>
> - Se for exclusivo, considera apenas a corrente da própria malha.
> - Se for comum, escreve a corrente no ramo como a soma algébrica das correntes de malha que o atravessam: adiciona as correntes que tenham o mesmo sentido no ramo e subtrai as que tenham sentido oposto.
>
> Nota: Não te esqueças que tens de considerar também as correntes de Malhas Auxiliares (se existirem).

> Dica (raciocínio): Podes escrever a equação com base nas Correntes de Malha que circulam nos ramos que constituem a Malha Principal que estás a analisar. Neste caso, terás uma Equação em que as Correntes de Malha ficam em Evidência.
>
> Procedimento:
>
> 1. Escreve primeiro o termo da corrente da própria malha, multiplicando-a pela soma de todas as resistências da malha (exclusivas e comuns).
> 2. Depois acrescenta os termos das correntes das malhas vizinhas que partilham ramos com ela.
> - Soma se o sentido no ramo comum for o mesmo.
> - Subtrai se for oposto.
>
> Nota: Não te esqueças que tens de considerar também as correntes de Malhas Auxiliares (se existirem).

> Dica (raciocínio): Evita erros de sinal nas Fontes de Tensão. Ao percorreres a malha no sentido definido para a corrente:
>
> - Se atravessares a fonte do terminal negativo para o terminal positivo, estás perante uma subida de tensão, logo o termo entra com sinal positivo.
> - Se atravessares a fonte do terminal positivo para o terminal negativo, estás perante uma queda de tensão, logo o termo entra com sinal negativo.

### Equações de malha (KVL)

Abaixo é apresentada a construção da equação para cada malha principal.

#### Mp1

**Referência para Solver:** `a`

| Etapa | Equação |
|---|---|
| Forma simbólica | $$ -E2+E1=R3,(-I_{Ma2}+I_{Mp1})+R4,(I_{Mp1})+R2,(I_{Mp1}-I_{Mp2})+R1,(I_{Mp1}-I_{Mp2}) $$ |
| Substituição Ma | $$ -E2+E1=R3,(-0,1+I_{Mp1})+R4,(I_{Mp1})+R2,(I_{Mp1}-I_{Mp2})+R1,(I_{Mp1}-I_{Mp2}) $$ |
| Valores numéricos | $$ -4+2=8,(-0,1+I_{Mp1})+25,(I_{Mp1})+4,(I_{Mp1}-I_{Mp2})+6,(I_{Mp1}-I_{Mp2}) $$ |

---

#### Mp2

**Referência para Solver:** `b`

| Etapa | Equação |
|---|---|
| Forma simbólica | $$ E4-E1-E3=R1,(-I_{Mp1}+I_{Mp2})+R2,(-I_{Mp1}+I_{Mp2})+R8,(I_{Ma3}+I_{Mp2})+R6,(-I_{Ma1}+I_{Mp2}) $$ |
| Substituição Ma | $$ E4-E1-E3=R1,(-I_{Mp1}+I_{Mp2})+R2,(-I_{Mp1}+I_{Mp2})+R8,(0,4+I_{Mp2})+R6,(-90,10^{-3}+I_{Mp2}) $$ |
| Valores numéricos | $$ 1-2-5=6,(-I_{Mp1}+I_{Mp2})+4,(-I_{Mp1}+I_{Mp2})+15,(0,4+I_{Mp2})+10,(-90,10^{-3}+I_{Mp2}) $$ |

---

### Sistema de Equações Final

$$
\begin{cases}
-E2+E1=R3\cdot(-I_{Ma2}+I_{Mp1})+R4\cdot(I_{Mp1})+R2\cdot(I_{Mp1}-I_{Mp2})+R1\cdot(I_{Mp1}-I_{Mp2}) \\
E4-E1-E3=R1\cdot(-I_{Mp1}+I_{Mp2})+R2\cdot(-I_{Mp1}+I_{Mp2})+R8\cdot(I_{Ma3}+I_{Mp2})+R6\cdot(-I_{Ma1}+I_{Mp2})
\end{cases}
$$

## Passo 5 - Determinação das correntes de malha (Mp)

Resolve-se o sistema para obter as correntes de malha principais.

### Correntes de malha (resultado)

$$
\begin{aligned}
Mp_{1} &= -108,9 mA \\
Mp_{2} &= -348,3 mA
\end{aligned}
$$

> Dica (teoria): Mp são incógnitas referentes a correntes de malha fictícias (i.e., um artifício matemático para reduzir o número de equações -- não correspondem a correntes reais, físicas. Contudo, devem ser tratadas na mesma lógica que reais. Um valor negativo significa que o sentido real é oposto ao sentido assumido para a malha.

### Solver

Segue-se a informação do sistema de equações, devidamente estruturada para processamento em Python (NumPy). Estes dados destinam-se à verificação externa dos resultados obtidos.

#### Equations System

```text
0 = 4 - 2 + 8*( - 0.1 + a) + 25*(a) + 4*(a - b) + 6*(a - b)
0 =  - 1 + 2 + 5 + 6*( - a + b) + 4*( - a + b) + 15*(0.4 + b) + 10*( - 90*0.001 + b)
```
#### Solver Code

```python
import numpy as np

A = np.array([
    [43, -10],
    [-10, 35],
], dtype=complex)

b = np.array([
    -1.2,
    -11.1,
], dtype=complex)

# recebido da aplicação externa
var_names = ["a", "b"]

# resolver Ax = b
x = np.linalg.solve(A, b)

# mapear nomes -> valores
result = dict(zip(var_names, x))

# preservar a ordem externa
for name in var_names:
    val = result[name]
    if isinstance(val, complex) and abs(val.imag) > 1e-12:
        print(f"{name} = {val.real:.6f} {val.imag:+.6f}j")
    else:
        print(f"{name} = {float(val.real):.6f}")
```
## Passo 6 - Definição dos sentidos de referência para as correntes de ramo

Define uma direção de referência para cada corrente de ramo usando noP -> noN, onde noP é o nó assumido com maior potencial e noN com menor potencial.

Depois de determinadas as correntes, um valor negativo significa que a corrente real circula no sentido oposto ao arbitrado.

> Dica: a referência é arbitrária, mas tem de ser consistente com a tabela final (noP -> noN).

## Visualização das Correntes

Esta secção apresenta dados gráficos sobre as correntes dos ramos em uso nesta resolução.

<details>
<summary> Desenho das Correntes </summary>

### Visualização Independente

### Corrente I2
![Corrente I2](current-exports/03-with-circuit-combined/I2.png)

### Corrente I3
![Corrente I3](current-exports/03-with-circuit-combined/I3.png)

### Corrente I4
![Corrente I4](current-exports/03-with-circuit-combined/I4.png)

### Corrente I5
![Corrente I5](current-exports/03-with-circuit-combined/I5.png)

### Corrente I6
![Corrente I6](current-exports/03-with-circuit-combined/I6.png)

### Corrente I7
![Corrente I7](current-exports/03-with-circuit-combined/I7.png)

### Corrente I8
![Corrente I8](current-exports/03-with-circuit-combined/I8.png)

### Visualização de todas as Correntes
![Sobreposição das Correntes](current-exports/currents-combined.png)

</details>

Transferir em <strong><a href="currents-layers.pdf" target="_blank">PDF</a></strong>.

> Dica (procedimento): a referência é arbitrária, mas depois de definida, toda a análise deve ser feita com base nos sentidos arbitrados.

> Dica (procedimento): para não fazer confusão com as correntes de malha, marca as correntes no esquemático apenas depois de obteres as correntes de malha.

## Passo 7 - Determinação das correntes nos ramos

Cada corrente de ramo é calculada como soma algébrica das correntes de malha que atravessam esse ramo, respeitando os sinais (congruente vs oposto).

Nota teórica: cada corrente de ramo é obtida como a soma algébrica das correntes de malha que atravessam esse ramo (ver coluna Relação de malhas).

Nota de referência: a direção de referência da corrente de ramo é noP -> noN.

| Ramo | noP -> noN | Relação de malhas | Valor (fasor, 4 alg. sig.) | Amigável |
|---|---|---|---:|---:|
| I1 | node_d -> node_c | $I1=I\_{Ma3}$ | $400 mA$ | $400 mA$ |
| I2 | node_d -> gnd | $I2=I\_{Ma1}$ | $90 mA$ | $90 mA$ |
| I3 | gnd -> node_b | $I3=I\_{Ma2}$ | $100 mA$ | $100 mA$ |
| I4 | gnd -> node_d | $I4=I\_{Ma1}-I\_{Mp2}$ | $438,3 mA$ | $438 mA$ |
| I5 | gnd -> node_a | $I5=-I\_{Ma2}+I\_{Mp2}$ | $-448,3 mA$ | $-448 mA$ |
| I6 | node_a -> node_c | $I6=-I\_{Mp1}+I\_{Mp2}$ | $-239,4 mA$ | $-239 mA$ |
| I7 | node_a -> node_b | $I7=-I\_{Ma2}+I\_{Mp1}$ | $-208,9 mA$ | $-209 mA$ |
| I8 | node_b -> node_c | $I8=I\_{Mp1}$ | $-108,9 mA$ | $-109 mA$ |
| I9 | node_c -> node_d | $I9=I\_{Ma3}+I\_{Mp2}$ | $51,74 mA$ | $51,7 mA$ |

> Dica: confirma o sinal olhando para a congruência entre a direção da corrente de ramo (noP -> noN) e a direção de cada corrente de malha que atravessa o ramo.

# Notas rápidas de interpretação

Resumo final para consolidar a ideia física vs variável matemática.

- As correntes de malha (Mp) são incógnitas fictícias (não correspondem a correntes físicas, presentes no circuito) usadas para reduzir o número de equações.
- As correntes de ramo são resultados físicos obtidos a partir de somas algébricas de correntes de malha.
- Sinais negativos refletem o sentido relativamente às referências escolhidas.

## Notação usada nesta resolução

- Ma: corrente(s) de malha auxiliar. Uma malha auxiliar atravessa uma única fonte de corrente, logo a sua corrente de malha é conhecida.
- Mp: corrente(s) de malha principal. As correntes de malha principais são incógnitas fictícias a determinar.
- noP: nó assumido com maior potencial na referência de tensão do ramo.
- noN: nó assumido com menor potencial na referência de tensão do ramo.
- Nas tabelas de correntes de ramo, a direção de referência é noP -> noN. Um valor negativo significa que a corrente real circula no sentido oposto.

---

