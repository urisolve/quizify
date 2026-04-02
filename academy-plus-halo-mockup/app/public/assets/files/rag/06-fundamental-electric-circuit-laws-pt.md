## 6 - Leis Fundamentais dos Circuitos Elétricos

### 6.1 - Lei de Ohm

A Lei de Ohm estabelece que, para um condutor metálico, a tensão elétrica aplicada entre seus terminais é diretamente proporcional à corrente elétrica que o atravessa. A constante de proporcionalidade nessa relação é a resistência elétrica do condutor, expressa por:

$$
R = \frac{U}{I}
$$

onde:

- R é a resistência elétrica (em ohms, Ω),
- U é a tensão elétrica (em volts, V),
- I é a corrente elétrica (em ampères, A).

Uma grandeza útil em análise de circuitos é o inverso da
resistência, R, conhecida como condutância, G

$$
G = \frac{1}{R}
$$

A unidade da condutância no SI é o siemens (S) e representa a capacidade de um elemento em conduzir corrente elétrica.

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 2 (23 - 24).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 16/02/2025

### 6.2 - Lei de Kirchhoff dos nós

A Lei de Kirchhoff dos Nós (ou Lei de Kirchoff das Correntes - LKC) estabelece a conservação da carga elétrica em um circuito, afirmando que:

"A soma algébrica das correntes que concorrem num nó é nula", ou seja,

$$
\sum I = 0
$$

consequentemente, também se pode dizer que “O somatório das correntes que entram num nó é igual ao somatório das correntes que saem desse mesmo nó.”, ou seja,

$$
\sum I_{\text{entram}} = \sum I_{\text{saem}}
$$

Onde as correntes que entram no nó são consideradas positivas, e as que saem, negativas (ou vice-versa, dependendo da convenção escolhida).

Esta lei baseia-se na conservação da carga elétrica, garantindo que nenhuma carga se acumula em um nó.

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 2 (26 - 27);
- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 4 (2).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 17/02/2025

### 6.3 - Lei de Kirchhoff das malhas

A Lei de Kirchhoff das Malhas baseia-se no princípio da conservação da energia nos circuitos elétricos: "Ao longo de qualquer percurso fechado (malha) de um circuito elétrico, a soma algébrica das forças eletromotrizes (f.e.m.) é igual à soma algébrica das quedas de tensão nas resistências e outros componentes."

Matematicamente:

$$
\sum E = \sum R \cdot I + \sum U
$$

Ou, de forma equivalente, "A soma algébrica das tensões em uma malha fechada é sempre nula.".

$$
\sum U = 0
$$

Para aplicar a lei, começa-se por definir um sentido de circulação para a malha, que pode ser horário ou anti-horário. Essa escolha é arbitrária, mas deve ser mantida ao longo da análise.

Ao percorrer a malha, as tensões devem ser somadas algebricamente, levando em consideração seus sinais. Se a corrente atravessa uma resistência no sentido convencional (do potencial maior para o menor), considera-se que há uma queda de tensão, registrada com sinal negativo. Caso contrário, a tensão será positiva.

A equação da malha é obtida somando-se todas as f.e.m. e subtraindo-se as quedas de tensão nos resistores. Como resultado, a soma das tensões deve ser igual a zero, garantindo que a conservação da energia seja respeitada dentro do circuito. Caso, ao resolver o sistema de equações, alguma corrente resulte em um valor negativo, isso indica que o sentido real da corrente é o oposto ao inicialmente assumido.

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 2 (26, 29 - 30);
- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 4 (2).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 17/02/2025

### 6.4 - Teorema de Tellegen

O Teorema de Tellegen afirma que, em qualquer circuito que obedeça à Lei de Kirchhoff dos Nós e à Lei de Kirchhoff das Malhas, a soma das potências de todos os componentes do circuito é igual a zero.

$$
\sum\limits_{k=1}^{n} P_k = \sum\limits_{k=1}^{n} U_k \cdot I_k=0
$$

Por outras palavras, significa que a potência total fornecida ao circuito (por fontes de tensão e corrente) é igual à potência total absorvida pelos elementos passivos (resistores, indutores, capacitores, etc.).

$$
\sum P_{fornecida} = \sum P_{absorvida}
$$

Este teorema é particularmente útil para validar os cálculos, pois se ao analisar um circuito, a soma das potências não for zero, há um erro nos cálculos.

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 2 (32).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 18/02/2025

### 6.5 - Divisores de tensão

Em um circuito elétrico composto por resistências ligadas em série, a corrente elétrica que percorre cada uma delas é a mesma, e a soma das quedas de tensão individuais é igual à tensão total aplicada ao circuito. Esse comportamento segue diretamente a Lei de Kirchhoff das Malhas.

O conceito de divisor de tensão surge a partir dessa propriedade. Em um conjunto de resistências em série, a queda de tensão aos terminais de qualquer uma delas é igual ao produto do valor da sua resistência pelo valor da tensão aplicada ao conjunto, dividindo o resultado anterior pelo somatório do valor das resistências que compõem o circuito. Isso significa que a tensão $U_i$ nos terminais de uma resistência $R_i$ pode ser calculada como uma fração da tensão total $U$, dada pela expressão:

$$
U_i = U \times \frac{R_i}{R_{eq}}
$$

onde $R_{eq}$ é a soma de todas as resistências em série:

$$
R_{eq} = R_1 + R_2 + R_3 + ... + R_n
$$

Assim, cada resistência em série atua como um divisor de tensão, estabelecendo uma proporção fixa da tensão total aplicada ao circuito.

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 2 (49);
- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 3 (5).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 17/02/2025

### 6.6 - Divisores de corrente

Num circuito constituído por resistências ligadas em paralelo, a tensão aos terminais de cada uma delas é a mesma e a soma da intensidade de corrente eléctrica que percorre cada uma das resistências é igual à intensidade de corrente eléctrica total (de acordo com a Lei de Kirchhoff dos Nós). A corrente que passa por cada resistência é inversamente proporcional ao seu valor resistivo em relação à resistência equivalente do circuito. Assim, a corrente $I_i$ que percorre uma resistência $R_i$ pode ser calculada em função da corrente total $I_T$ pela expressão:

$$
I_i = I_T \times \frac{R_{eq}}{R_i}
$$

onde $R_{eq}$ é a resistência equivalente do conjunto, dada por:

$$
\frac{1}{R_{eq}} = \sum_{j=1}^{n} \frac{1}{R_j}
$$

Isso significa que as resistências ligadas em paralelo funcionam como divisores de corrente, distribuindo a corrente total entre os ramos do circuito. Quanto menor for a resistência de um ramo, maior será a corrente que o atravessa, e vice-versa.

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 2 (50);
- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 3 (6).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 17/02/2025
