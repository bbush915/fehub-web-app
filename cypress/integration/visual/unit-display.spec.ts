import UnitDisplayConfig from "config/unit-display.json";

describe("<UnitDisplay />", { viewportWidth: 1920, viewportHeight: 1080 }, () => {
  UnitDisplayConfig.tests.forEach(({ title, state, snapshot }) => {
    it(title, () => {
      cy.visit("http://localhost:3000/unit-builder");

      const nameInput = cy.contains("div", "Name").find("input").first();
      nameInput.type(state.hero.name);

      cy.get("#hero-typeahead-item-0").click();

      const titleSelect = cy.contains("div", "Title").find("select").first();
      titleSelect.select(state.hero.title);

      const summonerSupportSelect = cy.contains("div", "Summoner Support").find("select").first();
      summonerSupportSelect.select(state.hero.summonerSupport ?? "");

      const allySupportSelect = cy.contains("div", "Ally Support").find("select").first();
      allySupportSelect.select(state.hero.allySupport ?? "");

      const blessingSelect = cy.contains("div", "Blessing").find("select").first();
      blessingSelect.select(state.hero.blessing ?? "");

      const favoriteMarkSelect = cy.contains("div", "Favorite Mark").find("select").first();
      favoriteMarkSelect.select(state.hero.favoriteMark ?? "Mark 1");

      const accessoryTypeSelect = cy.contains("div", "Accessory Type").find("select").first();
      accessoryTypeSelect.select(state.hero.accessoryType ?? "");

      cy.contains("Statistics").click();

      const rarityInput = cy.contains("div", "Rarity").find("input").first();
      rarityInput.type(`{selectall}${state.statistics.rarity}`);

      const levelInput = cy.contains("div", "Level").find("input").first();
      levelInput.type(`{selectall}${state.statistics.level}`);

      const mergesInput = cy.contains("div", "Merges").find("input").first();
      mergesInput.type(`{selectall}${state.statistics.merges}`);

      const dragonflowersInput = cy.contains("div", "Dragonflowers").find("input").first();
      dragonflowersInput.type(`{selectall}${state.statistics.dragonflowers}`);

      const assetSelect = cy.contains("div", "Asset").find("select").first();
      assetSelect.select(state.statistics.asset ?? "");

      const flawSelect = cy.contains("div", "Flaw").find("select").first();
      flawSelect.select(state.statistics.flaw ?? "");

      const skillPointsInput = cy.contains("div", "Skill Points").find("input").first();
      skillPointsInput.type(`{selectall}${state.statistics.skillPoints}`);

      const heroMeritInput = cy.contains("div", "Hero Merit").find("input").first();
      heroMeritInput.type(`{selectall}${state.statistics.heroMerit}`);

      cy.contains("Skills").click();

      if (state.skills.weapon !== null) {
        const overrideWeaponButton = cy.contains("div", "Weapon").find("button").first();
        overrideWeaponButton.click();

        const weaponInput = cy.contains("div", "Weapon").find("input").first();

        if (state.skills.weapon) {
          weaponInput.type(`{selectall}${state.skills.weapon}`);

          cy.wait(1000);

          cy.get("#weapon-skill-typeahead-item-0").click();
        } else {
          weaponInput.clear();
        }
      }

      if (state.skills.refine !== null) {
        const refineSelect = cy.contains("div", "Refine").find("select").first();
        refineSelect.select(state.skills.refine);
      }

      if (state.skills.assist !== null) {
        const overrideAssistButton = cy.contains("div", "Assist").find("button").first();
        overrideAssistButton.click();

        const assistInput = cy.contains("div", "Assist").find("input").first();

        if (state.skills.assist) {
          assistInput.type(`{selectall}${state.skills.assist}`);

          cy.wait(1000);

          cy.get("#assist-skill-typeahead-item-0").click();
        } else {
          assistInput.clear();
        }
      }

      if (state.skills.special !== null) {
        const overrideSpecialButton = cy.contains("div", "Special").find("button").first();
        overrideSpecialButton.click();

        const specialInput = cy.contains("div", "Special").find("input").first();

        if (state.skills.special) {
          specialInput.type(`{selectall}${state.skills.special}`);

          cy.wait(1000);

          cy.get("#special-skill-typeahead-item-0").click();
        } else {
          specialInput.clear();
        }
      }

      if (state.skills.passiveA !== null) {
        const overridePassiveAButton = cy.contains("div", "Passive A").find("button").first();
        overridePassiveAButton.click();

        const passiveAInput = cy.contains("div", "Passive A").find("input").first();

        if (state.skills.passiveA) {
          passiveAInput.type(`{selectall}${state.skills.passiveA}`);

          cy.wait(1000);

          cy.get("#passive-a-skill-typeahead-item-0").click();
        } else {
          passiveAInput.clear();
        }
      }

      if (state.skills.passiveB !== null) {
        const overridePassiveBButton = cy.contains("div", "Passive B").find("button").first();
        overridePassiveBButton.click();

        const passiveBInput = cy.contains("div", "Passive B").find("input").first();

        if (state.skills.passiveB) {
          passiveBInput.type(`{selectall}${state.skills.passiveB}`);

          cy.wait(1000);

          cy.get("#passive-b-skill-typeahead-item-0").click();
        } else {
          passiveBInput.clear();
        }
      }

      if (state.skills.passiveC !== null) {
        const overridePassiveCButton = cy.contains("div", "Passive C").find("button").first();
        overridePassiveCButton.click();

        const passiveCInput = cy.contains("div", "Passive C").find("input").first();

        if (state.skills.passiveC) {
          passiveCInput.type(`{selectall}${state.skills.passiveC}`);

          cy.wait(1000);

          cy.get("#passive-c-skill-typeahead-item-0").click();
        } else {
          passiveCInput.clear();
        }
      }

      if (state.skills.sacredSeal !== null) {
        const sacredSealInput = cy.contains("div", "Sacred Seal").find("input").first();

        if (state.skills.sacredSeal) {
          sacredSealInput.type(`{selectall}${state.skills.sacredSeal}`);

          cy.wait(1000);

          cy.get("#sacred-seal-skill-typeahead-item-0").click();
        } else {
          sacredSealInput.clear();
        }
      }

      cy.get("#unit-display").matchImageSnapshot(snapshot, {
        clip: { x: 130, y: 0, width: 540, height: 960 },
        failureThreshold: 5000,
        customDiffConfig: {
          threshold: 0.33,
        },
      });
    });
  });
});
