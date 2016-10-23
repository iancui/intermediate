Template.Recipe.events({
  'click .toggle-menu': function () {
    Meteor.call('toggleMenuItem', this._id, this.inMenu);
  }
});

// Template.Recipe.helpers({
//   inMenu: function () {
//     return this.inMenu;
//   },
// });
