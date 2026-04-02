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
