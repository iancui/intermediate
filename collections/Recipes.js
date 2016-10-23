Recipes = new Mongo.Collection('recipes');

Recipes.allow({
  insert: function (userId, doc) {
    return !!userId;
  },
  update: function (userId, doc, fields, modifier) {
    return !!userId;
  }
  // update: function (userId, doc, fields, modifier) {
  //   //...
  // },
  // remove: function (userId, doc) {
  //   //...
  // },
  // fetch: ['owner'],
  // transform: function () {
  //   //...
  // }
});

Ingredient = new SimpleSchema({
  name: {
    type: String,
  },
  amount: {
    type: String,
  }
});

RecipeSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  desc: {
    type: String,
    label: "Description"
  },
  ingredients: {
    type: [Ingredient],
  },
  inMenu: {
    type: Boolean,
    defaultValue: false,
    optional: true,
    autoform: {
      type: "hidden",
    },
  },
  author: {
    type: String,
    label: "Author",
    autoValue: function() {
      return this.userId;
    },
    autoform: {
      type: "hidden",
    },
  },
  createdAt: {
    type: Date,
    label: "CreatedAt",
    autoValue: function() {
      return new Date();
    },
    autoform: {
      type: "hidden",
    },
  }
});

Meteor.methods({
  toggleMenuItem: function (id, currentState) {
    Recipes.update(id, {
      $set: {inMenu: !currentState},
    });
  },
});

Recipes.attachSchema(RecipeSchema);
