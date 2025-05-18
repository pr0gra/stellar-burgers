describe('Burger Constructor Page', () => {
  const URL = process.env.BURGER_API_URL;
  beforeEach(() => {
    cy.intercept('GET', `${URL}/ingredients`, (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'ingredients.json'
      });
    });
    cy.visit('http://localhost:4000/');
  });

  it('добавление товар, отправка заказа', () => {
    cy.intercept('POST', '**/api/orders', {
      fixture: 'order.json'
    }).as('createOrder');
    const submitOrder = cy.get('[data-cy="BurgerConstructorUI.submitOrder"]');
    cy.get('[data-cy="bun.name"]').contains('Краторная булка N-200i');
    const addButtonBun = cy.get(
      '[data-cy="bun.addButton-Краторная булка N-200i"]'
    );
    const addButtonMain = cy.get(
      '[data-cy="main.addButton-Биокотлета из марсианской Магнолии"]'
    );
    const addButtonSauce = cy.get('[data-cy="sauce.addButton-Соус Spicy-X"]');

    addButtonBun.click();
    addButtonMain.click();
    addButtonSauce.click();

    submitOrder.click();
    cy.wait('@createOrder');

    const orderNumber = cy.get('[data-cy="orderNumber"]');

    orderNumber.contains('12345');
    const closeModal = cy.get('[data-cy="ModalOverlayUI"]');
    closeModal.click({ force: true });

    const emptyBuns = cy.get('[data-cy="emptyBuns"]');
    const emptyMains = cy.get('[data-cy="emptyMains"]');
    emptyBuns.should('be.visible');
    emptyMains.should('be.visible');
  });

  it('открытие модального окна ингредиентов', () => {
    const ingredientDetailsUI = cy.get(
      '[data-cy="bun.link-Краторная булка N-200i"]'
    );
    ingredientDetailsUI.click();
    cy.get('[data-cy="IngredientDetailsUI.Краторная булка N-200i"]').should(
      'be.visible'
    );
    const closeModal = cy.get('[data-cy="ModalOverlayUI"]');
    closeModal.click({ force: true });
    cy.get('[data-cy="IngredientDetailsUI.Краторная булка N-200i"]').should(
      'not.exist'
    );
  });
});
