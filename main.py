from fractions import Fraction
from functools import reduce
import sys

def product(fracs):
    result = reduce(lambda x, y: x * y, fracs, Fraction(1, 1))
    return result.numerator, result.denominator

# Read all input at once
input_data = sys.stdin.read().split()

if input_data:
    n = int(input_data[0])  # first number is count of fractions
    fracs = [Fraction(int(input_data[i]), int(input_data[i+1])) for i in range(1, 2*n+1, 2)]

    # Compute product
    result = product(fracs)

    # Print numerator and denominator
    print(*result)
