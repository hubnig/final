"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ["api::game.game"],
      async afterCreate(event) {
        try {
          const { result } = event;
          await fetch("https://636524e2f711cb49d1f662c6.mockapi.io/items", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(result),
          });
          console.log("Отправлено");
        } catch (error) {
          console.log("Ошибка", error);
        }
      },
      async afterUpdate(event) {
        try {
          const { result } = event;
          const idItems = result.id;
          await fetch(
            `https://636524e2f711cb49d1f662c6.mockapi.io/items/${idItems}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(result),
            }
          );
          console.log(result);
          console.log("Обновленно");
        } catch (error) {
          console.log("Ошибка", error);
        }
      },
    });
  },
};
