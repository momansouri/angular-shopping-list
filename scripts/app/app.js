(function(){
  'use strict';
  angular.module('ShoppingListCheckOff',[])
         .controller('ToBuyController',ToBuyController)
         .controller('AlreadyBoughtController', AlreadyBoughtController)
         .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

  function ShoppingListCheckOffService(){
    var service = this;
    var _itemsToBuy = [{name: "cookies", quantity: 5},
                  {name: "orange", quantity: 10},
                  {name: "onion", quantity: 4},
                  {name: "banana",quantity: 5},
                  {name:"potato", quantity: 3},
                  {name:"soft drink", quantity: 5}
                ];
    var _itemsBought = [];

    service.getItemsToBuy = function(){ return _itemsToBuy;};
    service.getBoughtItems = function(){return _itemsBought;};
    service.buyItems = function(index){
      var boughtItem = _itemsToBuy[index];
      _itemsToBuy.splice(index,1);
      _itemsBought.push(boughtItem);
    };
  }

  function ToBuyController(ShoppingListCheckOffService){
    var toBuy = this;
    toBuy.AllBought = function(){
      return ShoppingListCheckOffService.getItemsToBuy().length === 0 ? true : false;
    };
    toBuy.Items = ShoppingListCheckOffService.getItemsToBuy();
    toBuy.BuyItems = function(index){
      ShoppingListCheckOffService.buyItems(index);
    };
  }

  function AlreadyBoughtController(ShoppingListCheckOffService){
    var bought = this;
    bought.NothingBought = function(){
      return ShoppingListCheckOffService.getBoughtItems().length === 0 ?  true : false;
    };
    bought.Items = ShoppingListCheckOffService.getBoughtItems();
  }
})();
