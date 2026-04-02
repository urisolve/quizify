## 3 - Componentes e Interligação de Circuitos Elétricos

### 3.1 - Resistências

As resistências de carvão, ou carbono, são componentes fixos que possuem um valor de resistência determinado durante a sua fabricação. São compostas por uma mistura de carbono e material isolante, representado por um código de cores padronizado pela norma IEC 60062 para indicar o seu valor. Este código é formado por faixas coloridas que representam os dígitos significativos, o fator multiplicador e a tolerância da resistência.

- Preto (0) – Multiplicador ×1
- Castanho (1) – Multiplicador ×10, Tolerância ±1%
- Vermelho (2) – Multiplicador ×100, Tolerância ±2%
- Laranja (3) – Multiplicador ×1.000
- Amarelo (4) – Multiplicador ×10.000
- Verde (5) – Multiplicador ×100.000, Tolerância ±0.5%
- Azul (6) – Multiplicador ×1.000.000, Tolerância ±0.25%
- Violeta (7) – Multiplicador ×10.000.000, Tolerância ±0.1%
- Cinzento (8) – Multiplicador ×100.000.000, Tolerância ±0.05%
- Branco (9) – Multiplicador ×1.000.000.000
- Dourado – Multiplicador ×0.1, Tolerância ±5%
- Prateado – Multiplicador ×0.01, Tolerância ±10%
- Sem cor – Tolerância ±20%

Esse código pode ser composto por 4, 5 ou 6 bandas coloridas, sendo que a maioria das resistências utilizadas em experiências laboratoriais possui 4 bandas coloridas, de acordo com o seguinte código de cores (da esquerda para a direita):

1. A 1ª banda representa o primeiro algarismo significativo do valor da resistência.
2. A 2ª banda representa o segundo algarismo significativo do valor da resistência.
3. A 3ª banda indica o fator multiplicativo, ou seja, a potência de base 10 a ser aplicada.
4. A 4ª banda indica a tolerância, ou seja, a variação percentual do valor nominal.

Quando o código de cores é composto por 5 bandas, a leitura segue o mesmo princípio das resistências de 4 bandas, mas inclui um terceiro algarismo significativo, proporcionando uma maior precisão na determinação do valor da resistência.

Já as resistências com 6 bandas seguem a mesma estrutura das de 5 bandas, mas incluem uma faixa adicional que representa o coeficiente de temperatura (TCR - Temperature Coefficient of Resistance), expresso em ppm/°C. Esse coeficiente indica a variação da resistência com a temperatura, sendo relevante em aplicações que exigem alta estabilidade térmica.

Os potenciómetros e trimmers são resistências variáveis, permitindo ajustar o valor da resistência conforme necessário. Os potenciómetros possuem um eixo rotativo que pode ser ajustado manualmente para alterar a resistência em tempo real. Já os trimmers são versões normalmente mais pequenas destinadas a ajustes finos durante a calibração de circuitos e não são frequentemente ajustados após a instalação.

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 2 (38 - 39);
- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 2 (3);
- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 1 (1 - 4).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 16/02/2025

### 3.2 - Bobinas (indutâncias)

Uma bobina é um fio condutor enrolado de forma a constituir um conjunto de N espiras circulares, todas do mesmo raio, centradas sobre o mesmo eixo e situadas em planos paralelos.

Uma espira de uma bobina é um  condutor dobrado como uma espira, que quando percorrido por por uma corrente elétrica produz um campo electromagnético com linhas de força circulares e concêntricas, sendo criados dois polos magnéticos (N e S). A força deste campo magnético é proporcional à corrente elétrica que circula no condutor.

No caso da bobina ser atravessada por uma corrente elétrica, esta cria um campo magnético uniforme e intenso no seu interior, sendo que a força deste campo magnético é proporcional ao número de espiras da bobina.

A bobina armazena energia sob a forma de um campo magnético, semelhante ao condensador que também armazena energia, mas sob a forma de campo elétrico.

As bobinas são utilizadas em eletroímanes, relés de comando, filtros passivos de primeira ordem, instrumentos de medição eletromecânicos, sensores de posição, deslocamento e RPM, altifalantes, motores (CC, CA, etc…), geradores (CC, CA), transformadores (CA), fontes de alimentação lineares e comutadas, entre outras aplicações.

O coeficiente de autoindução ou indutância, representado por $L$, é a característica principal de uma bobina e representa a sua capacidade de armazenar/gerar energia elétrica. Quanto maior for o $L$, maior é a capacidade de acumular/gerar energia.

A indutância de uma bobina depende de várias características, tais como a geometria da bobina (comprimento, diâmetro das espiras, nº de espiras, etc.) e as propriedades magnéticas do seu núcleo e é dada pela seguinte expressão:

$$
L=\mu A \frac{N^2}{l}
$$

onde:

- $\mu = \mu_0 \times \mu_r$, corresponde à permeabilidade do núcleo que pode ser determinada pelo produto da permeabilidade no vácuo com a permeabilidade relativa do material;
- $A$, corresponde à área das espiras;
- $N$, corresponde ao número de espiras;
- $l$, corresponde ao comprimento da bobina, (o comprimento da bobina é diferente do comprimento do condutor, o comprimento da bobina é medido desde o início da primeira espira até à última espira).

A indutância tem como unidade o Henry (símbolo $H$).

Quando uma corrente $i(t)$ que passa pela bobina varia, é induzida uma força contraeletromotriz $e(t)$ na bobina, também designada de força eletromotriz de autoindução e é dada pela Lei de Lenz:

$$
e(t) = -L \frac{\partial i(t)}{\partial t}
$$

Dessa forma é possível determinar a tensão $u(t)$ que é o simétrico da força eletromotriz:

$$
u(t) = -e(t) = L \frac{\partial i(t)}{\partial t}
$$

Uma bobina real apresenta resistência devido ao efeito Joule no condutor, além de possuir capacidades parasitas entre espiras adjacentes, as quais podem ter impacto a altas frequências.

O fator de qualidade $Q$ de uma bobina relaciona-se com as suas perdas e é dado por:

$$
Q = \frac{\omega L}{R} = 2\pi f \frac{L}{R}
$$

,sendo que um fator de qualidade maior indica menores perdas.

O tipo de núcleo pode variar, sendo possível utilizar núcleos de ar, ferro, pó de metal, ferrite, entre outros. A simbologia utilizada para representar as bobinas pode indicar se possuem núcleo de ar ou material ferromagnético, para além disso podem também diferenciar entre indutâncias fixas ou variáveis.

A indutância nominal pode apresentar tolerâncias e a corrente nominal/máxima admissível é uma característica importante da bobina.

No que respeita à associação de bobinas:

- Em série, as tensões somam-se e a indutância equivalente de uma associação de bobinas em série é igual à soma das indutâncias individuais:
    
    $$
    L_{eq} = L_1 + L_2 + \dots + L_N
    $$
    
- Em paralelo, as correntes somam-se e a o inverso da indutância equivalente de uma associação de bobinas em paralelo é igual à soma dos inversos das indutâncias individuais:
    
    $$
    \frac{1}{L_{eq}} = \frac{1}{L_1} + \frac{1}{L_2} + \dots + \frac{1}{L_N}
    $$
    

A relação entre a tensão $u(t)$ e a corrente $i(t)$ numa bobina ideal (sem resistência) é dada por:

$$
u(t) = L \frac{\partial i(t)}{\partial t}
$$

Uma corrente constante no tempo não induz tensão nos terminais da bobina. Já uma variação rápida da corrente pode provocar picos de tensão nos terminais da bobina, o que pode causar problemas como arcos elétricos e danos em componentes.

Para prevenir esses problemas, podem ser utilizados condensadores em paralelo (para filtrar picos) ou díodos de freewheeling (para desviar os picos de tensão).

##### Metadados

**Fonte**:

- Mário Alves e Francisco Pereira; (março de 2024); Slides TCIRC Capítulo 4 (3 - 17).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 10/03/2025

### 3.3 - Condensadores (capacitâncias)

Um condensador é um dispositivo capaz de armazenar cargas elétricas, constituído por duas armaduras (ou placas) condutoras, separadas por um material isolante, também designado de dielétrico.

A capacidade de um condensador, representada por $C$, é a sua principal característica e determina a quantidade de carga elétrica que o condensador pode armazenar para uma determinada tensão.

Quando um condensador é submetido a uma diferença de potencial, ocorre a acumulação de cargas elétricas em suas armaduras, sendo uma carregada positivamente e a outra negativamente, com o mesmo valor absoluto. Essa carga armazenada gera um campo elétrico no dielétrico do condensador.

O condensador armazena energia sob a forma de um campo elétrico, semelhante à bobina, que armazena energia sob a forma de um campo magnético.

Os condensadores são utilizados em diversas aplicações, como circuitos de acoplamento, para proteger componentes sensíveis a picos de tensão, correção do fator de potência, temporizadores, memórias digitais, fontes de energia, entre outras.

A capacidade de um condensador depende de diversas características, como a geometria das armaduras e as propriedades do dielétrico, sendo dada pela expressão:

$$
C=\varepsilon \frac{A}{d}
$$

onde:

- $\varepsilon = \varepsilon_0 \times \varepsilon_r$, corresponde à permitividade do dielétrico, sendo o produto da permitividade no vácuo com a permitividade relativa do material;
- $A$, corresponde à área das armaduras;
- $d$, corresponde à distância entre as armaduras.

A unidade de capacidade é o Farad (símbolo $F$), sendo mais comuns os seus submúltiplos: microfarad ($\mu F$), nanofarad ( $nF$) e picofarad ($pF$).

No mundo real, os condensadores apresentam resistências de fuga e perdas dielétricas, além de possuírem capacidades parasitas entre condutores próximos.

Os condensadores podem ser construídos com diferentes tipos de dielétricos, como papel, mica, plástico, cerâmico, entre outros. A simbologia utilizada nos esquemas elétricos pode indicar se um condensador é polarizado ou não, bem como se possui capacidade fixa ou variável.

A capacidade nominal de um condensador pode apresentar tolerâncias, e sua tensão nominal/máxima admissível é uma característica importante para sua seleção e aplicação.

No que respeita à associação de condensadores:

- Em série, as cargas armazenadas são iguais, a tensão adiciona-se e o inverso da capacidade equivalente de uma associação série de condensadores é igual à soma dos inversos das capacidades individuais (é idêntico ao paralelo de resistências):

$$
\frac{1}{C_{eq}}=\frac{1}{C_1} + \frac{1}{C_2}+ \dots + \frac{1}{C_N} = \sum^N_{n=1}{1/C_n}
$$

- Em paralelo, a tensão é a mesma para todos os condensadores, e a capacidade equivalente de um conjunto de condensadores ligados em paralelo é igual à soma das capacidades individuais (é idêntico à série de resistências):

$$
C_{eq}=C_1 +C_2 + \dots + C_N = \sum^N_{n=1}{C_n}
$$

A relação entre a tensão $u(t)$ e a corrente $i(t)$ num condensador ideal (sem perdas) é dada por:

$$
u(t)=\frac{1}{C} \int{i(t) \partial t}
$$

Uma corrente constante no tempo não altera a carga do condensador, comportando-se este como um circuito aberto. Já uma variação rápida de tensão pode provocar picos de corrente, o que pode causar problemas como aquecimento excessivo e danos em componentes.

Para prevenir esses problemas, podem ser utilizadas bobinas em série (para limitar a taxa de variação da corrente) ou resistências em paralelo (para descarregar o condensador de forma controlada).

##### Metadados

**Fonte**:

- Mário Alves e Francisco Pereira; (março de 2023); Slides TCIRC Capítulo 3 (3 - 18).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 10/03/2025

### 3.4 - Fontes de alimentação em corrente contínua

Uma fonte de tensão linear é um equipamente que transforma corrente alternada (CA) da rede elétrica em corrente contínua (CC), fornecendo tensão e corrente apropriadas para uma determinada aplicação, respeitando os limites de potência máxima da fonte. As fontes de alimentação podem operar como fontes de tensão ou de corrente.

Uma fonte ideal de tensão mantém uma tensão constante nos seus terminais, independentemente da corrente fornecida. Num modelo ideal, não existem perdas internas, ou seja, toda a potência elétrica gerada é transferida para a carga com 100% de rendimento. No entanto, em curto-circuito, esta característica resultaria em uma corrente infinita, o que é fisicamente impossível.

O curto-circuito ocorre quando os terminais de um bipolo estão ligados por uma resistência nula. Nesse caso, a tensão entre os terminais é zero, mas a corrente pode ser diferente de zero se houver fontes internas. Ainda assim, a potência elétrica trocada com o exterior é nula.

Uma fonte ideal de corrente fornece uma corrente constante, independentemente da tensão nos seus terminais. Para manter essa característica sob qualquer condição, a resistência interna e a tensão interna da fonte precisariam ser infinitas, o que não é viável na prática. Em circuito aberto, isso resultaria em uma tensão infinita, o que é igualmente impossível.

Um circuito aberto ocorre quando um bipolo não está conectado a nenhuma carga externa, ou seja, a sua resistência equivalente é infinita. Nesse cenário, a corrente nos terminais é nula, mas a tensão pode ser diferente de zero se houver fontes internas no bipolo. No entanto, a potência elétrica trocada com o exterior será sempre nula.

Uma fonte real de tensão pode ser modelada como uma fonte ideal de tensão E em série com uma resistência interna. A tensão de saída da fonte diminui conforme a corrente aumenta, sendo igual a E apenas quando não há corrente (circuito aberto). Quanto menor for a resistência interna, mais a fonte se aproxima do comportamento ideal.

Uma fonte real de corrente pode ser modelada como uma fonte ideal de corrente em paralelo com uma resistência interna. A corrente de saída não é perfeitamente constante, pois varia conforme a tensão aplicada aos terminais. Quanto maior for o valor da resistência interna, mais a fonte se aproxima do comportamento ideal.

Uma fonte real de tensão pode ser convertida em uma fonte real de corrente $I_{cc}$ equivalente e vice-versa. Para que sejam equivalentes, devem fornecer a mesma tensão e corrente para uma carga conectada. Assim, uma fonte de tensão com E e $R_i$ em série pode ser representada por uma fonte de corrente com $I_{cc} = E / R_i$ em paralelo com $R_i$.

As fontes de tensão podem ser associadas em série ou em paralelo para aumentar sua capacidade:

- Em série aumenta a f.e.m. total do sistema, somando as tensões das fontes. É necessário respeitar as polaridades para que as tensões se somem corretamente. A resistência interna equivalente será a soma das resistências internas das fontes.
- Em paralelo permite aumentar a corrente máxima disponível. Para isso, as f.e.m. das fontes devem ser iguais e as suas polaridades devem ser respeitadas. A resistência equivalente será a associação em paralelo das resistências internas das fontes.

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 2 (16, 58 - 75);
- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 1 (4 - 5).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 18/02/2025

### 3.5 - Baterias

As baterias são dispositivos que produzem uma tensão contínua, a partir de reacções químicas. Estes dispositivos são fáceis de utilizar e têm a vantagem de estarem electricamente isolados das
alimentações dos outros aparelhos. Contudo, têm duas desvantagens significativas: Cada bateria apenas fornece um valor de tensão, que vai diminuindo com a sua utilização e a energia eléctrica fornecida por baterias, sobretudo pelas não recarregáveis, é mais cara do que a energia que pode ser fornecida por outras fontes de alimentação.

A capacidade de uma bateria define a sua capacidade energética, onde a capacidade da bateria ($A \cdot h$, ampere-hora), é igual à corrente de descarga $(I)$ a multiplicar pelo tempo de descarga $(t)$.

Em teoria, uma bateria de $x\, A \cdot h$ consegue debitar (aproximadamente):

- $x \, A$ durante 1 hora;
- $x/10 \, A$ durante 10 horas.

Contudo existem aspetos práticos que alteram este comportamento.

Dada a força eletromotiz de uma bateria, sabendo a sua capacidade pode determinar-se a sua energia (em Joule, J)

$$
P=U \cdot I = W =U \cdot I \cdot t = U \times C_{bat}
$$

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides TCIRC Capítulo 2 (76 - 77).
- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 1 (10).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025

### 3.6 - Breadboard

As placas de montagem permitem realizar ligações entre componentes, tais como resistências, condensadores, bobinas, díodos, etc., com relativa facilidade. São normalmente utilizadas nas fases de projeto e teste de circuitos electrónicos, antes de se executar a placa de circuito impresso.
Todos os terminais (orificios) têm internamente um sistema de mola que facilita o contacto eléctrico com o fio de ligação. Os terminais encontram-se ligados electricamente em grupos (colunas ou linhas).

É muito frequente haver marcações (linhas azuis/vermelhas) na placa que simbolizam os barramentos logitudinais que são recomendados para interligar os terminais da fonte de alimentação e os diversos componentes (e.g. barramento vermelho para o positivo e barramento azul para o negativo/massa) para facilitar a percepção do esquema de ligações da breadboard.

Os barramentos longitudinais são também indicados para ligação de outros tipos de sinais (períodicos ou não) a serem aplicados ao circuito.

##### Metadados

**Fonte**:

- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 1 (8 -9).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025

### 3.7 - Acessórios de ligação

Existe uma multiplicidade enorme de equipamentos acessórios, nomeadamente no que respeita à cablagem para interligar electricamente os componentes dos circuitos eléctricos, e estes últimos a fontes de alimentação e instrumentos de medição.

Os principais tipos de acessórios de ligação são:

1. Cabos Banana – Utilizados principalmente para conexões às fontes de alimentação e multímetros, de forma a garantir uma ligação de fácil manuseio.
2. Cabos Crocodilo – Ideais para conexões temporárias, pois premite prender componentes e fios sem necessidade de soldar.
3. Pontas de Prova para Multímetros – Tem uma ponta fina, o que facilita na medição dos componentes num circuito.
4. Cabos de Conexão BNC – Usados em equipamentos de medição, como osciloscópios e geradores de sinais.
5. Pontas de Prova para Osciloscópio – Utilizadas para a leitura das grandezas de um circuito elétrico num osciloscópio, cada ponta de prova normalmente contém um uma ponta em forma de gancho que permite acoplar ao circuito e também uma ponta crocodilo para a massa.

##### Metadados

**Fonte**:

- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 1 (11).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025
