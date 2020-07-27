/// <reference types="Cypress" />

describe('Tests - Fail to register Organization', () => {

    beforeEach(() => {
        cy.visit('http://localhost:1234/')
      })

    it('Access Organization Register page from the Login page', () =>{
        cy.contains('LOGIN').click()
        cy.get('[href="/organization"]').click()
    })

    it('Access Organization Register page from Home page', () =>{
        cy.get('.MuiButton-containedSecondary > .MuiButton-label > .MuiGrid-container > .MuiGrid-grid-xs-12').click()
    })


    it('Fill form and do not register with success. Error message for already registered user', () =>{
        cy.contains('LOGIN').click()
        cy.get('[href="/organization"]').click()

        cy.get('#name').type('Ong02')
        cy.get('#name').should('have.value', 'Ong02')

        cy.get('#cnpj').type('17828281821')
        cy.get('#cnpj').should('have.value', '17828281821')

        cy.get('#email').type('ong@testesong.com')
        cy.get('#email').should('have.value', 'ong@testesong.com')
        
        cy.get('#telephone').type('1912345678')
        cy.get('#telephone').should('have.value', '1912345678')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()

        cy.get('#adress').type('Rua das flores')
        cy.get('#adress').should('have.value', 'Rua das flores')

        cy.get('#number').type('123')
        cy.get('#number').should('have.value', '123')

        cy.get('#complement').type('Bloco A')
        cy.get('#complement').should('have.value', 'Bloco A')

        cy.get('#postal').type('12345678')
        cy.get('#postal').should('have.value', '12345678')

        cy.get('#city').type('Sorocaba')
        cy.get('#city').should('have.value', 'Sorocaba')

        cy.get('#state').type('SP')
        cy.get('#state').should('have.value', 'SP')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()

        cy.get('#password').type('123')
        cy.get('#password').should('have.value', "123")
        
        cy.get('#password-confirm').type('123')
        cy.get('#password-confirm').should('have.value', "123")
        
        cy.contains('Cadastrar').click()
        cy.get('.Toastify__toast-body').should('have.text','ONG já cadastrada!')
        cy.wait(1000)
        cy.contains('Home').click()
        cy.get('.Toastify__toast-body').should('not.exist')
    })


    it('Fill form whithout Razão Social. Error message for Razão Social', () =>{
        cy.contains('LOGIN').click()
        cy.get('[href="/organization"]').click()

        cy.get('#cnpj').type('17828281821')
        cy.get('#cnpj').should('have.value', '17828281821')

        cy.get('#email').type('ong@testesong.com')
        cy.get('#email').should('have.value', 'ong@testesong.com')
        
        cy.get('#telephone').type('1912345678')
        cy.get('#telephone').should('have.value', '1912345678')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()
        cy.get('.Toastify__toast-body').should('have.text','Por favor insira a razão social.')
        cy.wait(1000)
        cy.contains('Home').click()
        cy.get('.Toastify__toast-body').should('not.exist')
    })

    it('Fill form whithout CNPJ. Error message for CNPJ', () =>{
        cy.contains('LOGIN').click()
        cy.get('[href="/organization"]').click()

        cy.get('#name').type('Ong02')
        cy.get('#name').should('have.value', 'Ong02')

        cy.get('#email').type('ong@testesong.com')
        cy.get('#email').should('have.value', 'ong@testesong.com')
        
        cy.get('#telephone').type('1912345678')
        cy.get('#telephone').should('have.value', '1912345678')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()
        cy.get('.Toastify__toast-body').should('have.text','Por favor insira seu CNPJ.')
        cy.wait(1000)
        cy.contains('Home').click()
        cy.get('.Toastify__toast-body').should('not.exist')
    })

    it('Fill form without email. Error message for email', () =>{
        cy.contains('LOGIN').click()
        cy.get('[href="/organization"]').click()

        cy.get('#name').type('Ong02')
        cy.get('#name').should('have.value', 'Ong02')
        
        cy.get('#cnpj').type('17828281821')
        cy.get('#cnpj').should('have.value', '17828281821')
        
        cy.get('#telephone').type('1912345678')
        cy.get('#telephone').should('have.value', '1912345678')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()
        cy.get('.Toastify__toast-body').should('have.text','Por favor insira o email.')
        cy.wait(1000)
        cy.contains('Home').click()
        cy.get('.Toastify__toast-body').should('not.exist')
    })

    it('Fill form without telephone. No error message for telephone', () =>{
        cy.contains('LOGIN').click()
        cy.get('[href="/organization"]').click()

        cy.get('#name').type('Ong02')
        cy.get('#name').should('have.value', 'Ong02')
        
        cy.get('#cnpj').type('17828281821')
        cy.get('#cnpj').should('have.value', '17828281821')
        
        cy.get('#email').type('ong@testesong.com')
        cy.get('#email').should('have.value', 'ong@testesong.com')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()
        cy.get('#adress');
    })
///////////////////////////////////////////////////////////////Second Screen///////////////////////////////////////////////////////////////////////////////////////
    it('Fill form without adress. Error message for adress', () =>{
        cy.contains('LOGIN').click()
        cy.get('[href="/organization"]').click()

        cy.get('#name').type('Ong02')
        cy.get('#name').should('have.value', 'Ong02')

        cy.get('#cnpj').type('17828281821')
        cy.get('#cnpj').should('have.value', '17828281821')

        cy.get('#email').type('ong@testesong.com')
        cy.get('#email').should('have.value', 'ong@testesong.com')
        
        cy.get('#telephone').type('1912345678')
        cy.get('#telephone').should('have.value', '1912345678')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()

        cy.get('#number').type('123')
        cy.get('#number').should('have.value', '123')

        cy.get('#complement').type('Bloco A')
        cy.get('#complement').should('have.value', 'Bloco A')

        cy.get('#postal').type('12345678')
        cy.get('#postal').should('have.value', '12345678')

        cy.get('#city').type('Sorocaba')
        cy.get('#city').should('have.value', 'Sorocaba')

        cy.get('#state').type('SP')
        cy.get('#state').should('have.value', 'SP')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()
        cy.get('.Toastify__toast-body').should('have.text','Por favor insira o endereço.')
        cy.wait(1000)
        cy.contains('Home').click()
        cy.get('.Toastify__toast-body').should('not.exist')
    })

    it('Fill form without CEP. Error message for CEP', () =>{
        cy.contains('LOGIN').click()
        cy.get('[href="/organization"]').click()

        cy.get('#name').type('Ong02')
        cy.get('#name').should('have.value', 'Ong02')

        cy.get('#cnpj').type('17828281821')
        cy.get('#cnpj').should('have.value', '17828281821')

        cy.get('#email').type('ong@testesong.com')
        cy.get('#email').should('have.value', 'ong@testesong.com')
        
        cy.get('#telephone').type('1912345678')
        cy.get('#telephone').should('have.value', '1912345678')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()

        cy.get('#adress').type('Rua das flores')
        cy.get('#adress').should('have.value', 'Rua das flores')

        cy.get('#number').type('123')
        cy.get('#number').should('have.value', '123')

        cy.get('#complement').type('Bloco A')
        cy.get('#complement').should('have.value', 'Bloco A')

        cy.get('#city').type('Sorocaba')
        cy.get('#city').should('have.value', 'Sorocaba')

        cy.get('#state').type('SP')
        cy.get('#state').should('have.value', 'SP')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()
        cy.get('.Toastify__toast-body').should('have.text','Por favor insira o CEP.')
        cy.wait(1000)
        cy.contains('Home').click()
        cy.get('.Toastify__toast-body').should('not.exist')
    })

    it('Fill form without CITY. Error message for CITY', () =>{
        cy.contains('LOGIN').click()
        cy.get('[href="/organization"]').click()

        cy.get('#name').type('Ong02')
        cy.get('#name').should('have.value', 'Ong02')

        cy.get('#cnpj').type('17828281821')
        cy.get('#cnpj').should('have.value', '17828281821')

        cy.get('#email').type('ong@testesong.com')
        cy.get('#email').should('have.value', 'ong@testesong.com')
        
        cy.get('#telephone').type('1912345678')
        cy.get('#telephone').should('have.value', '1912345678')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()

        cy.get('#adress').type('Rua das flores')
        cy.get('#adress').should('have.value', 'Rua das flores')

        cy.get('#number').type('123')
        cy.get('#number').should('have.value', '123')

        cy.get('#complement').type('Bloco A')
        cy.get('#complement').should('have.value', 'Bloco A')

        cy.get('#postal').type('12345678')
        cy.get('#postal').should('have.value', '12345678')

        cy.get('#state').type('SP')
        cy.get('#state').should('have.value', 'SP')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()
        cy.get('.Toastify__toast-body').should('have.text','Por favor insira a cidade sede.')
        cy.wait(1000)
        cy.contains('Home').click()
        cy.get('.Toastify__toast-body').should('not.exist')
    })

    it('Fill form without UF. Error message for UF', () =>{
        cy.contains('LOGIN').click()
        cy.get('[href="/organization"]').click()

        cy.get('#name').type('Ong02')
        cy.get('#name').should('have.value', 'Ong02')

        cy.get('#cnpj').type('17828281821')
        cy.get('#cnpj').should('have.value', '17828281821')

        cy.get('#email').type('ong@testesong.com')
        cy.get('#email').should('have.value', 'ong@testesong.com')
        
        cy.get('#telephone').type('1912345678')
        cy.get('#telephone').should('have.value', '1912345678')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()

        cy.get('#adress').type('Rua das flores')
        cy.get('#adress').should('have.value', 'Rua das flores')

        cy.get('#number').type('123')
        cy.get('#number').should('have.value', '123')

        cy.get('#complement').type('Bloco A')
        cy.get('#complement').should('have.value', 'Bloco A')

        cy.get('#postal').type('12345678')
        cy.get('#postal').should('have.value', '12345678')

        cy.get('#city').type('Sorocaba')
        cy.get('#city').should('have.value', 'Sorocaba')


        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()
        cy.get('.Toastify__toast-body').should('have.text','Por favor insira o bairro.')  //modificar msg
        cy.wait(1000)
        cy.contains('Home').click()
        cy.get('.Toastify__toast-body').should('not.exist')
    })

    it('Fill form without Number. No error message', () =>{
        cy.contains('LOGIN').click()
        cy.get('[href="/organization"]').click()

        cy.get('#name').type('Ong02')
        cy.get('#name').should('have.value', 'Ong02')

        cy.get('#cnpj').type('17828281821')
        cy.get('#cnpj').should('have.value', '17828281821')

        cy.get('#email').type('ong@testesong.com')
        cy.get('#email').should('have.value', 'ong@testesong.com')
        
        cy.get('#telephone').type('1912345678')
        cy.get('#telephone').should('have.value', '1912345678')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()
        
        cy.get('#adress').type('Rua das flores')
        cy.get('#adress').should('have.value', 'Rua das flores')


        cy.get('#complement').type('Bloco A')
        cy.get('#complement').should('have.value', 'Bloco A')

        cy.get('#postal').type('12345678')
        cy.get('#postal').should('have.value', '12345678')

        cy.get('#city').type('Sorocaba')
        cy.get('#city').should('have.value', 'Sorocaba')

        cy.get('#state').type('SP')
        cy.get('#state').should('have.value', 'SP')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()
        cy.get('#password')
    })

    it('Fill form without Complement. No error message', () =>{
        cy.contains('LOGIN').click()
        cy.get('[href="/organization"]').click()

        cy.get('#name').type('Ong02')
        cy.get('#name').should('have.value', 'Ong02')

        cy.get('#cnpj').type('17828281821')
        cy.get('#cnpj').should('have.value', '17828281821')

        cy.get('#email').type('ong@testesong.com')
        cy.get('#email').should('have.value', 'ong@testesong.com')
        
        cy.get('#telephone').type('1912345678')
        cy.get('#telephone').should('have.value', '1912345678')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()
      
        cy.get('#adress').type('Rua das flores')
        cy.get('#adress').should('have.value', 'Rua das flores')

        cy.get('#number').type('123')
        cy.get('#number').should('have.value', '123')

        cy.get('#postal').type('12345678')
        cy.get('#postal').should('have.value', '12345678')

        cy.get('#city').type('Sorocaba')
        cy.get('#city').should('have.value', 'Sorocaba')

        cy.get('#state').type('SP')
        cy.get('#state').should('have.value', 'SP')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()
        cy.get('#password')
    })
///////////////////////////////////////////////////////////////////////Third Screen////////////////////////////////////////////////////////////////////////////////
    it('Fill form without password. Error message for password', () =>{
        cy.contains('LOGIN').click()
        cy.get('[href="/organization"]').click()

        cy.get('#name').type('Ong02')
        cy.get('#name').should('have.value', 'Ong02')

        cy.get('#cnpj').type('17828281821')
        cy.get('#cnpj').should('have.value', '17828281821')

        cy.get('#email').type('ong@testesong.com')
        cy.get('#email').should('have.value', 'ong@testesong.com')
        
        cy.get('#telephone').type('1912345678')
        cy.get('#telephone').should('have.value', '1912345678')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()

        cy.get('#adress').type('Rua das flores')
        cy.get('#adress').should('have.value', 'Rua das flores')

        cy.get('#number').type('123')
        cy.get('#number').should('have.value', '123')

        cy.get('#complement').type('Bloco A')
        cy.get('#complement').should('have.value', 'Bloco A')

        cy.get('#postal').type('12345678')
        cy.get('#postal').should('have.value', '12345678')

        cy.get('#city').type('Sorocaba')
        cy.get('#city').should('have.value', 'Sorocaba')

        cy.get('#state').type('SP')
        cy.get('#state').should('have.value', 'SP')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()
        
        cy.get('#password-confirm').type('1234')
        cy.get('#password-confirm').should('have.value', "1234")
        
        cy.contains('Cadastrar').click()
        cy.get('.Toastify__toast-body').should('have.text','As senhas estão diferentes.')
        cy.wait(1000)
        cy.contains('Home').click()
        cy.get('.Toastify__toast-body').should('not.exist')
    })

    it('Fill form with no matching passwords. Error message for matching passwords', () =>{
        cy.contains('LOGIN').click()
        cy.get('[href="/organization"]').click()

        cy.get('#name').type('Ong02')
        cy.get('#name').should('have.value', 'Ong02')

        cy.get('#cnpj').type('17828281821')
        cy.get('#cnpj').should('have.value', '17828281821')

        cy.get('#email').type('ong@testesong.com')
        cy.get('#email').should('have.value', 'ong@testesong.com')
        
        cy.get('#telephone').type('1912345678')
        cy.get('#telephone').should('have.value', '1912345678')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()

        cy.get('#adress').type('Rua das flores')
        cy.get('#adress').should('have.value', 'Rua das flores')

        cy.get('#number').type('123')
        cy.get('#number').should('have.value', '123')

        cy.get('#complement').type('Bloco A')
        cy.get('#complement').should('have.value', 'Bloco A')

        cy.get('#postal').type('12345678')
        cy.get('#postal').should('have.value', '12345678')

        cy.get('#city').type('Sorocaba')
        cy.get('#city').should('have.value', 'Sorocaba')

        cy.get('#state').type('SP')
        cy.get('#state').should('have.value', 'SP')

        cy.get('.MuiPaper-root > :nth-child(3) > .MuiButton-label').click()
        
        cy.get('#password').type('1234')
        cy.get('#password').should('have.value', "1234")
        
        cy.contains('Cadastrar').click()
        cy.get('.Toastify__toast-body').should('have.text','As senhas estão diferentes.')
        cy.wait(1000)
        cy.contains('Home').click()
        cy.get('.Toastify__toast-body').should('not.exist')
    })

    it.only('Not filling password form and tyring to register. Error message for empty fields', () =>{
        cy.contains('LOGIN').click()
        cy.get('[href="/organization"]').click()

        cy.get('#name').type('Ong02')
        cy.get('#name').should('have.value', 'Ong02')

        cy.get('#cnpj').type('17828281821')
        cy.get('#cnpj').should('have.value', '17828281821')

        cy.get('#email').type('ong@testesong.com')
        cy.get('#email').should('have.value', 'ong@testesong.com')
        
        cy.get('#telephone').type('1912345678')
        cy.get('#telephone').should('have.value', '1912345678')

        cy.contains('Avançar').click()

        cy.get('#adress').type('Rua das flores')
        cy.get('#adress').should('have.value', 'Rua das flores')

        cy.get('#number').type('123')
        cy.get('#number').should('have.value', '123')

        cy.get('#complement').type('Bloco A')
        cy.get('#complement').should('have.value', 'Bloco A')

        cy.get('#postal').type('12345678')
        cy.get('#postal').should('have.value', '12345678')

        cy.get('#city').type('Sorocaba')
        cy.get('#city').should('have.value', 'Sorocaba')

        cy.get('#state').type('SP')
        cy.get('#state').should('have.value', 'SP')

        cy.contains('Avançar').click()
        
        cy.contains('Cadastrar').click()
        cy.get('.Toastify__toast-body').should('have.text','Por favor preencha todos os campos')
        cy.wait(1000)
        cy.contains('Home').click()
        cy.get('.Toastify__toast-body').should('not.exist')
    })

})