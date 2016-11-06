Template.Recipe.onCreated(function() {
  this.editMode = new ReactiveVar(false);
  var self = this;
    self.autorun(function () {
      self.subscribe('menu');
    });
})

Template.Recipe.events({
  'click .toggle-menu': function () {
    Meteor.call('toggleMenuItem', this._id);

  },
  'click .fa-trash': function() {
    Meteor.call('deleteRecipe', this._id );
  },
  'click .fa-pencil': function (event, template) {
    template.editMode.set(!template.editMode.get());
  },
  'click .fa-share': function () {
    Meteor.call('publishRecipe', this._id, this.isPublish);
  },
  'click .fa-low-vision': function () {
    Meteor.call('publishRecipe', this._id, this.isPublish);
  }
});

Template.Recipe.helpers({
  updateRecipeId: function () {
    return this._id;
  },
  editMode: function() {
    return Template.instance().editMode.get();
  },
  isAuthor: function () {
    return Meteor.userId() == this.author;
  },
  inMenu: function() {
    menu = Menu.find({$and: [{recipeId: this._id},{author: Meteor.userId()}]}).fetch();;
    // 存在
    return menu.length!=0 && !menu[0].isDeleted;
  }
});
