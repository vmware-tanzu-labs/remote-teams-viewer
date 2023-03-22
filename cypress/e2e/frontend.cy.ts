
describe("remote teams viewer frontend", () => {

  it("opens the application and searches for employee names", () => { 
    cy.visit("/");
    cy.get("#employee-filter").type("Carlos");
    cy.get(".theater-checkboxes").get("input[type='checkbox']").first().should("be.checked");
    cy.get(".theater-checkboxes").get("input[type='checkbox']").last().should("be.checked");
    cy.get("#employee-filter").clear().type("J");
    cy.get("li").should("have.length", 2);
    
    cy.get("#employee-filter").type("ohn");
    cy.get("li").should("have.length", 1);
    cy.get("li").first().should("have.text", "John D**");
  });
});

export {};
