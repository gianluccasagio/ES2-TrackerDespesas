class NotificationService {
  update(data) {
    console.log(`🔔 [ALERTA]: O Orçamento '${data.budgetCategory}' atingiu ${data.percentage}% do limite!`);
  }
}

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

  checkLimit(budget, currentExpenseAmount, totalExpensesSoFar) {
    const total = totalExpensesSoFar + currentExpenseAmount;
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