## 4 - Test and Measurement Equipment

### 4.1 - Classification of measuring instruments

Measuring instruments may be classified according to the way they present the indication of the measured values.

In analogue instruments, the indication is a continuous function of the value of the measured quantity. This means that the value may vary smoothly and continuously, without discrete jumps, and is generally represented by a pointer over a graduated scale.

Digital instruments, on the other hand, provide the measurement in numerical form, displaying the value directly on a display. As a consequence, the indication occurs in discrete steps, depending on the resolution of the device.

According to the *International Vocabulary of Metrology* (VIM 2012), a measuring instrument is understood as: “Device used for making measurements, alone or in conjunction with one or more supplementary devices”, and indication as: “Value provided by a measuring instrument”.

There is a wide variety of instruments intended for measuring electrical quantities, including:

* **Voltmeter** – measures electric voltage
* **Ammeter** – measures electric current
* **Ohmmeter** – measures electrical resistance
* **Wattmeter** – measures electric power
* **Electric energy meter** – measures energy consumption
* **Frequency meter** – measures the frequency of electrical signals
* **Phase meter** – measures the phase angle between signals
* **Capacitance meter** – measures capacitance
* **RLC bridge / RLC meter** – measures resistance, inductance, and capacitance
* **Oscilloscope** – displays electrical waveforms over time
* **Spectrum analyser** – analyses electrical signals at different frequencies
* **Logic analyser** – used to visualise digital signals
* **Voltage tester** – simple device used to identify the presence of voltage
* **Multimeter** – combines several functions in a single device

##### Metadata

**Source**:

* Mário Alves, Ana Viana and Francisco Pereira; (October 2023); *FEELE Slides Chapter 4* (24 - 28).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 18/02/2025

### 4.2 - Measurement by comparison - Wheatstone bridge

The comparison measurement method is a particular case of direct measurement methods, in which the quantity to be measured is compared with another quantity of the same type but with a known value. This method may be divided into two main types: the substitution method and the null method.

In the substitution method, the unknown quantity is replaced by another quantity of the same type whose value is known. The substitution is carried out in such a way that the effect on the indicating device remains unchanged.

In the null method, the value of the quantity to be measured is determined by balance, by adjusting one or more known quantities associated with the quantity being measured through a known balance relation.

A classic example of this method is a two-pan balance, where known weights are added or removed until equilibrium is reached, thus determining the weight of the object.

In the electrical context, the Wheatstone bridge is a device that follows this principle, adjusting resistances until the current in a galvanometer is zero, thereby allowing the value of an unknown resistance to be determined with high accuracy.

Measurement bridges are circuits widely used for measuring electrical quantities such as resistance, capacitance, and inductance. Some of the best known are:

* **Wheatstone bridge** – used for resistance measurements
* **De Sauty and Schering bridges** – for capacitance measurements
* **Maxwell and Owen bridges** – for inductance measurements

In addition, these bridges are often used as signal-conditioning circuits in electrical sensors and transducers.

The Wheatstone bridge, in particular, is a highly accurate method for measuring resistance, with very small uncertainties, generally in the range of 0.01% to 0.5%. Commercial models of this instrument are capable of measuring a wide range of resistances, from very low values $(m\Omega)$ to high values $(M\Omega)$.

The Wheatstone bridge operates based on the principle of electrical balance. The circuit contains four resistors arranged in a bridge configuration and a galvanometer that measures the potential difference between two points.

* When the current in the galvanometer is zero, the bridge is balanced, and the unknown resistance may then be determined through a mathematical relation between the resistances in the circuit.
* In commercial bridges, some resistances are adjustable to facilitate achieving balance, allowing highly accurate measurement.
* In general, three resistances in the circuit are known and adjustable, while the fourth resistance, which is unknown, is determined when balance is achieved.

To obtain the value of the unknown resistance, a multiplying factor and a decade box are used, the latter containing adjustable selectors to define a precise value. The number of decades available in the box corresponds to the number of significant figures in the final measurement.

##### Metadata

**Source**:

* Mário Alves, Ana Viana and Francisco Pereira; (October 2023); *FEELE Slides Chapter 4* (90 - 97).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 4.3 - Ohmmeter

The ohmmeter is a measuring instrument that allows the direct measurement of electrical resistance.
Due to its operating principle, the ohmmeter should only be connected across the terminals of a component (whose electrical resistance is to be measured) after that component has been disconnected from the circuit of which it forms part.

##### Metadata

**Source**:

* Department of Electrical Engineering; (October 2020); *FEELE Guide 1* (8).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 4.4 - Voltmeter

A voltmeter is a measuring instrument used to determine the electric potential difference (voltage) between two points in a circuit. It must always be connected in parallel to the points where the voltage is to be measured.

Voltmeters are designed to have high internal resistance, generally on the order of hundreds of k$\Omega$ or even tens of M$\Omega$, in order to minimise the current diverted from the circuit and reduce the so-called “loading effect”.

The internal resistance of a voltmeter may be determined in different ways:

* In analogue voltmeters, the internal resistance is obtained from the sensitivity (resistance per volt – $\Omega/V$).
* In digital voltmeters, the internal resistance is specified in the manufacturer’s manual.

If necessary, in both cases, the internal resistance of a voltmeter may be measured directly with an ohmmeter.

The measurement range of a voltmeter defines the interval of voltage values that it can measure. Typically, common voltmeters allow measurements from a few millivolts $(mV)$ up to hundreds of volts $(V)$, with 600–750 V being a common maximum limit.

Range selection may be performed:

* Manually, by means of a rotary switch.
* Automatically, in models with the “auto-range” function, which may be set to manual mode if required.

Typical ranges for general-purpose voltmeters are: 200 mV, 2 V, 20 V, 200 V, 750 V.

Voltmeters use a current-measuring movement (CMM), such as a microammeter, milliammeter, or galvanometer, to measure voltage indirectly. The measurement is made by controlling the current that passes through the CMM using series resistances.

To extend the measurement range of a voltmeter, it is necessary to add a resistor in series with the CMM. In this way, the total voltmeter voltage $(U)$ may be obtained from the expression:

$$
U = I \cdot (R + R_{AMC})
$$

where:

* $U$ is the measured voltage,
* $I$ is the current passing through the CMM,
* $R$ is the additional resistance,
* $R_{AMC}$ is the internal resistance of the CMM.

From this equation, the value of the additional resistance required to achieve a given measurement range may be determined by:

$$
R = \frac{U}{I} - R_{AMC}
$$

To allow multiple measurement ranges in the same instrument, selectable series resistances may be used. In a voltmeter with several ranges, different additional resistances are combined to adjust the measurement as needed.

The relation between the total voltmeter voltage and the voltage across the CMM may be described by the voltage divider:

$$
U_{AMC} = U \cdot \frac{R_{AMC}}{R + R_{AMC}}
$$

The multiplication factor of the additional resistance is given by:

$$
n = \frac{U}{U_{AMC}} = \frac{R_{AMC} + R}{R_{AMC}}
$$

##### Metadata

**Source**:

* Mário Alves, Ana Viana and Francisco Pereira; (October 2023); *FEELE Slides Chapter 4* (4 - 6, 17 - 20);
* Department of Electrical Engineering; (October 2020); *FEELE Guide 1* (7).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 19/02/2025

### 4.5 - Ammeter

An ammeter is a measuring instrument used to determine the magnitude of the electric current in a circuit. To perform the measurement correctly, it must always be connected in series in the branch where the current is to be measured.

To minimise interference with the circuit, ammeters are designed with low internal resistance (a few ohms), in order to avoid significant voltage drops and reduce the so-called “loading effect”.

The measurement range of an ammeter defines the interval of current values that it can measure. Common ammeters operate over ranges from milliamperes $(mA)$ up to tens of amperes $(A)$, with typical limits of 10–20 A.

Range selection may be performed:

* Manually, by means of a rotary switch.
* Automatically, in models with the “auto-range” function.

Typical ranges for general-purpose ammeters are: 2 mA, 20 mA, 200 mA, 2 A, 20 A.

Ammeters use a current-measuring movement (CMM), which may be a microammeter, milliammeter, or galvanometer, to detect small currents. To allow the measurement of higher currents, it is necessary to use shunt resistors in parallel with the CMM, in order to divide the current correctly.

The total measured current $(I_T)$ is related to the current through the CMM $(I_{AMC})$ and the shunt resistance $(R_S)$ by the current-divider equation:

$$
I_{AMC} = I_T \cdot \frac{R_S}{R_S + R_{AMC}}
$$

The shunt multiplication factor $(m)$ is given by:

$$
m = \frac{R_S + R_{AMC}}{R_S}
$$

To size the shunt resistance, the following relation is used:

$$
R_S = \frac{R_{AMC}}{m - 1}
$$

where:

* $R_S$ is the shunt resistance,
* $R_{AMC}$ is the internal resistance of the CMM,
* $m$ is the multiplication factor required for the desired measurement range.

Shunt resistors are made from low-resistance materials with a low temperature coefficient, such as manganin (a copper-manganese-nickel alloy), ensuring stable measurements.

Shunts may be:

* **Internal**, when integrated into the ammeter.
* **External**, when connected directly in the circuit and linked to the CMM.

For ammeters with multiple measurement ranges, different shunt resistances are associated with a switch, allowing the appropriate resistance to be selected for each current range. The shunts must be designed together, ensuring that each resistance meets the requirements of its corresponding measurement range.

##### Metadata

**Source**:

* Mário Alves, Ana Viana and Francisco Pereira; (October 2023); *FEELE Slides Chapter 4* (4 - 15);
* Department of Electrical Engineering; (October 2020); *FEELE Guide 1* (7 - 8).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 19/02/2025

### 4.6 - Wattmeter

A wattmeter is a measuring instrument intended to measure electric power. It may be analogue or digital, and internally, what either of them does is measure the voltage across the terminals and the current passing through a load and multiply them to obtain the power:

$$
P = U \cdot I
$$

##### Metadata

**Source**:

* Department of Electrical Engineering; (October 2020); *FEELE Guide 1* (8).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 4.7 - Multimeter

The multimeter is a measuring instrument that allows different electrical quantities to be measured, namely: electric current, electric voltage, and electrical resistance. It allows current and voltage measurements to be performed in sinusoidal alternating current and in direct current.

##### Metadata

**Source**:

* Department of Electrical Engineering; (October 2020); *FEELE Guide 1* (7).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 16/02/2025

### 4.8 - Signal generator

Function generators, or signal generators, are instruments that generate electrical signals (normally periodic) with the desired waveform, frequency, and amplitude. There is a great variety of signal generators on the market. The simplest are the so-called oscillators, which generate only sinusoidal signals.

##### Metadata

**Source**:

* Department of Electrical Engineering; (October 2020); *FEELE Guide 1* (5).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 4.9 - Oscilloscope

The oscilloscope is a measuring instrument used to visualise and analyse the evolution of electrical signals over time.

With an oscilloscope, it is possible to measure various signal characteristics, such as peak values, peak-to-peak values, RMS values, DC and AC components; temporal characteristics such as period, frequency, rise time, and duty cycle; and, when two signals are analysed simultaneously, differences between them such as phase shift and gain may also be determined. Depending on the oscilloscope model and manufacturer, more advanced analyses may be performed, such as noise filtering, spectral analysis, and mathematical transforms such as the FFT, which makes it easier to visualise the frequency components of the signal.

Oscilloscopes may be classified as analogue or digital. Analogue models, now obsolete, used cathode-ray tubes (CRT) and analogue electronics to generate the image of the signal on the screen. Digital models, more correctly called sampling oscilloscopes, convert the input signal into discrete values, allowing storage, digital processing, and a series of advanced functionalities. Since both types of oscilloscopes show the evolution of the input signal over time (analogue indication), both are therefore analogue measuring instruments.

For a signal to be displayed correctly on the oscilloscope, it is essential that the synchronisation system, known as the trigger, is properly adjusted. The trigger stabilises the waveform displayed on the screen, ensuring that the same repetition of the signal is shown continuously. If the sweep is not triggered at the same instant every time, the resulting image will be unstable and difficult to interpret. The trigger is configured by defining a trigger level and a slope, which determine at what point and in which direction of the signal (rising or falling) the oscilloscope will start the sweep. In digital models, advanced trigger modes exist that allow the identification of specific events, such as spikes, signal faults, and anomalous behaviours, and also allow single-shot sweep mode, which “freezes” the signal on the screen, facilitating the analysis of events that occur only once, such as the charging of a capacitor.

Among the technical specifications of an oscilloscope, some characteristics are common to all models, such as bandwidth $(MHz-GHz)$, the number of input channels (1, 2, 4, 6), vertical sensitivity (min. 1–2 mV/div, max. 2–100 V/div), and measurement uncertainties (between 0.1% and 3%).
In digital models, factors such as sampling frequency (MS/s–GS/s), vertical resolution (8–12 bits), and record length (kB–MB) are decisive for signal analysis quality. In addition, characteristics such as the presence of a colour display, USB, Wi-Fi, and Ethernet connectivity interfaces, and software-based processing resources are other factors that differentiate the cost of more modern models.

In conventional bench oscilloscopes, the internal circuit ground is connected to the third terminal of the power outlet, ensuring that it remains at the same potential as the installation earth. However, in portable oscilloscopes, the ground may be “floating”, that is, not directly connected to earth, which allows measurements in locations where there are potential differences between the circuit ground and earth. There are also models in which each channel has an independent ground, enabling differential measurements without interference.

For voltage measurements, passive probes are common; they act as voltage dividers and are available with different attenuation factors, such as 1X, 10X, 100X, and 1000X. For measurements of very weak signals, active probes with pre-amplification are used, since they present higher input impedance and reduce the loading effect on the circuit under test. For current measurements, probes may be of the current-transformer type, which operate only with alternating signals, or of the Hall-effect type, which allow measurements of both direct and alternating current.

There are several types of oscilloscopes on the market, the most common being digital bench models, ranging from low-cost options to high-end instruments used in specialised laboratories. Portable oscilloscopes are a practical option for field measurements and generally provide integration with computer and mobile-device applications. PC-based oscilloscopes use internal data-acquisition boards or external modules connected to a computer, allowing all processing and waveform analysis to be carried out by software.

##### Metadata

**Source**:

* Ana Viana, Mário Alves and Francisco Pereira; (October 2023); *TCIRC Slides Chapter 2* (3 - 30).
* Department of Electrical Engineering; (October 2020); *FEELE Guide 1* (6).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 18/02/2025
