Template.Menu.onCreated(function(){
    var self = this;
    self.autorun(function () {
      self.subscribe('recipes');
      self.subscribe('menu');
    });
});

Template.Menu.helpers({
  recipes: function () {
    var menuCursor = Menu.find({$and:[{author: Meteor.userId()},{isDeleted: false}]});
    if (menuCursor.count() != 0) {
      var recipeIds = menuCursor.map(function (m) {
        return m.recipeId;
      });
      console.log(recipeIds);
      return Recipes.find({_id: {$in: recipeIds}});
    }
  }
});
