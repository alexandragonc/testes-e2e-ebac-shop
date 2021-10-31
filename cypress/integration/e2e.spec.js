/// <reference types="cypress" />
import EnderecoPage from "../support/page_objects/endereco.page.js"
const dados = require('../fixtures/enderecos.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/')
    });
    it('Adicionar produtos ao carrinho e fazer checkout', () => {

        cy.fixture('produtos').then(produto => {
            cy.visit('/produtos')
            cy.addProdutos(produto[0].nome,
                produto[0].tamanho,
                produto[0].cor,
                produto[0].quantidade)
        });
        cy.fixture('produtos').then(produto => {
            cy.visit('/produtos')
            cy.addProdutos(produto[1].nome,
                produto[1].tamanho,
                produto[1].cor,
                produto[1].quantidade)
        });
        cy.fixture('produtos').then(produto => {
            cy.visit('/produtos')
            cy.addProdutos(produto[2].nome,
                produto[2].tamanho,
                produto[2].cor,
                produto[2].quantidade)
        });
        cy.fixture('produtos').then(produto => {
            cy.visit('/produtos')
            cy.addProdutos(produto[3].nome,
                produto[3].tamanho,
                produto[3].cor,
                produto[3].quantidade)
        });
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()

        EnderecoPage.enderecoFaturamento(dados[0].nome,
            dados[0].sobrenome,
            dados[0].empresa,
            dados[0].pais,
            dados[0].endereco,
            dados[0].numero,
            dados[0].cidade,
            dados[0].estado,
            dados[0].cep,
            dados[0].telefone,
            dados[0].email)

            cy.get('#terms').check()
            cy.get('#place_order').click()

            cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
            
    });

})
