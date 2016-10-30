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
    label: '材料名字',
  },
  amount: {
    type: String,
    label: '数量',
  }
});

RecipeSchema = new SimpleSchema({
  name: {
    type: String,
    label: '名称'
  },
  desc: {
    type: String,
    optional: true,
    label: '描述',
  },
  ingredients: {
    type: [Ingredient],
    label: '材料'
  },
  cookStep: {
    type: String,
    optional: true,
    label: '制作步骤',
    autoform: {
     afFieldInput: {
        type: "textarea",
        rows: 10,
      },
    },
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
  deleteRecipe: function (id) {
    Recipes.remove(id);
  },
});

Recipes.attachSchema(RecipeSchema);
