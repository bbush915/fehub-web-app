describe(
  "<UnitBuilder />",
  { viewportWidth: 1024, viewportHeight: 768 },
  () => {
    it("renders each element without crashing", () => {
      cy.visit("http://localhost:3000");

      cy.contains("Hero");

      cy.contains("Name");
      cy.contains("Title");
      cy.contains("Summoner Support");
      cy.contains("Ally Support");
      cy.contains("Blessing");
      cy.contains("Favorite Mark");
      cy.contains("Accessory Type");

      cy.contains("Statistics").click();

      cy.contains("Rarity");
      cy.contains("Level");
      cy.contains("Merges");
      cy.contains("Dragonflowers");
      cy.contains("Asset");
      cy.contains("Flaw");
      cy.contains("Hit Points");
      cy.contains("Modifier");
      cy.contains("Attack");
      cy.contains("Speed");
      cy.contains("Defense");
      cy.contains("Resistance");
      cy.contains("Include Skill Bonuses");
      cy.contains("Skill Points");
      cy.contains("Hero Merit");

      cy.contains("Skills").click();

      cy.contains("Weapon");
      cy.contains("Refine");
      cy.contains("Assist");
      cy.contains("Special");
      cy.contains("Passive A");
      cy.contains("Passive B");
      cy.contains("Passive C");
      cy.contains("Sacred Seal");
    });
  }
);
