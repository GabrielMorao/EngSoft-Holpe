/// <reference types="Cypress" />

describe('Tests - Accessing Home, Sobre, Trabahlos e Contato', () => {

    beforeEach(() => {
        cy.visit('http://localhost:1234/')
      })

    it('Access Trabalhos Page', () =>{
        cy.contains('Trabalhos').click()
        cy.get('[title="Número de voluntários"]')
        cy.get('[title="Dia e horário do evento"]')
        cy.get('[volunteers="1"]').find("img").should('be.visible')
        cy.contains('lore ipsum')
        cy.contains('SAIBA MAIS').click()
        cy.contains('Evento I com Evento XX')
        cy.get(':nth-child(1) > [title="Número de voluntários"]').should('be.visible') //Informação do endereço do evento
        cy.get(':nth-child(1) > [title="Dia e horário do evento"] > time').should('be.visible') //Informação da data do evento
        cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(1) > :nth-child(3)').should('be.visible') //Informação da hora do evento
        cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(2) > :nth-child(1)').should('be.visible') //Informação sobre transporte
        cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(2) > :nth-child(2)').should('be.visible') //Informação sobre certificado
        cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(2) > :nth-child(3)').should('be.visible') //Informação sobre alimentação
        cy.get('.MuiDialogActions-root > :nth-child(1)').should('be.visible') //Informação de email de contato
        cy.get('.MuiDialogActions-root > :nth-child(2)').should('be.visible') //Informação do telefone de contato
        cy.get('.MuiGrid-justify-xs-space-between > .MuiGrid-container > .MuiTypography-root').should('be.visible') //Informação do número de voluntários
        cy.contains('INSCREVA-SE') //botão de se inscrever (ainda não funcional)

    })

    it('Access Home Page', () =>{
        cy.contains('Trabalhos').click()
        cy.contains('Home').click()
        cy.contains('Help with Hope')
        cy.contains('Trabalhar como voluntário(a)')
        cy.contains('Encontrar Voluntários(as)')
        cy.contains('Trabalhos')
        cy.contains('Contato')
        cy.contains('Sobre')
    })

    it.only('Access Sobre Page', () =>{
        cy.contains('Sobre').click()
        cy.contains('Quem somos?')
        cy.get('.MuiGrid-justify-xs-center > .MuiGrid-grid-sm-8 > .MuiPaper-root > .MuiGrid-container > :nth-child(2) > .MuiTypography-root').should("contain", "Uma iniciativa para auxiliar na área de trabalhos voluntários formado por alunos do ICMC da USP e esta é uma proposta sem fins lucrativos. Caso tenha alguma dúvida, crítica, sugestão, ou queira apenas nos dar um oi, por favor, use o menu contato para falar com a gente :)")
        cy.get('.MuiGrid-justify-xs-center > .MuiGrid-grid-sm-8 > .MuiPaper-root > .MuiGrid-container > :nth-child(2) > .MuiTypography-root').should("contain", "Seja você também um voluntário!")
        cy.contains("A Ideia")
        cy.get(':nth-child(2) > .MuiGrid-grid-sm-8 > .MuiPaper-root > .MuiGrid-container > :nth-child(2) > .MuiTypography-root').should("contain", "Visamos facilitar a conexão entre grupos ou ongs que precisam de ajuda para realizarem trabalho voluntário com pessoas em busca de oportunidades para isso.")
        cy.get(':nth-child(2) > .MuiGrid-grid-sm-8 > .MuiPaper-root > .MuiGrid-container > :nth-child(2) > .MuiTypography-root').should("contain","Esperamos que esta iniciativa faça aumentar o número de voluntários nas mais variadas áreas e, com isso, ajudar tanto grupos ou ongs a preencher suas vagas, quanto pessoas interessadas em se voluntariar nas tarefas.")
    })

})