/// <reference types="cypress" />

describe("Testes da aplicação de contatos", () => {
  beforeEach(() => {
    cy.visit("https://agenda-contatos-react.vercel.app/");
  });

  it("Deve adicionar um contato", () => {
    cy.get('input[placeholder="Nome"]').type("Novo Contato");
    cy.get('input[placeholder="E-mail"]').type("novocontato@example.com");
    cy.get('input[placeholder="Telefone"]').type("123456789");
    cy.get("button.adicionar").click();

    cy.get(".contato").should("have.length", 4); // Verifica se o contato foi adicionado com sucesso
  });

  it("Deve editar um contato", () => {
    cy.get(".contato")
      .eq(0)
      .within(() => {
        cy.get("button.edit").click();

        cy.get('input[placeholder="Nome"]').clear().type("Contato Editado");
        cy.get('input[placeholder="E-mail"]')
          .clear()
          .type("contatoeditado@example.com");
        cy.get('input[placeholder="Telefone"]').clear().type("987654321");
        cy.get("button.edit").click();
      });

    cy.get(".contato")
      .eq(0)
      .within(() => {
        cy.get(".cTVgex").should("contain", "Contato Editado");
        cy.get(".cTVgex").should("contain", "contatoeditado@example.com");
        cy.get(".cTVgex").should("contain", "987654321");
      });
  });

  it("Deve remover um contato", () => {
    cy.get(".contato")
      .eq(0)
      .within(() => {
        cy.get("button.delete").click();
      });

    cy.get(".contato").should("have.length", 2); // Verifica se o contato foi removido com sucesso
  });
});
