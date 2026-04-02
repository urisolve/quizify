## 2 - Terminologia de Circuitos Elétricos

### 2.1 - Carga elétrica

A origem dos fenómenos elétricos está associada à existência de forças elétricas entre cargas elétricas. Essas forças, observadas experimentalmente, demonstram que certos objetos podem se atrair ou repelir devido à presença de cargas elétricas, levando à identificação de dois tipos fundamentais de carga: a carga elétrica positiva e a carga elétrica negativa.

A interação entre estas cargas segue um princípio simples: as cargas de sinais opostos atraem-se, exercendo uma força de atração mútua, enquanto que as cargas com o mesmo sinal repelem-se, exercendo uma força de repulsão. 

A unidade de medida da carga elétrica no Sistema Internacional (SI) é o coulomb $(C)$, que representa a quantidade de carga transportada por uma corrente elétrica de um ampère em um segundo.

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 1 (4).

**Validação**: João Ferreira

**Versão**: 1.1

**Última atualização**: 07/03/2025

### 2.2 - Tensão elétrica

A tensão elétrica (U), também conhecida por diferença de potencial (ddp), queda de tensão ou diferença de tensão, é a grandeza que quantifica a troca de energia eléctrica entre um componente e o restante do circuito. A tensão eléctrica representa a quantidade de energia eléctrica transferida por unidade de carga ao atravessar um elemento do circuito. Matematicamente, a tensão eléctrica é dada pela relação:

$$
U=\frac{W}{Q}
$$

onde (W) é a energia eléctrica trocada em joules, símbolo J e Q é a carga eléctrica envolvida em coulombs, símbolo C.

No Sistema Internacional de Unidades (SI), a unidade de medida da tensão elétrica é o volt (V). Um volt corresponde à tensão necessária para que uma carga de 1 coulomb transfira 1 joule de energia eléctrica  $1V = 1J/1C$

A tensão sempre se estabelece entre dois pontos de um circuito, seguindo o sentido do potencial maior para o menor. Dependendo do componente analisado:

- Em cargas eléctricas (como resistências), a corrente flui no mesmo sentido da tensão.
- Em fontes de tensão (como pilhas e baterias), a corrente e a tensão possuem sentidos opostos, pois a fonte fornece energia ao circuito.

Nota: Uma fonte de tensão pode estar a funcionar em carga, no caso de estar a receber energia (exemplo, bateria em carregamento).

Uma fonte de tensão é essencialmente caracterizada pela sua força eletromotriz (f.e.m.), que é a razão entre a energia eléctrica fornecida e a carga transportada. Além disso, todas as fontes possuem uma resistência ou impedância interna que pode influenciar a distribuição da tensão no circuito.

##### Metadados

**Fonte**: 

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 2 (17 - 20).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 15/02/2025


### 2.3 - Corrente elétrica

Os eletrões livres em um condutor movem-se de forma aleatória. No entanto, quando sujeitos a um campo elétrico, esse movimento desordenado torna-se orientado, dando origem à intensidade de corrente elétrica, ou corrente elétrica.

Por convenção, o sentido da corrente elétrica (sentido positivo) é oposto ao movimento dos eletrões, ou seja, do polo positivo (+) para o negativo (-). Esse sentido corresponde ao deslocamento de cargas positivas e segue a direção dos potenciais elétricos decrescentes.

A intensidade da corrente elétrica, símbolo $I$, é definida como a quantidade de carga elétrica, símbolo $Q$, que atravessa a secção reta de um condutor por unidade de tempo, símbolo $t$, sendo expressa matematicamente por:

$$
I=\frac{dQ}{dt}
$$

No Sistema Internacional de Unidades (SI), a unidade de medida da corrente elétrica é o ampere, símbolo $A$, onde 1 ampère equivale à passagem de 1 coulomb de carga elétrica por segundo, $1A=1C/1s$.

Supondo que um número n de eletrões atravessam a secção reta S de um condutor durante um intervalo de tempo t, sendo que a carga elementar do eletrão é $q_0=-1,602\times10^{-19} C$,  a carga total transportada pode ser calculada por:

$$
Q=n.q_0
$$

Assim, a intensidade da corrente elétrica pode ser expressa por $I=Q/t$

##### Metadados

**Fonte:** 

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 1 (9 - 11).

**Validação:** João Ferreira

**Versão:** 1.1

**Última edição:** 07/03/2025

### 2.4 - Resistência elétrica e resistividade

Durante o movimento dos eletrões num condutor, mesmo que ordenado, ocorrem colisões entre os eletrões e as partículas do material. Essas colisões dificultam a passagem da corrente elétrica, caracterizando a resistência elétrica do condutor. Como consequência, parte da energia elétrica é convertida em calor, aumentando a temperatura do material, fenómeno denominado Efeito de Joule.

O aumento da temperatura intensifica a agitação térmica dos eletrões, provocando um maior número de colisões e, consequentemente, um aumento da resistência elétrica do condutor. Essa propriedade depende de diversos fatores, como o tipo de material, o comprimento e a secção reta do condutor.

A resistência elétrica (R) de um condutor de comprimento l (m), secção reta S ($m^2$) e resistividade ρ $(\Omega.m)$ é dada por:

$$
R=\rho\frac{l}{S}
$$

onde $\rho$, cujo valor pode ser consultado em tabelas, é caracteristico de cada material e está relacionado com a resistência de um segmento de condutor de comprimento l e secção reta S.

A resistividade varia com a temperatura, sendo expressa pela relação:

$$
\rho = \rho_0 [1 + \alpha (T - T_0)]
$$

onde:

- $\rho_0$ é a resistividade à temperatura de referência, $T_0$
- $\alpha$ é o coeficiente de variação da resistividade com a temperatura,
- T é a temperatura do material.

No Sistema Internacional de Unidades (SI), a resistência elétrica é medida em ohms (Ω). Um ohm é definido como a resistência de um condutor quando uma diferença de potencial de 1 volt aplicada entre seus terminais produz uma corrente de 1 ampere:

$$
1\Omega = \frac{1V}{1A}
$$

A Lei de Ohm estabelece a relação entre a diferença de potencial (U) aplicada a um condutor e a corrente elétrica (I) que o atravessa:

$$
R = \frac{U}{I}
$$

A resistência elétrica pode ser fixa ou variável. Entre os dispositivos que utilizam resistências variáveis estão:

- Reóstatos e potenciómetros, que permitem ajustes manuais do valor da resistência;
- Transdutores resistivos, cujas resistências variam em resposta a grandezas físicas, como:
    - Termoresistências e termistores (variação com a temperatura);
    - Fotoresistências (resistência sensível à luz);
    - Piezoresistências (resistência varia com a pressão ou força aplicada).

##### Metadados

**Fonte**: 

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 1 (13 - 16);
- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 1 (1 - 2).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 15/02/2025

### 2.5 - Tipos de materiais condutores

Os materiais elétricos podem ser classificados em condutores, isoladores, semicondutores e supercondutores, dependendo da sua capacidade de permitir a passagem da corrente elétrica. 

A resistividade elétrica $(\rho)$, expressa em ohm metro $(\Omega \cdot m)$, é a grandeza que caracteriza essa oposição à condução.

Os materiais condutores possuem eletrões livres que se movem facilmente sob a ação de um campo elétrico, apresentando baixa resistividade. São exemplos o cobre, alumínio, prata, ouro, mercúrio e algumas soluções iónicas. 

Os materiais isoladores possuem eletrões fortemente ligados ao núcleo, dificultando o deslocamento da corrente elétrica. Entre os materiais isolantes encontram-se a madeira, borracha e vidro.

Os semicondutores, como o silício e o germânio, apresentam resistividade intermediária e, no estado puro, comportam-se como isolantes. No entanto, podem ser polarizados (P, N) para construir componentes eletrónicos (díodos, transístores) e controlar a sua capacidade de condução.

Os supercondutores, por sua vez, reduzem a resistividade com a temperatura e, abaixo de um determinado valor crítico próximo do zero absoluto $0K$, tornam-se condutores perfeitos, permitindo a passagem de corrente sem perdas.

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 1 (8 e 18);
- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 2 (1).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 16/02/2025

### 2.6 - Potência elétrica

A potência elétrica (P) representa a quantidade de energia elétrica transferida ou dissipada por um componente do circuito por unidade de tempo. Em corrente contínua (CC), onde a tensão e a corrente mantêm valores constantes ao longo do tempo, a potência é calculada como:

$$
P = U \cdot I
$$

onde:

- P é a potência elétrica (em watts, W),
- U é a tensão elétrica (em volts, V),
- I é a corrente elétrica (em amperes, A).

Quando a corrente percorre uma resistência, parte da energia elétrica é convertida em calor devido à resistência do material. Aplicando a Lei de Ohm $(U = R \cdot I)$, a potência dissipada também pode ser expressa das seguintes formas:

$$
P = I^2 \cdot R
$$

$$
P = \frac{U^2}{R}
$$

onde R é a resistência elétrica do componente, medida em ohms (Ω).

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 2 (25).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 16/02/2025
