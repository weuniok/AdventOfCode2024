function third = makeNewNumber(number)
  first = mod(bitxor(number * 64, number), 16777216);
  second = mod(bitxor(first, floor(first/32)), 16777216);
  third = mod(bitxor(second, second*2048), 16777216);
end
