// Pastry data component

var pastryData = {
    template: `<div class="input-price"> <form class="form-inline">
  <label class="sr-only" for="inlineFormInputName2">Name</label>
  <input type="text" v-model.trim="ingredient" class="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Ingredient">

  <label class="sr-only" for="inlineFormInputGroupUsername2">Username</label>
  <div class="input-group mb-2 mr-sm-2">

    <input type="text" v-model.trim="quantity" class="form-control" id="inlineFormInputGroupUsername2" placeholder="Quantity">
  </div>
   <div class="col-auto">
  <div class="form-check">
          <input class="form-check-input"  type="radio" v-model="picked" name="gridRadios" id="gridRadios1" value="Kg">
          <label class="form-check-label" for="gridRadios1">
            Kg
          </label>
        </div>
</div>
<div class="col-auto">
   <div class="form-check">
          <input class="form-check-input" type="radio" v-model="picked" name="gridRadios" id="gridRadios2" value="L">
          <label class="form-check-label" for="gridRadios2">
            L
          </label>
        </div>
</div>
  <div class="input-group mb-2 mr-sm-2">

    <input type="text" v-model.trim="price" class="form-control" id="inlineFormInputGroupUsername2" placeholder="Price">
  </div>


<div class="col-auto">
  <button type="submit" class="btn btn-primary mb-2" @click.prevent="pastry">Submit</button>
  </div>
</form></div>`,

    data() {
        return {
            ingredient: "",
            quantity: "",
            price: "",
            cost: "",
            picked: "",




        }
    },

    methods: {
        pastry() {
            this.$emit('pastry', {
                ingredient: this.ingredient,
                quantity: this.quantity + " " + this.picked,
                price: this.price,
                cost: this.getCost(this.quantity, this.price),
                picked: this.picked,



            });

            this.ingredient = "";
            this.quantity = "";
            this.price = "";
            this.picked = ""

        },

        getCost(quantity, price) {
            var cost = parseFloat(quantity) * parseFloat(price);
            return cost + " " + "₽";
        }


    }
};

Vue.filter('dimension', function(value) {

    var item = value;



    switch (item.key) {
        case "price":
            return item.value + " " + "₽";
            break;

        default:
            return item.value
            break;
    }

});

var app = new Vue({
    el: "#pastry",
    data: {
        ingredient: "",
        quantity: "",
        price: "",
        ingdata: [],
        message: "Hello",
        cost: "",
        totalCost: [],
        sum: "0"
    },

    methods: {
        getData(data) {
            this.ingredient = data.ingredient;
            this.quantity = data.quantity;
            this.price = data.price;
            this.ingdata.push(data);
            this.totalCost.push(data.cost);
            this.totalSum();


        },

        totalSum() {

            this.sum = parseFloat(this.totalCost.reduce(getCostSum));

            function getCostSum(total, value) {
                return parseFloat(total) + parseFloat(value);
            }
            console.log(this.sum);
        }
    },




    components: {
        pastryData: pastryData
    },


});