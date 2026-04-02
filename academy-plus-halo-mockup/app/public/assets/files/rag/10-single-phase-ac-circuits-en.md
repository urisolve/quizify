## 10 - Single-Phase Alternating Current Circuits

### 10.1 - Laws and methods for alternating current circuits

In alternating current (AC) circuits, the laws and analysis/simplification methods are basically the same as those used in direct current (DC), with the fundamental difference that the quantities (voltage, current, etc.) are treated in the complex domain.

Ohm’s law in AC retains the same form as in DC, but with the introduction of the concept of impedance $(\underline{Z})$, which represents opposition to the flow of AC and has a real part (resistance, $R$) and an imaginary part (reactance, $X$, which may be inductive or capacitive). The relationship between voltage $(\underline{U})$ and current $(\underline{I})$ is expressed as:

$$
\underline{Z} = \frac{\underline{U}}{\underline{I}}
$$

This concept of impedance does not exist in DC and is fundamental for the analysis of AC circuits.

Kirchhoff’s laws (Current Law and Voltage Law) may also be applied in AC, but in vector or complex form, since the quantities in the AC domain are complex numbers.

* In Kirchhoff’s Current Law (KCL), the sum of the currents (transformed quantities) entering and leaving a node is zero.
* In Kirchhoff’s Voltage Law (KVL), the sum of the voltages around a closed mesh is equal to zero. That is, the sum of the e.m.f.s (electromotive forces) is equal to the sum of the voltage drops across all the elements in the mesh.

In DC circuits, voltage and current are constant, do not vary with time, and the concept of “phase” (phase shift) does not exist.

In AC circuits, voltage and current vary continuously with time, and the inductive and capacitive characteristics of the loads lead to a phase shift between voltage and current — the concept of “phase” — which implies that voltages/currents are not synchronised, that is, positive/negative maxima and zero crossings occur at different instants.

In series, the equivalent impedance is given by the vector sum of the impedances $(\underline{Z})$, and in parallel it is given by the vector sum of the admittances $(\underline{Y})$, where admittance is the inverse of impedance.

It is worth noting that, unlike DC, in AC the equivalent impedance of a series association is not necessarily greater than any of the associated impedances, and the equivalent impedance of a parallel association is not necessarily smaller than any of the associated impedances, since the associated impedances may have reactances of opposite signs.

All the remaining theorems, rules, and methods may be generalised to AC.

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (3 - 5).
* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (98 - 101).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 10.2 - Components in alternating current

In alternating current (AC) circuits, the behaviour of components such as resistors, coils, and capacitors changes, mainly due to the concepts of phase, impedance, reactance, and interaction with the signal frequency.

In a purely resistive circuit, the current $i(t)$ may be calculated from the voltage $u(t)$ using Ohm’s law, and vice versa, or by using the Steinmetz transform. In such circuits, current and voltage are in phase.

The average power in a resistor is given by $P=U \cdot I$, where $U$ and $I$ are the RMS values of voltage and current, respectively.

The frequency of the power is twice the frequency of the current and voltage.

In a purely inductive circuit, the voltage is in leading quadrature with respect to the current, that is, the voltage leads the current by 90 degrees, or, in the time domain, the voltage reaches its maximum value one quarter of a period before the current.

$$
\underline{U}=j \omega L\underline{I} = jX_L \underline{I} = \underline{X_LI}
$$

At zero frequency (DC), $X_L = 0$ (short circuit). As the frequency tends to infinity, $X_L \to \infty$ (open circuit).

The RMS value of the voltage is equal to the product of the RMS current value and the inductive reactance $X_L$.

The average power in an ideal coil is zero. An ideal coil does not consume energy: in the time intervals when the power is positive $(u(t)$ and $i(t)$ with the same sign$)$, the coil receives/stores energy; when the power is negative $(u(t)$ and $i(t)$ with opposite signs$)$, the coil releases energy, operating alternately as a load or as a source.

The frequency of the power is twice the frequency of the current and voltage.

In a purely capacitive circuit, the voltage is in lagging quadrature with respect to the current, that is, the voltage lags the current by 90 degrees, or, in the time domain, the voltage reaches its maximum value one quarter of a period after the current.

$$
\underline{U}= \frac {\underline{I}}{j \omega C} = -jX_C \underline{I} = \underline{X_CI}
$$

At zero frequency (DC), $X_C \to \infty$ (open circuit). As the frequency tends to infinity, $X_C = 0$ (short circuit).

The RMS value of the voltage is equal to the product of the RMS current value and the capacitive reactance $X_C$.

The average power in an ideal capacitor is zero. An ideal capacitor does not consume energy: in the intervals when the power is positive $(u(t)$ and $i(t)$ with the same sign$)$, the capacitor receives/stores energy; when the power is negative $(u(t)$ and $i(t)$ with opposite signs$)$, the capacitor supplies energy, operating alternately as a load or as a source.

The frequency of the power is twice the frequency of the current and voltage.

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (6 - 17).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 10.3 - Magnetisation and demagnetisation of a coil

The magnetisation of a coil consists of causing the coil to store energy by creating a magnetic field inside it.

After steady-state conditions are reached, the circuit current attains its maximum value and the voltage across the coil terminals becomes zero.

It is possible to analyse the magnetisation and demagnetisation of the coil by means of a series RL circuit and a switch that either connects the voltage source to the components or isolates it, leaving the components connected only to each other.

To magnetise the coil, the resistor and the coil must be connected in series with the power source. In this way, the voltage across the coil terminals and the current flowing in the circuit vary with time: the voltage across the coil decreases from a maximum value to 0, and the current increases from 0 to a maximum value. At that moment (when it reaches the maximum value), the coil behaves as a short circuit (under DC conditions).

Applying Kirchhoff’s Voltage Law to the circuit gives:

$$
E=u_R(t) + u_L(t)=R \cdot i(t) + u_L(t)
$$

where $i(t)$ is given by:

$$
i(t) = \frac{E}{R}(1-e^{-t/\tau})
$$

where $\tau$ is the time constant $(s)$ and is defined as:

$$
\tau= \frac{L}{R}
$$

and the value of $u_L(t)$ may be calculated as:

$$
u_L(t) = E \cdot e^{-t/\tau}
$$

The time constant may be interpreted as the time after which the current has reached 63.2% of its final value and the voltage across the coil has dropped to 36.8% of its initial value.

In practice, coil magnetisation is considered complete after $5 \tau$ (error $< 1%$).

If the initial current is different from zero, the general expressions for current and voltage are:

$$
i(t) = I_i + (I_f - I_i)(1-e^{-t/\tau})= I_f - (I_f - I_i) e^{-t/\tau}
$$

and:

$$
u_L(t) = R(I_f - I_i) e^{-t/\tau}
$$

The energy stored in a coil after magnetisation results from the magnetic field inside the coil and is given by:

$$
W=\frac{1}{2}LI_f^2
$$

To demagnetise the coil, the coil and the resistor must be isolated from the power source (by actuating the switch). In this way, during demagnetisation the current decreases to 0 and the energy stored in the coil is dissipated in the resistor (by the Joule effect).

Applying Kirchhoff’s Voltage Law to the circuit gives:

$$
u_L(t) + u_R(t)= u_L(t) + R \cdot i(t) = 0
$$

where $i(t)$ is given by:

$$
i(t)=I_i e ^{-t/\tau}
$$

and the value of $u_L(t)$ may be calculated as:

$$
u_L(t)=-U_{Li} e^{-t/\tau}
$$

The current and voltage have opposite signs because the coil is supplying energy (behaving as an active element), and, as a rule, demagnetisation is considered complete after $5 \tau$.

The same expressions used for magnetisation are also used to calculate $i(t)$ and $u_L(t)$; however, it is important to note that the initial and final current values differ in each case.

##### Metadata

**Source**:

* Mário Alves and Francisco Pereira; (March 2024); *TCIRC Slides Chapter 4* (18 - 31).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 10/03/2025

### 10.4 - Charging and discharging of a capacitor

Charging a capacitor consists of storing electric charge and energy, thereby creating a potential difference between its plates.

Once fully charged, the capacitor will retain the stored charge as long as there is no closed path through which it can discharge. To discharge the capacitor, it is sufficient to connect its plates through a resistive circuit.

The charging and discharging of a capacitor may be analysed by means of a series RC circuit with a switch that either connects the voltage source to the circuit or isolates it, allowing interaction only between the components.

When the circuit is closed, the voltage across the capacitor terminals and the current flowing in the circuit vary with time. The capacitor voltage increases from 0 to the maximum value $E$, while the current starts at a maximum value and decays to zero. At that point, the capacitor behaves as an open circuit under direct current (DC) conditions.

Applying Kirchhoff’s Voltage Law to the circuit gives:

$$
E = u_R(t) + u_C(t) = R \cdot i(t) + u_C(t)
$$

where $u_C(t)$ is given by:

$$
u_C(t) = E(1-e^{-t/\tau})
$$

where $\tau$ is the time constant $(s)$ and is defined as:

$$
\tau= RC
$$

and the value of $i(t)$ may be calculated as:

$$
i(t) = \frac{E}{R} \cdot e^{-t/\tau}
$$

The time constant may be interpreted as the time after which the voltage has reached 63.2% of its final value and the current has decreased to 36.8% of its initial value.

In practice, the capacitor is considered fully charged after $5 \tau$ (error $< 1%$).

If the capacitor has an initial charge different from zero, the general expressions for voltage and current are:

$$
u_C(t) = U_{Ci} + (U_{Cf} - U_{Ci}) \left(1 - e^{-t/\tau} \right)
$$

and:

$$
i(t) = \frac{U_{Cf} - U_{Ci}}{R} e^{-t/\tau}
$$

The energy stored in the capacitor after charging is given by:

$$
W = \frac{1}{2} C U_{Cf}^2
$$

To discharge the capacitor, it is sufficient to isolate the power source, allowing the capacitor and resistor to remain connected to each other. During discharge, current flows through the circuit and the energy stored in the capacitor is dissipated in the resistor by the Joule effect.

Applying Kirchhoff’s Voltage Law gives:

$$
u_C(t) + u_R(t) = u_C(t) + R \cdot i(t) = 0
$$

where $u_C(t)$ is given by:

$$
u_C(t)=U_{Ci} e ^{-t/\tau}
$$

and the value of $i(t)$ may be calculated as:

$$
i(t)=-\frac{U_{Ci}}{R} e^{-t/\tau}
$$

The current is negative because its direction is opposite to that during charging.

In practice, capacitor discharge is considered complete after $5 \tau$, at which point both voltage and current are practically zero.

The expressions for capacitor charging may be used in general for both charging and discharging, provided that the appropriate values of $U_{Ci}$ and $U_{Cf}$ are used.

##### Metadata

**Source**:

* Mário Alves and Francisco Pereira; (March 2024); *TCIRC Slides Chapter 3* (19 - 32).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 10/03/2025

### 10.5 - Series RLC circuits

A series RLC circuit is a single-mesh circuit containing all types of passive elements (resistor, coil, and capacitor) connected in series. In such a circuit, the current is the same through all components.

$$
i(t)= \sqrt{2} I \sin(\omega t + \theta)
$$

From this, it is possible to determine the voltage across each passive component. Through Kirchhoff’s Voltage Law and the properties of the Steinmetz transform, it is known that the total voltage is given by:

$$
\underline{U} = \underline{U_R} + \underline{U_L} + \underline{U_C}
$$

with $\underline{U_R}=R \underline{I}$, $\underline{U_L} = j \omega L \underline{I}$, and $\underline{U_C} = \underline{I}/(j \omega C)$, yielding:

$$
\underline{U}=(R+j \omega L - \frac{j}{\omega C}) \times \underline{I}
$$

According to Ohm’s law, it may also be deduced that the equivalent impedance of the series circuit is:

$$
\underline{Z} = R + j (\omega L - \frac{1}{\omega C})
$$

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (19 - 22).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 10.6 - Parallel RLC circuits

A parallel RLC circuit is a circuit containing all types of passive elements (resistor, coil, and capacitor) connected in parallel. In such a circuit, the voltage is the same across all components.

In this case, it is possible to determine the current in each passive component. The total current is given by:

$$
\underline{I} = \underline{I_R} + \underline{I_L} + \underline{I_C}
$$

with $\underline{I_R}=\underline{U} / R$, $\underline{I_L} = \underline{U} / j \omega L$, and $\underline{I_C} = j \omega C \underline{U}$, yielding:

$$
\frac{\underline{I}}{\underline{U}}=\frac{1}{R}+j (\omega C - \frac{1}{\omega L})
$$

and in this case it may be easier to work with admittance rather than impedance:

$$
\underline{Y} = \frac{1}{R} + j (\omega C - \frac{1}{\omega L})
$$

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (30).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 10.7 - Inductive and capacitive predominance

A circuit may be predominantly inductive or predominantly capacitive depending on the phase shift between the circuit voltage and current or, equivalently, by analysing the phase of the circuit’s equivalent impedance from the perspective of the power source.

The phase $(\varphi)$ of the equivalent impedance $(\underline{Z})$ represents the phase shift between voltage and current, with $\varphi$ calculated from:

$$
\varphi = \arctg(\frac{X}{R})
$$

with:

$$
X =\omega L - \frac{1}{\omega C} = X_L - X_C
$$

If $\varphi > 0^\circ$, the voltage leads the current and the circuit is predominantly inductive, and therefore:

$$
\omega L > \frac{1}{\omega C}
$$

If $\varphi < 0^\circ$, the voltage lags behind the current and the circuit is predominantly capacitive, so that:

$$
\omega L < \frac{1}{\omega C}
$$

This expression allows one to conclude that $\varphi$ lies within the range:

$$
-90^\circ < \varphi < 90^\circ
$$

If $\varphi = 90^\circ$, the load is an ideal coil.

If $\varphi = -90^\circ$, the load is an ideal capacitor.

If $\varphi = 0^\circ$, the circuit is purely resistive, i.e. it has no reactance, either because the load is purely resistive or because the circuit is at resonance, that is:

$$
\omega L = \frac{1}{\omega C}
$$

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (23 - 27).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 10.8 - Resonance

When an AC power source is connected to a passive two-terminal network containing at least one capacitor and one coil, a phenomenon known as resonance may occur. At resonance, the circuit downstream of the two-terminal network becomes purely resistive and the source current is in phase with the voltage across its terminals. For this phenomenon to occur, the equivalent impedance seen at the terminals of the two-terminal network must be real, that is, the equivalent reactance must be zero $(X_L = X_C)$. The resonance phenomenon may be harmful, but it may also be usefully applied in various areas of science and engineering, for example in passive band-pass/band-stop filters.

The simplest case for studying resonance is in series and parallel RLC circuits.

In series resonance, the equivalent impedance is given by:

$$
\underline{Z}=R+jX=R+j(\omega L - \frac{1}{\omega C})
$$

then, for resonance to occur, it is necessary that:

$$
X = 0 \rightarrow X_L = X_C \leftrightarrow \omega L = \frac{1}{\omega C}
$$

The frequency for which the inductive reactance is equal to the capacitive reactance is called the resonance frequency, $f_0$:

$$
f_0= \frac{1}{2 \pi \sqrt{LC}}
$$

At this frequency, the circuit behaves as a purely resistive circuit (from the source perspective):

The impedance reaches its minimum value at the resonance frequency, and the voltage across the resistor is equal to the total voltage applied to the impedance.

At resonance, the voltages across the coil and capacitor are always equal and opposite and consequently cancel each other out. The voltage across the series association of the capacitor and coil is therefore zero, and between these two points there is a short circuit. This case of resonance is also called **voltage resonance**.

The voltages across the capacitor and the coil may reach values greater than the circuit supply voltage, attaining their maximum values at the resonance frequency. Thus, connecting an AC source to an RLC circuit may be dangerous if the source frequency is close to the resonance frequency of the circuit. The danger is even greater if the resistance $(R)$ is small, since in that case the current may be very large and damage the RLC circuit or the source. In the particular case where the resistance is zero, the RLC circuit becomes equivalent to a short circuit. In that case, the current is limited only by the internal impedance of the source feeding the RLC circuit.

In summary, in a series-resonant RLC circuit, the following holds:

* The source voltage and current are in phase.
* The inductive reactance is equal to the capacitive reactance.
* The impedance takes its minimum value and is equal to $R$.
* The RMS current takes its maximum value $(E/R)$.
* The voltage across the resistor is equal to the applied (source) voltage.
* The voltages across the capacitor and coil are equal and opposite, cancelling each other out.
* The voltage across the capacitor-coil series association is zero (short circuit).
* The voltages across the capacitor and coil may reach values greater than the voltage applied to the circuit.

In the case of parallel resonance, it is simpler to work with admittances rather than impedances, the equivalent admittance being given by:

$$
\underline{Y} = \frac{1}{\underline{Z}} = \frac{1}{R}+j(\omega C - \frac{1}{\omega L})
$$

Under resonance conditions, the circuit impedance must be real and therefore the admittance must also be real. Hence,

$$
B=0 \rightarrow \omega C = \frac{1}{\omega L}
$$

and the resonance frequency, $f_0$, is given by:

$$
f_0=\frac{1}{2 \pi \sqrt{LC}}
$$

At this frequency, the circuit behaves as a purely resistive circuit.

The admittance reaches its minimum value at the resonance frequency, i.e. the impedance reaches its maximum value. It is also found that the currents in the capacitor and the coil are symmetrical (and of equal magnitude) and consequently cancel each other out.

The total current is minimum and equal to:

$$
\underline{I} = \frac{\underline{U}}{R}
$$

The current through the resistor is equal to the total current feeding the parallel RLC circuit. It may be said that at the resonance frequency it is as if the resistor were in parallel with an open circuit. This case of resonance is also called **current resonance**.

Parallel resonance only presents some danger if the value of the resistance is very high and the circuit is fed by an ideal current source. In that case, the voltage across the resistor may reach high values. However, the probability of this situation occurring is low because the sources generally used approximate ideal voltage sources rather than ideal current sources. In the particular case where the resistance is infinite (i.e. absent), the RLC circuit becomes equivalent to an open circuit. Whatever the voltage applied to the circuit, the total current is zero.

In summary, in a parallel-resonant RLC circuit, the following holds:

* The source voltage and current are in phase.
* The inductive reactance is equal to the capacitive reactance.
* The impedance takes its maximum value and is equal to $R$.
* The RMS current takes its minimum value $(E/R)$.
* The current through the resistor is equal to the total current feeding the parallel RLC circuit.
* The currents in the capacitor and the coil are equal and opposite, cancelling each other out.
* The capacitor and the coil behave as if they were in open circuit.
* The voltage across the resistor may reach high values if the parallel RLC circuit is fed by an ideal current source and if the resistance $(R)$ is high.

In order to analyse the phenomena of series and parallel resonance in energetic terms, it is necessary to calculate and relate the energy stored in the capacitor and the coil under resonance conditions. The energy of the coil is given by:

$$
W_L = \frac{1}{2} LI^2_L
$$

and the energy of the capacitor is given by:

$$
W_C= \frac{1}{2} C U^2_C
$$

The ideal cases of series and parallel resonance (circuits without resistance) correspond to the same condition:

$$
\omega L = \frac{1}{\omega C}
$$

Under resonance conditions, the energies consumed/produced by the capacitor and the coil are equal.

Resonance translates into energetic independence with respect to the source (assuming that the capacitor and the coil are ideal — there are no Joule-effect losses).

Only during the initial instants of operation (transient regime), before steady-state conditions are reached, does the source supply energy to the circuit. From that moment onwards (in steady state), the coil and the capacitor become energetically independent of the source, with only energy exchanges between them — hence the term “reactive power/energy”. In cases where there is resistance $(R)$ in the circuit, there is still energetic independence with respect to the capacitor and the coil, and the source supplies only the energy consumed by the resistance.

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (32 - 50).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 10.9 - First-order passive filters

A filter is a circuit designed to “let through” a given range of frequencies and “filter” (reject or attenuate) other frequencies from upstream to downstream of a given two-terminal network.

Filters are used, for example, to tune a given radio or television station, or to alter the treble and bass of an amplifier.

A filter is said to be a **passive filter** if it contains only passive components $(R, L,$ and $C)$.

A filter is said to be an **active filter** if it contains active components (such as transistors or operational amplifiers).

The gain/amplification of a circuit is often measured in decibels $(dB)$ and is calculated by the following formula for power:

$$
A_P = 10 \cdot \log_{10} \left( \frac{P_{\text{out}}}{P_{\text{in}}} \right)
$$

and by the following formula for voltage (or current):

$$
A_U = 10 \cdot \log_{10} \left( \frac{U_{\text{out}}}{U_{\text{in}}} \right)
$$

where $P_{out}$ and $U_{out}$ are the output power and voltage respectively, and $P_{in}$ and $U_{in}$ are the input power and voltage respectively.

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (51 - 68).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 28/02/2025

#### 10.9.1 - Low-pass filters

A low-pass filter allows lower frequencies to pass and rejects higher frequencies.

This filter may be obtained from an RC circuit in which the output is taken across the capacitor, or from an RL circuit in which the output is taken across the resistor (there are other alternatives).

The ratio between the output and input voltages is called the transfer function, $H(\omega)$, and in this case, $\underline{H}(0) = 1$ and $\underline{H}(\infty) = 0$.

At low frequencies, the capacitor behaviour (in the RC circuit) approaches that of an open circuit, and the output voltage approaches the input voltage; at high frequencies, the capacitor approaches a short circuit, and the output voltage approaches zero.

The behaviour of the RL circuit may be explained analogously, remembering that at low frequencies the coil approaches a short circuit and at high frequencies an open circuit.

The cut-off frequency $(\omega_c$ or $f_c)$ is also defined as the frequency at which the magnitude of the transfer function decreases to 70.7% of its maximum value and is calculated by dividing the maximum value of the transfer function by $\sqrt{2}$. In the case of the RC circuit:

$$
\omega_c = \frac{1}{RC}
$$

A low-pass filter filters frequencies above the cut-off frequency.

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (52 - 55).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 28/02/2025

#### 10.9.2 - High-pass filters

A high-pass filter allows all frequencies above the cut-off frequency to pass.

This filter may be obtained from an RC circuit in which the output is taken across the resistor, or from an RL circuit in which the output is taken across the coil (there are other alternatives).

For a high-pass filter, the transfer ratio $H(\omega)$ is such that $\underline{H}(0) = 0$ and $\underline{H}(\infty) = 1$.

At low frequencies, the capacitor behaviour (in the RC circuit) approaches that of an open circuit and the output voltage approaches zero; at high frequencies, the capacitor approaches a short circuit and the output voltage approaches the input voltage.

The behaviour of the RL circuit may be explained analogously, remembering that at low frequencies the coil approaches a short circuit and at high frequencies an open circuit.

The cut-off frequency is again defined by:

$$
\omega_c = \frac{1}{RC}
$$

A high-pass filter filters frequencies below the cut-off frequency.

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (56 - 59).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 28/02/2025

#### 10.9.3 - Band-pass filters

A band-pass filter allows all frequencies between two frequency limits $(\omega_{c1} < \omega < \omega_{c2})$ to pass, where $\omega_{c1}$ is the lower cut-off frequency and $\omega_{c2}$ is the upper cut-off frequency.

This filter may be obtained from a series RLC circuit in which the output is taken across the resistor.

The transfer function $H(\omega)$ of this circuit is given by:

$$
\underline{H}(\omega) = \frac{1}{1+j[\omega L - 1/(\omega C)]/R}
$$

with $\underline{H}(0) = 0$ and $\underline{H}(\infty) = 0$.

The lower cut-off frequency $(\omega_{c1})$ is given by:

$$
\omega_{c1} = \frac{-RC+\sqrt{(RC)^2+4LC}}{2LC}
$$

and the upper cut-off frequency $(\omega_{c2})$ is given by:

$$
\omega_{c2} = \frac{RC+\sqrt{(RC)^2+4LC}}{2LC}
$$

The band defined by the cut-off frequencies is centred on the resonance frequency of the series RLC circuit and is given by:

$$
\omega_0=\frac{1}{\sqrt{LC}} \Leftrightarrow f_0=\frac{1}{2 \pi \sqrt{LC}}
$$

A band-pass filter filters frequencies below the lower cut-off frequency and above the upper cut-off frequency.

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (60 - 63).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 28/02/2025

#### 10.9.4 - Band-stop filters

A band-stop filter rejects all frequencies lying between two frequency limits $(\omega_{c1} < \omega < \omega_{c2})$, where $\omega_{c1}$ is the lower cut-off frequency and $\omega_{c2}$ is the upper cut-off frequency.

This filter may be obtained from a series RLC circuit in which the output is taken across the series association of the coil and the capacitor (there are other alternatives).

The transfer function $H(\omega)$ of this circuit is given by:

$$
\underline{H}(\omega) = \frac{1}{1-jR/[\omega L - 1/(\omega C)]}
$$

with $\underline{H}(0) = 1$ and $\underline{H}(\infty) = 1$.

The lower cut-off frequency $(\omega_{c1})$ is given by:

$$
\omega_{c1} = \frac{-RC+\sqrt{(RC)^2+4LC}}{2LC}
$$

and the upper cut-off frequency $(\omega_{c2})$ is given by:

$$
\omega_{c2} = \frac{RC+\sqrt{(RC)^2+4LC}}{2LC}
$$

The band defined by the cut-off frequencies is centred on the resonance frequency of the series RLC circuit and is given by:

$$
\omega_0=\frac{1}{\sqrt{LC}} \Leftrightarrow f_0=\frac{1}{2 \pi \sqrt{LC}}
$$

A band-stop filter rejects frequencies that are simultaneously above the lower cut-off frequency and below the upper cut-off frequency.

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (64 - 67).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 28/02/2025

### 10.10 - Power in alternating current

Instantaneous electric power results from the sum of two terms: one is constant and depends on the phase shift, $\phi$, between voltage and current; the other is sinusoidally alternating, with zero average value and a frequency twice that of the current or voltage. Thus, the expression is given by:

$$
P_{avg}=UI\cos\phi
$$

It may be concluded that the instantaneous electric power received by any load is pulsating, oscillating around the value $UI\cos\phi$ at a frequency double that of the current/voltage.

The expression obtained for instantaneous electric power encompasses the three particular cases:

If the passive branch is a resistor, $\phi = 0$:

$$
p(t)=UI-UI\cos(2(\omega t+\theta))
$$

If the passive branch is an ideal coil, $\phi=\pi/2$:

$$
p(t)=UI\sin(2(\omega t+\theta))
$$

If the passive branch is an ideal capacitor, $\phi=-\pi/2$:

$$
p(t)=-UI\sin(2(\omega t+\theta))
$$

The average power varies between $U\cdot I$, when the circuit is purely resistive, and $0$, when it is purely inductive or capacitive.

The instantaneous power in a passive RLC branch contains a sinusoidal waveform, and when $p(t)$ is negative, the branch is receiving energy from the source; when $p(t)$ is positive, the branch is supplying energy to the source.

If, instead of a load (the passive RLC branch under study), there were a source, the graph of the instantaneous electric power would in that case be symmetric (with respect to the time axis) to the graph of the instantaneous electric power of the load.

In this case, if the two-terminal network is a load, the area of $p(t)$ above the time axis is greater than the area below the time axis during one period, and:

$$
P_{avg}=UI\cos\phi \ge 0
$$

If the two-terminal network is a source, the area of $p(t)$ below the time axis is greater than the area above the time axis during one period, and:

$$
P_{avg}=UI\cos\phi \le 0
$$

Part of the energy supplied by a source to an impedance is dissipated (in its resistance), while the other part is stored (in its reactance), and later returned to the source.

The distinction between these types of energy leads to the definition of three types of power for any electrical element: **Active Power**, represented by the symbol $P$; **Reactive Power**, represented by the symbol $Q$; and **Apparent Power**, represented by the symbol $S$.

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (70 - 75).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 28/02/2025

#### 10.10.1 - Active power

Active power, or average power, or simply power, represented by the symbol $P$, corresponds to the average value of the instantaneous power over time. It is the portion of the received power that is dissipated as heat in the resistance of the impedance. Thus:

$$
P=U_RI
$$

The impedance and the voltage across the impedance may be written as:

$$
\underline{Z}=Z \angle \phi =Z \cos \phi + jZ \sin \phi = R + jX
$$

$$
\underline{U}=U \angle \phi = U \cos \phi + jU \sin \phi = U_R + jU_X = \underline{U}_R + \underline{U}_X
$$

Active power is measured in watts, $W$, and is defined by:

$$
P = U I \cos \phi
$$

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (76).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 28/02/2025

#### 10.10.2 - Reactive power

Reactive power is associated with the energy stored and exchanged between the inductive and capacitive elements of an electric circuit; it arises from the difference between the magnetic energy accumulated in coils and the electrical energy stored in capacitors.

In an RLC circuit, the energy stored in the coil and in the capacitor is in phase opposition. When these energies are equal, as in the case of resonance, there is only an exchange of energy between the components without intervention from the source.

In the general case, when there is inductive predominance and the coil is magnetising, the capacitor is discharging and supplying its stored energy to the coil, and the missing energy $(W_{L,\max} - W_{C,\max})$ is supplied to the coil by the source.

When there is capacitive predominance and the capacitor is charging, the coil is demagnetising and supplying its energy to the capacitor, and, since there is now excess energy in the coil, the surplus is returned to the source.

Thus, there is a certain amount of energy (equal to the magnitude of the difference between $W_{L,\max}$ and $W_{C,\max}$) that is periodically supplied by the source to the reactance (twice per period of the current or voltage) and returned by the reactance to the source (also twice per period).

Reactive power, represented by the symbol $Q$, is measured in volt-ampere reactive $(VAr)$, and is defined by:

$$
Q = UI \sin\phi
$$

where $U$ and $I$ are the RMS values of voltage and current, and $\phi$ is the phase-shift angle between voltage and current. This power may be positive or negative, depending on whether the impedance is predominantly inductive $(\phi > 0)$ or capacitive $(\phi < 0)$.

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (77 - 79).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 28/02/2025

#### 10.10.3 - Apparent power

Complex power (or “apparent” power), represented by $S$, has no direct physical meaning and is not the symbolic representation of any sinusoidal alternating quantity; however, the concept of complex power facilitates the analysis and calculation of active and reactive power, since its real part is equal to active power and its imaginary part is equal to reactive power:

$$
\underline{S} = \underline{U} , \underline{I}^* = P+jQ
$$

The conjugate $(^*)$ of the current is used so that the angle of $S$ corresponds to the difference between the voltage and current angles (which is what is intended when calculating $P$ and $Q$) and not to their sum.

The magnitude of complex power is called **apparent power** $(S)$ and is measured in volt-amperes $(VA)$:

$$
S=UI
$$

The vector representation of complex power is usually called the **power triangle**, which, according to the Pythagorean theorem, has active power $(P)$ and reactive power $(Q)$ as its legs and complex power as its hypotenuse:

$$
S^2=P^2+Q^2
$$

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (80 - 81).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 28/02/2025

#### 10.10.4 - Power factor

Power factor is defined as the cosine of the phase shift $(\phi)$ between voltage and current (or the cosine of the angle of the load impedance) and is equal to the ratio between active and apparent power:

$$
\cos \phi = \frac{P}{S}
$$

The power factor can only vary between 0 and 1, since $\phi$ can only belong to the first or fourth quadrant, and it is important because it makes it possible to determine the amount of useful (active) power transferred to the load.

Useful power is the power dissipated in the resistances of the load, since it is the power that flows in only one direction, from the source to the load, performing work. The reactive power transferred to/from a reactive load (capacitors and coils) is not useful, since it moves back and forth between the source and the load without performing work.

The highest value of the power factor is 1 and corresponds to the case of a purely resistive load.

If the power factor moves away from 1 and approaches 0, the load becomes increasingly reactive (which may lead to energy losses in the conductors between the source and the load). On the other hand, as the power factor approaches 1, the smaller the current required to supply the same load, and the smaller the cross-sectional area of the transmission-line conductors needs to be (which is more economical). In other words, a high power factor allows more efficient power delivery to a load.

**Power factor correction** is the process of obtaining a higher power factor (ideally 1). To do so, transmission losses must be minimised so that the voltage at the load is as close as possible to the source voltage. Therefore, the voltage drop in the line must be as small as possible, which is achieved with minimum line current.

The aim is thus to make the RMS current in the line minimum while maintaining the RMS value of the voltage supplying the load and keeping the power transferred to the load unchanged. This also brings two further advantages:

1. The power losses assume a minimum value given by:

   $$
   P_{losses} = (R_i + R_{line}) \times I^2
   $$

2. A greater number of consumers may be supplied by the same source.

To achieve the proposed objectives, it is necessary to approach a condition of parallel resonance of the load, that is, to place a passive element in parallel with the load: in practice, capacitors in parallel when $\phi > 0$ (inductive load), and coils in parallel when $\phi < 0$ (capacitive load).

Under the condition of parallel resonance, the impedance is purely resistive and reaches its maximum value, the current reaches its minimum value, and the power factor attains its maximum value (equal to 1).

##### Metadata

**Source**:

* Ana Viana, Francisco Pereira and Mário Alves; (April 2024); *TCIRC Slides Chapter 5* (89 - 97).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 28/02/2025
