Meteor.publish('recipes', function () {
  return Recipes.find({$and: [{isDeleted: "false" },
   {$or: [{author: this.userId} , {isPublish: "true" }]}
 ]});
   // return Recipes.find({$or: [{author: this.userId} , {isPublish: "true" }]});
});

Meteor.publish('singleRecipe', function (id) {
  check(id, String);
  return Recipes.find({_id: id});
});

Meteor.publish('menu', function () {
  // return Menu.find({author: this.userId});
  return Menu.find({});
});
