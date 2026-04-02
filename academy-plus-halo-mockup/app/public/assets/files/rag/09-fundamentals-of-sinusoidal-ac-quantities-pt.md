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
    z = x+yj
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
