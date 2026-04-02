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


### 4.2 - Método de medição por "comparação" - Ponte de Wheatstone

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

### 4.3 - Ohmmímetro

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

### 4.4 - Voltímetro

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

### 4.5 - Amperímetro

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


### 4.6 - Wattímetro

O wattímetro é um instrumento de medição que se destina a medir a potência eléctrica. Pode ser
analógico ou digital, sendo que, internamente, o que qualquer deles faz é medir a tensão aos
terminais e a corrente que passa numa carga e multiplicá-las de forma a obter a potência – $(P=U \cdot I)$.

##### Metadados

**Fonte**:

- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 1 (8).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025

### 4.7 - Multímetro

O Multímetro é um instrumento de medição que permite medir diferentes grandezas elétricas, nomeadamente: corrente elétrica, tensão elétrica, resistência elétrica. Permite efetuar medições de correntes e de tensões, em corrente alternada sinusoidal e em corrente contínua.

##### Metadados

**Fonte**:

- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 1 (7).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 16/02/2025


### 4.8 - Gerador de sinais

Os geradores de funções, ou de sinais, são equipamentos que geram sinais eléctricos (normalmente períodicos) com a forma, frequência e amplitude pretendidas. No mercado existe uma grande
variedade de geradores de sinais. Os mais simples são os chamados osciladores, que apenas geram
sinais sinusoidais.

##### Metadados

**Fonte**:

- Departamento de Engenharia Eletrotécnica; (outubro de 2020); Guião FEELE 1 (5).

**Validação**: João Ferreira

**Versão**: 1.0

**Última atualização**: 27/02/2025

### 4.9 - Osciloscópio

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
