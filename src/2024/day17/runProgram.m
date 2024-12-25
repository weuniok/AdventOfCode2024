function output = runProgram(program, A, B, C)
  pointer = 1;
  output = [];
  
  while pointer <= numel(program)
      opcode = program(pointer);
      operand = program(pointer + 1);
      
      switch opcode
          case 0 % adv
              denominator = 2^getComboOperand(operand, A, B, C);
              if denominator ~= 0
                  A = fix(A / denominator);
              end
              
          case 1 % bxl
              B = bitxor(B, operand);
              
          case 2 % bst
              B = mod(getComboOperand(operand, A, B, C), 8);
              
          case 3 % jnz
              if A ~= 0
                  pointer = operand + 1;
                  continue; % continue used to skip pointer increment
              end
              
          case 4 % bxc
              B = bitxor(B, C);
              
          case 5 % out
              output(end+1) = mod(getComboOperand(operand, A, B, C), 8);
              
          case 6 % bdv
              denominator = 2^getComboOperand(operand, A, B, C);
              if denominator ~= 0
                  B = fix(A / denominator);
              end
              
          case 7 % cdv
              denominator = 2^getComboOperand(operand, A, B, C);
              if denominator ~= 0
                  C = fix(A / denominator);
              end
              
          otherwise
              error('Unknown opcode: %d', opcode);
      end
      
      pointer = pointer + 2; % Move to next instruction
  end
  end
  
  function value = getComboOperand(opcode, A, B, C)
  switch (opcode)
      case {0, 1, 2, 3}
          value = opcode;
      case 4
          value = A;
      case 5
          value = B;
      case 6
          value = C;
      otherwise
          error('Invalid combo operand');
  end
  end