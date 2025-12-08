// Importa o arquivo que vamos testar.
// O ".." volta uma pasta. Se o teste estiver em 'tests/unit', 
// precisamos voltar para 'tests' e depois 'src' para achar 'patterns'.
// Ajuste o caminho conforme sua estrutura real.
const { BudgetSubject } = require('../../patterns/BudgetObserver');

describe('Unit Test: Observer Pattern', () => {
  
  test('Deve notificar o Observer quando o limite passar de 90%', () => {
    // 1. SETUP
    const subject = new BudgetSubject();
    const mockObserver = { update: jest.fn() }; // Cria o espião
    subject.addObserver(mockObserver);

    // 2. EXECUTION (Limite 100, Gasto 85, Novo 10 = 95%)
    const budget = { category: 'Teste', limit_amount: 100 };
    subject.checkLimit(budget, 10, 85);

    // 3. ASSERTION
    expect(mockObserver.update).toHaveBeenCalledTimes(1);
  });

  test('NÃO deve notificar se o gasto for baixo', () => {
    const subject = new BudgetSubject();
    const mockObserver = { update: jest.fn() };
    subject.addObserver(mockObserver);

    subject.checkLimit({ limit_amount: 100 }, 10, 0);

    expect(mockObserver.update).not.toHaveBeenCalled();
  });
});