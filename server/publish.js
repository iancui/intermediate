Meteor.publish('recipes', function () {
  return Recipes.find({$or: [{author: this.userId} , {isPublish: true }] });
});

Meteor.publish('singleRecipe', function (id) {
  check(id, String);
  return Recipes.find({_id: id});
});
