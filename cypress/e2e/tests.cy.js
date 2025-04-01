// -- Keys --
// FE = FrontEnd Tests
// BE = BackEnd Tests


describe ('Ambev Challenge for Automation Tests', () => {
    beforeEach (() => {
        cy.visit('/login')
    })

    it('FE -> Admin Login and Logout', () => {
        cy.Login();
        cy.get('[data-testid="logout"]').click();
        cy.url().should('eq', 'https://front.serverest.dev/login'); //Comparing current URL has been modified.
    })
    it('FE->  Signing up a commom user', () => {
        cy.defaultSignUp();
        cy.contains('Cadastro realizado com sucesso').should('be.visible').wait(3000);
        // Checking if I can reuse the same email for a new sign up
        cy.get('[data-testid="logout"]').click();
        cy.defaultSignUp();
        cy.contains('Este email já está sendo usado').should('be.visible')
    })
    it('FE -> Deleting a commom user', () => {
        cy.Login();
        cy.get('[data-testid="listarUsuarios').click();
        cy.contains('td', 'John Doe').parent('tr').within(() => {
            cy.contains('button','Excluir').click();
            });
    })
    it('BE -> Login Successfull', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/login',
            body: {
                email: 'qa@uorak.com',
                password: 'teste@2025',
            },
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            // Verifying status code response
            expect(res.status).to.be.equal(200);
    
            // Body should not be empty
            expect(res.body).to.not.be.empty;

            // Checking success message
            expect(res.body).to.have.property('message').that.includes('Login realizado com sucesso');
        });
    });

    it('BE -> Login Failure', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/login',
            body: {
                email: 'qa@uorak.com',
                password: 'teste@2026',
            },
            headers: {
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false
        }).then((res) => {
            // Verifying status code response
            expect(res.status).to.be.equal(401);
    
            // Body should not be empty
            expect(res.body).to.not.be.empty;

            // Checking error message
            expect(res.body).to.have.property('message').that.includes('Email e/ou senha inválidos');
        });
    });
    it('BE -> Adding a new Admin user and then excluding it', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/usuarios',
            body: {
                nome: "API Test",
                email: "api@test.com",
                password: "teste@2025",
                administrador: "true"
            },
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            // Verifying status code 
            expect(res.status).to.be.equal(201);

            // Verifying the success message
            expect(res.body).to.have.property('message').that.includes('Cadastro realizado com sucesso'); 

            //Make sure it comes with ID
            expect(res.body).to.have.property('_id'); 
            const userId = res.body._id; // Define a variable for ID in order to use it as a parameter to exclude the register afterwards.
            console.log('ID do usuário criado:', userId); // Show the ID generated
            expect(userId).to.not.be.empty;

            cy.request({
                method: 'DELETE',
                url: `https://serverest.dev/usuarios/${userId}`,  // URL to delete the register
                headers: {
                    'Content-Type': 'application/json',
                },
                failOnStatusCode: false  // Test doesn't fail automatically
            }).then((delRes) => {
                
                // Verifying status code
                expect(delRes.status).to.be.equal(200);
                
                // Verifying the success message excluding the ID.
                expect(delRes.body).to.have.property('message').that.includes('Registro excluído com sucesso'); 
            });

        })
    })

})