# Fundamentos de circuitos elétricos

## 1 - Sistemas de Unidades

### 1.1 - Unidades SI

O Sistema Internacional de Unidades (SI) é a norma global utilizada para medições, que garante precisão e consistência nas áreas da ciência, tecnologia, engenharia e matemática (STEM). O SI é representado por 7 unidades elementais, que atualmente se baseiam em constantes universais, sendo que estas conseguem representar dimensionalmente qualquer outra unidade. As 7 unidades elementais são:

1. O Tempo, representado por, segundo, símbolo $s$, definido pela frequência da transição hiperfina no estado fundamental não perturbado do átomo de césio 133, $\Delta vCs$, sendo 9 192 631 770 quando expresso na unidade $Hz$, que é igual a $s^{-1}$;
2. O Comprimento, representado por, metro, símbolo $m$, definido pelo valor numérico fixo da velocidade da luz no vácuo, c, sendo 299 792 458 quando expresso na unidade $ms^{-1}$, em que o segundo é definido em termos da frequência do césio, $\Delta vCs$;
3. A Massa, representada por, quilograma, símbolo $kg$, definida pelo valor numérico fixo da constante de Planck, sendo $6,62607015 \times 10^{-34}$, quando expresso na unidade $Js$, que é igual a $kgm^2s^{-1}$, onde o metro e o segundo são definidos em termos de $c$ e $\Delta vCs$.
4. A Corrente eléctrica, representada por, ampere, símbolo $A$, definido pelo valor numérico fixo da carga elementar, $e$,  sendo $1,602176634 \times 10^{-19}$, quando expresso na unidade $C$, que é igual a $As$, onde o segundo é definido em termos de $\Delta vCs$.
5. A Temperatura termodinâmica, representada por, kelvin, símbolo $K$, definida pelo valor numérico fixo da constante de Boltzmann, $k$, sendo $1,380649 \times 10 ^{-23}$, quando expresso na unidade $JK^{-1}$, que é igual a $kgm^2s^{-2}K^{-1}$, onde o quilograma, metro e segundo são definidos em termos de $h$, $c$ e $\Delta vCs$.
6. A Quantidade de matéria, representada por, mole, símbolo $mol$, definida pelo valor numérico fixo do número de Avogadro, $N_A$, sendo $6,02214076 \times 10^{23}$ entidades elementares. A quantidade de matéria, símbolo $n$, de um sistema é uma medida do número de entidades elementares especificadas. Uma entidade elementar pode ser um átomo, uma molécula, um ião, um eletrão, qualquer outra partícula ou grupo especificado de partículas.
7. A Intensidade luminosa, representada por, candela, símbolo $cd$, definida pelo valor numérico fixo da eficácia luminosa da radiação monocromática a $540 \times 10^{12} \, Hz$$Kcd$, sendo $683$ quando expressa na unidade $ImW^{-1}$, que é igual a $cd sr W^{-1}$ , ou $cd sr kg^{-1} m^{-2} s^3$ , onde o quilograma, metro e segundo são definidos em termos de $h$, $c$ e $\Delta vCs$.


##### Metadados

**Fonte**: 

- Bureau International des Poids et Mesures; (dezembro 2022); SI Brochure - English version; (127 - 140);
- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 1 (11);
- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); FEELE Slides Capítulo 1; (20 - 21, 25 - 27, 30).

**Validação**: João Ferreira

**Versão**: 1.1

**Última atualização**: 06/03/2025

### 1.2 - Múltiplos e submúltiplos

Os múltiplos e submúltiplos decimais das unidades do SI permitem expressar valores em escalas apropriadas para diferentes contextos científicos, tecnológicos e do dia a dia. Estes múltiplos e submúltiplos são representados por prefixos padronizados, que variam de $10^{-30}$ a $10^{30}$, de forma a garantir clareza e consistência nas medições:

Múltiplos:

- Deca, símbolo $da$, fator $10^1$;
- Hecto, símbolo $h$, fator $10^2$;
- Quilo, símbolo $k$, fator $10^3$;
- Mega, símbolo $M$, fator $10^6$;
- Giga, símbolo $G$, fator $10^{9}$;
- Tera, símbolo $T$, fator $10^{12}$;
- Peta, símbolo $P$, fator $10^{15}$;
- Exa, símbolo $E$, fator $10^{18}$;
- Zetta, símbolo $Z$, fator $10^{21}$;
- Yotta, símbolo $Y$, fator $10^{24}$;
- Ronna, símbolo $R$, fator $10^{27}$;
- Quetta, símbolo $Q$, fator $10^{30}$.

Submúltiplos:

- Deci, símbolo $d$, fator $10^{-1}$;
- Centi, símbolo $c$, fator $10^{-2}$;
- Mili, símbolo $m$, fator $10^{-3}$;
- Micro, símbolo $\mu$, fator $10^{-6}$;
- Nano, símbolo $n$, fator $10^{-9}$;
- Pico, símbolo $p$, fator $10^{-12}$;
- Femto, símbolo $f$, fator $10^{-15}$;
- Atto, símbolo $a$, fator $10^{-18}$;
- Zepto, símbolo $z$, fator $10^{-21}$;
- Yocto, símbolo $y$, fator $10^{-24}$;
- Ronto, símbolo $r$, fator $10^{-27}$;
- Quecto, símbolo $q$, fator $10^{-30}$.

Cada prefixo é representado por um nome e um símbolo, que se unem diretamente ao símbolo da unidade, sem espaços. A notação segue um padrão:

- Os prefixos de múltiplos, com fator $10^1$ ou superior, são representados por símbolos em letras maiúsculas, com exceção o deca, com símbolo da, hecto, com símbolo h e quilo, com símbolo k;
- Os prefixos de submúltiplos, com fator $10^{-1}$ ou inferior, são representados por símbolos em letras minúsculas.
- Os nomes dos prefixos são escritos em letras minúsculas, exceto no início de frases.

Os prefixos são inseparáveis das unidades às quais estão associados, formando novos símbolos e nomes que podem ser combinados para expressar grandezas derivadas. Exemplos incluem: milímetro, com símbolo $mm$; megawatt, com símbolo $MW$ e gigabyte, com símbolo $GB$. Contudo, não é permitido combinar dois prefixos na mesma unidade, por exemplo, "micromilímetro" não é uma designação válida.

Uma exceção dentro do SI é o quilograma, com símbolo $kg$, que já contém um prefixo "quilo" em sua denominação. Para formar os seus múltiplos e submúltiplos, o prefixo é adicionado ao grama, símbolo $g$, e não ao quilograma, resultando por exemplo em miligrama, símbolo $mg$, em vez de “microquilograma” (µkg).

Além disso, os prefixos do SI referem-se estritamente a potências de 10 e não devem ser usados para representar potências de 2. Para aplicações que envolvem a informática e o armazenamento digital, existem prefixos binários específicos:

- kibi, símbolo Ki, fator $2^{10}$;
- mebi, símbolo Mi, fator $2^{20}$;
- gibi, símbolo Gi, fator $2^{30}$;
- tebi, símbolo Ti, fator $2^{40}$;
- pebi, símbolo Pi, fator $2^{50}$;
- exbi, símbolo Ei, fator $2^{60}$;
- zebi, símbolo Zi, fator $2^{70}$;
- yobi, símbolo Yi, fator $2^{80}$.

##### Metadados

**Fonte**: 

- Bureau International des Poids et Mesures; (dezembro 2022); SI Brochure - English version; (143 - 144);
- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 1 (12);
- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); FEELE Slides Capítulo 1; (23 - 24).

**Validação**: João Ferreira

**Versão**: 1.2

**Última atualização**: 06/03/2025

### 1.3 - Algarismos significativos

Os Algarismos Significativos são os dígitos relevantes em medições e cálculos baseados em medições, representam os valores corretos e com significado, excluindo zeros à esquerda. Quando um número é escrito em notação científica, a quantidade de algarismos significativos permanece a mesma, pois esta forma somente altera a sua representação final, sem modificar a precisão real.

Ao lidar com medições, é essencial determinar quais algarismos devem ser mantidos no resultado final, pois valores excessivos podem sugerir uma precisão que não existe, enquanto valores insuficientes podem comprometer a confiabilidade da informação.

O arredondamento é utilizado para garantir que os resultados dos cálculos baseados em medições sejam coerentes com a precisão dos valores utilizados. Quando se arredonda um número, este deve ser aproximado ao valor mais próximo dentro da escala utilizada, garantindo que o resultado final reflita com a incerteza associada à medição original.

Um caso particular ocorre quando o último dígito a ser descartado é exatamente 5. Nestes casos, é comum adotar um critério em que o número final seja arredondado para o dígito par mais próximo.

Numa medição ou cálculo, desconhecem-se os algarismos à direita do digito menos significativo, sendo que por vezes pode ser atribuído a um número uma quantidade de algarismos significativos insuficientes, esta quantidade pode ser influenciada pelo tipo de instrumento utilizado para realizar a medição. Nos instrumentos digitais, o número de dígitos exibidos determina diretamente o número de algarismos significativos do valor apresentado. Nos instrumentos analógicos, a precisão depende da escala do equipamento e da capacidade do observador em interpretar corretamente os valores indicados.

Em algumas situações, certos números são considerados como tendo um número infinito de AS, pois são valores exatos sem incerteza associada. Isso ocorre, por exemplo, quando um número representa uma contagem definida, sem margem de erro, ou quando é um valor exato dentro de uma relação matemática conhecida.

Na apresentação de resultados baseados em medições, é recomendável o uso do símbolo de aproximação para indicar que o valor possui incerteza associada. Isso é especialmente importante em contextos científicos e de engenharia, onde todas as medições e cálculos são, em essência, aproximações da realidade.

Ao realizar cálculos que envolvem valores medidos, é necessário aplicar regras que garantam que a precisão do resultado seja compatível com a dos números envolvidos na operação.

Na adição e subtração, a quantidade de casas decimais no resultado deve ser limitada pela menor precisão entre os valores utilizados. Ou seja, o resultado final não pode ter mais casas decimais do que o número menos preciso presente na operação.

Na multiplicação e divisão, a quantidade de algarismos significativos no resultado deve ser igual à do número menos preciso envolvido na operação. Isso significa que, independentemente do número de dígitos que apareçam nos cálculos intermédios, o valor final deve ser ajustado para manter a coerência com a precisão original dos dados utilizados.

##### Metadados

**Fonte**:

- Mário Alves, Ana Viana e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 4 (68 - 74).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025

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

## 4 - Equipamentos de Teste e Medição

### 4.1 - Classificação dos instrumentos de medição

Os instrumentos de medição podem ser classificados de acordo com a forma como apresentam a indicação dos valores medidos.

Nos instrumentos analógicos, a indicação é uma função contínua do valor da grandeza medida. Isso significa que o valor pode variar de forma suave e contínua, sem saltos discretos, sendo geralmente representado por um ponteiro sobre uma escala graduada.

Já os instrumentos digitais fornecem a medição sob a forma numérica, exibindo diretamente o valor num display. Como consequência, a indicação ocorre em saltos discretos, dependendo da resolução do dispositivo.

Segundo o Vocabulário Internacional de Metrologia (VIM 2012), entende-se por instrumento de medição: “Dispositivo utilizado para realizar medições, individualmente ou associado a um ou mais dispositivos suplementares” e indicação: “Valor fornecido por um instrumento de medição”.

Há uma grande variedade de instrumentos destinados à medição de grandezas elétricas, incluindo:

- Voltímetro – mede tensão elétrica
- Amperímetro – mede corrente elétrica
- Ohmímetro – mede resistência elétrica
- Wattímetro – mede potência elétrica
- Contador de energia elétrica – mede o consumo de energia
- Frequencímetro – mede frequência de sinais elétricos
- Fasímetro – mede o ângulo de fase entre sinais
- Capacímetro – mede capacitância
- Ponte/Medidor RLC – mede resistência, indutância e capacitância
- Osciloscópio – exibe formas de onda elétricas ao longo do tempo
- Analisador de Espectro – analisa sinais elétricos em diferentes frequências
- Analisador Lógico – utilizado para visualizar sinais digitais
- Busca-pólos – dispositivo simples para identificar presença de tensão
- Multímetro - combina diversas funções num único dispositivo

##### Metadados

**Fonte**:

- Mário Alves, Ana Viana e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 4 (24 - 28).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 18/02/2025

### 4.2 - Simbologia dos Instrumentos de medição


### 4.3 - Método de medição por "comparação" - Ponte de Wheatstone

O método de medição por comparação é um caso particular dos métodos de medição diretos, onde a grandeza a ser medida é comparada com outra do mesmo tipo, mas com valor conhecido. Este método pode ser dividido em dois principais tipos: método por substituição e método por zero.

No método por substituição, a grandeza desconhecida é substituída por uma grandeza de mesmo tipo, cujo valor é conhecido. A substituição é feita de forma que o efeito no dispositivo indicador permaneça inalterado.

Já no método por zero, o valor da grandeza a medir é determinado por equilíbrio, ajustando uma ou várias grandezas, de valores conhecidos, associadas à grandeza a medir por uma relação de equilíbrio conhecida.

Um exemplo clássico desse método são as balanças de dois pratos, onde pesos conhecidos são adicionados ou removidos até que se alcance o equilíbrio e, assim, se determine o peso do objeto.

No contexto elétrico, a Ponte de Wheatstone é um dispositivo que segue esse princípio, ajustando resistências até que a corrente em um galvanômetro seja nula, permitindo determinar com alta precisão o valor de uma resistência desconhecida.

As Pontes de Medição são circuitos amplamente utilizados para medir grandezas elétricas, como resistência, capacitância e indutância. Algumas das mais conhecidas incluem:

- Ponte de Wheatstone – utilizada para medir resistências
- Ponte de Sauty e de Shering – para medições de capacitância
- Ponte de Maxwell e de Owen – para medições de indutância

Além disso, essas pontes são frequentemente usadas como circuitos de condicionamento de sinal em sensores e transdutores elétricos.

A Ponte de Wheatstone, em particular, é um método altamente preciso para a medição de resistência, com incertezas muito pequenas, geralmente na faixa de 0,01% a 0,5%. Modelos comerciais desse instrumento são capazes de medir uma ampla faixa de resistências, desde valores muito baixos $(m \Omega)$ até valores elevados $(M \Omega)$.

A Ponte de Wheatstone opera com base no princípio do equilíbrio elétrico. O circuito contém quatro resistências organizadas em uma configuração de ponte, e um galvanômetro que mede a diferença de potencial entre dois pontos.

- Quando a corrente no galvanômetro é zero, significa que a ponte está em equilíbrio, e assim pode-se determinar a resistência desconhecida por meio de uma relação matemática entre as resistências do circuito.
- Em pontes comerciais, algumas resistências são ajustáveis para facilitar a obtenção do equilíbrio, permitindo a medição com alta precisão.
- De modo geral, três resistências do circuito são conhecidas e ajustáveis, enquanto a quarta resistência, desconhecida, é determinada quando o equilíbrio é alcançado.

Para obter o valor da resistência desconhecida, utiliza-se um fator multiplicativo e uma Caixa de Décadas, que contém seletores ajustáveis para definir um valor preciso. O número de décadas disponíveis na caixa corresponde ao número de algarismos significativos na medição final.

##### Metadados

**Fonte**:

- Mário Alves, Ana Viana e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 4 (90 - 97).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025

### 4.4 - Ohmmímetro

O ohmímetro é um instrumento de medição que permite medir diretamente uma resistência eléctrica.
Devido ao seu princípio de funcionamento, o ohmímetro só deve ser ligado aos terminais de um
componente (cuja resistência eléctrica se pretende medir) depois desse componente ter sido
desligado do circuito de que faz parte.

##### Metadados

**Fonte**:

- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 1 (8).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025

### 4.5 - Voltímetro

O voltímetro é um instrumento de medição utilizado para determinar a diferença de potencial elétrico (tensão) entre dois pontos de um circuito. Este deve ser sempre conectado em paralelo aos pontos onde se deseja medir a tensão.

Os voltímetros são projetados para ter uma resistência interna elevada, geralmente na ordem das centenas de kΩ ou até dezenas de MΩ, de forma a minimizar a corrente desviada do circuito e reduzindo o chamado “efeito de carga”.

A resistência interna de um voltímetro pode ser determinada de diferentes maneiras:

- Nos voltímetros analógicos a resistência interna é obtida a partir da resistência específica (resistência por volt – Ω/V).
- Nos voltímetros digitais a resistência interna é especificada no manual do fabricante.

Caso necessário, em ambos os casos, a resistência interna de um voltímetro pode ser medida diretamente com um ohmímetro.

A gama de medição de um voltímetro define o intervalo de valores de tensão que pode medir. Tipicamente, os voltímetros comuns permitem medições desde alguns milivolts (mV) até centenas de volts (V), sendo frequente o limite máximo de 600-750 V.

A seleção da gama pode ser realizada:

- Manualmente, através de um comutador rotativo.
- Automaticamente, em modelos com a função "auto-range", que pode ser ajustada para o modo manual, se necessário.

As gamas típicas para voltímetros de uso comum são: 200 mV, 2 V, 20 V, 200 V, 750 V.

Os voltímetros utilizam um aparelho de medição de corrente (AMC), como um microamperímetro, miliamperímetro ou galvanômetro, para medir a tensão de forma indireta. A medição é feita controlando a corrente que passa pelo AMC com o uso de resistências em série.

Para ampliar a gama de medição de um voltímetro, é necessário adicionar uma resistência em série com o AMC. Dessa forma, a tensão total do voltímetro (U) pode ser obtida pela expressão:

$$
U = I \cdot (R + R_{AMC})
$$

onde:

- U é a tensão medida,
- I é a corrente que passa pelo AMC,
- R é a resistência adicional,
- $R_{AMC}$ é a resistência interna do AMC.

Partindo desta equação, pode-se também saber qual o valor da resistência adicional necessária para atingir uma determinada gama de medição é determinada pela expressão:

$$
R = \frac{U}{I} - R_{AMC}
$$

Para permitir múltiplas gamas de medição no mesmo instrumento, podem ser utilizadas resistências selecionáveis em série. Em um voltímetro com várias gamas, diferentes resistências adicionais são combinadas para ajustar a medição conforme necessário.

A relação entre a tensão total do voltímetro e a tensão no AMC pode ser descrita pelo divisor de tensão:

$$
U_{AMC} = U \cdot \frac{R_{AMC}}{R + R_{AMC}}
$$

Sendo que o fator de multiplicação da resistência adicional é dado por:

$$
n = \frac{U}{U_{AMC}} = \frac{R_{AMC} + R}{R_{AMC}}
$$

##### Metadados

**Fonte**:

- Mário Alves, Ana Viana e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 4 (4 - 6, 17 - 20);
- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 1 (7).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 19/02/2025

### 4.6 - Amperímetro

O amperímetro é um instrumento de medição utilizado para determinar a intensidade da corrente elétrica num circuito. Para realizar a medição corretamente, este deve ser sempre conectado em série no ramo onde se deseja medir a corrente.

Para minimizar interferências no circuito, os amperímetros são projetados com uma resistência interna reduzida (alguns ohms), de forma a evitar quedas de tensão significativas e reduzindo o chamado “efeito de carga”.

A gama de medição de um amperímetro define o intervalo de valores de corrente que este pode medir. Amperímetros comuns operam em faixas desde miliampères (mA) até dezenas de ampères (A), sendo típicos os limites de 10-20 A.

A seleção da gama pode ser realizada:

- Manualmente, por meio de um comutador rotativo.
- Automaticamente, em modelos com função "auto-range".

Gamas típicas para amperímetros de uso comum são: 2 mA, 20 mA, 200 mA, 2 A, 20 A.

Os amperímetros utilizam um aparelho de medição de corrente (AMC), que pode ser um microamperímetro, miliamperímetro ou galvanômetro, para detectar pequenas correntes. Para permitir a medição de correntes mais elevadas, é necessário o uso de resistências de shunt em paralelo com o AMC, de forma a dividir a corrente corretamente.

A corrente total medida $(I_T)$ está relacionada à corrente no AMC $(I_{AMC})$ e à resistência do shunt $(R_S)$ pela equação do divisor de corrente:

$$
I_{AMC} = I_T \cdot \frac{R_S}{R_S + R_{AMC}}
$$

O fator multiplicador do shunt (m) é dado por:

$$
m = \frac{R_S + R_{AMC}}{R_S}
$$

Para dimensionar a resistência do shunt, utiliza-se a relação:

$$
R_S = \frac{R_{AMC}}{m - 1}
$$

onde:

- $R_S$ é a resistência do shunt,
- $R_{AMC}$ é a resistência interna do AMC,
- m é o fator multiplicador necessário para a gama de medição desejada.

As resistências de shunt são construídas com materiais de baixa resistência e coeficiente de temperatura reduzido, como a manganina (liga de cobre, manganês e níquel), garantindo estabilidade na medição.

Os shunts podem ser:

- Internos, quando integrados ao amperímetro.
- Externos, quando conectados diretamente no circuito e ligados ao AMC.

Para amperímetros com múltiplas gamas de medição, diferentes resistências de shunt são associadas a um comutador, permitindo a seleção da resistência adequada para cada faixa de corrente. O dimensionamento dos shunts deve ser efetuado em conjunto, garantindo que cada resistência atenda à faixa de medição correspondente.

##### Metadados

**Fonte**:

- Mário Alves, Ana Viana e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 4 (4 - 15);
- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 1 (7 - 8).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 19/02/2025

### 4.7 - Efeito de carga de voltímetros e amperímetros



### 4.8 - Wattímetro

O wattímetro é um instrumento de medição que se destina a medir a potência eléctrica. Pode ser
analógico ou digital, sendo que, internamente, o que qualquer deles faz é medir a tensão aos
terminais e a corrente que passa numa carga e multiplicá-las de forma a obter a potência – $(P=U \cdot I)$.

##### Metadados

**Fonte**:

- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 1 (8).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025

### 4.9 - Multímetro

O Multímetro é um instrumento de medição que permite medir diferentes grandezas elétricas, nomeadamente: corrente elétrica, tensão elétrica, resistência elétrica. Permite efetuar medições de correntes e de tensões, em corrente alternada sinusoidal e em corrente contínua.

##### Metadados

**Fonte**:

- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 1 (7).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 16/02/2025


### 4.10 - Incertezas de medição


### 4.11 - Gerador de sinais

Os geradores de funções, ou de sinais, são equipamentos que geram sinais eléctricos (normalmente períodicos) com a forma, frequência e amplitude pretendidas. No mercado existe uma grande
variedade de geradores de sinais. Os mais simples são os chamados osciladores, que apenas geram
sinais sinusoidais.

##### Metadados

**Fonte**:

- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 1 (5).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025

### 4.12 - Osciloscópio

O osciloscópio é um instrumento de medição utilizado para visualizar e analisar a evolução de sinais elétricos no tempo. 

Com um osciloscópio, é possível medir diversas características dos sinais, como valores de pico, pico-a-pico, valores eficazes, componentes contínuas e alternadas; medir características temporais como período, frequência, tempo de subida e duty-cycle e, quando dois sinais são analisados simultaneamente, pode-se determinar diferenças entre eles, como desfasamento e ganho. Dependendo do modelo e da marca do osciloscópio, é possível realizar análises mais avançadas, como filtragem de ruído, análise espectral e transformadas matemáticas, como a FFT, que facilita a visualização das componentes de frequência do sinal.

Os osciloscópios podem ser classificados como analógicos ou digitais. Os modelos analógicos, agora obsoletos, utilizavam tubos de raios catódicos (CRT) e eletrónica analógica para gerar a imagem do sinal na tela. Já os modelos digitais, mais corretamente chamados de “amostragem”, convertem o sinal de entrada para valores discretos, permitindo armazenamento, processamento digital e uma série de funcionalidades avançadas. Como ambos os tipos de osciloscópios mostram a evolução do sinal de entrada ao longo do tempo (indicação analógica), logo ambos são instrumentos de medição analógicos.

Para que um sinal seja exibido corretamente no osciloscópio, é fundamental que o sistema de sincronismo, conhecido como trigger, esteja ajustado adequadamente. O trigger permite estabilizar a forma de onda exibida na tela, garantindo que a mesma repetição do sinal seja mostrada continuamente. Se o varrimento não for disparado sempre no mesmo instante, a imagem resultante será instável e difícil de interpretar. O trigger é configurado através da definição de um nível de disparo e de uma inclinação, que determinam em que ponto e em qual direção do sinal (subida ou descida) o osciloscópio iniciará a varredura. Nos modelos digitais, existem modos avançados de trigger que permitem identificar eventos específicos, como picos, falhas no sinal e comportamentos anômalos, além de possibilitar o modo de varrimento único, que "congela" o sinal na tela, facilitando a análise de eventos que ocorrem apenas uma vez, como a carga de um capacitor.

Entre as especificações técnicas de um osciloscópio, algumas características são comuns a todos os modelos, como a largura de banda, $(MHz-GHz)$, o número de canais de entrada (1, 2, 4, 6), a sensibilidade vertical (mín. 1–2 mV/div, máx. 2–100 V/div) e as incertezas de medição (entre 0,1% e 3%).
Nos modelos digitais, fatores como a frequência de amostragem (MS/s–GS/s), a resolução vertical  (8–12 bits) e o comprimento do registo (kB–MB) são determinantes para a qualidade da análise do sinal. Além disso, características como a presença de um ecrã colorido, interfaces de conectividade USB, Wi-Fi e Ethernet, e recursos de processamento por software são outros fatores que diferem no custo dos modelos mais modernos.

Em osciloscópios convencionais de bancada, a massa do circuito interno é conectada ao terceiro terminal da tomada de alimentação, garantindo que fique no mesmo potencial da terra da instalação elétrica. No entanto, em osciloscópios portáteis, a massa pode ser "flutuante", ou seja, não está diretamente conectada à terra, o que permite medições em locais onde há diferenças de potencial entre a massa do circuito e a terra. Há também modelos em que cada canal possui uma massa independente, possibilitando medições diferenciais sem interferência.

Para medições de tensão, são comuns as pontas de prova passivas, que funcionam como divisores de tensão e estão disponíveis em diferentes fatores de atenuação, como 1X, 10X, 100X e 1000X. Para medições de sinais muito fracos, pontas de prova ativas com pré-amplificação são utilizadas, pois apresentam maior impedância de entrada e reduzem o efeito de carga no circuito sob teste. Para medições de corrente, as pontas podem ser do tipo transformador de intensidade, que funcionam apenas com sinais alternados, ou do tipo que utilizam sensores de efeito Hall, que permitem medições tanto de corrente contínua quanto alternada.

Existem diversos tipos de osciloscópios no mercado, sendo os mais comuns os modelos digitais de bancada, que variam desde opções de baixo custo até equipamentos de alta gama utilizados em laboratórios especializados. Osciloscópios portáteis são uma opção prática para medições em campo e geralmente possuem integração com aplicações para computador e dispositivos móveis. Já os osciloscópios baseados em PC utilizam placas de aquisição de dados internas ou módulos externos conectados a um computador, permitindo que todo o processamento e análise das formas de onda seja realizado por software.

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides TCIRC Capítulo 2 (3 - 30).
- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 1 (6).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 18/02/2025

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


## 7 - Métodos de Análise de Circuitos Elétricos

### 7.1 - Método da resistência equivalente

O Método da Resistência Equivalente (MRE) é um método de análise de circuitos utilizada para simplificar circuitos resistivos e determinar a corrente e a tensão em diversos pontos do circuito. É especialmente útil em circuitos que possuem apenas uma fonte de tensão ou corrente, pois permite reduzir a complexidade da análise ao substituir grupos de resistências por um único valor equivalente.

O Método da Resistência Equivalente permite:

- Simplificar circuitos complexos, tornando mais fácil calcular tensões e correntes.
- Utilizar divisores de tensão e corrente, que ajudam a encontrar valores específicos dentro do circuito.
- Determinar a potência dissipada em cada resistência e a potência fornecida pela fonte.

O procedimento para a simplificação de circuitos através do Método da Resistência Equivalente pode ser descrito no seguinte algoritmo:

1. Identificar as resistências em série e calcular e substituir as resistências pela sua resistência equivalente;
2. Identificar as resistências em paralelo e calcular e substituir as resistências pela sua equivalente equivalente;
3. Repetir os dois passos anteriores até não existirem mais resistências série ou paralelo.
4. Quando não existirem mais resistências em série ou paralelo, caso o circuito não esteja simplificado a uma única resistência equivalente, deve-se verificar se há agrupamentos em triângulo (Δ) ou estrela (Y) e converter (um para o outro) para facilitar a simplificação.
5. Continuar o processo iterativamente até que o circuito seja reduzido a uma única resistência equivalente.

No entanto, este método tem limitações. Quando o circuito contém múltiplas fontes ou um grande número de nós e ramos, o MRE torna-se inviável. Para esses casos, são utilizados os métodos de análise mais avançados, como o teorema da sobreposição, o método das correntes nos ramos, o método das tensões nodais ou o método das correntes nas malhas.

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 2 (54 - 56);
- Nuno Rodrigues, André Rocha, Mário Alves, Lino Sousa e Francisco Pereira; (julho de 2023); U=RIsolve APP Equivalent Impedance Determination Module.

**Validação**: João Ferreira

**Versão**: 1.1

**Última atualização**: 11/03/2025

### 7.2 - Teorema da sobreposição

O Teorema da Sobreposição permite determinar as tensões e correntes em qualquer ponto de um circuito que contenha múltiplas fontes de alimentação, de tensão ou corrente. Este teorema baseia-se na propriedade da linearidade dos circuitos, que assegura que o efeito total em qualquer elemento do circuito pode ser obtido pela soma dos efeitos individuais de cada fonte considerada separadamente. 

A aplicação do Teorema da Sobreposição consiste em analisar separadamente a influência de cada fonte no circuito, substituindo as demais pelas suas impedâncias internas. No caso de fontes ideais, as fontes ideais de tensão, que possuem resistência interna nula, são substituídas por um curto-circuito, enquanto as fontes ideais de corrente, cuja resistência interna é infinita, são substituídas por um circuito aberto. 

O Teorema da Sobreposição é útil quando se deseja avaliar o impacto da variação de uma única fonte sobre o comportamento do circuito, sem a necessidade de refazer toda a análise do sistema. Este método facilita a interpretação de circuitos complexos e auxilia no estudo de circuitos que contêm múltiplas fontes com diferentes frequências em regime de corrente alternada. Para circuitos de corrente alternada (CA), a aplicação do teorema exige que todas as fontes tenham a mesma frequência, pois, caso contrário, as contribuições estariam em planos complexos distintos, (fasores a rodar com velocidades angulares diferentes), bem como as reactâncias/impedâncias serão distintas, dada a sua dependência da frequência. Neste sentido, este método pode ser muito interessante para o estudo de circuitos que contêm fontes CA (tensão e/ou corrente) com frequências diferentes, pois permite analisar a contribuição individual de cada fonte, usando a Transformada de Steinmetz em cada circuito parcelar (o que seria impossível no circuito original).

Para aplicar o Teorema da Sobreposição é necessário seguir os seguintes passos:

1. Criar circuitos parcelares, onde cada circuito parcial deve conter apenas uma fonte ativa, substituindo as demais pela sua impedância interna. 
2. Efetuar a análise de cada circuito parcial, aplicando métodos adequados, como as Leis de Kirchhoff, Lei de Ohm ou outros métodos de análise de circuitos, para determinar as tensões e correntes parcelares. 
3. Somar as contribuições parcelares, considerando que as correntes parcelares num dado ramo são somadas para obter a corrente real, e as tensões parcelares num dado nó ou componente são somadas para determinar a tensão real.

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 3 (4 - 5);
- Departamento de Engenharia Eletrotécnica; (novembro de 2021); Guião FEELE 8 (2 - 3);
- André Rocha; Planned Individual Study - Análise de Circuitos Elétricos (9 - 10).

**Validação**: João Ferreira

**Versão**: 1.1

**Última atualização**: 12/03/2025

### 7.3 - Método da corrente nos ramos

O Método da Corrente nos Ramos (MCR), baseia-se na aplicação direta das Leis de Kirchhoff das Malhas e dos Nós, segundo um algoritmo bem definido, de forma a sistematizar a sua aplicação em qualquer circuito. As incógnitas a determinar são as correntes (I1, I2, . . . , IR), que percorrem todos os ramos do circuito. Através destas correntes, pode calcular-se as quedas de tensão aos terminais de qualquer elemento do circuito.

Caso existam correntes conhecidas (C - variável correspondente ao número de ramos com fontes ideais de corrente e/ou correntes conhecidas), o n.◦ de incógnitas é reduzido (também em C). Existindo fontes ideais de corrente, passa a ser necessário escolher malhas que não passem nos ramos em que estas estão inseridas. Há que observar que, embora seja conhecida a corrente do ramo, a queda de tensão da fonte é desconhecida (voltando a introduzir uma incógnita). Nesta situação, o número total de equações (e de incógnitas) passa a ser dado por R − C.

A execução do algoritmo deve ser efetuada seguindo os seguintes passos:

1. Contar e identificar os $R$ ramos, $N$ nós do circuito e $C$ fontes ideais de corrente, com base nestes, calcular o número de $M$ malhas necessárias, com base em $M=R-C-(N-1)$;
2. Marcar nos ramos as correntes $(I_1, I_2, \dots, I_R)$, com um sentido arbitrado;
3. Com base nos sentidos arbitrados no ponto anterior, construir $N-1$ equações linearmente independentes (uma para cada nó, deixando um deles de fora), de acordo com a Lei dos Nós;
4. Escolher, identificar e desenhar no esquema as Malhas linearmente independentes (se houver fontes de corrente, a escolha deve obedecer à regra acima exposta), arbitrando um sentido de circulação, de forma a cobrir todos os ramos/componentes do circuito, exceto os ramos com fontes de corrente (se existirem);
5. Com base nos sentidos arbitrados no ponto anterior, construir as M equações linearmente independentes, de acordo com a Lei das Malhas;
6. Resolver o sistema de equações, ou seja, determinar a corrente em cada ramo, caso a corrente calculada para um dado ramo for negativa, significa que o sentido de corrente real naquele ramo é contrário ao inicialmente arbitrado. Se for necessário, a tensão em cada um dos componentes/nós pode ser determinada através da Lei de Ohm e/ou da Lei das Malhas.

O MCR permite analisar qualquer circuito. Contudo, se o número de ramos $(R)$ for elevado, exige a resolução de um sistema com muitas $M_{equações}$, sendo que em alguns casos pode ser menos trabalhoso resolver o circuitos através de outros métodos de análise.

##### Metadados

**Fontes**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 3 (8 - 13);
- Preparação Guião FEELE 5 (3);
- André Rocha, Mário Alves, Lino Sousa, Franscisco Pereira; (10 de novembro de 2022, v1.4); Métodos Gerais de Análise de Circuitos Elétricos, (7).

**Validação**: João Ferreira

**Versão**: 1.1

**Última atualização**: 24/02/2025

### 7.4 - Método da corrente nas malhas

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

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 3 (15 - 22).
- André Rocha, Mário Alves, Lino Sousa, Franscisco Pereira; (10 de novembro de 2022, v1.4); Métodos Gerais de Análise de Circuitos Elétricos, (10 - 12).

**Validação**: João Ferreira

**Versão**: 1.1

**Última atualização**: 12/03/2025

### 7.5 - Método das tensões nodais

O Método das Tensões Nodais (MTN) é uma técnica de análise de circuitos baseada na Lei de Kirchhoff dos Nós (LKN), na qual as incógnitas do sistema são as tensões dos nós em relação a um nó de referência, normalmente denominado “massa”, cujo potencial é assumido como $0 \, V$. Os valores dos potenciais nos demais $N -1$  nós (ou $N – 1 – T$, se existirem $T$ ramos compostos exclusivamente por fontes de tensão) são obtidos por meio da resolução de um sistema de equações algébricas linearmente independentes. 

Este método é útil para circuitos que não contêm “fontes de tensão isoladas”; caso haja tais fontes, elas determinam relações de tensão conhecidas entre os nós envolvidos.

Para aplicar o método das tensões nodais, deve-se seguir o seguinte algoritmo:

1. Identificar as variáveis fundamentais:
    1.1. Para cada ramo do circuito:
        - Identificar a corrente e atribuir um símbolo $(I_1, I_2, I_3, \dots)$;
        - Arbitrar um sentido a cada corrente;
        - Marcar cada corrente no circuito (com o respetivo identificador e sentido).
    1.2. Para cada nó do circuito:
        - Identificar o nó com uma tensão e atribuir um símbolo $(U_A, U_B, U_C, \dots)$;
        - Marcar cada tensão no circuito (com o respetivo identificador).
    1.3. Identificar e registar o número de fontes de tensão isoladas $(T)$:
        - Notas:
            - Caso haja mais de uma fonte de tensão ideal conectada em série num mesmo ramo, estas devem ser agrupadas e consideradas como uma única fonte de tensão isolada equivalente;
            - As fontes isoladas de tensão $(FIT)$ devem ser registadas como um conjunto, $FIT=\{E_X, E_Y\}$
        - Caso $T=0$ (nenhuma fonte isolada de tensão):
            - Selecionar um dos nós como referência (terra), definindo a sua tensão como $0 \, V$;
            - Marcar esse nó no circuito com o símbolo da massa;
            - Após terminar o procedimento 1, avançar diretamente para o procedimento 3 (ignorar o procedimento 2 - “Identificar os supernós” pois não existem).
        - Caso $T=1$:
            - Fixar o nó de referência em um dos dois nós conectados à fonte isolada de tensão.
        - Caso $T \ge 2$:
            - Verificar se existem ramos com fontes de tensão isoladas entre si, e, nesse caso, agrupa-los e selecionar o maior grupo (se existir mais do que um), como o supernó aterrado.
    1.4. Calcular e registar o número de equações da Lei de Kirchhoff dos Nós que irão ser necessárias para construir o sistema de equações, que é dado por $(N-1-T)$.
2. Identificar os supernós e as relações de tensão entre os nós:
    2.1. Identificar e registrar o supernó aterrado $(SN_G)$ (o único supernó com conexão à terra) e as tensões de seus nós:
        - Os nós (2 ou mais), que compõem o supernó podem ser apresentados como um conjunto, por exemplo, $SN_G=\{U_A,U_B\}$.
        - Escrever as equações que relacionam as tensões entre cada par de nós deste supernó (as equações de tensão do supernó aterrado não fazem parte do sistema, pois as tensões dos nós podem ser determinadas a priori).
    2.2. Identificar e registrar todos os supernós flutuantes $(SN_F)$ e as respectivas equações de relação de tensão:
        - Para cada supernó flutuante:
            - Identificar os nós que o compõem (2 ou mais) e atribuir um índice $(SN_{F1} = \{U_A, U_B\}, SN_{F2} = \{U_E, U_F, U_G\}$
            - Escolher um nó de referência dentro de cada supernó flutuante.
            - Escrever as equações que relacionam as tensões entre os nós, tendo como referência o nó escolhido.
3. Escrever as equações da Lei de Kirchhoff dos Nós (LKN) $(N-1-T)$ em função das tensões nos nós:
    3.1. Escreva as $(N-1-T)$  equações da LKN, utilizando as correntes dos ramos $(I_1, I_2, I_3, \dots)$;
    3.2. Para cada ramo do circuito $(I_x)$:
        - Se o ramo contiver mais de uma impedância conectada em série (incluindo a impedância interna de uma ou mais fontes de tensão), juntar todas as impedâncias numa única impedância equivalente, $Z_{xeq}$.
        - Se o ramo contiver mais de uma fonte de tensão conectada em série, juntar todas numa única fonte de tensão equivalente, $E_{xeq}$.
        - Escrever a corrente do ramo como a razão entre a tensão no ramo (obtida pela diferença entre o potencial antes e depois da impedância equivalente) e a impedância equivalente (conforme a Lei de Ohm).
            - Nota: Importante ter em conta a direção da corrente arbitrada no procedimento 1);
            - Nota: Caso a corrente pertença a um ramo de algum supernó, (o ramo não tem impedância), a Lei de Ohm não pode ser usada e a corrente não terá uma equação. Ao invés disso, essa corrente irá ser determinada no fim através das restantes correntes;
            - Nota: Caso a corrente pertença a um ramo com uma fonte de corrente, o seu valor é automaticamente conhecido e a Lei de Ohm pode ser descartada.
    3.3. Reescrever as $(N-1-T)$ equações da LKN (como no primeiro passo do procedimento 3), substituindo as correntes pelas própias equações.
4. Calcular as tensões em cada nó:
    4.1. Substituir as tensões de cada supernó flutuante pela expressão correspondente à sua tensão de referência e reescreva as $(N-1-T)$ equações da LKN;
    4.2. Resolver o sistema de equações e obter os valores numéricos das tensões em cada nó $(U_A=\dots, U_B= \dots, U_C= \dots)$.
5. (Opcional) Calcular as correntes dos ramos:
    5.1. Utilizar as equações escritas no procedimento 3 para calcular os valores numéricos das correntes em cada ramo do circuito.

##### Metadados

**Fonte**:

- Ana Viana, Mário Alves e Francisco Pereira; (outubro de 2023); Slides FEELE Capítulo 3 (25- 33);
- Departamento de Engenharia Eletrotécnica; (novembro de 2021); Guião FEELE 8 (3 - 4);
- Lino Sousa, André Rocha, Mário Alves e Francisco Pereira; (março de 2021); Revisiting the nodal voltage method for both human comprehension and software implementation: Towards a teaching/self‐learning simulation tool (1647 - 1648).

**Validação**: João Ferreira

**Versão**: 1.1

**Última atualização**: 13/03/2025

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

## 9 - Conceitos Fundamentais de Grandezas Alternadas Sinusoidais

### 9.1 - Corrente alternada sinusoidal

As grandezas físicas podem ser classificadas de acordo com o seu comportamento em relação ao tempo, sendo elas: constantes ou variáveis.

- As grandezas constantes ou estacionárias são aquelas que não variam ao longo do tempo, implica que o sinal seja constante e é obtido a partir de pilhas, baterias, dínamos, fontes de tensão, retificação de corrente alternada, …
- As grandezas variáveis são grandezas cujo fluxo de eletrões dá-se nos dois sentidos e varia ao longo do tempo, sendo que estas variações podem ser:
    - Não periódicas quando o sinal não se repete no tempo, tais como os sinais de rádio e televisão, ruído (eletromagnético), sinais de sensores, …
    - Periódicas quando o sinal varia sempre da mesma maneira, repetindo-se ao longo do tempo, sendo subdivididas em:
        - Pulsatória que contêm um valor médio não nulo.
        - Alternadas Puras que contêm um valor médio nulo, como é o caso da corrente alternada (CA) sinusoidal e que se obtem a partir de alternadores, conversores eletrónicos de potência, geradores de sinais, …

A corrente alternada apresenta algumas vantagens face à corrente contínua:

- Transformação de tensão ser mais fácil, pois utilizam transformadores tanto para a elevação ou abaixamento de tensão, enquanto que a corrente contínua exige conversores eletrónicos que tem potências relativamente limitadas;
- Os alternadores (geradores de corrente alternada) são mais simples e têm menor manutenção e melhor rendimento que os dínamos (geradores de corrente contínua);
- Os motores de corrente alternada são melhores que os motores de corrente contínua, particularmente os motores de indução (trifásicos, que são mais simples, têm melhor rendimento e menor manutenção).
- Aumenta a eficiência do transporte de energia, pois ao utilizarem-se tensões mais elevadas, a corrente diminui, reduzindo-se assim as perdas caloríficas (por Efeito de Joule)

A corrente alternada sinusoidal é uma forma de onda com variação suave e contínua, seguindo a função seno, expressa por:

$$
i(t) = I_m \cdot \sin(\omega t + \theta)
$$

onde:

- $i(t)$ é o valor instantâneo da corrente;
- $I_m$ é o valor máximo (ou de pico, $I_p$) da corrente;
- $\omega$ é a frequência (ou pulsação) angular, medida em rad/s;
- $\theta$ é o desfasamento inicial (ângulo para $t=0$).

sendo que:

- O Período (T), é o tempo necessário para completar um ciclo da onda, medido em segundos.
- A Frequência (f) é o número de ciclos por segundo, expressa em Hertz (Hz), sendo o inverso do período:
- A frequência angular ($\omega$) é dada por:
    
    $$
    \omega = 2 \pi f = \frac{2 \pi}{T}
    $$
    

##### Metadados

**Fonte**:

- Francisco Pereira, Mário Alves e Ana Viana; (março de 2022); Slides TCIRC Capítulo 1 (4 - 9).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025

### 9.2 - Valor médio

O valor médio de uma grandeza $x(t)$, que varia com o tempo, é o valor constante que representa a quantidade de energia ou carga transportada durante um ciclo completo da grandeza e é calculado através da integração sobre um período do seu ciclo, dividido por esse mesmo período.

Este valor médio é normalmente utilizado nas medições das tensões e correntes, sendo que segue o mesmo raciocínio para um como para o outro.

Para uma grandeza periódica $x(t)$, o valor médio $X_{me}$ é dado por:

$$
X_{me} = \frac{1}{T} \int_0^T x(t) \, dt
$$

Onde:

- $x(t)$ é a grandeza que está a ser analisada (tensão, corrente, etc.).
- $T$ é o período (tempo ao fim do qual se completa um ciclo, em segundos).
- A integral $\int_0^T x(t)\,dt$ calcula a soma dos valores de x(t) durante um ciclo completo.

Numa grandeza alternada, para uma onda sinusoidal, o valor médio ao longo de um ciclo completo é zero, devido à simetria positiva e negativa da onda.

Para uma grandeza contínua (constante), o valor médio é o valor constante da grandeza, já que esta não varia no tempo.

Para uma outra grandeza alternada não sinusoidal (como ondas quadradas, triangulares ou de outras formas), o valor médio depende da forma exata do sinal e este pode ser positivo, negativo ou zero, dependendo da distribuição de valores durante o ciclo.

##### Metadados

**Fonte**:

- Francisco Pereira, Mário Alves e Ana Viana; (março de 2022); Slides TCIRC Capítulo 1 (10).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025

### 9.3 - Valor eficaz

O valor eficaz de uma grandeza, é uma medida que descreve o valor que uma grandeza alternada teria equivalente a uma grandeza contínua que dissipasse a mesma quantidade de energia. Em termos simples, o valor eficaz é uma forma mais direta de comparar uma grandeza alternada com uma constante que teria o mesmo efeito térmico ou energético. 

O valor eficaz de uma grandeza $x(t)$, é dado por:

$$
X_{\text{eficaz}} = \sqrt{\frac{1}{T} \int_0^T x^2(t) \, dt}
$$

Onde:

- $T$ é o período da grandeza,
- $x(t)$ pode ser uma função de corrente e tensão.

Para uma grandeza contínua, o valor eficaz é igual ao valor da própria grandeza, pois ela é constante no tempo.

Para uma grandeza alternada sinusoidal $x(t)$, o valor eficaz pode ser simplificado por:

$$
X_{\text{eficaz}} = \frac{X_{\text{máximo}}}{\sqrt{2}}
$$

onde $X_{máximo}$ é o valor máximo da grandeza alternada.

Para formas de onda não sinusoidais (como ondas quadradas, triangulares, etc.), o valor eficaz é calculado pela fórmula geral, sendo que a forma da onda influencia o cálculo.

Quando se efetuam medições em corrente alternada, o valor indicado pelos Voltímetros e Amperímetros (e os Osciloscópios de amostragem) é o valor eficaz, salvo se outro for explicitamente escolhido/mencionado.

Quando os sinais a medir não forem puramente sinusoidais, têm obrigatoriamente de se utilizar instrumentos de Verdadeiro Valor Eficaz (True Root Mean Square – TRMS).

Quando é referido um dado valor de tensão ou corrente em corrente alternada, este será sempre o valor eficaz, salvo se outro for explicitamente mencionado (e.g. valor máximo/pico ou valor pico-a-pico).

##### Metadados

**Fonte**:

- Francisco Pereira, Mário Alves e Ana Viana; (março de 2022); Slides TCIRC Capítulo 1 (11 - 13).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025

### 9.4 - Números complexos

Os números complexos são essenciais na análise de circuitos de corrente alternada (AC), pois permitem representar grandezas como tensão e corrente que variam com o tempo de forma sinusoidal. A utilização de números complexos facilita o tratamento de equações diferenciais, simplificando operações como multiplicação, divisão, e potenciação.

Em eletrotecnia usa-se o símbolo “j” em vez de “i”, para não confundir com o símbolo da corrente elétrica. O ‘”j” pode aparecer depois ou antes do valor numérico $(4j=j4)$. O conjugado de um número complexo pode representar-se por um traço $(^-)$ ou por um asterisco $(^*)$*.* Em TCIRC, utiliza-se sempre o asterisco $*(^*)$.*

Existem três formas de representar um número complexo:

1. Forma Retangular ou Cartesiana, dada por:
    
    $$
     ⁍
    $$
    
    onde:
    
    - $x$ é a parte real,
    - $y$ é a parte imaginária,
    - $j$ é a unidade imaginária $(j=\sqrt{-1})$.
2. Forma Polar, que representa o número complexo em termos de sua módulo e ângulo, expressa por:
    
    $$
    z=r \angle \theta
    $$
    
    onde:
    
    - $r$ é o módulo,
    - $\theta$ é o ângulo (normalmente expresso em graus).
3. Forma Exponencial, que utiliza a fórmula de Euler e é expressa por:
    
    $$
    z=re^{j \theta}
    $$
    
    onde:
    
    - $r$ é o módulo,
    - $\theta$ é o ângulo (normalmente expresso em radianos),

É possível passar da forma retangular para polar/exponencial e vice-versa, sendo que passar entre (polar e exponencial), basta alterar a forma como é expresso o ângulo.

- De Retangular para Polar/Exponencial, o ângulo é obtido através de:
    
    $$
    \theta = \arctg \left (\frac{y}{x} \right )
    $$
    
    e o módulo através de:
    
    $$
    r = \sqrt{x^2 + y^2}
    $$
    
- De Polar/Exponencial para Retangular, a parte real é obtida através de:
    
    $$
    x=r \cos (\theta)
    $$
    
    e a parte imaginária através de:
    
    $$
    y=r \sin (\theta)
    $$
    

É possível também realizar as operações matemáticas com números complexos, sendo que a adição e a subtração de números complexos são mais fáceis de se efetuar na forma cartesiana, enquanto que a multiplicação e a divisão são mais fáceis de se efetuar na forma polar/exponencial.

Adição e Subtração, (mais fácil na forma retangular):

Adição:

$$
z_1 + z_2 = (x_1 + x_2) + (y_1 + y_2)j
$$

Subtração:

$$
z_1 - z_2 = (x_1 - x_2) + (y_1 - y_2)j
$$

Multiplicação, (mais fácil na forma polar/exponencial):

$$
z_1 \cdot z_2 = r_1 \cdot r_2 \angle (\theta_1 + \theta_2)
$$

Divisão, (mais fácil na forma polar/exponencial):

$$
\frac{z_1}{z_2} = \frac{r_1}{r_2} \angle (q_1 - q_2)
$$

Existe também a possibilidade de fazer outras operações com números complexos, tais como:

Conjugado:

$$
z^*_1 = x_1-y_1j=r_1 \angle -\theta_1
$$

Raíz quadrada:

$$
\sqrt{z_1} = \sqrt{r_1} \angle (\theta_1/2)
$$

Potenciação:

$$
z_1^n = r_1^n \angle n\theta_1
$$

Multiplicar por $j$:

$$
j \cdot z_1 = 1 \angle 90 \degree \cdot r_1 \angle \theta_1 = r_1 \angle(\theta_1 + 90 \degree)
$$

Dividir por $j$:

$$
\frac{z_1}{j} = \frac{r_1 \angle{\theta_1}}{1 \angle{90 \degree}}=r_1 \angle{(\theta_1 - 90 \degree)}
$$

##### Metadados

**Fonte**:

- Francisco Pereira, Mário Alves e Ana Viana; (março de 2022); Slides TCIRC Capítulo 1 (14 - 16).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025

### 9.5 - Transformada de Steinmetz

A Transformada de Steinmetz, ou representação simbólica, permite-nos representar uma grandeza variável no domínio dos tempos por um número complexo invariável, o que será extremamente útil na análise de circuitos de CA.

Permite definir uma correspondência biunívoca entre grandezas alternadas sinusoidais:

$$
i(t) = \sqrt{2} I \sin{(\omega t + \theta)}
$$

e vetores do plano complexo:

$$
\underline{I} = Ie^{j \theta} = I \angle{\theta}
$$

A Transformada de Steinmetz só pode ser usada para grandezas com a mesma frequência angular.

A transformada da soma é igual à soma das transformadas.

Derivação (em ordem ao tempo) de grandezas alternadas sinusoidais, em notação
simbólica (multiplicação por $j$):

$$
\underline{I}'=j \omega \underline{I}
$$

Integração (em ordem ao tempo) de grandezas alternadas sinusoidais, em notação
simbólica (divisão por $j$):

$$
\underline{I}^P=\frac{1}{j \omega} \underline{I}
$$

##### Metadados

**Fonte**:

- Francisco Pereira, Mário Alves e Ana Viana; (março de 2022); Slides TCIRC Capítulo 1 (17 - 22).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025

## 10 - Circuitos de Corrente Alternada Monofásica

### 10.1 - Leis e métodos dos circuitos em corrente alternada

Nos circuitos de corrente alternada (CA), as leis e os métodos de análise/simplificação são basicamente os mesmos que os usados em corrente contínua (CC), com a diferença fundamental de que as grandezas (tensão, corrente, etc.) são tratadas no domínio complexo. 

A Lei de Ohm em CA mantém a mesma forma da versão em CC, mas com a introdução do conceito de impedância $(\underline{Z})$, que representa uma oposição à passagem de CA e tem uma parte real (resistência, $R$) e uma parte imaginária (reatância, $X$, que pode ser indutiva ou capacitiva). A relação entre a tensão $(\underline{U})$ e a corrente $(\underline{I})$ é expressa como:

$$
\underline{Z} = \frac{\underline{U}}{\underline{I}}
$$

Este conceito de impedância não existe em CC e é fundamental para a análise de circuitos em CA.

As Leis de Kirchhoff (Lei dos Nós e Lei das Malhas) também podem ser aplicadas em CA, mas em forma vetorial ou complexa, uma vez que as grandezas no domínio de CA são números complexos.

- Na Lei de Kirchhoff dos Nós (LKN), a soma das correntes (transformadas) que entram e saem de um nó é zero.
- Na Lei de Kirchhoff das Malhas (LKM), a soma das tensões ao longo de uma malha fechada é igual a zero. Ou seja, a soma das f.e.m. (forças eletromotrizes) é igual à soma das quedas de tensão em todos os elementos da malha.

Em circuitos CC a tensão e corrente são constantes, não variam no tempo e também não existe o conceito de “fase” (desfasamento).

Em circuitos CA a tensão e a corrente variam continuamente no tempo e as características indutivas e capacitivas das cargas levam a um desfasamento entre a tensão e a corrente - conceito de “fase”, que implica que tensões/correntes não estão sincronizadas, ou seja, os máximos positivos/negativos e passagens por zero ocorrem em instantes diferentes.

Em série, a impedância equivalente é dada pela soma vetorial das impedâncias $(\underline{Z})$ e em paralelo é dada pela soma vetorial das admitâncias $(\underline{Y})$ que é o inverso da impedância.

Convém salientar que ao contrário do que acontece em CC, em CA a impedância equivalente de uma associação em série não é necessariamente maior do que qualquer uma das impedâncias associadas e a impedância equivalente de uma associação em paralelo não é necessariamente menor do que qualquer uma das impedâncias associadas, uma vez que as impedâncias associadas poderão ter reactâncias de sinais contrários.

Todos os restantes teoremas, regras e métodos podem ser generalizados para CA.

##### Metadados

**Fonte**:

- Ana Viana, Francisco Pereira e Mário Alves; (abril de 2024); Slides TCIRC Capítulo 5 (3 - 5).
- Ana Viana, Francisco Pereira e Mário Alves; (abril de 2024); Slides TCIRC Capítulo 5 (98 - 101).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025

### 10.2 - Componentes em corrente alternada

Em circuitos de corrente alternada (CA), o comportamento dos componentes como resistências, bobinas e condensadores muda, principalmente devido ao conceito de fase e à presença de impedância, reatância e a interação com a frequência do sinal alternado.

Num circuito puramente resistivo, pode-se calcular a corrente $i(t)$ sabendo a tensão $u(t)$ através da Lei de Ohm, e vice-versa, ou utilizando a transformada de steinmetz. Nestes circuitos, a corrente e a tensão estão em fase.

A potência média numa resistência é dada por $P=U \cdot I$, onde $U$ e $I$ são os valores eficazes da tensão e da corrente, respectivamente.

A frequência da potência é o dobro da frequência da corrente e da tensão.

Num circuito puramente indutivo, a tensão está em quadratura-avanço em relação à corrente, ou seja, a tensão está em avanço de 90 graus em relação à corrente, ou temporalmente, a tensão atinge o seu valor máximo $1/4$ de período antes da corrente.

$$
\underline{U}=j \omega L\underline{I} = jX_L \underline{I} = \underline{X_LI}
$$

Com frequência nula (CC), $X_L = 0$, (curto-circuito). Com a frequência a tender para infinito, $X_L = \infin$, (circuito aberto).

O valor eficaz da tensão é igual ao produto do valor eficaz da corrente pela reactância indutiva - $X_L$.

A potência média numa bobina é igual a zero. Uma bobina ideal não consome energia, nos intervalos de tempo em que a potência é positiva ($u(t)$ e $i(t)$ com o mesmo sentido) a bobina está a receber/armazenar energia; quando a potência é negativa ($u(t)$ e $i(t)$  com sentidos opostos) a bobina cede energia, funcionando como carga ou fonte, alternadamente

A frequência da potência é o dobro da frequência da corrente e da tensão.

Num circuito puramente capacitivo, a tensão está em quadratura-atraso em relação à corrente, ou seja, a tensão está em atraso de 90 graus em relação à corrente, ou temporalmente, a tensão atinge o seu valor máximo $1/4$ de período depois da corrente.

$$
\underline{U}= \frac {\underline{I}}{j \omega C} = -jX_C \underline{I} = \underline{X_CI}
$$

Com frequência nula (CC), $X_C = \infin$, (circuito aberto). Com a frequência a tender para infinito, $X_C = 0$, (curto-circuito).

O valor eficaz da tensão é igual ao produto do valor eficaz da corrente pela reactância capacitiva- $X_C$.

A potência média num condensador é igual a zero. Um condensador ideal não consome energia, nos intervalos em que a potência é positiva ($u(t)$ e $i(t)$ com o mesmo sentido) o condensador recebe/armazena energia; quando a potência é negativa ($u(t)$ e $i(t)$ com sentidos opostos) o condensador fornece energia, funcionando como carga ou fonte, alternadamente

A frequência da potência é o dobro da frequência de corrente e de tensão.

##### Metadados

**Fonte**:

- Ana Viana, Francisco Pereira e Mário Alves; (abril de 2024); Slides TCIRC Capítulo 5 (6 - 17).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025

### 10.3 - Regime de magnetização e desmagnetização de uma bobina

A magnetização de uma bobina consiste em fazer com que a bobina armazene energia, criando um campo magnético no seu interior. 

Depois de se atingir o regime estacionário, a corrente do circuito terá o seu valor máximo e a tensão aos seus terminais da bobina será nula.

É possível analisar a magnetização e desmagnetização da bobina através de um circuito RL série e um interruptor que ora conecta a fonte de tensão com os componentes, ora a isola, deixando os componentes somente ligados um ao outro.

Para magnetizar a bobina é necessário a resistência e a bobina estarem em série com a fonte de alimentação, desta forma, a tensão aos terminais da bobina e a corrente que percorre o circuito irão variar no tempo, sendo que a tensão aos terminais da bobina vai diminuir de um valor máximo até 0 e a corrente irá aumentar de 0 até um valor máximo, nesse momento (em que atinge o valor máximo), a bobina passa a comportar-se como um curto-circuito (CC).

Aplicando as leis de kirchhoff das malhas no circuito, obtem-se:

$$
E=u_R(t) + u_L(t)=R \cdot i(t) + u_L(t)
$$

, sendo que $i(t)$ é dado por:

$$
i(t) = \frac{E}{R}(1-e^{-t/\tau})
$$

, onde $\tau$ é a constante de tempo ($s$) e é definida como:

$$
\tau= \frac{L}{R}
$$

, sendo possível calcular o valor de $u_L(t)$:

$$
u_L(t) = E \cdot e^{-t/\tau}
$$

A constante de tempo pode ser interpretada como sendo o tempo ao fim do qual a corrente já atingiu $63,2\%$ do seu valor final e a tensão aos terminais da bobina já desceu para $36,8\%$ do seu valor inicial.

Na prática, considera-se que a magnetização da bobina está completa ao fim de $5 \tau$, (erro $< 1\%$)

Se a corrente inicial for diferente de zero, as expressões (gerais) da corrente e da tensão serão dadas por:

$$
i(t) = I_i + (I_f - I_i)(1-e^{-t/\tau})= I_f - (I_f - I_i) e^{-t/\tau}
$$

e:

$$
u_L(t) = R(I_f - I_i) e^{-t/\tau}
$$

A energia armazenada numa bobina depois da sua magnetização resulta do campo magnético existente no interior da bobina e é dada por:

$$
W=\frac{1}{2}LI_f^2
$$

Para desmagnitizar a bobina é necessário que a bobina e a resistência se isolem da fonte de alimentação (acionando o interruptor), desta forma, durante a desmagnitização a corrente irá diminuir até 0 e a energia armazenada na bobina será dissipada na resistência (por efeito de Joule).

Aplicando as leis de kirchhoff das malhas no circuito , obtem-se:

$$
u_L(t) + u_R(t)= u_L(t) + R \cdot i(t) = 0
$$

, sendo que $i(t)$ é dado por:

$$
i(t)=I_i e ^{-t/\tau}
$$

, sendo possível calcular o valor de $u_L(t)$:

$$
u_L(t)=-U_{Li} e^{-t/\tau}
$$

A corrente e a tensão têm sinais contrários porque a bobina está a fornecer energia (comportando-se como um elemento ativo), e, habitualmente considera-se que a desmagnitização está terminada ao fim de $5 \tau$.

São utilizadas as mesmas expressões que na magnetização para o cálculo do $i(t)$ e do $u_L(t)$ contudo, é importante ter em conta que os valores de corrente inicial e final são diferentes para ambos os casos.

##### Metadados

**Fonte**:

- Mário Alves e Francisco Pereira; (março de 2024); Slides TCIRC Capítulo 4 (18 - 31).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 10/03/2025

### 10.4 - Regime de carga e descarga de um condensador

A carga de um condensador consiste em armazenar carga e energia elétrica, criando uma diferença de potencial entre as suas armaduras.

Depois de estar completamente carregado, o condensador conservará a carga armazenada enquanto não houver um percurso fechado que o descarregue. Para descarregar o condensador, basta conectar as suas armaduras através de um circuito resistivo.

A carga e descarga do condensador podem ser analisadas através de um circuito RC série com um interruptor que ora conecta a fonte de tensão ao circuito, ora a isola, permitindo apenas a interação entre os componentes.

Quando o circuito é fechado, a tensão aos terminais do condensador e a corrente que percorre o circuito variam com o tempo. A tensão no condensador aumenta de 0 até o valor máximo EE, enquanto a corrente inicia com um valor máximo e decresce até se anular. Nesse momento, o condensador comporta-se como um circuito aberto em corrente contínua (CC).

Aplicando a Lei de Kirchhoff das Malhas ao circuito, obtem-se:

$$
E = u_R(t) + u_C(t) = R \cdot i(t) + u_C(t)
$$

, sendo que $u_C(t)$ é dado por:

$$
u_C(t) = E(1-e^{-t/\tau})
$$

, onde $\tau$ é a constante de tempo ($s$) e é definida como:

$$
\tau= RC
$$

, sendo possível calcular o valor de $i(t)$:

$$
i(t) = \frac{E}{R} \cdot e^{-t/\tau}
$$

A constante de tempo pode ser interpretada como o tempo ao fim do qual a tensão atingiu $63,2\%$ do seu valor final, e a corrente diminuiu para $36,8\%$ do seu valor inicial.

Na prática, considera-se que o condensador está carregado ao fim de $5 \tau$, (erro $< 1\%$).

Caso o condensador tenha uma carga inicial diferente de zero, as expressões gerais da tensão e corrente são:

$$
u_C(t) = U_{Ci} + (U_{Cf} - U_{Ci}) \left(1 - e^{-t/\tau} \right)
$$

e:

$$
i(t) = \frac{U_{Cf} - U_{Ci}}{R} e^{-t/\tau}
$$

A energia armazenada no condensador depois da sua carga é dada por:

$$
W = \frac{1}{2} C U_{Cf}^2
$$

Para descarregar o condensador, basta isolar a fonte de alimentação, permitindo que o condensador e a resistência fiquem conectados entre si. Durante a descarga, a corrente circulará no circuito e a energia armazenada no condensador será dissipada na resistência por efeito Joule.

Aplicando a Lei de Kirchhoff das Malhas, obtem-se:

$$
u_C(t) + u_R(t) = u_C(t) + R \cdot i(t) = 0
$$

, sendo que $u_C(t)$ é dado por:

$$
u_C(t)=U_{Ci} e ^{-t/\tau}
$$

, sendo possível calcular o valor de $i(t)$:

$$
i(t)=-\frac{U_{Ci}}{R} e^{-t/\tau}
$$

A corrente é negativa pois o seu sentido é oposto ao da carga.

Na prática, considera-se que a descarga do condensador está completa ao fim de $5 \tau$, momento em que a tensão e a corrente são praticamente nulas.

As expressões para a carga do condensador podem ser utilizadas de forma geral para carga e descarga, desde que se usem os valores adequados para $U_{Ci}$ e $U_{Cf}$.

##### Metadados

**Fonte**:

- Mário Alves e Francisco Pereira; (março de 2024); Slides TCIRC Capítulo 3 (19 - 32).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 10/03/2025

### 10.5 - Circuitos RLC série

O circuito RLC série é um circuito de malha única que contém todos os tipos de elementos passivos (resistência, bobina e condensador) conectados em série. Num circuito desse tipo, a corrente é a mesma em todos os componentes.

$$
i(t)= \sqrt{2} I \sin(\omega t + \theta)
$$

Com isso, é possível determinar a tensão em cada um dos componentes passivos. Através da Lei de Kirchhoff das Malhas, e as propriedades da Transformada de Steinmetz, sabe-se que a tensão total é dada por:

$$
\underline{U} = \underline{U_R} + \underline{U_L} + \underline{U_C}
$$

sendo $U_R=R \underline{I}$, $U_L = j \omega L \underline{I}$ e $\underline{U_C} = \underline{I}/(j \omega C)$, obtem-se:

$$
\underline{U}=(R+j \omega L - \frac{j}{\omega C}) \times \underline{I}
$$

segundo a Lei de Ohm, pode-se também deduzir que a impedância equivalente da série é dada por:

$$
\underline{Z} = R + j (\omega L - \frac{1}{\omega C})
$$

##### Metadados

**Fonte**:

- Ana Viana, Francisco Pereira e Mário Alves; (abril de 2024); Slides TCIRC Capítulo 5 (19-22).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025

### 10.6 - Circuitos RLC paralelo

O circuito RLC paralelo é um circuito de que contém todos os tipos de elementos passivos (resistência, bobina e condensador) conectados em paralelo. Num circuito desse tipo, a tensão é a mesma em todos os componentes.

Neste caso, é possível determinar a corrente em cada um dos componentes passivos. A corrente total é dada por:

$$
\underline{I} = \underline{I_R} + \underline{I_L} + \underline{I_C}
$$

sendo $\underline{I_R}=\underline{U} / R$,  $\underline{I_L} = \underline{U} / j \omega L$ e $\underline{I_C} = j \omega C \underline{U}$, obtem-se:

$$
\frac{\underline{I}}{\underline{U}}=\frac{1}{R}+j (\omega C - \frac{1}{\omega L})
$$

sendo que neste caso pode ser mais fácil trabalhar com a admitância ao invés da impedância:

$$
\underline{Y} = \frac{1}{R} + j (\omega C - \frac{1}{\omega L})
$$

##### Metadados

**Fonte**:

- Ana Viana, Francisco Pereira e Mário Alves; (abril de 2024); Slides TCIRC Capítulo 5 (30).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025

### 10.7 - Predominância indutiva e capacitiva

Um circuito pode ser predominantemente indutivo ou capacitivo dependendo do desfasamento entre a tensão e a corrente do circuito ou, de modo equivalente, analisando a fase da impedância equivalente do circuito, na perspetiva da fonte de alimentação.

A fase $(\varphi)$ da impedância $(\underline{Z})$ equivalente representa o desfasamento entre a tensão e a corrente, sendo $\varphi$ calculdado a partir de:

$$
\varphi = \arctg(\frac{X}{R})
$$

com:

$$
X =\omega L - \frac{1}{\omega C} = X_L - X_C
$$

Se $\varphi > 0\degree$, a tensão está em avanço relativamente à corrente e o circuito é predominantemente indutivo e por isso:

$$
\omega L > \frac{1}{\omega C}
$$

Se $\varphi < 0\degree$, a tensão está em atraso relativamente à corrente e o circuito é predominantemente capacitivo, sendo $\varphi$ calculdado a partir de:

$$
\omega L < \frac{1}{\omega C}
$$

esta expressão permite concluir que $\varphi$ está compreendido entre $-90\degree < \varphi < 90\degree$.

Caso $\varphi$ for igual a $90\degree$ a carga é uma bobina ideal.

Caso $\varphi$ for igual a $-90\degree$ a carga é um condensador ideal.

Caso $\varphi$ for igual a $0\degree$, o circuito é puramente resistivo, i.e. não tem reâtancia, ou porque a carga é puramente resistiva ou porque o circuito está em ressonância, ou seja:

$$
\omega L = \frac{1}{\omega C} 
$$

##### Metadados

**Fonte**:

- Ana Viana, Francisco Pereira e Mário Alves; (abril de 2024); Slides TCIRC Capítulo 5 (23 - 27).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025

### 10.8 - Ressonância

Quando uma fonte de alimentação CA é ligada a um bipolo passivo contendo pelo menos um condensador e uma bobina, pode acontecer um fenómeno denominado de ressonância. Em ressonância, o circuito a jusante do bipolo torna-se puramente resistivo e a corrente da fonte fica em fase com a tensão entre os seus terminais. Para esse fenómeno ocorrer é necessário que a impedância equivalente vista dos terminais do bipolo seja real, ou seja a reactância equivalente tem de ser nula $(X_L = X_C)$. O fenómeno de ressonância pode ser prejudicial mas também
pode ser aplicado de forma útil em várias áreas da ciência e engenharia, por exemplo em filtros passivos passa/rejeitabanda.

O caso mais simples de estudo da ressonância é nos circuitos RLC série e paralelo.

Na ressonância série, sabe-se que a impedância equivalente é dada por:

$$
\underline{Z}=R+jX=R+j(\omega L - \frac{1}{\omega C})
$$

então, para ocorrer ressonância, é necessário que:

$$
X = 0 \rightarrow X_L = X_C \leftrightarrow \omega L = \frac{1}{\omega C}
$$

À frequência para a qual a reactância indutiva é igual à reactância capacitiva designa-se por frequência de ressonância, $f_0$.

$$
f_0= \frac{1}{2 \pi \sqrt{LC}}
$$

Para esta frequência o circuito comporta-se como um circuito puramente resistivo (na perspetiva da fonte):

A impedância atinge o seu valor mínimo à frequência de ressonância e a tensão na resistência é igual à tensão total aplicada à impedância.

Em ressonância, as tensões na bobina e no condensador são sempre iguais e simétricas e consequentemente anulam-se.
A tensão entre os terminais da série do condensador com a bobina é assim nula, e entre esses dois pontos tem-se um curto-circuito. Este caso de ressonância também é designado de ressonância de
tensões.

As tensões no condensador e na bobina podem atingir valores mais elevados do que a tensão de alimentação do circuito, atingindo os seus valores máximos à frequência de ressonância. Deste modo, a ligação de uma fonte de CA a um circuito RLC pode apresentar perigo se a frequência da fonte utilizada for próxima da frequência de ressonância do circuito. O perigo será ainda maior se a resistência (R) for pequena, uma vez que nesse caso a corrente poderá ser muito elevada e danificar o circuito RLC ou a fonte. No caso particular da resistência ser nula, e o circuito RLC fica equivalente a um curto-circuito. Neste caso, a corrente será apenas limitada pela impedância interna da fonte que está a alimentar o circuito RLC.

Resumindo, num circuito RLC em ressonância série verifica-se que:

- A tensão e a corrente na fonte estão em fase.
- A reactância indutiva é igual à reactância capacitiva.
- A impedância assume o seu valor mínimo e é igual a R.
- O valor eficaz da corrente assume o seu valor máximo $(E/R)$.
- A tensão na resistência iguala a tensão aplicada (da fonte).
- A tensão no condensador e na bobina são iguais e de sentidos contrários, anulando-se mutuamente.
- A tensão entre o condensador e a bobina é igual a zero (curto-circuito).
- As tensões no condensador e na bobina podem atingir valores mais elevados do que a tensão aplicada ao circuito.

No caso da ressonância paralela é mais simples trabalhar com admitâncias ao invés das impedâncias, sendo a admitância equivalente dada por:

$$
\underline{Y} = \frac{1}{\underline{Z}} = \frac{1}{R}+j(\omega C - \frac{1}{\omega L})
$$

Na situação de ressonância, a impedância do circuito tem de ser real e portanto a admitância também tem de o ser. Logo,

$$
B=0 \rightarrow \omega C = \frac{1}{\omega L}
$$

E a frequência de ressonância, $f_0$ é dada por:

$$
f_0=\frac{1}{2 \pi \sqrt{LC}}
$$

Para esta frequência, o circuito comporta-se como um circuito puramente resistivo.

A admitância atinge o seu valor mínimo à frequência de ressonância, i.e. a impedância atinge o seu valor máximo. Verifica-se ainda que as correntes no condensador e na bobina são
simétricas (e com módulo igual) e consequentemente anulam-se. 

A corrente total é mínima e igual a:

$$
\underline{I} = \frac{\underline{U}}{R}
$$

A corrente na resistência é igual à corrente total que alimenta o circuito RLC paralelo. Pode-se dizer que à frequência de ressonância é como se a resistência estivesse em paralelo com um circuito aberto. Este caso de ressonância também é designado de ressonância de correntes.

A ressonância em paralelo só apresenta algum perigo se o valor da resistência for muito elevado e se for ligada a uma fonte ideal de corrente. Neste caso, a tensão aos terminais da resistência pode atingir valores elevados. Contudo, a probabilidade de esta situação ocorrer é baixa isto porque as fontes geralmente utilizadas aproximam-se a fontes ideais de tensão e não a fontes ideais de corrente. No caso particular de a resistência ser infinita (não existir), então e o circuito RLC fica equivalente a um circuito aberto. Qualquer que seja a tensão aplicada ao circuito, a corrente total é nula.

Resumindo, num circuito RLC paralelo em ressonância verifica-se que:

- A tensão e a corrente na fonte estão em fase.
- A reactância indutiva é igual à reactância capacitiva.
- A impedância assume o seu valor máximo e é igual a R.
- O valor eficaz da corrente assume o seu valor mínimo $(E/R)$.
- A corrente na resistência iguala a corrente total que alimenta o circuito RLC paralelo.
- As correntes no condensador e na bobina são iguais e de sentidos contrários, anulando-se mutuamente.
- O condensador e a bobina comportam-se como se estivessem em circuito aberto.
- A tensão na resistência pode atingir valores elevados se o circuito RLC paralelo for alimentado por uma fonte ideal de corrente e se a resistência (R) for elevada.

De modo a analisar os fenómenos de ressonância série e paralelo em termos energéticos, é necessário calcular e relacionar a energia armazenada no condensador e na bobina nessa situação.
A energia da bobina é dada por:

$$
W_L = \frac{1}{2} LI^2_L
$$

e a energia do condensador é dada por:

$$
W_C= \frac{1}{2} C U^2_C
$$

Os casos ideais de ressonância série e paralelo (circuitos sem a resistência) traduzem-se na mesma condição:

$$
\omega L = \frac{1}{\omega C}
$$

Em situação de ressonância, as energias consumidas/produzidas pelo condensador e pela bobina são iguais.

A ressonância traduz-se numa independência energética relativamente à fonte (considerando que o condensador e a bobina são ideais – não há perdas por efeito de Joule). 

Apenas nos instantes iniciais de funcionamento (regime transitório) em que ainda não se atingiu o regime estacionário, é que a fonte cede energia ao circuito. A partir desse momento (em regime permanente), a bobina e o condensador tornam-se independentes da fonte em termos
energéticos, existindo apenas trocas energéticas entre ambos – daí o termo “potência/energia reativa”. Nos casos em que existe resistência (R) no circuito, continua a existir independência energética relativamente ao condensador e à bobina, e a fonte cede apenas a energia que é consumida pela resistência.

##### Metadados

**Fonte**:

- Ana Viana, Francisco Pereira e Mário Alves; (abril de 2024); Slides TCIRC Capítulo 5 (32 - 50).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025

### 10.9 - Filtros passivos de primeira ordem

Um filtro é um circuito desenhado para “deixar passar” uma dada gama de frequências e “filtrar” (rejeitar ou atenuar) outras frequências, de montante para jusante de um dado dipolo

Os filtros são utilizados, por exemplo, para sintonizar uma dada estação de rádio ou de televisão, ou para alterar os agudos e os graves de um amplificador.

Diz-se que um filtro é um filtro passivo se contiver apenas componentes passivos (R, L, e C).

Diz-se que um filtro é um filtro ativo se contiver componentes ativos (como transístores ou amplificadores operacionais).

O ganho/amplificação de um circuito é frequentemente medido em decibéis $(dB)$ e é calculado pela seguinte fórmula para a potência:

$$
A_P = 10 \cdot \log_{10} \left( \frac{P_{\text{out}}}{P_{\text{in}}} \right)
$$

e pela seguinte fórmula para a tensão (ou corrente):

$$
A_U = 10 \cdot \log_{10} \left( \frac{U_{\text{out}}}{U_{\text{in}}} \right)
$$

,onde $P_{out}$ e $U_{out}$ são a potência e tensão de saída respetivamente e o $P_{in}$ e $U_{in}$ a potência e tensão de entrada respetivamente.

##### Metadados

**Fonte**:

- Ana Viana, Francisco Pereira e Mário Alves; (abril de 2024); Slides TCIRC Capítulo 5 (51 - 68).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 28/02/2025

#### 10.9.1 - Filtros passa-baixo

Um filtro passa-baixo deixa passar as frequências mais baixas e rejeita as frequências mais altas.

Este filtro pode ser obtido a partir de um circuito RC em que a saída é obtida através do condensador, ou a partir de um circuito RL em que a saída é obtida através da resistência (há mais alternativas).

À razão entre as tensões de saída e de entrada chama-se função de transferência, $H(\omega)$, sendo que, neste caso, $\underline{H}(0) = 1$  e $\underline{H}(\infin) = 0$.

Para as baixas frequências o comportamento do condensador (circuito RC) aproxima-se de um circuito aberto e a tensão de saída aproxima-se da tensão de entrada, já para as altas frequências o condensador aproxima-se de um curto-circuito e a tensão de saída aproxima-se de zero.

O comportamento do circuito RL pode ser explicado de forma análoga, lembrando que a bobina a baixas frequências aproxima-se de um curto-circuito e a altas frequências de um circuito aberto.

Define-se ainda frequência de corte ($\omega_c$  ou $f_c$), como a frequência para a qual o módulo da função de transferência diminui para 70,7% do seu valor máximo e calcula-se dividindo o valor máximo da função de transferência por $\sqrt{2}$. No caso do circuito RC:

$$
\omega_c = \frac{1}{RC}
$$

Um filtro passa-baixo filtra as frequências acima da frequência de corte.

##### Metadados

**Fonte**:

- Ana Viana, Francisco Pereira e Mário Alves; (abril de 2024); Slides TCIRC Capítulo 5 (52 - 55).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 28/02/2025

#### 10.9.2 - Filtros passa-alto

Um filtro passa-alto deixa passar todas as frequências acima da frequência de corte.

Este filtro pode ser obtido a partir de um circuito RC em que a saída é obtida através da resistência, ou a partir de um circuito RL em que a saída é obtida através da bobina (há mais alternativas).

A razão de transferência $H(\omega)$, para um filtro passa-alto é neste caso, $\underline{H}(0) = 0$ e $\underline{H}(\infin) = 1$.

Para as baixas frequências o comportamento do condensador (circuito RC) aproxima-se de um circuito aberto e a tensão de saída aproxima-se de zero, já para as altas frequências o condensador aproxima-se de um curto-circuito e a tensão de saída aproxima-se da tensão de entrada.

O comportamento do circuito RL pode ser explicado de forma análoga, lembrando que a bobina a baixas frequências aproxima-se de um curto-circuito e a altas frequências de um circuito aberto.

A frequência de corte é novamente definida por:

$$
\omega_c = \frac{1}{RC}
$$

Um filtro passa-alto filtra as frequências abaixo da frequência de corte.

##### Metadados

**Fonte**:

- Ana Viana, Francisco Pereira e Mário Alves; (abril de 2024); Slides TCIRC Capítulo 5 (56 - 59).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 28/02/2025

#### 10.9.3 - Filtros passa-banda

Um filtro passa-banda deixa passar todas as frequências que estejam entre dois limites de frequência $(\omega_{c1} < \omega < \omega_{c2})$, sendo $\omega_{c1}$ a frequência inferior de corte e $\omega_{c2}$ a frequência superior de corte.

Este filtro pode ser obtido a partir de um circuito RLC série em que a saída é obtida através da resistência:

A função de transferência, $H(\omega)$, deste circuito é dada por:

$$
\underline{H}(\omega) = \frac{1}{1+j[\omega L - 1/(\omega C)]/R}
$$

,sendo $\underline{H}(0) = 0$ e $\underline{H}(\infin) = 0$.

A frequência de corte inferior $(\omega_{c1})$ é dada por:

$$
\omega_{c1} = \frac{-RC+\sqrt{(RC)^2+4LC}}{2LC}
$$

, e a frequência de corte superior $(\omega_{c2})$ é dada por:

$$
\omega_{c1} = \frac{RC+\sqrt{(RC)^2+4LC}}{2LC}
$$

A banda definida pelas frequências de corte está centrada na frequência de ressonância do circuito RLC série e é dada por:

$$
\omega_0=\frac{1}{\sqrt{LC}} \Leftrightarrow f_0=\frac{1}{2 \pi \sqrt{LC}}
$$

Um filtro passa-banda filtra as frequências abaixo da frequência de corte inferior e acima da frequência de corte superior.

##### Metadados

**Fonte**:

- Ana Viana, Francisco Pereira e Mário Alves; (abril de 2024); Slides TCIRC Capítulo 5 (60 - 63).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 28/02/2025

#### 10.9.4 - Filtros rejeita-banda

Um filtro rejeita-banda elimina todas as frequências que estejam entre dois limites de frequência $(\omega_{c1} < \omega < \omega_{c2})$, sendo $\omega_{c1}$ a frequência inferior de corte e $\omega_{c2}$ a frequência superior de corte.

Este filtro pode ser obtido a partir de um circuito RLC série em que a saída é obtida através da série da bobina com o condensador (há mais alternativas).

A função de transferência, $H(\omega)$, deste circuito é dada por:

$$
\underline{H}(\omega) = \frac{1}{1-jR/[\omega L - 1/(\omega C)]}
$$

,sendo $\underline{H}(0) = 1$ e $\underline{H}(\infin) = 1$.

A frequência de corte inferior $(\omega_{c1})$ é dada por:

$$
\omega_{c1} = \frac{-RC+\sqrt{(RC)^2+4LC}}{2LC}
$$

, e a frequência de corte superior $(\omega_{c2})$ é dada por:

$$
\omega_{c1} = \frac{RC+\sqrt{(RC)^2+4LC}}{2LC}
$$

A banda definida pelas frequências de corte está centrada na frequência de ressonância do circuito RLC série e é dada por:

$$
\omega_0=\frac{1}{\sqrt{LC}} \Leftrightarrow f_0=\frac{1}{2 \pi \sqrt{LC}}
$$

Um filtro rejeita-banda filtra as frequências que sejam acima da frequência de corte inferior e abaixo da frequência de corte superior em simultâneo.

##### Metadados

**Fonte**:

- Ana Viana, Francisco Pereira e Mário Alves; (abril de 2024); Slides TCIRC Capítulo 5 (64 - 67).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 28/02/2025

### 10.10 - Potência em corrente alternada

A potência elétrica instantânea resulta da soma de duas parcelas, uma é constante e depende do desfasamento, $\phi$, entre a tensão e corrente, a outra é alternada sinusoidal, de valor médio nulo, com uma frequência duas vezes superior à frequência da corrente ou da tensão. Sendo assim a expressão dada por:

$$
P_{me}=UIcos\phi
$$

Pode-se concluir que a potência elétrica instantânea recebida por qualquer recetor é pulsatória, oscilando em torno do valor $UIcos\phi$ a uma frequência dupla da frequência da corrente/tensão

A expressão obtida para a potência elétrica instantânea engloba os 3 casos particulares:

Se o ramo passivo for uma resistência, $\phi = 0$:

$$
p(t)=UI-UIcos(2(wt+\theta))
$$

Se o ramo passivo for uma bobina ideal, $\phi=\pi/2$:

$$
p(t)=UIsen(2(wt+\theta))
$$

Se o ramo passivo for um condensador ideal, $\phi=-\pi/2$:

$$
p(t)=-UIsen(2(wt+\theta))
$$

A potência média varia entre $U\cdot I$, quando o circuito é puramente resistivo e $0$, quando é puramente indutivo ou capacitivo.

A potência instantânea num ramo passivo RLC contém uma forma de onda sinusoidal, sendo que quando $p(t)$ é negativa, o ramo está a receber energia da fonte; quando $p(t)$ é positiva, o ramo está a fornecer energia à fonte.

Se em vez de um recetor (ramo passivo RLC estudado) estivéssemos na presença de uma fonte, o gráfico da potência elétrica instantânea seria neste caso um gráfico simétrico (relativamente ao eixo dos tempos) do gráfico da potência elétrica instantânea do recetor.

E neste caso, se o bipolo for um recetor, a área de $p(t)$ acima do eixo dos tempos é maior do que a área abaixo do eixo dos tempos durante um período e:

$$
P_{me}=UIcos\phi \ge 0
$$

Se o bipolo for uma fonte, a área de $p(t)$ abaixo do eixo dos tempos é maior do que a área acima do eixo dos tempos durante um período e:

$$
P_{me}=UIcos\phi \le 0
$$

Parte da energia cedida por uma fonte a uma impedância é dissipada (na sua resistência) sendo a outra parte armazenada (na sua reactância), sendo posteriormente devolvida à fonte.

A distinção destes tipos de energia leva à definição de 3 tipos de potência para qualquer elemento elétrico: Potência Ativa, representada pelo símbolo $P$, Potência Reactiva, representada pelo símbolo $Q$, e pela Potência Aparente, representada pelo símbolo $S$. 

##### Metadados

**Fonte**:

- Ana Viana, Francisco Pereira e Mário Alves; (abril de 2024); Slides TCIRC Capítulo 5 (70 - 75).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 28/02/2025

#### 10.10.1 - Potência ativa

A potência ativa, ou potência média, ou apenas potência, representada pelo símbolo $P$, corresponde ao valor médio da potência instantânea ao longo do tempo. É a parte da potência recebida que é dissipada em calor na resistência da impedância. Sendo:

$$
P=U_RI
$$

A impedância e a tensão na impedância podem ser escritas como:

$$
\underline{Z}=Z \angle \phi =Z \cos \phi + jZ \sin \phi = R + jX
$$

$$
\underline{U}=U \angle \phi = U \cos \phi + jU \sin \phi = U_R + jU_X = \underline{U}_R + \underline{U}_X
$$

A potência ativa mede-se em watts, $W$, e é definida por:

$$
P = U I \cos \phi
$$

##### Metadados

**Fonte**:

- Ana Viana, Francisco Pereira e Mário Alves; (abril de 2024); Slides TCIRC Capítulo 5 (76).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 28/02/2025

#### 10.10.2 - Potência reativa

A potência reativa está associada à energia armazenada e trocada entre os elementos indutivos e capacitivos de um circuito elétrico, surge devido à diferença entre a energia magnética acumulada nas bobinas e a energia elétrica armazenada nos condensadores.

Num circuito RLC, a energia armazenada na bobina e no condensador está em oposição de fase. Quando essas energias são iguais, como no caso da ressonância, há apenas uma troca de energia entre os componentes sem a intervenção da fonte. 

No caso geral, quando há predominância indutiva e quando a bobina está a magnetizar-se, o condensador está a descarregar e a fornecer a sua energia armazenada à bobina e a
energia em falta $(W_{L,máx} - W_{C,máx})$ é fornecida à bobina pela fonte.

Quando há predominância capacitiva e quando o condensador está a carregar a bobina está a desmagnetizar-se e a fornecer a sua energia ao condensador e, como agora temos um excesso de energia na bobina, o excedente é devolvido à fonte.

Assim, há uma certa quantidade de energia (igual ao módulo da diferença entre $W_{L,máx}$ e $W_{C,máx}$) que periodicamente é cedida pela fonte à reactância (2 vezes por período da corrente ou da tensão) e devolvido pela reactância à fonte (também 2 vezes por período).

A potência reativa, representada pelo símbolo $Q$, é medida em volt-ampere reativo $(VAr)$,  e define-se por:

$$
Q = UI \sin\phi
$$

, onde $U$ e $I$ são os valores eficazes da tensão e da corrente, e $\phi$ é o ângulo de desfasamento entre a tensão e a corrente. Esta potência pode ser positiva ou negativa, dependendo da predominância indutiva $(\phi > 0)$ ou capacitiva $(\phi < 0)$ da impedância.

##### Metadados

**Fonte**:

- Ana Viana, Francisco Pereira e Mário Alves; (abril de 2024); Slides TCIRC Capítulo 5 (77 - 79).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 28/02/2025

#### 10.10.3 - Potência aparente

A potência complexa (ou “aparente”), representada por $S$, não tem significado físico e não é a representação simbólica de qualquer grandeza alternada sinusoidal, contudo o conceito de potência complexa facilita a análise e o cálculo da potência ativa e reativa, uma vez que a sua parte real é
igual à potência ativa e a imaginária é igual à reativa:

$$
\underline{S} = \underline{U} \, \underline{I}^* = P+jQ
$$

, é usado o conjugado $(^*)$ da corrente para que o ângulo de $S$ corresponda à diferença dos ângulos da tensão e da corrente (o que se pretende no cálculo de $P$ e $Q$) e não à sua soma.

Ao módulo da potência complexa chama-se potência aparente $(S)$ e mede-se em volt-ampere $(VA)$:

$$
S=UI
$$

A representação vetorial da potência complexa é normalmente designada por triângulo de potências, cujo segundo o teorema de Pitágoras, em que os catetos são a potência ativa $(P)$ e a potência reativa $(Q)$ e a hipotenusa a potência complexa:

$$
S^2=P^2+Q^2
$$

##### Metadados

**Fonte**:

- Ana Viana, Francisco Pereira e Mário Alves; (abril de 2024); Slides TCIRC Capítulo 5 (80 - 81).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 28/02/2025

#### 10.10.4 - Fator de potência

O fator de potência é definido como sendo o cosseno do desfasamento $(\phi)$ entre a tensão e a corrente (ou o cosseno do ângulo da impedância da carga) e é igual à razão entre as potências activa e aparente:

$$
\cos \phi = \frac{P}{S}
$$

O fator de potência só pode variar entre 0 e 1 uma vez que $\phi$ só pode pertencer ao 1º ou ao 4º quadrante e é importante na medida em que permite determinar a quantidade de potência útil (ativa) que é transferida para a carga.

A potência útil é a potência dissipada nas resistências da carga uma vez que é a potência que anda num único sentido, da fonte para a carga, realizando trabalho. A potência reativa transferida para/de uma carga reativa (condensadores e bobinas) não é útil, uma vez que anda de um lado para o outro entre a fonte e a carga sem realizar trabalho.

O valor mais alto do fator de potência é 1 e corresponde à situação de estar perante uma carga puramente resistiva. 

Se o fator de potência se afastar de 1, aproximando-se de 0 começamos a ter uma carga cada vez mais reativa (podendo levar a perdas de energia nos condutores entre a fonte e a carga), por outro lado, à medida que o fator de potência se aproxima de 1, menor será a corrente necessária para alimentar a mesma carga e menor terá de ser a secção dos condutores da linha de transmissão (mais económico), ou seja, um fator de potência elevado permite uma entrega de potência mais eficiente a uma carga.

Chama-se correção do fator de potência à obtenção de um fator de potência mais elevado (idealmente de 1), para tal, deve-se minimizar as perdas na transmissão de modo que a tensão
na carga seja o mais próxima possível da tensão na fonte. Logo, a queda de tensão na linha deve ser o menor possível, o que é obtido com corrente mínima na linha.

Pretende-se assim que o valor eficaz da corrente na linha seja mínimo, mantendo-se o valor eficaz da tensão que alimenta a carga, mas que a potência transferida para carga seja a mesma. Isto traz ainda duas outras vantagens:

1. A potência de perdas assume um valor mínimo dado por:
    
    $$
    P_{perdas} = (R_i + R_{linha}) \times I^2
    $$
    
2. Pode-se alimentar um número maior de consumidores com a mesma fonte.

De modo a cumprir os objetivos propostos, é necessário aproximar de uma situação de ressonância paralelo da carga, ou seja, é necessário colocar em paralelo com a carga um elemento passivo, no caso, condensadores em paralelo quando $\phi > 0$ (indutivo) e bobinas em paralelo quando $\phi < 0$ (capacitivo).

Na situação de ressonância paralelo, a impedância é puramente resistiva e assume o seu valor máximo, a corrente assume o seu valor mínimo e o fator de potência tem o seu valor máximo (igual a 1).

##### Metadados

**Fonte**:

- Ana Viana, Francisco Pereira e Mário Alves; (abril de 2024); Slides TCIRC Capítulo 5 (89 - 97).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 28/02/2025

## 11 - Circuitos de Corrente Alternada Trifásica

### 11.1 - Sistemas trifásicos


### 11.2 - Ligações estrela e triângulo em trifásico


### 11.3 - Potência em circuitos trifásicos