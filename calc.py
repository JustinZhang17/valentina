import numpy
import random

# e = 2**52
# div = 33  # rate of crashing (1/div) | Lower div = more likely to crash at 1
# g = 1  # Pareto index | Higher Growth = more likely to have lower multipliers


def get_result(e=2**52, div=33, g=1):
    """Returns a valid multiplier based on 3 inputed parameters

    Args:
        e (int, optional): Extreme Value. Defaults to 2**52.
        div (int, optional): Initial Crash Rate. Defaults to 33.
        g (int, optional): Growth Rate. Defaults to 1.

    Returns:
        Float: A multiplier value based on the crash equation
    """
    e = int(e)
    h = round(random.uniform(0, e-1))
    g = checkg(g)
    div = checkdiv(div)
    if (h % div == 0):
        return 1
    return 0.99 * (pow(e/(e-h), 1/g)) + 0.01


def get_CDF_EV(m=2, div=33, g=1):
    """Returns of expected value and the Cumulative distribution function of the Crash Equation distribution

    Args:
        m (int, optional): Multiplier. Defaults to 2.
        div (int, optional): Initial Crash Rate. Defaults to 33.
        g (int, optional): Growth Rate. Defaults to 1.

    Returns:
        Dict: contains the growth rate, initial crash rate, CDF, EV, and a sentence stringing these terms together
    """
    m = checkm(m)
    g = checkg(g)
    div = checkdiv(div)
    results = []
    for _ in range(100000):
        results.append(get_result(2**52, div, g))
    results = numpy.array(results)
    r = {}
    r['g'] = g
    r['div'] = div
    r['cdf'] = round((results <= m).mean(), 3)
    r['ev'] = round((results <= m).mean() * -1 +
                    (m - 1)*(results > m).mean(), 3)

    if (r['ev'] >= 0):
        sign = "profit"
    else:
        sign = "loss"
    r['state'] = "On a 1 Space Coin bet, if you cash out everytime at " + \
        str(m) + "x. Expect a " + str(sign) + " of " + \
        str(abs(r['ev'])) + " Space Coin(s)"
    return r


# Error checking growth value (Helper Function)
def checkg(g):
    g = round(g, 1)
    if (g == 0):
        return 1
    return g


# Error checking multiplier value (Helper Function)
def checkm(m):
    if (m < 1):
        return 1
    return round(m, 2)


# Error checking initial fail-rate value (Helper Function)
def checkdiv(div):
    if (div < 1):
        return 33
    return round(div, 2)
