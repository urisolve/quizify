## 5 - Conceitos Fundamentais de Circuitos Elétricos

### 5.1 - Circuito elétrico

Um circuito elétrico é um sistema interligado fechado com fontes de alimentação (de tensão ou de corrente), cargas (como resistências, lâmpadas, motores) e condutores elétricos. Pode também conter outros dispositivos, como interruptores e fusíveis.

Quando se fala de um circuito linear, isso significa que todos os componentes presentes no circuito são lineares. Por outras palavras, as relações entre tensão e corrente seguem comportamentos previsíveis, como os apresentados pelas leis de Ohm. Basta um dos elementos não ser linear que o circuito será classificado como não linear.

Em um circuito de corrente contínua (CC), a corrente flui de forma unidirecional e permanece constante ao longo do tempo. A corrente e a tensão são mantidas em valores estáveis, o que caracteriza o comportamento típico de um circuito de CC.

Para o estudo analítico de um circuito elétrico, é comum utilizar uma representação esquemática, um desenho que mostra todos os componentes do circuito e a forma como estão interligados eletricamente. Para isso, é essencial definir uma simbologia padronizada que permita representar de forma clara as fontes de energia, condutores, cargas e outros dispositivos, facilitando a análise e compreensão do circuito.

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 2 (4 - 5).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 18/02/2025


### 5.2 - Ramos

Um ramo é um conjunto de um ou mais componentes elétricos conectados em série, delimitado por dois nós. Em circuitos elétricos, cada ramo representa um caminho único e contínuo para a passagem da corrente elétrica.

No caso particular de um circuito composto por um único ramo (ou malha), não há a presença de nós, pois todos os componentes estão conectados em sequência sem ramificações.

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 2 (10).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 17/02/2025

### 5.3 - Malhas

Uma malha num circuito elétrico é um caminho fechado formado por um conjunto de componentes e ramos, onde a corrente pode circular sem cruzar o mesmo ponto mais de uma vez.

Cada malha representa um percurso independente para a circulação de corrente, o que é fundamental para a aplicação das Leis de Kirchhoff.

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 2 (12).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 16/02/2025

### 5.4 - Nós

Um nó num circuito elétrico é um ponto onde três ou mais ramos se interligam.

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 2 (11).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 16/02/2025

### 5.5 - Associação de componentes

A associação de componentes em circuitos elétricos pode ocorrer de duas formas principais: em série e em paralelo.

Na associação em série, os componentes são conectados sequencialmente, formando um único caminho para a corrente elétrica. Assim, todos os componentes pertencem ao mesmo ramo e são percorridos pela mesma corrente. A resistência equivalente $(R_{eq})$ em uma associação em série é dada pela soma das resistências individuais:

$$
R_{eq} = R_1 + R_2 + R_3 + ... + R_n
$$

A tensão total aplicada é a soma das tensões individuais em cada componente, de acordo com a Lei de Ohm. Como consequência, a resistência equivalente em série é sempre maior do que qualquer uma das resistências individuais.

Na associação em paralelo, os componentes compartilham os mesmos pontos de entrada e saída de corrente, ou seja, a mesma tensão elétrica. No entanto, a corrente divide-se entre os diferentes ramos de acordo com a resistência de cada um. A resistência equivalente é determinada pela soma dos inversos das resistências individuais:

$$
\frac{1}{R_{eq}} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3} + ... + \frac{1}{R_n}
$$

Como resultado, a resistência equivalente em paralelo é sempre menor do que qualquer uma das resistências individuais.

Casos particulares incluem:

- Duas resistências em paralelo:

$$
R_{eq} = \frac{R_1 R_2}{R_1 + R_2}
$$

- Várias resistências de mesmo valor em paralelo:

$$
R_{eq} = \frac{R}{n}
$$

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 2 (8 - 9, 34 - 37);
- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 3 (2 - 4).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 17/02/2025

### 5.6 - Associações triângulo-estrela e estrela-triângulo

A conversão entre associações estrela (Y) e triângulo (Δ) é um método fundamental na análise de circuitos elétricos, que permite a simplificação de circuitos complexos onde a resistência equivalente não pode ser determinada apenas com associações em série ou paralelo.

A equivalência entre as duas configurações baseia-se no fato de que, para qualquer conexão externa aplicada aos nós do circuito, as tensões e correntes devem permanecer as mesmas em ambas as formas, o que significa que a resistência equivalente entre quaisquer dois nós da associação estrela deve ser a mesma que entre os mesmos nós na associação triângulo.

Seguindo esse raciocínio, derivam-se as seguintes expressões, para converter uma ligação estrela (Y) para triângulo (Δ):

$$
R_A = \frac{R_1 R_2 + R_2 R_3 + R_3 R_1}{R_1}
$$

$$
R_B = \frac{R_1 R_2 + R_2 R_3 + R_3 R_1}{R_2}
$$

$$
R_C = \frac{R_1 R_2 + R_2 R_3 + R_3 R_1}{R_3}
$$

O mesmo raciocínio para converter uma ligação triângulo (Δ) para estrela (Y):

$$
R_1 = \frac{R_A R_B}{R_A + R_B + R_C}
$$

$$
R_2 = \frac{R_B R_C}{R_A + R_B + R_C}
$$

$$
R_3 = \frac{R_C R_A}{R_A + R_B + R_C}
$$

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 2 (41 - 47).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 18/02/2025
