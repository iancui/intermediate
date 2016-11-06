Template.Recipes.onCreated(function(){
    var self = this;
    this.isPublish = new ReactiveVar(false);
    self.autorun(function () {
      self.subscribe('recipes');
      self.subscribe('menu');
    });
});

Template.Recipes.helpers({
  recipes: function () {
    return Recipes.find({});
  },
  isPublish: function () {
    return Template.instance().isPublish.get();
  }
});
Template.Recipes.events({
  'click .new-recipe': function () {
    Session.set('newRecipe', true);
  },
  // 'click .publish-recipe': function (event, template) {
  //   var currentPublishState = template.isPublish.get();
  //   Meteor.call('publishRecipe', currentPublishState);
  //   template.isPublish.set(!currentPublishState);
  // }
});
