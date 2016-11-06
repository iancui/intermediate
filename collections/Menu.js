Menu = new Mongo.Collection('menu');


Menu.allow({
  insert: function (userId, doc) {
    return !!userId;
  },
  update: function (userId, doc, fields, modifier) {
    return !!userId;
  },
  remove: function (userId, doc) {
    return !!userId;
  },
  // fetch: ['owner'],
  // transform: function () {
  //   //...
  // }
});

Meteor.methods({
  toggleMenuItem: function (id) {
    var menu = Menu.find({$and: [{author: this.userId},{recipeId: id}]}).fetch();
    if(menu.length == 0) {
      Menu.insert({author: this.userId, recipeId: id, isDeleted:false, createdAt: new Date(),updatedAt: new Date() });
    }else{
      Menu.update({_id: menu[0]._id},
       {$set: {isDeleted:!menu[0].isDeleted, updatedAt: new Date() } } );
    }
  },
});
