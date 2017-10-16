let mydate = "";
describe('Get latest date from gov site', () => {
  it('get the mydate from gov', () => {
    cy.visit('https://egov.uscis.gov/cris/processTimesDisplayInit.do')

    cy.get('#serviceCenter').select('992')

    cy.get('[name="displaySCProcTimes"]').click()

    const element = cy.get('[title="I-140"]').contains('E13').parent().children().eq(3).should(($div) => {
      mydate = $div.text().trim()

    }).then(() => {
      cy.writeFile('date.txt', `${mydate}`)
    })
  })


  it('submit the date', () => {
    cy.readFile('date.txt').then((mydate) => {
      cy.visit('https://goo.gl/forms/T1ufbFYqsNaB9K2C3');

      cy.get('.quantumWizTextinputPaperinputInputArea input').type(mydate);

      cy.get('.freebirdFormviewerViewNavigationButtons').click()
    })


  })
});