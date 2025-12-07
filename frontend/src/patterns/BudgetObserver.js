// backend/src/patterns/BudgetObserver.js

// Classe que envia a notificação (Observer)
class NotificationService {
  update(data) {
    console.log(`\n[ALERTA DE SISTEMA] 🚨: O Orçamento '${data.budgetCategory}' atingiu ${data.percentage}% do limite!\n`);
  }
}

// Classe que monitora o orçamento (Subject)
class BudgetSubject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }

  // Lógica principal: Verifica se gastou mais de 90%
  checkLimit(budget, currentExpenseAmount, totalExpensesSoFar) {
    const total = totalExpensesSoFar + currentExpenseAmount;
    
    // Evita divisão por zero
    if (budget.limit_amount <= 0) return;

    const percentage = (total / budget.limit_amount) * 100;

    if (percentage >= 90) {
      this.notify({
        budgetCategory: budget.category,
        percentage: percentage.toFixed(2)
      });
    }
  }
}

module.exports = { NotificationService, BudgetSubject };