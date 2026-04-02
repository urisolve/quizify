## 9 - Fundamental Concepts of Sinusoidal Alternating Quantities

### 9.1 - Sinusoidal alternating current

Physical quantities may be classified according to their behaviour over time as either constant or variable.

* **Constant or steady quantities** are those that do not vary over time; this implies that the signal is constant and is obtained from cells, batteries, dynamos, voltage sources, rectification of alternating current, etc.
* **Variable quantities** are quantities whose electron flow occurs in both directions and varies over time. These variations may be:

  * **Non-periodic**, when the signal does not repeat over time, such as radio and television signals, (electromagnetic) noise, sensor signals, etc.
  * **Periodic**, when the signal varies in the same way and repeats over time, and may be subdivided into:

    * **Pulsating**, which contain a non-zero average value.
    * **Pure alternating**, which contain a zero average value, as in the case of sinusoidal alternating current (AC), obtained from alternators, power electronic converters, and signal generators.

Alternating current presents some advantages over direct current:

* Voltage transformation is easier, since transformers are used both to step up and step down voltage, whereas direct current requires electronic converters with relatively limited power;
* Alternators (AC generators) are simpler, require less maintenance, and have better efficiency than dynamos (DC generators);
* AC motors are better than DC motors, particularly induction motors (three-phase), which are simpler, more efficient, and require less maintenance.
* It increases the efficiency of power transmission, because when higher voltages are used, the current decreases, thereby reducing thermal losses (due to the Joule effect).

Sinusoidal alternating current is a waveform with smooth and continuous variation, following a sine function, expressed by:

$$
i(t) = I_m \cdot \sin(\omega t + \theta)
$$

where:

* $i(t)$ is the instantaneous value of the current;
* $I_m$ is the maximum (or peak, $I_p$) current value;
* $\omega$ is the angular frequency, measured in rad/s;
* $\theta$ is the initial phase angle (angle at $t=0$).

In addition:

* The **period** $(T)$ is the time required to complete one cycle of the waveform, measured in seconds.
* The **frequency** $(f)$ is the number of cycles per second, expressed in hertz (Hz), and is the inverse of the period.
* The **angular frequency** $(\omega)$ is given by:

  $$
  \omega = 2 \pi f = \frac{2 \pi}{T}
  $$

##### Metadata

**Source**:

* Francisco Pereira, Mário Alves and Ana Viana; (March 2022); *TCIRC Slides Chapter 1* (4 - 9).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 9.2 - Average value

The average value of a quantity $x(t)$ that varies over time is the constant value representing the amount of energy or charge transferred during one complete cycle of the quantity, and it is calculated by integrating over one period of the cycle and dividing by that same period.

This average value is commonly used in voltage and current measurements, and the same reasoning applies to both.

For a periodic quantity $x(t)$, the average value $X_{avg}$ is given by:

$$
X_{avg} = \frac{1}{T} \int_0^T x(t) , dt
$$

where:

* $x(t)$ is the quantity being analysed (voltage, current, etc.);
* $T$ is the period (the time required to complete one cycle, in seconds);
* The integral $\int_0^T x(t),dt$ calculates the sum of the values of $x(t)$ over one complete cycle.

For an alternating quantity, in the case of a sinusoidal waveform, the average value over a complete cycle is zero due to the positive and negative symmetry of the waveform.

For a direct (constant) quantity, the average value is equal to the constant value itself, since it does not vary over time.

For another non-sinusoidal alternating quantity (such as square, triangular, or other waveforms), the average value depends on the exact shape of the signal and may be positive, negative, or zero depending on the distribution of values during the cycle.

##### Metadata

**Source**:

* Francisco Pereira, Mário Alves and Ana Viana; (March 2022); *TCIRC Slides Chapter 1* (10).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 9.3 - RMS value

The RMS value of a quantity is a measure that describes the value an alternating quantity would have if it were replaced by a direct quantity dissipating the same amount of energy. In simple terms, the RMS value is a more direct way of comparing an alternating quantity with a constant quantity that would have the same thermal or energetic effect.

The RMS value of a quantity $x(t)$ is given by:

$$
X_{\text{rms}} = \sqrt{\frac{1}{T} \int_0^T x^2(t) , dt}
$$

where:

* $T$ is the period of the quantity;
* $x(t)$ may be a current or voltage function.

For a direct quantity, the RMS value is equal to the value of the quantity itself, since it is constant over time.

For a sinusoidal alternating quantity $x(t)$, the RMS value may be simplified as:

$$
X_{\text{rms}} = \frac{X_{\text{max}}}{\sqrt{2}}
$$

where $X_{\text{max}}$ is the maximum value of the alternating quantity.

For non-sinusoidal waveforms (such as square, triangular, etc.), the RMS value is calculated using the general formula, and the waveform shape influences the result.

When measurements are performed in alternating current, the value indicated by voltmeters and ammeters (and sampling oscilloscopes) is the RMS value, unless another value is explicitly selected or stated.

When the signals being measured are not purely sinusoidal, True RMS (TRMS) instruments must be used.

When a voltage or current value is stated in alternating current, it is always understood to be the RMS value unless another value is explicitly mentioned (e.g. maximum/peak value or peak-to-peak value).

##### Metadata

**Source**:

* Francisco Pereira, Mário Alves and Ana Viana; (March 2022); *TCIRC Slides Chapter 1* (11 - 13).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 9.4 - Complex numbers

Complex numbers are essential in AC circuit analysis because they make it possible to represent quantities such as voltage and current that vary sinusoidally with time. The use of complex numbers facilitates the treatment of differential equations, simplifying operations such as multiplication, division, and exponentiation.

In electrical engineering, the symbol “j” is used instead of “i”, to avoid confusion with the symbol for electric current. The “j” may appear before or after the numerical value $(4j=j4)$. The conjugate of a complex number may be represented by an overbar $(\bar{\ })$ or by an asterisk $(^*)$. In TCIRC, the asterisk $(^*)$ is always used.

There are three ways to represent a complex number:

1. **Rectangular or Cartesian form**, given by:

   $$
   z = x+yj
   $$

   where:

   * $x$ is the real part,
   * $y$ is the imaginary part,
   * $j$ is the imaginary unit $(j=\sqrt{-1})$.
2. **Polar form**, which represents the complex number in terms of its modulus and angle, expressed by:

   $$
   z=r \angle \theta
   $$

   where:

   * $r$ is the modulus,
   * $\theta$ is the angle (normally expressed in degrees).
3. **Exponential form**, which uses Euler’s formula and is expressed by:

   $$
   z=re^{j \theta}
   $$

   where:

   * $r$ is the modulus,
   * $\theta$ is the angle (normally expressed in radians).

It is possible to convert from rectangular form to polar/exponential form and vice versa; converting between polar and exponential form only requires changing the way the angle is expressed.

* **From rectangular to polar/exponential**, the angle is obtained by:

  $$
  \theta = \arctg \left (\frac{y}{x} \right )
  $$

  and the modulus by:

  $$
  r = \sqrt{x^2 + y^2}
  $$

* **From polar/exponential to rectangular**, the real part is obtained by:

  $$
  x=r \cos (\theta)
  $$

  and the imaginary part by:

  $$
  y=r \sin (\theta)
  $$

It is also possible to perform mathematical operations with complex numbers. Addition and subtraction are easier in rectangular form, whereas multiplication and division are easier in polar/exponential form.

**Addition and subtraction** (easier in rectangular form):

Addition:

$$
z_1 + z_2 = (x_1 + x_2) + (y_1 + y_2)j
$$

Subtraction:

$$
z_1 - z_2 = (x_1 - x_2) + (y_1 - y_2)j
$$

**Multiplication** (easier in polar/exponential form):

$$
z_1 \cdot z_2 = r_1 \cdot r_2 \angle (\theta_1 + \theta_2)
$$

**Division** (easier in polar/exponential form):

$$
\frac{z_1}{z_2} = \frac{r_1}{r_2} \angle (\theta_1 - \theta_2)
$$

Other operations may also be performed with complex numbers, such as:

**Conjugate**:

$$
z^*_1 = x_1-y_1j=r_1 \angle -\theta_1
$$

**Square root**:

$$
\sqrt{z_1} = \sqrt{r_1} \angle (\theta_1/2)
$$

**Exponentiation**:

$$
z_1^n = r_1^n \angle n\theta_1
$$

**Multiplication by $j$**:

$$
j \cdot z_1 = 1 \angle 90^\circ \cdot r_1 \angle \theta_1 = r_1 \angle(\theta_1 + 90^\circ)
$$

**Division by $j$**:

$$
\frac{z_1}{j} = \frac{r_1 \angle{\theta_1}}{1 \angle{90^\circ}}=r_1 \angle{(\theta_1 - 90^\circ)}
$$

##### Metadata

**Source**:

* Francisco Pereira, Mário Alves and Ana Viana; (March 2022); *TCIRC Slides Chapter 1* (14 - 16).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025

### 9.5 - Steinmetz transform

The Steinmetz transform, or symbolic representation, allows a time-varying quantity in the time domain to be represented by an invariant complex number, which is extremely useful in AC circuit analysis.

It makes it possible to define a one-to-one correspondence between sinusoidal alternating quantities:

$$
i(t) = \sqrt{2} I \sin{(\omega t + \theta)}
$$

and vectors in the complex plane:

$$
\underline{I} = Ie^{j \theta} = I \angle{\theta}
$$

The Steinmetz transform may only be used for quantities with the same angular frequency.

The transform of a sum is equal to the sum of the transforms.

Differentiation with respect to time of sinusoidal alternating quantities, in symbolic notation (multiplication by $j$):

$$
\underline{I}'=j \omega \underline{I}
$$

Integration with respect to time of sinusoidal alternating quantities, in symbolic notation (division by $j$):

$$
\underline{I}^P=\frac{1}{j \omega} \underline{I}
$$

##### Metadata

**Source**:

* Francisco Pereira, Mário Alves and Ana Viana; (March 2022); *TCIRC Slides Chapter 1* (17 - 22).

**Validation**: João Ferreira

**Version**: 1.0

**Last update**: 27/02/2025
