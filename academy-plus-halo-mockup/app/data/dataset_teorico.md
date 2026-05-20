## 2 - Terminologia de Circuitos Elétricos

### 2.1 - Carga elétrica

A origem dos fenómenos elétricos está associada à existência de forças elétricas entre cargas elétricas. Essas forças, observadas experimentalmente, demonstram que certos objetos podem se atrair ou repelir devido à presença de cargas elétricas, levando à identificação de dois tipos fundamentais de carga: a carga elétrica positiva e a carga elétrica negativa.

A interação entre estas cargas segue um princípio simples: as cargas de sinais opostos atraem-se, exercendo uma força de atração mútua, enquanto que as cargas com o mesmo sinal repelem-se, exercendo uma força de repulsão. 

A unidade de medida da carga elétrica no Sistema Internacional (SI) é o coulomb $(C)$, que representa a quantidade de carga transportada por uma corrente elétrica de um ampère em um segundo.

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

### 2.5 - Tipos de materiais condutores

Os materiais elétricos podem ser classificados em condutores, isoladores, semicondutores e supercondutores, dependendo da sua capacidade de permitir a passagem da corrente elétrica. 

A resistividade elétrica $(\rho)$, expressa em ohm metro $(\Omega \cdot m)$, é a grandeza que caracteriza essa oposição à condução.

Os materiais condutores possuem eletrões livres que se movem facilmente sob a ação de um campo elétrico, apresentando baixa resistividade. São exemplos o cobre, alumínio, prata, ouro, mercúrio e algumas soluções iónicas. 

Os materiais isoladores possuem eletrões fortemente ligados ao núcleo, dificultando o deslocamento da corrente elétrica. Entre os materiais isolantes encontram-se a madeira, borracha e vidro.

Os semicondutores, como o silício e o germânio, apresentam resistividade intermediária e, no estado puro, comportam-se como isolantes. No entanto, podem ser polarizados (P, N) para construir componentes eletrónicos (díodos, transístores) e controlar a sua capacidade de condução.

Os supercondutores, por sua vez, reduzem a resistividade com a temperatura e, abaixo de um determinado valor crítico próximo do zero absoluto $0K$, tornam-se condutores perfeitos, permitindo a passagem de corrente sem perdas.

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

## 5 - Conceitos Fundamentais de Circuitos Elétricos

### 5.1 - Circuito elétrico

Um circuito elétrico é um sistema interligado fechado com fontes de alimentação (de tensão ou de corrente), cargas (como resistências, lâmpadas, motores) e condutores elétricos. Pode também conter outros dispositivos, como interruptores e fusíveis.

Quando se fala de um circuito linear, isso significa que todos os componentes presentes no circuito são lineares. Por outras palavras, as relações entre tensão e corrente seguem comportamentos previsíveis, como os apresentados pelas leis de Ohm. Basta um dos elementos não ser linear que o circuito será classificado como não linear.

Em um circuito de corrente contínua (CC), a corrente flui de forma unidirecional e permanece constante ao longo do tempo. A corrente e a tensão são mantidas em valores estáveis, o que caracteriza o comportamento típico de um circuito de CC.

Para o estudo analítico de um circuito elétrico, é comum utilizar uma representação esquemática, um desenho que mostra todos os componentes do circuito e a forma como estão interligados eletricamente. Para isso, é essencial definir uma simbologia padronizada que permita representar de forma clara as fontes de energia, condutores, cargas e outros dispositivos, facilitando a análise e compreensão do circuito.


### 5.2 - Ramos

Um ramo é um conjunto de um ou mais componentes elétricos conectados em série, delimitado por dois nós. Em circuitos elétricos, cada ramo representa um caminho único e contínuo para a passagem da corrente elétrica.

No caso particular de um circuito composto por um único ramo (ou malha), não há a presença de nós, pois todos os componentes estão conectados em sequência sem ramificações.

### 5.3 - Malhas

Uma malha num circuito elétrico é um caminho fechado formado por um conjunto de componentes e ramos, onde a corrente pode circular sem cruzar o mesmo ponto mais de uma vez.

Cada malha representa um percurso independente para a circulação de corrente, o que é fundamental para a aplicação das Leis de Kirchhoff.

### 5.4 - Nós

Um nó num circuito elétrico é um ponto onde três ou mais ramos se interligam.

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

## 7 - Método da corrente nas malhas

O método das correntes nas malhas (MCM) baseia-se na Lei de Kirchhoff das Malhas, onde as incógnitas são as correntes associadas às malhas linearmente independentes do circuito. Essas correntes são fictícias, isto é, não representam diretamente grandezas físicas presentes no circuito, mas servem como incógnitas intermediárias que reduzem o número de equações necessárias para a resolução do sistema. 

As correntes reais dos ramos são obtidas, numa fase posterior, pela soma algébrica das correntes de malha que passam por cada ramo. O sistema de equações base é dado por $M=R-(N-1)$, onde $R$ representa o número de ramos e $N$ o número de nós. Quando o circuito contém fontes ideais de corrente ou ramos com correntes já conhecidas, o sistema é ajustado para $M=R-(N-1) - C$, sendo $C$ o número de fontes de corrente, onde cada fonte deve pertencer a uma única malha auxiliar, e as demais malhas, denominadas malhas principais, devem cobrir todos os ramos sem fontes ideais de corrente. Para a aplicação sistemática do método, segue-se o algoritmo abaixo:

1. Contar e identificar os $R$ ramos e os $N$ nós do circuito, calculando o número de malhas principais por meio da equação $M=R-(N-1) - C$;
2. Selecionar e marcar $C$ malhas auxiliares, cada uma delas passando numa única fonte de corrente (ou ramo cuja corrente seja previamente conhecida), atribuindo à corrente da malha o valor da corrente dessa fonte e, preferencialmente, o seu sentido (se for sentido contrário, a corrente de malha passa a ser negativa);
3. Identificar e assinalar graficamente as $M$ malhas restantes, arbitrando um sentido para cada corrente de malha fictícia $(I_{M_1},I_{M_2}, \dots, I_{M_M})$, de forma que todas as malhas cubram os ramos do circuito, excetuando aqueles que contêm fontes de corrente;
4. Construir as $M$ equações de malha utilizando a Lei das Malhas, considerando a influência das correntes de malha sobre cada carga;
5. Resolver o sistema de $M$ equações para determinar os valores das correntes de malha $(I_{M_1},I_{M_2}, \dots, I_{M_M})$;
6. Atribuir um sentido arbitrário para as correntes nos ramos $(I_1, I_2, \dots, I_R)$;
7. Calcular as correntes reais nos ramos através da soma algébrica das correntes de malha que os percorrem, somando aquelas que têm o mesmo sentido que o corrente arbitrado para o ramo e subtraindo as que possuem sentido oposto.

Dessa forma, o método das correntes nas malhas permite obter uma solução completa do circuito ao transformar o problema num sistema com menos equações e incógnitas, tornando a análise especialmente eficiente para circuitos complexos. 

Quando o circuito contém somente fontes ideais de tensão, o método pode ser aplicado sem modificações; no entando, a presença de fontes de corrente requer a aplicação das adaptações descritas, o que resulta numa abordagem mais simplificada e direcionada à obtenção dos valores das correntes nos ramos.