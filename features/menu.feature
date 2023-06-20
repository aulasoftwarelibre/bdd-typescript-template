#language: es
Característica: Pagar un menú
    Reglas:

    - 1 punto por cada euro.
    - 10 puntos equivalen a un descuento de 1 euros.
    - El IVA es del 10%

    Antecedentes:
        Dados los siguientes menús:
        | número | precio |
        | 1      | 10     |
        | 2      | 12     |
        | 3      |  8     |

    Escenario: Ganar puntos al pagar en efectivo
        Dado que he comprado 5 menús del número 1
        Cuando pido la cuenta recibo una factura de 55 euros
        Y pago en efectivo con 55 euros
        Entonces la factura está pagada
        Y he obtenido 50 puntos

    Escenario: Pagar con dinero y puntos
        Dado que he comprado 5 menús del número 1
        Cuando pido la cuenta recibo una factura de 55 euros
        Y pago con 10 puntos y 54 euros
        Entonces la factura está pagada
        Y he obtenido 0 puntos

    Escenario: Pagar con puntos
        Dado que he comprado 5 menús del número 1
        Cuando pido la cuenta recibo una factura de 55 euros
        Y pago con 500 puntos y 5 euros
        Entonces la factura está pagada
        Y he obtenido 0 puntos

    Escenario: Intentar pagar el IVA con puntos
        Dado que he comprado 5 menús del número 1
        Cuando pido la cuenta recibo una factura de 55 euros
        Y pago con 550 puntos y 0 euros
        Entonces quedan 5 euros por pagar

    Escenario: Comprar menús de varios tipos
        Dado que he comprado 1 menú del número 1
        Y que he comprado 2 menús del número 2
        Y que he comprado 2 menús del número 3
        Cuando pido la cuenta recibo una factura de 55 euros
        Y pago en efectivo con 55 euros
        Entonces la factura está pagada
        Y he obtenido 50 puntos
