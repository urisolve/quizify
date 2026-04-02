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
