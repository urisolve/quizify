## 8 - Teoremas de Simplificação de Circuitos Elétricos

### 8.1 - Teorema de Thévenin

O Teorema de Thévenin afirma que qualquer circuito linear com dois terminais pode ser representado por um circuito equivalente constituído por uma fonte de tensão ideal $(U_{Th})$ em série com uma resistência equivalente $(R_{Th})$. Isso simplifica a análise de circuitos, permitindo estudar o comportamento de cargas conectadas ao circuito sem considerar sua complexidade interna.

A determinação do circuito equivalente de Thévenin envolve dois passos principais:

1. Cálculo da Tensão de Thévenin $(U_{Th})$: É a tensão em circuito aberto medida entre os terminais do bipolo.
2. Cálculo da Resistência de Thévenin $(R_{Th})$: Obtida substituindo todas as fontes independentes do circuito pelos seus equivalentes:
    - Fontes de tensão independentes → curto-circuito.
    - Fontes de corrente independentes → circuito aberto.
    - Em seguida, calcula-se a resistência total vista pelos terminais.

A Ponte de Wheatstone pode estar em equilíbrio ou desequilíbrio, dependendo das relações entre suas resistências. No caso de desequilíbrio, há corrente a fluir pelo galvanômetro $(I_G)$, o que exige a simplificação do circuito utilizando o Teorema de Thévenin.

O procedimento para simplificação envolve:

- Determinar a resistência equivalente $(R_{Th})$ vista do braço onde está o galvanômetro.
- Calcular a tensão equivalente $(U_{Th})$ entre os terminais do galvanômetro.
- Utilizar a relação:

$$
I_G = \frac{U_{Th}}{R_{Th} + R_G}
$$

onde $R_G$ é a resistência interna do galvanômetro.

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 3 (38 - 42).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 19/02/2025

### 8.2 - Teorema de Norton

O Teorema de Norton afirma que qualquer circuito linear com dois terminais pode ser representado por um circuito equivalente constituído por uma fonte de corrente ideal $(I_{N})$ em paralelo com uma resistência equivalente $(R_{N})$.

A determinação do circuito equivalente de Norton envolve dois passos principais:

1. Cálculo da Corrente de Norton $(I_{N})$: É a corrente de curto-circuito entre os terminais do bipolo.
2. Cálculo da Resistência de Norton $(R_N)$: Obtida anulando todas as fontes independentes e determinando a resistência total vista pelos terminais.

O Teorema de Norton e o Teorema de Thévenin são equivalentes, sendo possível converter um no outro pela relação:

$$
U_{Th} = I_N \cdot R_N
$$

$$
R_N = R_{Th}
$$

Esta equivalência facilita a análise e simplificação de circuitos elétricos.

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 3 (43).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 19/02/2025

### 8.3 - Teorema da máxima transferência de potência

Em muitas situações práticas, um circuito é desenhado para fornecer potência a uma carga e é desejável maximizar a potência fornecida à carga. O Teorema da Máxima Transferência de Potência permite determinar as condições ideais para que isso aconteça, utilizando o equivalente de Thévenin.

Para um dado circuito representado pelo seu equivalente de Thévenin, com uma tensão de Thévenin $(U_{Th})$ e uma resistência interna $(R_{Th})$, a potência fornecida à carga $(R_L)$ é dada por:

$$
P_L=R_L \cdot I^2 = R_L(\frac{U_{Th}}{R_{Th}+R_L})^2
$$

Para determinar a carga que maximiza a potência recebida, é necessário derivar a equação da potência em relação a $R_L$ e encontrar o seu valor máximo. Após realizar esse cálculo, chega-se à conclusão de que:

$$
R_L = R_{Th}
$$

Ou seja, a potência transferida para a carga é máxima quando a resistência da carga iguala a resistência de Thévenin vista dos terminais da carga $(R_L = R_{Th})$.

Quando essa condição é satisfeita, a potência máxima transferida para a carga é dada por:

$$
P_{Lmax} = \frac{U_{Th}^2}{4 R_{Th}}
$$

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 3 (46 - 49).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025

### 8.4 - Teorema de Millman

O Teorema de Millman estabelece que um circuito que contenha múltiplas fontes de tensão em paralelo pode ser simplificado para uma única fonte equivalente de tensão associada a uma resistência equivalente, em que:

$$
E_{eq} = \frac{G_1 E_1 + G_2 E_2 + ... + G_k E_k}{G_1 + G_2 + ... + G_k}
$$

onde G representa a condutância, que é o inverso da resistência dado por:

$$
G=\frac{1}{R}
$$

a condutância equivalente do circuito é obtida somando as condutâncias individuais:

$$
G_{eq} = G_1 + G_2 + ... + G_k
$$

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 3 (51);

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025

### 8.5 - Teorema da Substituição

Se a tensão ou a corrente de qualquer ramo de um circuito for conhecida, o ramo pode ser substituído por qualquer combinação desses elementos desde que a tensão e a corrente permaneçam os mesmos no ramo.

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 3 (53).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025

### 8.6 - Teorema da Reciprocidade

Num circuito, se uma fonte de tensão num ramo A produz uma corrente em qualquer outro ramo B, então a mesma fonte de tensão a atuar no ramo B produziria a mesma corrente no ramo A.

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 3 (55).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025
